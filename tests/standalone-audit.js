'use strict';
const fs=require('fs');
const vm=require('vm');

const target='heittoliikkeen-tutkimuslaboratorio-standalone.html';
const cssFiles=['css/styles.css','css/pedagogy.css','css/accessibility.css'];
const jsFiles=['js/physics.js','js/integrator.js','js/simulation.js','js/axis.js','js/trajectory-view.js','js/charts.js','js/tasks-data.js','js/task-engine.js','js/tasks-ui.js','js/ui.js','js/app.js'];
const runtimeFiles=jsFiles.slice(0,-1);
const html=fs.readFileSync('index.html','utf8').replace(/\r\n/g,'\n');
const standalone=fs.readFileSync(target,'utf8').replace(/\r\n/g,'\n');
const failures=[];
function assert(condition,message){if(!condition)failures.push(message);}
function ids(markup){return[...markup.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]).sort();}

assert(/Versio: 1\.0\.0/.test(standalone),'version header');
assert(/Muodostamispäivä: 2026-07-13/.test(standalone),'build date header');
assert(JSON.stringify(ids(html))===JSON.stringify(ids(standalone)),'DOM ids differ');
assert((standalone.match(/<style>/g)||[]).length===cssFiles.length,'style block count');
assert((standalone.match(/<script>/g)||[]).length===jsFiles.length,'script block count');
cssFiles.forEach(file=>assert(standalone.includes('/* Upotettu lähdetiedosto: '+file+' */\n'+fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n').trimEnd()),'CSS mismatch '+file));
jsFiles.forEach(file=>assert(standalone.includes('/* Upotettu lähdetiedosto: '+file+' */\n'+fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n').trimEnd()),'JavaScript mismatch '+file));
const cssOrder=cssFiles.map(file=>standalone.indexOf('Upotettu lähdetiedosto: '+file));
const jsOrder=jsFiles.map(file=>standalone.indexOf('Upotettu lähdetiedosto: '+file));
assert(cssOrder.every((value,index)=>value>=0&&(index===0||value>cssOrder[index-1])),'CSS order');
assert(jsOrder.every((value,index)=>value>=0&&(index===0||value>jsOrder[index-1])),'JavaScript order');

assert(!/<(?:link|script)\b[^>]*(?:href|src)=/i.test(standalone),'resource reference remained');
assert(!/(?:https?:)?\/\//i.test(standalone),'external URL');
assert(!/fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/i.test(standalone),'network API');
assert(!/localStorage|sessionStorage|document\.cookie/i.test(standalone),'persistent storage');
assert(!/\beval\s*\(|new\s+Function\s*\(/.test(standalone),'dynamic execution');
assert(!/\.innerHTML\s*=/.test(standalone),'innerHTML assignment');
assert(!/C:\\Users\\|\/Users\//.test(standalone),'machine-specific path');
assert(!/testResults|test-runner\.html|tests\/tests\.js/.test(standalone),'test payload included');

function contextFrom(sources){const context={console,Math,Number,Array,Object,String,Set,Map,Error,Infinity,NaN};context.window=context;context.ProjectileLab={};vm.createContext(context);sources.forEach((source,index)=>vm.runInContext(source,context,{filename:'runtime-'+index+'.js'}));return context.ProjectileLab;}
const devSources=runtimeFiles.map(file=>fs.readFileSync(file,'utf8'));
const inlineScripts=[...standalone.matchAll(/<script>\s*\/\* Upotettu lähdetiedosto: ([^*]+) \*\/\s*([\s\S]*?)<\/script>/g)].map(match=>({file:match[1].trim(),source:match[2].trimEnd()}));
const standaloneSources=runtimeFiles.map(file=>{const found=inlineScripts.find(item=>item.file===file);return found?found.source:'';});
assert(standaloneSources.every(Boolean),'runtime script extraction');
const dev=contextFrom(devSources),packed=contextFrom(standaloneSources);
function scenario(PL){
  const known={speed:10,angleDeg:45,height:0,mass:1,gravity:10,dragCoefficient:0,dt:.01};
  const defaults={speed:20,angleDeg:45,height:0,mass:1,gravity:9.81,dragCoefficient:.02,dt:.01};
  const knownMetrics=PL.Physics.analyticMetrics(known);
  const trajectories={analytic:PL.Physics.createAnalyticTrajectory(defaults),numeric:PL.Integrator.simulate(defaults,'none'),drag:PL.Integrator.simulate(defaults,'quadratic')};
  const manager=PL.TaskEngine.createManager(PL.TaskData);PL.TaskEngine.switchTask(manager,'angle-range');
  const hints=[PL.TaskEngine.nextHint(manager),PL.TaskEngine.nextHint(manager),PL.TaskEngine.nextHint(manager),PL.TaskEngine.nextHint(manager)];
  const observation=PL.TaskEngine.addObservation(manager,{params:defaults,trajectories});
  const bounds=PL.TrajectoryView.dataBounds(trajectories),transform=PL.TrajectoryView.createTransform(bounds,{left:58,right:784,top:16,bottom:262},'true-scale');
  const reopened=PL.TaskEngine.createManager(PL.TaskData);
  return{known:{range:knownMetrics.range,flightTime:knownMetrics.flightTime,maxHeight:knownMetrics.maxHeight},defaultMetrics:Object.fromEntries(Object.entries(trajectories).map(([key,value])=>[key,value.metrics])),taskIds:PL.TaskData.map(task=>task.id),hints,observationAngle:observation.data.angle,pixelsPerMeterX:transform.pixelsPerMeterX,pixelsPerMeterY:transform.pixelsPerMeterY,limits:PL.Physics.PARAM_LIMITS,reopenedTask:reopened.currentTaskId,reopenedSessions:Object.values(reopened.sessions).map(session=>[session.hypothesis,session.conclusion,session.observations.length,session.hintIndex])};
}
const devScenario=scenario(dev),packedScenario=scenario(packed);
assert(JSON.stringify(devScenario)===JSON.stringify(packedScenario),'functional comparison');
assert(Math.abs(packedScenario.known.range-10)<1e-12,'known range');
assert(Math.abs(packedScenario.known.flightTime-Math.sqrt(2))<1e-12,'known flight time');
assert(Math.abs(packedScenario.known.maxHeight-2.5)<1e-12,'known max height');
assert(packedScenario.taskIds.join('|')==='angle-range|drag-effect|time-step','task loading');
assert(packedScenario.hints[0]===packedScenario.hints[3],'hint restart');
assert(packedScenario.observationAngle===45,'observation recording');
assert(Math.abs(packedScenario.pixelsPerMeterX-packedScenario.pixelsPerMeterY)<1e-12,'true scale transform');
assert(packedScenario.reopenedTask===null&&packedScenario.reopenedSessions.every(session=>session[0]===''&&session[1]===''&&session[2]===0&&session[3]===0),'session-only state');

function smokeRuntime(){
  class Element{
    constructor(id,tag){this.id=id||'';this.tagName=(tag||'div').toUpperCase();this.value='';this.checked=false;this.hidden=false;this.disabled=false;this.textContent='';this.children=[];this.listeners={};this.width=0;this.height=0;this.classList={toggle:()=>{}};}
    appendChild(child){this.children.push(child);return child;}
    addEventListener(type,listener){(this.listeners[type]||(this.listeners[type]=[])).push(listener);}
    dispatch(type){(this.listeners[type]||[]).forEach(listener=>listener({target:this,currentTarget:this}));}
    getBoundingClientRect(){return{width:800,height:this.id==='trajectory'?310:240};}
    getContext(){return{setTransform(){},clearRect(){},fillRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fill(){},fillText(){},save(){},restore(){},translate(){},rotate(){},closePath(){},setLineDash(){},arc(){}};}
  }
  const elements={};ids(html).forEach(id=>elements[id]=new Element(id));
  [...html.matchAll(/<input\b[^>]*id="([^"]+)"[^>]*>/g)].forEach(match=>{const tag=match[0],element=elements[match[1]];const value=tag.match(/\bvalue="([^"]*)"/);element.value=value?value[1]:'';element.checked=/\bchecked\b/.test(tag);});
  ['trajectory','positionChart','velocityChart'].forEach(id=>elements[id]=Object.assign(elements[id],new Element(id,'canvas')));
  const scaleTrue=new Element('', 'input'),scaleFit=new Element('', 'input');scaleTrue.value='true-scale';scaleTrue.checked=true;scaleFit.value='fit';
  const document={readyState:'complete',body:new Element('body','body'),getElementById:id=>elements[id],createElement:tag=>new Element('',tag),addEventListener(){},querySelector(selector){if(selector==='input[name="scaleMode"]:checked')return scaleTrue.checked?scaleTrue:scaleFit;if(selector.includes('value="true-scale"'))return scaleTrue;if(selector.includes('value="fit"'))return scaleFit;return null;},querySelectorAll(){return[scaleTrue,scaleFit,elements.showInitialVector,elements.showCalculationPoints];}};
  const errors=[],runtimeConsole={log(){},warn(){},error(...args){errors.push(args.join(' '));}};
  const context={console:runtimeConsole,document,devicePixelRatio:1,requestAnimationFrame:()=>1,cancelAnimationFrame(){},addEventListener(){},Math,Number,Array,Object,String,Set,Map,Error,Infinity,NaN};context.window=context;vm.createContext(context);
  inlineScripts.forEach((item,index)=>vm.runInContext(item.source,context,{filename:item.file||'inline-'+index+'.js'}));
  const PL=context.ProjectileLab,initial={params:PL.App.controller.snapshot().params,taskId:PL.App.tasks.manager.currentTaskId,error:elements.error.textContent,summaries:[elements.trajectorySummary.textContent,elements.positionSummary.textContent,elements.velocitySummary.textContent]};
  PL.App.tasks.activate('angle-range');const hintButton=elements.showHint,hints=[];for(let i=0;i<4;i+=1){hintButton.dispatch('click');hints.push(elements.taskHint.textContent);}elements.addObservation.dispatch('click');const observations=PL.TaskEngine.currentSession(PL.App.tasks.manager).observations.length;elements.step.dispatch('click');elements.play.dispatch('click');elements.pause.dispatch('click');elements.reset.dispatch('click');
  return{initial,hints,observations,consoleErrors:errors};
}
const smokeA=smokeRuntime(),smokeB=smokeRuntime();
const expectedDefaults={speed:20,angleDeg:45,height:0,mass:1,gravity:9.81,dragCoefficient:.02,dt:.01};
assert(JSON.stringify(smokeA.initial.params)===JSON.stringify(expectedDefaults),'standalone default parameters');
assert(smokeA.initial.taskId===null&&smokeB.initial.taskId===null,'neutral startup');
assert(smokeA.initial.error===''&&smokeA.initial.summaries.every(Boolean),'initial render or canvas summaries');
assert(smokeA.hints[0]===smokeA.hints[3]&&smokeA.hints[0]!==smokeA.hints[1]&&smokeA.hints[1]!==smokeA.hints[2],'runtime hint cycle');
assert(smokeA.observations===1,'runtime observation recording');
assert(smokeA.consoleErrors.length===0&&smokeB.consoleErrors.length===0,'runtime console errors');
assert(smokeB.initial.taskId===null,'fresh runtime retained session state');

const result={status:failures.length?'FAIL':'PASS',file:target,sizeBytes:fs.statSync(target).size,domIds:ids(html).length,styles:cssFiles.length,scripts:jsFiles.length,knownCase:packedScenario.known,tasks:packedScenario.taskIds.length,runtimeSmoke:{neutralStartup:smokeA.initial.taskId===null,observationCount:smokeA.observations,consoleErrors:smokeA.consoleErrors.length},failures};
console.log('STANDALONE AUDIT '+result.status);
console.log(JSON.stringify(result));
process.exitCode=failures.length?1:0;
