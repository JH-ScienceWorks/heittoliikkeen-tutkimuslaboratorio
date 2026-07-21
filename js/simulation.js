(function (PL) {
  'use strict';
  function Controller(onUpdate) {
    this.onUpdate = onUpdate;
    this.running = false; this.time = 0; this.lastFrame = null; this.raf = null;
    this.params = null; this.trajectories = null; this.duration = 0;
  }
  Controller.prototype.reset = function (params) {
    this.pause();
    const nextParams=Object.assign({},params),nextTrajectories={
      analytic: PL.Physics.createAnalyticTrajectory(nextParams),
      numeric: PL.Integrator.simulate(nextParams, 'none'),
      drag: PL.Integrator.simulate(nextParams, 'quadratic')
    };
    const nextDuration=Math.max(nextTrajectories.analytic.metrics.flightTime,nextTrajectories.numeric.metrics.flightTime,nextTrajectories.drag.metrics.flightTime);
    this.params=nextParams;this.time=0;this.trajectories=nextTrajectories;this.duration=nextDuration;
    this.emit();
  };
  Controller.prototype.emit = function () { if (this.onUpdate) this.onUpdate(this.snapshot()); };
  Controller.prototype.snapshot = function () {
    const states = {};
    for (const key in this.trajectories) states[key] = PL.Physics.interpolate(this.trajectories[key].samples, this.time);
    return { time: this.time, duration: this.duration, running: this.running, params: this.params, trajectories: this.trajectories, states: states };
  };
  Controller.prototype.play = function () {
    if (!this.trajectories || this.time >= this.duration) return;
    this.running = true; this.lastFrame = null; this.loop(); this.emit();
  };
  Controller.prototype.loop = function () {
    const self = this;
    this.raf = requestAnimationFrame(function (now) {
      if (!self.running) return;
      if (self.lastFrame !== null) self.time = Math.min(self.duration, self.time + Math.min((now-self.lastFrame)/1000, .05));
      self.lastFrame = now; self.emit();
      if (self.time >= self.duration) self.pause(); else self.loop();
    });
  };
  Controller.prototype.pause = function () { this.running = false; this.lastFrame = null; if (this.raf) cancelAnimationFrame(this.raf); this.raf = null; if (this.trajectories) this.emit(); };
  Controller.prototype.step = function () { if (!this.trajectories) return; this.pause(); this.time = Math.min(this.duration, this.time + this.params.dt); this.emit(); };
  PL.Simulation = { Controller };
}(window.ProjectileLab = window.ProjectileLab || {}));
