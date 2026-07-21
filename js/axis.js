(function (PL) {
  'use strict';
  function decimalPlacesForStep(step) { const value=Math.abs(step); if(!Number.isFinite(value)||value===0)return 0; const usefulLimit=Math.max(0,1-Math.floor(Math.log10(value))); for(let places=0;places<=12;places+=1){const scaled=value*Math.pow(10,places);if(Math.abs(scaled-Math.round(scaled))<1e-9)return places<=usefulLimit?places:usefulLimit;} return usefulLimit; }
  function formatTickFi(value,step){const places=decimalPlacesForStep(step),threshold=.5*Math.pow(10,-places),safe=Math.abs(value)<threshold?0:value;return safe.toFixed(places).replace('.',',');}
  function createTicks(max,intervals){const count=Math.max(1,Math.floor(intervals)),step=max/count;return Array.from({length:count+1},function(_,index){const value=index===count?max:step*index;return {value:value,label:formatTickFi(value,step)};});}
  function linearScale(domainMin,domainMax,rangeMin,rangeMax){const size=domainMax-domainMin;if(!Number.isFinite(size)||Math.abs(size)<1e-15)return function(){return(rangeMin+rangeMax)/2;};return function(value){return rangeMin+(value-domainMin)/size*(rangeMax-rangeMin);};}
  PL.Axis={decimalPlacesForStep,formatTickFi,createTicks,linearScale};
}(window.ProjectileLab=window.ProjectileLab||{}));
