(function (PL) {
  'use strict';

  const EPSILON = 1e-12;
  const MAX_SAMPLES = 100000;
  const PARAM_LIMITS = {
    speed: [0, 200], angleDeg: [-89, 90], height: [0, 1000], mass: [0.001, 1000],
    gravity: [0.1, 30], dragCoefficient: [0, 10], dt: [0.001, 0.5]
  };
  const PARAM_LABELS = {speed:'Lähtönopeus',angleDeg:'Lähtökulma',height:'Lähtökorkeus',mass:'Massa',gravity:'Gravitaatio',dragCoefficient:'Vastuskerroin',dt:'Aika-askel'};

  function validateParams(p) {
    Object.keys(PARAM_LIMITS).forEach(function (key) {
      if (!Number.isFinite(p[key])) throw new Error('Virheellinen arvo: ' + key);
      const limits=PARAM_LIMITS[key];
      if(p[key]<limits[0]||p[key]>limits[1])throw new Error(PARAM_LABELS[key]+' on sallitun alueen '+limits[0]+'–'+limits[1]+' ulkopuolella.');
    });
  }

  function initialState(p) {
    const angle = p.angleDeg * Math.PI / 180;
    return { t: 0, x: 0, y: p.height, vx: p.speed * Math.cos(angle), vy: p.speed * Math.sin(angle) };
  }

  function analyticAt(p, t) {
    const s0 = initialState(p);
    return {
      t: t,
      x: s0.vx * t,
      y: p.height + s0.vy * t - 0.5 * p.gravity * t * t,
      vx: s0.vx,
      vy: s0.vy - p.gravity * t
    };
  }

  function analyticMetrics(p) {
    validateParams(p);
    const s0 = initialState(p);
    const flightTime = (s0.vy + Math.sqrt(s0.vy * s0.vy + 2 * p.gravity * p.height)) / p.gravity;
    const apexTime = Math.max(0, s0.vy / p.gravity);
    const apex = analyticAt(p, Math.min(apexTime, flightTime));
    const impact = analyticAt(p, flightTime);
    return {
      flightTime: flightTime,
      maxHeight: Math.max(p.height, apex.y),
      range: impact.x,
      impactSpeed: Math.hypot(impact.vx, impact.vy),
      apexTime: Math.min(apexTime, flightTime)
    };
  }

  function acceleration(p, state, model) {
    if (model !== 'quadratic' || p.dragCoefficient === 0) return { ax: 0, ay: -p.gravity };
    const speed = Math.hypot(state.vx, state.vy);
    const factor = -(p.dragCoefficient / p.mass) * speed;
    return { ax: factor * state.vx, ay: -p.gravity + factor * state.vy };
  }

  function createAnalyticTrajectory(p, sampleDt) {
    const metrics = analyticMetrics(p);
    const samples = [];
    const dt = sampleDt===undefined?p.dt:sampleDt;
    if(!Number.isFinite(dt)||dt<=0)throw new Error('Analyyttisen radan näytevälin tulee olla positiivinen ja äärellinen.');
    if(Math.ceil(metrics.flightTime/dt)+1>MAX_SAMPLES)throw new Error('Laskenta vaatisi liian monta pistettä. Suurenna aika-askelta tai pienennä lentoaikaa.');
    for (let t = 0; t < metrics.flightTime; t += dt) samples.push(analyticAt(p, t));
    const impact = analyticAt(p, metrics.flightTime);
    impact.y = 0;
    samples.push(impact);
    return { id: 'analytic', label: 'Analyyttinen', samples: samples, metrics: metrics };
  }

  function interpolate(samples, t) {
    if (t <= 0) return samples[0];
    const last = samples[samples.length - 1];
    if (t >= last.t) return last;
    let lo = 0, hi = samples.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (samples[mid].t <= t) lo = mid; else hi = mid;
    }
    const a = samples[lo], b = samples[hi];
    const f = (t - a.t) / (b.t - a.t || 1);
    return { t: t, x: a.x + (b.x-a.x)*f, y: a.y + (b.y-a.y)*f, vx: a.vx + (b.vx-a.vx)*f, vy: a.vy + (b.vy-a.vy)*f };
  }

  PL.Physics = { EPSILON, MAX_SAMPLES, PARAM_LIMITS, validateParams, initialState, analyticAt, analyticMetrics, acceleration, createAnalyticTrajectory, interpolate };
}(window.ProjectileLab = window.ProjectileLab || {}));
