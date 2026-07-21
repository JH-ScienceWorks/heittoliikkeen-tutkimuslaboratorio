(function (PL) {
  'use strict';
  function createTransform(dataBounds,plot,mode){const dataXMax=Math.max(1e-9,dataBounds.xMax),dataYMax=Math.max(1e-9,dataBounds.yMax),width=plot.right-plot.left,height=plot.bottom-plot.top;let xMax=dataXMax,yMax=dataYMax,pixelsPerMeterX=width/xMax,pixelsPerMeterY=height/yMax;if(mode==='true-scale'){const common=Math.min(pixelsPerMeterX,pixelsPerMeterY);pixelsPerMeterX=common;pixelsPerMeterY=common;xMax=width/common;yMax=height/common;}function mapX(x){return plot.left+x*pixelsPerMeterX;}function mapY(y){return plot.bottom-y*pixelsPerMeterY;}function mapPoint(x,y){return{x:mapX(x),y:mapY(y)};}return{mode,xMax,yMax,pixelsPerMeterX,pixelsPerMeterY,mapX,mapY,mapPoint};}
  function dataBounds(trajectories){const all=Object.values(trajectories);return{xMax:Math.max(1,...all.map(t=>t.metrics.range))*1.06,yMax:Math.max(1,...all.map(t=>t.metrics.maxHeight))*1.12};}
  function velocityVector(params,scaleSeconds){const seconds=scaleSeconds===undefined?.25:scaleSeconds,start=PL.Physics.initialState(params);return{start:{x:start.x,y:start.y},end:{x:start.x+start.vx*seconds,y:start.y+start.vy*seconds},scaleSeconds:seconds,speed:Math.hypot(start.vx,start.vy),angleDeg:params.angleDeg};}
  function includeVector(bounds,vector){return{xMax:Math.max(bounds.xMax,Math.max(0,vector.end.x)*1.05),yMax:Math.max(bounds.yMax,Math.max(0,vector.end.y)*1.05)};}
  PL.TrajectoryView={createTransform,dataBounds,velocityVector,includeVector,VELOCITY_VECTOR_SECONDS:.25};
}(window.ProjectileLab=window.ProjectileLab||{}));
