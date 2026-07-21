(function (PL) {
  'use strict';
  const MAX_STEPS=100000;

  function finiteState(s){return Number.isFinite(s.t)&&Number.isFinite(s.x)&&Number.isFinite(s.y)&&Number.isFinite(s.vx)&&Number.isFinite(s.vy);}
  function validateStability(p,model){if(model!=='quadratic'||p.dragCoefficient===0)return;const initial=PL.Physics.initialState(p);if(initial.y===0&&initial.vy<=0)return;const speedBound=Math.sqrt(p.speed*p.speed+2*p.gravity*p.height),dragChange=p.dt*p.dragCoefficient*Math.max(speedBound,Math.sqrt(p.mass*p.gravity/p.dragCoefficient))/p.mass;if(dragChange>1)throw new Error('Numeerinen laskenta muuttuisi epävakaaksi näillä arvoilla. Pienennä aika-askelta tai vastuskerrointa taikka suurenna massaa.');}

  function derivative(p, s, model) {
    const a = PL.Physics.acceleration(p, s, model);
    return { x: s.vx, y: s.vy, vx: a.ax, vy: a.ay };
  }

  function shifted(s, k, h) {
    return { t: s.t + h, x: s.x + h*k.x, y: s.y + h*k.y, vx: s.vx + h*k.vx, vy: s.vy + h*k.vy };
  }

  function rk4Step(p, s, h, model) {
    if(!Number.isFinite(h)||h<=0)throw new Error('RK4-askeleen tulee olla positiivinen ja äärellinen.');
    const k1 = derivative(p, s, model);
    const k2 = derivative(p, shifted(s, k1, h/2), model);
    const k3 = derivative(p, shifted(s, k2, h/2), model);
    const k4 = derivative(p, shifted(s, k3, h), model);
    const next = {
      t: s.t + h,
      x: s.x + h*(k1.x + 2*k2.x + 2*k3.x + k4.x)/6,
      y: s.y + h*(k1.y + 2*k2.y + 2*k3.y + k4.y)/6,
      vx: s.vx + h*(k1.vx + 2*k2.vx + 2*k3.vx + k4.vx)/6,
      vy: s.vy + h*(k1.vy + 2*k2.vy + 2*k3.vy + k4.vy)/6
    };
    if(!finiteState(next))throw new Error('Numeerinen laskenta muuttui epävakaaksi. Pienennä aika-askelta tai muuta parametreja.');
    return next;
  }

  function locateEvent(p, start, h, model, valueFn) {
    let lo = 0, hi = h, state = start;
    for (let i = 0; i < 48; i += 1) {
      const mid = (lo + hi) / 2;
      state = rk4Step(p, start, mid, model);
      if (valueFn(state) > 0) lo = mid; else hi = mid;
    }
    return rk4Step(p, start, (lo + hi) / 2, model);
  }

  function simulate(p, model) {
    PL.Physics.validateParams(p);
    validateStability(p,model);
    const samples = [];
    let state = PL.Physics.initialState(p);
    samples.push(state);
    let maxHeight = state.y, apexTime = 0, impact = null;
    const maxSteps = MAX_STEPS;

    if (state.y === 0 && state.vy <= 0) impact = state;
    for (let i = 0; !impact && i < maxSteps; i += 1) {
      const next = rk4Step(p, state, p.dt, model);
      if (state.vy > 0 && next.vy <= 0) {
        const apex = locateEvent(p, state, p.dt, model, function (s) { return s.vy; });
        maxHeight = Math.max(maxHeight, apex.y);
        apexTime = apex.t;
      } else if (next.y > maxHeight) {
        maxHeight = next.y; apexTime = next.t;
      }
      if (state.y >= 0 && next.y < 0) {
        impact = locateEvent(p, state, p.dt, model, function (s) { return s.y; });
        impact.y = 0;
        samples.push(impact);
      } else {
        samples.push(next); state = next;
      }
    }
    if (!impact) throw new Error('Maaosumaa ei löytynyt '+MAX_STEPS+' laskenta-askeleessa. Suurenna aika-askelta tai muuta parametreja.');
    return {
      id: model === 'quadratic' ? 'drag' : 'numeric',
      label: model === 'quadratic' ? 'Neliöllinen vastus' : 'RK4, ei vastusta',
      samples: samples,
      metrics: { flightTime: impact.t, maxHeight: maxHeight, range: impact.x, impactSpeed: Math.hypot(impact.vx, impact.vy), apexTime: apexTime }
    };
  }

  PL.Integrator = { MAX_STEPS, derivative, rk4Step, locateEvent, validateStability, simulate };
}(window.ProjectileLab = window.ProjectileLab || {}));
