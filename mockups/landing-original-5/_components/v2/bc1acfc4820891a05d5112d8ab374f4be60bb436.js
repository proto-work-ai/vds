const lf = () => Promise.resolve().then(() => rf), Ea = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: Ra, jsx: h, jsxs: b } = Ea;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function Yi(t) {
  const e = t?.props?._fgT, n = typeof e == "function" || typeof e == "string" || typeof e == "object" && e !== null && "$$typeof" in e;
  return globalThis.__GLOBALS__.React.isValidElement(t) && n;
}
function Vt(t) {
  return globalThis.__GLOBALS__.React.isValidElement(t) && t.type === "fg-txt";
}
function Xi(t) {
  const { _fgT: e, _fgS: n, _fgB: i, _fgD: s, ...r } = t.props;
  return globalThis.__GLOBALS__.React.createElement(e, {
    ...r,
    key: t.key
  }, r.children);
}
function Xt(t) {
  return Yi(t) ? Xi(t) : Vt(t) ? t.props.children : t;
}
const Ct = globalThis.__GLOBALS__.React.Children, La = {
  map(t, e, n) {
    return Ct.map(t, (i, s) => {
      const r = Xt(i);
      return Vt(i) ? null : e.call(n, r, s);
    });
  },
  forEach(t, e, n) {
    Ct.forEach(t, (i, s) => {
      if (Vt(i))
        return;
      const r = Xt(i);
      e.call(n, r, s);
    });
  },
  count(t) {
    let e = 0;
    return Ct.forEach(t, (n) => {
      Vt(n) || e++;
    }), e;
  },
  toArray(t) {
    const e = [];
    return Ct.forEach(t, (n) => {
      Vt(n) || e.push(Xt(n));
    }), e;
  },
  only(t) {
    const e = Ct.only(t);
    return Xt(e);
  }
}, pe = [
  "_fgT",
  "_fgS",
  "_fgB",
  "_fgD"
];
function Na(t) {
  if (t == null || typeof t != "object") return t;
  const e = Object.keys(t);
  let n = !1;
  for (let s = 0; s < pe.length; s++)
    if (pe[s] in t) {
      n = !0;
      break;
    }
  if (!n) return t;
  const i = {};
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    pe.indexOf(r) === -1 && (i[r] = t[r]);
  }
  return i;
}
const Rn = globalThis.__GLOBALS__.React.cloneElement, Fa = (t, ...e) => {
  if (Yi(t)) {
    const n = Xi(t), i = e[0];
    return i != null && typeof i == "object" && (e = [
      Na(i),
      ...e.slice(1)
    ]), Rn(n, ...e);
  }
  return Rn(t, ...e);
}, he = {
  ...globalThis.__GLOBALS__.React,
  Children: La,
  cloneElement: Fa
}, { Component: Ia, createContext: At, createElement: ie, createFactory: cf, createRef: df, forwardRef: Ze, Fragment: qi, isValidElement: ff, lazy: uf, memo: pf, Profiler: hf, PureComponent: gf, startTransition: mf, StrictMode: yf, Suspense: bf, use: xf, useCallback: Zi, useContext: j, useDebugValue: vf, useDeferredValue: Tf, useEffect: Tt, useId: Oa, useImperativeHandle: _f, useInsertionEffect: ja, useLayoutEffect: za, useMemo: ce, useReducer: Sf, useRef: Et, useState: Mt, useSyncExternalStore: Af, useTransition: wf, version: Pf, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Bf } = globalThis.__GLOBALS__.React, f = he.forwardRef(function({ _fgT: e, _fgS: n, _fgB: i, ...s }, r) {
  const a = r ? { ...s, ref: r } : s;
  return typeof window < "u" && window.__FGInspectorCmp ? he.createElement(window.__FGInspectorCmp, { _fgT: e, _fgS: n, _fgB: i, ...a }) : he.createElement(e, a);
}), Ji = At({});
function Wa(t) {
  const e = Et(null);
  return e.current === null && (e.current = t()), e.current;
}
const Je = typeof window < "u", Ua = Je ? za : Tt, Qe = /* @__PURE__ */ At(null);
function tn(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function en(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const Q = (t, e, n) => n > e ? e : n < t ? t : n;
let nn = () => {
};
const tt = {}, Qi = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function ts(t) {
  return typeof t == "object" && t !== null;
}
const es = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function sn(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const Y = /* @__NO_SIDE_EFFECTS__ */ (t) => t, $a = (t, e) => (n) => e(t(n)), Ht = (...t) => t.reduce($a), Ot = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const i = e - t;
  return i === 0 ? 1 : (n - t) / i;
};
class an {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return tn(this.subscriptions, e), () => en(this.subscriptions, e);
  }
  notify(e, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](e, n, i);
      else
        for (let r = 0; r < s; r++) {
          const a = this.subscriptions[r];
          a && a(e, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Z = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, G = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function ns(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const is = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, Ha = 1e-7, Ka = 12;
function Ga(t, e, n, i, s) {
  let r, a, o = 0;
  do
    a = e + (n - e) / 2, r = is(a, i, s) - t, r > 0 ? n = a : e = a;
  while (Math.abs(r) > Ha && ++o < Ka);
  return a;
}
function Kt(t, e, n, i) {
  if (t === e && n === i)
    return Y;
  const s = (r) => Ga(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : is(s(r), e, i);
}
const ss = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, as = (t) => (e) => 1 - t(1 - e), rs = /* @__PURE__ */ Kt(0.33, 1.53, 0.69, 0.99), rn = /* @__PURE__ */ as(rs), os = /* @__PURE__ */ ss(rn), ls = (t) => (t *= 2) < 1 ? 0.5 * rn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), on = (t) => 1 - Math.sin(Math.acos(t)), cs = as(on), ds = ss(on), Ya = /* @__PURE__ */ Kt(0.42, 0, 1, 1), Xa = /* @__PURE__ */ Kt(0, 0, 0.58, 1), fs = /* @__PURE__ */ Kt(0.42, 0, 0.58, 1), qa = (t) => Array.isArray(t) && typeof t[0] != "number", us = (t) => Array.isArray(t) && typeof t[0] == "number", Za = {
  linear: Y,
  easeIn: Ya,
  easeInOut: fs,
  easeOut: Xa,
  circIn: on,
  circInOut: ds,
  circOut: cs,
  backIn: rn,
  backInOut: os,
  backOut: rs,
  anticipate: ls
}, Ja = (t) => typeof t == "string", Ln = (t) => {
  if (us(t)) {
    nn(t.length === 4);
    const [e, n, i, s] = t;
    return Kt(e, n, i, s);
  } else if (Ja(t))
    return Za[t];
  return t;
}, qt = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Qa(t, e) {
  let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), s = !1, r = !1;
  const a = /* @__PURE__ */ new WeakSet();
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function d(l) {
    a.has(l) && (c.schedule(l), t()), l(o);
  }
  const c = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (l, u = !1, p = !1) => {
      const m = p && s ? n : i;
      return u && a.add(l), m.has(l) || m.add(l), l;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (l) => {
      i.delete(l), a.delete(l);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (l) => {
      if (o = l, s) {
        r = !0;
        return;
      }
      s = !0, [n, i] = [i, n], n.forEach(d), n.clear(), s = !1, r && (r = !1, c.process(l));
    }
  };
  return c;
}
const tr = 40;
function ps(t, e) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, a = qt.reduce((x, P) => (x[P] = Qa(r), x), {}), { setup: o, read: d, resolveKeyframes: c, preUpdate: l, update: u, preRender: p, render: g, postRender: m } = a, T = () => {
    const x = tt.useManualTiming ? s.timestamp : performance.now();
    n = !1, tt.useManualTiming || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(x - s.timestamp, tr), 1)), s.timestamp = x, s.isProcessing = !0, o.process(s), d.process(s), c.process(s), l.process(s), u.process(s), p.process(s), g.process(s), m.process(s), s.isProcessing = !1, n && e && (i = !1, t(T));
  }, v = () => {
    n = !0, i = !0, s.isProcessing || t(T);
  };
  return { schedule: qt.reduce((x, P) => {
    const A = a[P];
    return x[P] = (B, E = !1, w = !1) => (n || v(), A.schedule(B, E, w)), x;
  }, {}), cancel: (x) => {
    for (let P = 0; P < qt.length; P++)
      a[qt[P]].cancel(x);
  }, state: s, steps: a };
}
const { schedule: C, cancel: nt, state: L, steps: ge } = /* @__PURE__ */ ps(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Y, !0);
let Qt;
function er() {
  Qt = void 0;
}
const z = {
  now: () => (Qt === void 0 && z.set(L.isProcessing || tt.useManualTiming ? L.timestamp : performance.now()), Qt),
  set: (t) => {
    Qt = t, queueMicrotask(er);
  }
}, hs = (t) => (e) => typeof e == "string" && e.startsWith(t), ln = /* @__PURE__ */ hs("--"), nr = /* @__PURE__ */ hs("var(--"), cn = (t) => nr(t) ? ir.test(t.split("/*")[0].trim()) : !1, ir = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, wt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, jt = {
  ...wt,
  transform: (t) => Q(0, 1, t)
}, Zt = {
  ...wt,
  default: 1
}, Rt = (t) => Math.round(t * 1e5) / 1e5, dn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function sr(t) {
  return t == null;
}
const ar = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, fn = (t, e) => (n) => !!(typeof n == "string" && ar.test(n) && n.startsWith(t) || e && !sr(n) && Object.prototype.hasOwnProperty.call(n, e)), gs = (t, e, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, r, a, o] = i.match(dn);
  return {
    [t]: parseFloat(s),
    [e]: parseFloat(r),
    [n]: parseFloat(a),
    alpha: o !== void 0 ? parseFloat(o) : 1
  };
}, rr = (t) => Q(0, 255, t), me = {
  ...wt,
  transform: (t) => Math.round(rr(t))
}, lt = {
  test: /* @__PURE__ */ fn("rgb", "red"),
  parse: /* @__PURE__ */ gs("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: i = 1 }) => "rgba(" + me.transform(t) + ", " + me.transform(e) + ", " + me.transform(n) + ", " + Rt(jt.transform(i)) + ")"
};
function or(t) {
  let e = "", n = "", i = "", s = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), i = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), i = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, i += i, s += s), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Ve = {
  test: /* @__PURE__ */ fn("#"),
  parse: or,
  transform: lt.transform
}, Gt = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), et = /* @__PURE__ */ Gt("deg"), J = /* @__PURE__ */ Gt("%"), S = /* @__PURE__ */ Gt("px"), lr = /* @__PURE__ */ Gt("vh"), cr = /* @__PURE__ */ Gt("vw"), Nn = {
  ...J,
  parse: (t) => J.parse(t) / 100,
  transform: (t) => J.transform(t * 100)
}, gt = {
  test: /* @__PURE__ */ fn("hsl", "hue"),
  parse: /* @__PURE__ */ gs("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + J.transform(Rt(e)) + ", " + J.transform(Rt(n)) + ", " + Rt(jt.transform(i)) + ")"
}, D = {
  test: (t) => lt.test(t) || Ve.test(t) || gt.test(t),
  parse: (t) => lt.test(t) ? lt.parse(t) : gt.test(t) ? gt.parse(t) : Ve.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? lt.transform(t) : gt.transform(t),
  getAnimatableNone: (t) => {
    const e = D.parse(t);
    return e.alpha = 0, D.transform(e);
  }
}, dr = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function fr(t) {
  return isNaN(t) && typeof t == "string" && (t.match(dn)?.length || 0) + (t.match(dr)?.length || 0) > 0;
}
const ms = "number", ys = "color", ur = "var", pr = "var(", Fn = "${}", hr = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function zt(t) {
  const e = t.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let r = 0;
  const o = e.replace(hr, (d) => (D.test(d) ? (i.color.push(r), s.push(ys), n.push(D.parse(d))) : d.startsWith(pr) ? (i.var.push(r), s.push(ur), n.push(d)) : (i.number.push(r), s.push(ms), n.push(parseFloat(d))), ++r, Fn)).split(Fn);
  return { values: n, split: o, indexes: i, types: s };
}
function bs(t) {
  return zt(t).values;
}
function xs(t) {
  const { split: e, types: n } = zt(t), i = e.length;
  return (s) => {
    let r = "";
    for (let a = 0; a < i; a++)
      if (r += e[a], s[a] !== void 0) {
        const o = n[a];
        o === ms ? r += Rt(s[a]) : o === ys ? r += D.transform(s[a]) : r += s[a];
      }
    return r;
  };
}
const gr = (t) => typeof t == "number" ? 0 : D.test(t) ? D.getAnimatableNone(t) : t;
function mr(t) {
  const e = bs(t);
  return xs(t)(e.map(gr));
}
const it = {
  test: fr,
  parse: bs,
  createTransformer: xs,
  getAnimatableNone: mr
};
function ye(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function yr({ hue: t, saturation: e, lightness: n, alpha: i }) {
  t /= 360, e /= 100, n /= 100;
  let s = 0, r = 0, a = 0;
  if (!e)
    s = r = a = n;
  else {
    const o = n < 0.5 ? n * (1 + e) : n + e - n * e, d = 2 * n - o;
    s = ye(d, o, t + 1 / 3), r = ye(d, o, t), a = ye(d, o, t - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(r * 255),
    blue: Math.round(a * 255),
    alpha: i
  };
}
function se(t, e) {
  return (n) => n > 0 ? e : t;
}
const k = (t, e, n) => t + (e - t) * n, be = (t, e, n) => {
  const i = t * t, s = n * (e * e - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, br = [Ve, lt, gt], xr = (t) => br.find((e) => e.test(t));
function In(t) {
  const e = xr(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === gt && (n = yr(n)), n;
}
const On = (t, e) => {
  const n = In(t), i = In(e);
  if (!n || !i)
    return se(t, e);
  const s = { ...n };
  return (r) => (s.red = be(n.red, i.red, r), s.green = be(n.green, i.green, r), s.blue = be(n.blue, i.blue, r), s.alpha = k(n.alpha, i.alpha, r), lt.transform(s));
}, Me = /* @__PURE__ */ new Set(["none", "hidden"]);
function vr(t, e) {
  return Me.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function Tr(t, e) {
  return (n) => k(t, e, n);
}
function un(t) {
  return typeof t == "number" ? Tr : typeof t == "string" ? cn(t) ? se : D.test(t) ? On : Ar : Array.isArray(t) ? vs : typeof t == "object" ? D.test(t) ? On : _r : se;
}
function vs(t, e) {
  const n = [...t], i = n.length, s = t.map((r, a) => un(r)(r, e[a]));
  return (r) => {
    for (let a = 0; a < i; a++)
      n[a] = s[a](r);
    return n;
  };
}
function _r(t, e) {
  const n = { ...t, ...e }, i = {};
  for (const s in n)
    t[s] !== void 0 && e[s] !== void 0 && (i[s] = un(t[s])(t[s], e[s]));
  return (s) => {
    for (const r in i)
      n[r] = i[r](s);
    return n;
  };
}
function Sr(t, e) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < e.values.length; s++) {
    const r = e.types[s], a = t.indexes[r][i[r]], o = t.values[a] ?? 0;
    n[s] = o, i[r]++;
  }
  return n;
}
const Ar = (t, e) => {
  const n = it.createTransformer(e), i = zt(t), s = zt(e);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? Me.has(t) && !s.values.length || Me.has(e) && !i.values.length ? vr(t, e) : Ht(vs(Sr(i, s), s.values), n) : se(t, e);
};
function Ts(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? k(t, e, n) : un(t)(t, e);
}
const wr = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => C.update(e, n),
    stop: () => nt(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => L.isProcessing ? L.timestamp : z.now()
  };
}, _s = (t, e, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < s; r++)
    i += Math.round(t(r / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, ae = 2e4;
function pn(t) {
  let e = 0;
  const n = 50;
  let i = t.next(e);
  for (; !i.done && e < ae; )
    e += n, i = t.next(e);
  return e >= ae ? 1 / 0 : e;
}
function Pr(t, e = 100, n) {
  const i = n({ ...t, keyframes: [0, e] }), s = Math.min(pn(i), ae);
  return {
    type: "keyframes",
    ease: (r) => i.next(s * r).value / e,
    duration: /* @__PURE__ */ G(s)
  };
}
const Br = 5;
function Ss(t, e, n) {
  const i = Math.max(e - Br, 0);
  return ns(n - t(i), e - i);
}
const V = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, xe = 1e-3;
function Cr({ duration: t = V.duration, bounce: e = V.bounce, velocity: n = V.velocity, mass: i = V.mass }) {
  let s, r, a = 1 - e;
  a = Q(V.minDamping, V.maxDamping, a), t = Q(V.minDuration, V.maxDuration, /* @__PURE__ */ G(t)), a < 1 ? (s = (c) => {
    const l = c * a, u = l * t, p = l - n, g = De(c, a), m = Math.exp(-u);
    return xe - p / g * m;
  }, r = (c) => {
    const u = c * a * t, p = u * n + n, g = Math.pow(a, 2) * Math.pow(c, 2) * t, m = Math.exp(-u), T = De(Math.pow(c, 2), a);
    return (-s(c) + xe > 0 ? -1 : 1) * ((p - g) * m) / T;
  }) : (s = (c) => {
    const l = Math.exp(-c * t), u = (c - n) * t + 1;
    return -xe + l * u;
  }, r = (c) => {
    const l = Math.exp(-c * t), u = (n - c) * (t * t);
    return l * u;
  });
  const o = 5 / t, d = Vr(s, r, o);
  if (t = /* @__PURE__ */ Z(t), isNaN(d))
    return {
      stiffness: V.stiffness,
      damping: V.damping,
      duration: t
    };
  {
    const c = Math.pow(d, 2) * i;
    return {
      stiffness: c,
      damping: a * 2 * Math.sqrt(i * c),
      duration: t
    };
  }
}
const kr = 12;
function Vr(t, e, n) {
  let i = n;
  for (let s = 1; s < kr; s++)
    i = i - t(i) / e(i);
  return i;
}
function De(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Mr = ["duration", "bounce"], Dr = ["stiffness", "damping", "mass"];
function jn(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Er(t) {
  let e = {
    velocity: V.velocity,
    stiffness: V.stiffness,
    damping: V.damping,
    mass: V.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!jn(t, Dr) && jn(t, Mr))
    if (t.visualDuration) {
      const n = t.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, r = 2 * Q(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
      e = {
        ...e,
        mass: V.mass,
        stiffness: s,
        damping: r
      };
    } else {
      const n = Cr(t);
      e = {
        ...e,
        ...n,
        mass: V.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function re(t = V.visualDuration, e = V.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: i, restDelta: s } = n;
  const r = n.keyframes[0], a = n.keyframes[n.keyframes.length - 1], o = { done: !1, value: r }, { stiffness: d, damping: c, mass: l, duration: u, velocity: p, isResolvedFromDuration: g } = Er({
    ...n,
    velocity: -/* @__PURE__ */ G(n.velocity || 0)
  }), m = p || 0, T = c / (2 * Math.sqrt(d * l)), v = a - r, y = /* @__PURE__ */ G(Math.sqrt(d / l)), _ = Math.abs(v) < 5;
  i || (i = _ ? V.restSpeed.granular : V.restSpeed.default), s || (s = _ ? V.restDelta.granular : V.restDelta.default);
  let x;
  if (T < 1) {
    const A = De(y, T);
    x = (B) => {
      const E = Math.exp(-T * y * B);
      return a - E * ((m + T * y * v) / A * Math.sin(A * B) + v * Math.cos(A * B));
    };
  } else if (T === 1)
    x = (A) => a - Math.exp(-y * A) * (v + (m + y * v) * A);
  else {
    const A = y * Math.sqrt(T * T - 1);
    x = (B) => {
      const E = Math.exp(-T * y * B), w = Math.min(A * B, 300);
      return a - E * ((m + T * y * v) * Math.sinh(w) + A * v * Math.cosh(w)) / A;
    };
  }
  const P = {
    calculatedDuration: g && u || null,
    next: (A) => {
      const B = x(A);
      if (g)
        o.done = A >= u;
      else {
        let E = A === 0 ? m : 0;
        T < 1 && (E = A === 0 ? /* @__PURE__ */ Z(m) : Ss(x, A, B));
        const w = Math.abs(E) <= i, I = Math.abs(a - B) <= s;
        o.done = w && I;
      }
      return o.value = o.done ? a : B, o;
    },
    toString: () => {
      const A = Math.min(pn(P), ae), B = _s((E) => P.next(A * E).value, A, 30);
      return A + "ms " + B;
    },
    toTransition: () => {
    }
  };
  return P;
}
re.applyToOptions = (t) => {
  const e = Pr(t, 100, re);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ Z(e.duration), t.type = "keyframes", t;
};
function Ee({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: r = 500, modifyTarget: a, min: o, max: d, restDelta: c = 0.5, restSpeed: l }) {
  const u = t[0], p = {
    done: !1,
    value: u
  }, g = (w) => o !== void 0 && w < o || d !== void 0 && w > d, m = (w) => o === void 0 ? d : d === void 0 || Math.abs(o - w) < Math.abs(d - w) ? o : d;
  let T = n * e;
  const v = u + T, y = a === void 0 ? v : a(v);
  y !== v && (T = y - u);
  const _ = (w) => -T * Math.exp(-w / i), x = (w) => y + _(w), P = (w) => {
    const I = _(w), U = x(w);
    p.done = Math.abs(I) <= c, p.value = p.done ? y : U;
  };
  let A, B;
  const E = (w) => {
    g(p.value) && (A = w, B = re({
      keyframes: [p.value, m(p.value)],
      velocity: Ss(x, w, p.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: r,
      restDelta: c,
      restSpeed: l
    }));
  };
  return E(0), {
    calculatedDuration: null,
    next: (w) => {
      let I = !1;
      return !B && A === void 0 && (I = !0, P(w), E(w)), A !== void 0 && w >= A ? B.next(w - A) : (!I && P(w), p);
    }
  };
}
function Rr(t, e, n) {
  const i = [], s = n || tt.mix || Ts, r = t.length - 1;
  for (let a = 0; a < r; a++) {
    let o = s(t[a], t[a + 1]);
    if (e) {
      const d = Array.isArray(e) ? e[a] || Y : e;
      o = Ht(d, o);
    }
    i.push(o);
  }
  return i;
}
function Lr(t, e, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const r = t.length;
  if (nn(r === e.length), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const a = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const o = Rr(e, i, s), d = o.length, c = (l) => {
    if (a && l < t[0])
      return e[0];
    let u = 0;
    if (d > 1)
      for (; u < t.length - 2 && !(l < t[u + 1]); u++)
        ;
    const p = /* @__PURE__ */ Ot(t[u], t[u + 1], l);
    return o[u](p);
  };
  return n ? (l) => c(Q(t[0], t[r - 1], l)) : c;
}
function Nr(t, e) {
  const n = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const s = /* @__PURE__ */ Ot(0, e, i);
    t.push(k(n, 1, s));
  }
}
function Fr(t) {
  const e = [0];
  return Nr(e, t.length - 1), e;
}
function Ir(t, e) {
  return t.map((n) => n * e);
}
function Or(t, e) {
  return t.map(() => e || fs).splice(0, t.length - 1);
}
function Lt({ duration: t = 300, keyframes: e, times: n, ease: i = "easeInOut" }) {
  const s = qa(i) ? i.map(Ln) : Ln(i), r = {
    done: !1,
    value: e[0]
  }, a = Ir(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : Fr(e),
    t
  ), o = Lr(a, e, {
    ease: Array.isArray(s) ? s : Or(e, s)
  });
  return {
    calculatedDuration: t,
    next: (d) => (r.value = o(d), r.done = d >= t, r)
  };
}
const jr = (t) => t !== null;
function hn(t, { repeat: e, repeatType: n = "loop" }, i, s = 1) {
  const r = t.filter(jr), o = s < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !o || i === void 0 ? r[o] : i;
}
const zr = {
  decay: Ee,
  inertia: Ee,
  tween: Lt,
  keyframes: Lt,
  spring: re
};
function As(t) {
  typeof t.type == "string" && (t.type = zr[t.type]);
}
class gn {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const Wr = (t) => t / 100;
class mn extends gn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== z.now() && this.tick(z.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    As(e);
    const { type: n = Lt, repeat: i = 0, repeatDelay: s = 0, repeatType: r, velocity: a = 0 } = e;
    let { keyframes: o } = e;
    const d = n || Lt;
    d !== Lt && typeof o[0] != "number" && (this.mixKeyframes = Ht(Wr, Ts(o[0], o[1])), o = [0, 100]);
    const c = d({ ...e, keyframes: o });
    r === "mirror" && (this.mirroredGenerator = d({
      ...e,
      keyframes: [...o].reverse(),
      velocity: -a
    })), c.calculatedDuration === null && (c.calculatedDuration = pn(c));
    const { calculatedDuration: l } = c;
    this.calculatedDuration = l, this.resolvedDuration = l + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = c;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: r, mirroredGenerator: a, resolvedDuration: o, calculatedDuration: d } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: c = 0, keyframes: l, repeat: u, repeatType: p, repeatDelay: g, type: m, onUpdate: T, finalKeyframe: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - s / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const y = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), _ = this.playbackSpeed >= 0 ? y < 0 : y > s;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let x = this.currentTime, P = i;
    if (u) {
      const w = Math.min(this.currentTime, s) / o;
      let I = Math.floor(w), U = w % 1;
      !U && w >= 1 && (U = 1), U === 1 && I--, I = Math.min(I, u + 1), !!(I % 2) && (p === "reverse" ? (U = 1 - U, g && (U -= g / o)) : p === "mirror" && (P = a)), x = Q(0, 1, U) * o;
    }
    const A = _ ? { done: !1, value: l[0] } : P.next(x);
    r && (A.value = r(A.value));
    let { done: B } = A;
    !_ && d !== null && (B = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const E = this.holdTime === null && (this.state === "finished" || this.state === "running" && B);
    return E && m !== Ee && (A.value = hn(l, this.options, v, this.speed)), T && T(A.value), E && this.finish(), A;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ G(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ G(e);
  }
  get time() {
    return /* @__PURE__ */ G(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ Z(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(z.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ G(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = wr, startTime: n } = this.options;
    this.driver || (this.driver = e((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(z.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
  }
}
function Ur(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const ct = (t) => t * 180 / Math.PI, Re = (t) => {
  const e = ct(Math.atan2(t[1], t[0]));
  return Le(e);
}, $r = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Re,
  rotateZ: Re,
  skewX: (t) => ct(Math.atan(t[1])),
  skewY: (t) => ct(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Le = (t) => (t = t % 360, t < 0 && (t += 360), t), zn = Re, Wn = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Un = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Hr = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Wn,
  scaleY: Un,
  scale: (t) => (Wn(t) + Un(t)) / 2,
  rotateX: (t) => Le(ct(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Le(ct(Math.atan2(-t[2], t[0]))),
  rotateZ: zn,
  rotate: zn,
  skewX: (t) => ct(Math.atan(t[4])),
  skewY: (t) => ct(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Ne(t) {
  return t.includes("scale") ? 1 : 0;
}
function Fe(t, e) {
  if (!t || t === "none")
    return Ne(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = Hr, s = n;
  else {
    const o = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = $r, s = o;
  }
  if (!s)
    return Ne(e);
  const r = i[e], a = s[1].split(",").map(Gr);
  return typeof r == "function" ? r(a) : a[r];
}
const Kr = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return Fe(n, e);
};
function Gr(t) {
  return parseFloat(t.trim());
}
const Pt = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Bt = new Set(Pt), $n = (t) => t === wt || t === S, Yr = /* @__PURE__ */ new Set(["x", "y", "z"]), Xr = Pt.filter((t) => !Yr.has(t));
function qr(t) {
  const e = [];
  return Xr.forEach((n) => {
    const i = t.getValue(n);
    i !== void 0 && (e.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const dt = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => Fe(e, "x"),
  y: (t, { transform: e }) => Fe(e, "y")
};
dt.translateX = dt.x;
dt.translateY = dt.y;
const ft = /* @__PURE__ */ new Set();
let Ie = !1, Oe = !1, je = !1;
function ws() {
  if (Oe) {
    const t = Array.from(ft).filter((i) => i.needsMeasurement), e = new Set(t.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    e.forEach((i) => {
      const s = qr(i);
      s.length && (n.set(i, s), i.render());
    }), t.forEach((i) => i.measureInitialState()), e.forEach((i) => {
      i.render();
      const s = n.get(i);
      s && s.forEach(([r, a]) => {
        i.getValue(r)?.set(a);
      });
    }), t.forEach((i) => i.measureEndState()), t.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  Oe = !1, Ie = !1, ft.forEach((t) => t.complete(je)), ft.clear();
}
function Ps() {
  ft.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Oe = !0);
  });
}
function Zr() {
  je = !0, Ps(), ws(), je = !1;
}
class yn {
  constructor(e, n, i, s, r, a = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = i, this.motionValue = s, this.element = r, this.isAsync = a;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ft.add(this), Ie || (Ie = !0, C.read(Ps), C.resolveKeyframes(ws))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: i, motionValue: s } = this;
    if (e[0] === null) {
      const r = s?.get(), a = e[e.length - 1];
      if (r !== void 0)
        e[0] = r;
      else if (i && n) {
        const o = i.readValue(n, a);
        o != null && (e[0] = o);
      }
      e[0] === void 0 && (e[0] = a), s && r === void 0 && s.set(e[0]);
    }
    Ur(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ft.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ft.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Jr = (t) => t.startsWith("--");
function Qr(t, e, n) {
  Jr(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const to = /* @__PURE__ */ sn(() => window.ScrollTimeline !== void 0), eo = {};
function no(t, e) {
  const n = /* @__PURE__ */ sn(t);
  return () => eo[e] ?? n();
}
const Bs = /* @__PURE__ */ no(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Dt = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`, Hn = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Dt([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Dt([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Dt([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Dt([0.33, 1.53, 0.69, 0.99])
};
function Cs(t, e) {
  if (t)
    return typeof t == "function" ? Bs() ? _s(t, e) : "ease-out" : us(t) ? Dt(t) : Array.isArray(t) ? t.map((n) => Cs(n, e) || Hn.easeOut) : Hn[t];
}
function io(t, e, n, { delay: i = 0, duration: s = 300, repeat: r = 0, repeatType: a = "loop", ease: o = "easeOut", times: d } = {}, c = void 0) {
  const l = {
    [e]: n
  };
  d && (l.offset = d);
  const u = Cs(o, s);
  Array.isArray(u) && (l.easing = u);
  const p = {
    delay: i,
    duration: s,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: r + 1,
    direction: a === "reverse" ? "alternate" : "normal"
  };
  return c && (p.pseudoElement = c), t.animate(l, p);
}
function ks(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function so({ type: t, ...e }) {
  return ks(t) && Bs() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class ao extends gn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !e)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: r, allowFlatten: a = !1, finalKeyframe: o, onComplete: d } = e;
    this.isPseudoElement = !!r, this.allowFlatten = a, this.options = e, nn(typeof e.type != "string");
    const c = so(e);
    this.animation = io(n, i, s, c, r), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const l = hn(s, this.options, o, this.speed);
        this.updateMotionValue ? this.updateMotionValue(l) : Qr(n, i, l), this.animation.cancel();
      }
      d?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ G(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ G(e);
  }
  get time() {
    return /* @__PURE__ */ G(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Z(e);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(e) {
    this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, observe: n }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && to() ? (this.animation.timeline = e, Y) : n(this);
  }
}
const Vs = {
  anticipate: ls,
  backInOut: os,
  circInOut: ds
};
function ro(t) {
  return t in Vs;
}
function oo(t) {
  typeof t.ease == "string" && ro(t.ease) && (t.ease = Vs[t.ease]);
}
const Kn = 10;
class lo extends ao {
  constructor(e) {
    oo(e), As(e), super(e), e.startTime && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: i, onComplete: s, element: r, ...a } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const o = new mn({
      ...a,
      autoplay: !1
    }), d = /* @__PURE__ */ Z(this.finishedTime ?? this.time);
    n.setWithVelocity(o.sample(d - Kn).value, o.sample(d).value, Kn), o.stop();
  }
}
const Gn = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(it.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function co(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function fo(t, e, n, i) {
  const s = t[0];
  if (s === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], a = Gn(s, e), o = Gn(r, e);
  return !a || !o ? !1 : co(t) || (n === "spring" || ks(n)) && i;
}
function ze(t) {
  t.duration = 0, t.type = "keyframes";
}
const uo = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), po = /* @__PURE__ */ sn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function ho(t) {
  const { motionValue: e, name: n, repeatDelay: i, repeatType: s, damping: r, type: a } = t;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: d, transformTemplate: c } = e.owner.getProps();
  return po() && n && uo.has(n) && (n !== "transform" || !c) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !d && !i && s !== "mirror" && r !== 0 && a !== "inertia";
}
const go = 40;
class mo extends gn {
  constructor({ autoplay: e = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: r = 0, repeatType: a = "loop", keyframes: o, name: d, motionValue: c, element: l, ...u }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = z.now();
    const p = {
      autoplay: e,
      delay: n,
      type: i,
      repeat: s,
      repeatDelay: r,
      repeatType: a,
      name: d,
      motionValue: c,
      element: l,
      ...u
    }, g = l?.KeyframeResolver || yn;
    this.keyframeResolver = new g(o, (m, T, v) => this.onKeyframesResolved(m, T, p, !v), d, c, l), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: r, type: a, velocity: o, delay: d, isHandoff: c, onUpdate: l } = i;
    this.resolvedAt = z.now(), fo(e, r, a, o) || ((tt.instantAnimations || !d) && l?.(hn(e, i, n)), e[0] = e[e.length - 1], ze(i), i.repeat = 0);
    const p = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > go ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: e
    }, g = !c && ho(p) ? new lo({
      ...p,
      element: p.motionValue.owner.current
    }) : new mn(p);
    g.finished.then(() => this.notifyFinished()).catch(Y), this.pendingTimeline && (this.stopTimeline = g.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = g;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Zr()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
const yo = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function bo(t) {
  const e = yo.exec(t);
  if (!e)
    return [,];
  const [, n, i, s] = e;
  return [`--${n ?? i}`, s];
}
function Ms(t, e, n = 1) {
  const [i, s] = bo(t);
  if (!i)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(i);
  if (r) {
    const a = r.trim();
    return Qi(a) ? parseFloat(a) : a;
  }
  return cn(s) ? Ms(s, e, n + 1) : s;
}
function bn(t, e) {
  return t?.[e] ?? t?.default ?? t;
}
const Ds = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Pt
]), xo = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Es = (t) => (e) => e.test(t), Rs = [wt, S, J, et, cr, lr, xo], Yn = (t) => Rs.find(Es(t));
function vo(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || es(t) : !0;
}
const To = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function _o(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [i] = n.match(dn) || [];
  if (!i)
    return t;
  const s = n.replace(i, "");
  let r = To.has(e) ? 1 : 0;
  return i !== n && (r *= 100), e + "(" + r + s + ")";
}
const So = /\b([a-z-]*)\(.*?\)/gu, We = {
  ...it,
  getAnimatableNone: (t) => {
    const e = t.match(So);
    return e ? e.map(_o).join(" ") : t;
  }
}, Xn = {
  ...wt,
  transform: Math.round
}, Ao = {
  rotate: et,
  rotateX: et,
  rotateY: et,
  rotateZ: et,
  scale: Zt,
  scaleX: Zt,
  scaleY: Zt,
  scaleZ: Zt,
  skew: et,
  skewX: et,
  skewY: et,
  distance: S,
  translateX: S,
  translateY: S,
  translateZ: S,
  x: S,
  y: S,
  z: S,
  perspective: S,
  transformPerspective: S,
  opacity: jt,
  originX: Nn,
  originY: Nn,
  originZ: S
}, xn = {
  // Border props
  borderWidth: S,
  borderTopWidth: S,
  borderRightWidth: S,
  borderBottomWidth: S,
  borderLeftWidth: S,
  borderRadius: S,
  radius: S,
  borderTopLeftRadius: S,
  borderTopRightRadius: S,
  borderBottomRightRadius: S,
  borderBottomLeftRadius: S,
  // Positioning props
  width: S,
  maxWidth: S,
  height: S,
  maxHeight: S,
  top: S,
  right: S,
  bottom: S,
  left: S,
  // Spacing props
  padding: S,
  paddingTop: S,
  paddingRight: S,
  paddingBottom: S,
  paddingLeft: S,
  margin: S,
  marginTop: S,
  marginRight: S,
  marginBottom: S,
  marginLeft: S,
  // Misc
  backgroundPositionX: S,
  backgroundPositionY: S,
  ...Ao,
  zIndex: Xn,
  // SVG
  fillOpacity: jt,
  strokeOpacity: jt,
  numOctaves: Xn
}, wo = {
  ...xn,
  // Color props
  color: D,
  backgroundColor: D,
  outlineColor: D,
  fill: D,
  stroke: D,
  // Border props
  borderColor: D,
  borderTopColor: D,
  borderRightColor: D,
  borderBottomColor: D,
  borderLeftColor: D,
  filter: We,
  WebkitFilter: We
}, Ls = (t) => wo[t];
function Ns(t, e) {
  let n = Ls(t);
  return n !== We && (n = it), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Po = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Bo(t, e, n) {
  let i = 0, s;
  for (; i < t.length && !s; ) {
    const r = t[i];
    typeof r == "string" && !Po.has(r) && zt(r).values.length && (s = t[i]), i++;
  }
  if (s && n)
    for (const r of e)
      t[r] = Ns(n, s);
}
class Co extends yn {
  constructor(e, n, i, s, r) {
    super(e, n, i, s, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let d = 0; d < e.length; d++) {
      let c = e[d];
      if (typeof c == "string" && (c = c.trim(), cn(c))) {
        const l = Ms(c, n.current);
        l !== void 0 && (e[d] = l), d === e.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !Ds.has(i) || e.length !== 2)
      return;
    const [s, r] = e, a = Yn(s), o = Yn(r);
    if (a !== o)
      if ($n(a) && $n(o))
        for (let d = 0; d < e.length; d++) {
          const c = e[d];
          typeof c == "string" && (e[d] = parseFloat(c));
        }
      else dt[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, i = [];
    for (let s = 0; s < e.length; s++)
      (e[s] === null || vo(e[s])) && i.push(s);
    i.length && Bo(e, i, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: i } = this;
    if (!e || !e.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = dt[i](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && e.getValue(i, s).jump(s, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: i } = this;
    if (!e || !e.current)
      return;
    const s = e.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const r = i.length - 1, a = i[r];
    i[r] = dt[n](e.measureViewportBox(), window.getComputedStyle(e.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([o, d]) => {
      e.getValue(o).set(d);
    }), this.resolveNoneKeyframes();
  }
}
function Fs(t, e, n) {
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    const s = document.querySelectorAll(t);
    return s ? Array.from(s) : [];
  }
  return Array.from(t);
}
const Is = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function ko(t) {
  return ts(t) && "offsetHeight" in t;
}
const qn = 30, Vo = (t) => !isNaN(parseFloat(t));
class Mo {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = z.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const r of this.dependents)
          r.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = z.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Vo(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new an());
    const i = this.events[e].add(n);
    return e === "change" ? () => {
      i(), C.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = z.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > qn)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, qn);
    return ns(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function _t(t, e) {
  return new Mo(t, e);
}
const { schedule: vn } = /* @__PURE__ */ ps(queueMicrotask, !1), X = {
  x: !1,
  y: !1
};
function Os() {
  return X.x || X.y;
}
function Do(t) {
  return t === "x" || t === "y" ? X[t] ? null : (X[t] = !0, () => {
    X[t] = !1;
  }) : X.x || X.y ? null : (X.x = X.y = !0, () => {
    X.x = X.y = !1;
  });
}
function js(t, e) {
  const n = Fs(t), i = new AbortController(), s = {
    passive: !0,
    ...e,
    signal: i.signal
  };
  return [n, s, () => i.abort()];
}
function Zn(t) {
  return !(t.pointerType === "touch" || Os());
}
function Eo(t, e, n = {}) {
  const [i, s, r] = js(t, n), a = (o) => {
    if (!Zn(o))
      return;
    const { target: d } = o, c = e(d, o);
    if (typeof c != "function" || !d)
      return;
    const l = (u) => {
      Zn(u) && (c(u), d.removeEventListener("pointerleave", l));
    };
    d.addEventListener("pointerleave", l, s);
  };
  return i.forEach((o) => {
    o.addEventListener("pointerenter", a, s);
  }), r;
}
const zs = (t, e) => e ? t === e ? !0 : zs(t, e.parentElement) : !1, Tn = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Ro = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Lo(t) {
  return Ro.has(t.tagName) || t.tabIndex !== -1;
}
const te = /* @__PURE__ */ new WeakSet();
function Jn(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function ve(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const No = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const i = Jn(() => {
    if (te.has(n))
      return;
    ve(n, "down");
    const s = Jn(() => {
      ve(n, "up");
    }), r = () => ve(n, "cancel");
    n.addEventListener("keyup", s, e), n.addEventListener("blur", r, e);
  });
  n.addEventListener("keydown", i, e), n.addEventListener("blur", () => n.removeEventListener("keydown", i), e);
};
function Qn(t) {
  return Tn(t) && !Os();
}
function Fo(t, e, n = {}) {
  const [i, s, r] = js(t, n), a = (o) => {
    const d = o.currentTarget;
    if (!Qn(o))
      return;
    te.add(d);
    const c = e(d, o), l = (g, m) => {
      window.removeEventListener("pointerup", u), window.removeEventListener("pointercancel", p), te.has(d) && te.delete(d), Qn(g) && typeof c == "function" && c(g, { success: m });
    }, u = (g) => {
      l(g, d === window || d === document || n.useGlobalTarget || zs(d, g.target));
    }, p = (g) => {
      l(g, !1);
    };
    window.addEventListener("pointerup", u, s), window.addEventListener("pointercancel", p, s);
  };
  return i.forEach((o) => {
    (n.useGlobalTarget ? window : o).addEventListener("pointerdown", a, s), ko(o) && (o.addEventListener("focus", (c) => No(c, s)), !Lo(o) && !o.hasAttribute("tabindex") && (o.tabIndex = 0));
  }), r;
}
function Ws(t) {
  return ts(t) && "ownerSVGElement" in t;
}
function Io(t) {
  return Ws(t) && t.tagName === "svg";
}
const N = (t) => !!(t && t.getVelocity), Oo = [...Rs, D, it], jo = (t) => Oo.find(Es(t)), Us = At({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function zo(t = !0) {
  const e = j(Qe);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: s } = e, r = Oa();
  Tt(() => {
    if (t)
      return s(r);
  }, [t]);
  const a = Zi(() => t && i && i(r), [r, i, t]);
  return !n && i ? [!1, a] : [!0];
}
const $s = At({ strict: !1 }), ti = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, St = {};
for (const t in ti)
  St[t] = {
    isEnabled: (e) => ti[t].some((n) => !!e[n])
  };
function Wo(t) {
  for (const e in t)
    St[e] = {
      ...St[e],
      ...t[e]
    };
}
const Uo = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function oe(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Uo.has(t);
}
let Hs = (t) => !oe(t);
function $o(t) {
  typeof t == "function" && (Hs = (e) => e.startsWith("on") ? !oe(e) : t(e));
}
try {
  $o(require("@emotion/is-prop-valid").default);
} catch {
}
function Ho(t, e, n) {
  const i = {};
  for (const s in t)
    s === "values" && typeof t.values == "object" || (Hs(s) || n === !0 && oe(s) || !e && !oe(s) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && s.startsWith("onDrag")) && (i[s] = t[s]);
  return i;
}
const de = /* @__PURE__ */ At({});
function fe(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Wt(t) {
  return typeof t == "string" || Array.isArray(t);
}
const _n = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Sn = ["initial", ..._n];
function ue(t) {
  return fe(t.animate) || Sn.some((e) => Wt(t[e]));
}
function Ks(t) {
  return !!(ue(t) || t.variants);
}
function Ko(t, e) {
  if (ue(t)) {
    const { initial: n, animate: i } = t;
    return {
      initial: n === !1 || Wt(n) ? n : void 0,
      animate: Wt(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function Go(t) {
  const { initial: e, animate: n } = Ko(t, j(de));
  return ce(() => ({ initial: e, animate: n }), [ei(e), ei(n)]);
}
function ei(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Ut = {};
function Yo(t) {
  for (const e in t)
    Ut[e] = t[e], ln(e) && (Ut[e].isCSSVariable = !0);
}
function Gs(t, { layout: e, layoutId: n }) {
  return Bt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Ut[t] || t === "opacity");
}
const Xo = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, qo = Pt.length;
function Zo(t, e, n) {
  let i = "", s = !0;
  for (let r = 0; r < qo; r++) {
    const a = Pt[r], o = t[a];
    if (o === void 0)
      continue;
    let d = !0;
    if (typeof o == "number" ? d = o === (a.startsWith("scale") ? 1 : 0) : d = parseFloat(o) === 0, !d || n) {
      const c = Is(o, xn[a]);
      if (!d) {
        s = !1;
        const l = Xo[a] || a;
        i += `${l}(${c}) `;
      }
      n && (e[a] = c);
    }
  }
  return i = i.trim(), n ? i = n(e, s ? "" : i) : s && (i = "none"), i;
}
function An(t, e, n) {
  const { style: i, vars: s, transformOrigin: r } = t;
  let a = !1, o = !1;
  for (const d in e) {
    const c = e[d];
    if (Bt.has(d)) {
      a = !0;
      continue;
    } else if (ln(d)) {
      s[d] = c;
      continue;
    } else {
      const l = Is(c, xn[d]);
      d.startsWith("origin") ? (o = !0, r[d] = l) : i[d] = l;
    }
  }
  if (e.transform || (a || n ? i.transform = Zo(e, t.transform, n) : i.transform && (i.transform = "none")), o) {
    const { originX: d = "50%", originY: c = "50%", originZ: l = 0 } = r;
    i.transformOrigin = `${d} ${c} ${l}`;
  }
}
const wn = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Ys(t, e, n) {
  for (const i in e)
    !N(e[i]) && !Gs(i, n) && (t[i] = e[i]);
}
function Jo({ transformTemplate: t }, e) {
  return ce(() => {
    const n = wn();
    return An(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function Qo(t, e) {
  const n = t.style || {}, i = {};
  return Ys(i, n, t), Object.assign(i, Jo(t, e)), i;
}
function tl(t, e) {
  const n = {}, i = Qo(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const el = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, nl = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function il(t, e, n = 1, i = 0, s = !0) {
  t.pathLength = 1;
  const r = s ? el : nl;
  t[r.offset] = S.transform(-i);
  const a = S.transform(e), o = S.transform(n);
  t[r.array] = `${a} ${o}`;
}
function Xs(t, {
  attrX: e,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: r = 1,
  pathOffset: a = 0,
  // This is object creation, which we try to avoid per-frame.
  ...o
}, d, c, l) {
  if (An(t, o, c), d) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: u, style: p } = t;
  u.transform && (p.transform = u.transform, delete u.transform), (p.transform || u.transformOrigin) && (p.transformOrigin = u.transformOrigin ?? "50% 50%", delete u.transformOrigin), p.transform && (p.transformBox = l?.transformBox ?? "fill-box", delete u.transformBox), e !== void 0 && (u.x = e), n !== void 0 && (u.y = n), i !== void 0 && (u.scale = i), s !== void 0 && il(u, s, r, a, !1);
}
const qs = () => ({
  ...wn(),
  attrs: {}
}), Zs = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function sl(t, e, n, i) {
  const s = ce(() => {
    const r = qs();
    return Xs(r, e, Zs(i), t.transformTemplate, t.style), {
      ...r.attrs,
      style: { ...r.style }
    };
  }, [e]);
  if (t.style) {
    const r = {};
    Ys(r, t.style, t), s.style = { ...r, ...s.style };
  }
  return s;
}
const al = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Pn(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(al.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function rl(t, e, n, { latestValues: i }, s, r = !1) {
  const o = (Pn(t) ? sl : tl)(e, i, s, t), d = Ho(e, typeof t == "string", r), c = t !== qi ? { ...d, ...o, ref: n } : {}, { children: l } = e, u = ce(() => N(l) ? l.get() : l, [l]);
  return ie(t, {
    ...c,
    children: u
  });
}
function ni(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, i) => {
    e[0][i] = n.get(), e[1][i] = n.getVelocity();
  }), e;
}
function Bn(t, e, n, i) {
  if (typeof e == "function") {
    const [s, r] = ni(i);
    e = e(n !== void 0 ? n : t.custom, s, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [s, r] = ni(i);
    e = e(n !== void 0 ? n : t.custom, s, r);
  }
  return e;
}
function ee(t) {
  return N(t) ? t.get() : t;
}
function ol({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, i, s) {
  return {
    latestValues: ll(n, i, s, t),
    renderState: e()
  };
}
function ll(t, e, n, i) {
  const s = {}, r = i(t, {});
  for (const p in r)
    s[p] = ee(r[p]);
  let { initial: a, animate: o } = t;
  const d = ue(t), c = Ks(t);
  e && c && !d && t.inherit !== !1 && (a === void 0 && (a = e.initial), o === void 0 && (o = e.animate));
  let l = n ? n.initial === !1 : !1;
  l = l || a === !1;
  const u = l ? o : a;
  if (u && typeof u != "boolean" && !fe(u)) {
    const p = Array.isArray(u) ? u : [u];
    for (let g = 0; g < p.length; g++) {
      const m = Bn(t, p[g]);
      if (m) {
        const { transitionEnd: T, transition: v, ...y } = m;
        for (const _ in y) {
          let x = y[_];
          if (Array.isArray(x)) {
            const P = l ? x.length - 1 : 0;
            x = x[P];
          }
          x !== null && (s[_] = x);
        }
        for (const _ in T)
          s[_] = T[_];
      }
    }
  }
  return s;
}
const Js = (t) => (e, n) => {
  const i = j(de), s = j(Qe), r = () => ol(t, e, i, s);
  return n ? r() : Wa(r);
};
function Cn(t, e, n) {
  const { style: i } = t, s = {};
  for (const r in i)
    (N(i[r]) || e.style && N(e.style[r]) || Gs(r, t) || n?.getValue(r)?.liveStyle !== void 0) && (s[r] = i[r]);
  return s;
}
const cl = /* @__PURE__ */ Js({
  scrapeMotionValuesFromProps: Cn,
  createRenderState: wn
});
function Qs(t, e, n) {
  const i = Cn(t, e, n);
  for (const s in t)
    if (N(t[s]) || N(e[s])) {
      const r = Pt.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[r] = t[s];
    }
  return i;
}
const dl = /* @__PURE__ */ Js({
  scrapeMotionValuesFromProps: Qs,
  createRenderState: qs
}), fl = Symbol.for("motionComponentSymbol");
function mt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function ul(t, e, n) {
  return Zi(
    (i) => {
      i && t.onMount && t.onMount(i), e && (i ? e.mount(i) : e.unmount()), n && (typeof n == "function" ? n(i) : mt(n) && (n.current = i));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [e]
  );
}
const kn = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), pl = "framerAppearId", ta = "data-" + kn(pl), ea = At({});
function hl(t, e, n, i, s) {
  const { visualElement: r } = j(de), a = j($s), o = j(Qe), d = j(Us).reducedMotion, c = Et(null);
  i = i || a.renderer, !c.current && i && (c.current = i(t, {
    visualState: e,
    parent: r,
    props: n,
    presenceContext: o,
    blockInitialAnimation: o ? o.initial === !1 : !1,
    reducedMotionConfig: d
  }));
  const l = c.current, u = j(ea);
  l && !l.projection && s && (l.type === "html" || l.type === "svg") && gl(c.current, n, s, u);
  const p = Et(!1);
  ja(() => {
    l && p.current && l.update(n, o);
  });
  const g = n[ta], m = Et(!!g && !window.MotionHandoffIsComplete?.(g) && window.MotionHasOptimisedAnimation?.(g));
  return Ua(() => {
    l && (p.current = !0, window.MotionIsMounted = !0, l.updateFeatures(), l.scheduleRenderMicrotask(), m.current && l.animationState && l.animationState.animateChanges());
  }), Tt(() => {
    l && (!m.current && l.animationState && l.animationState.animateChanges(), m.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(g);
    }), m.current = !1), l.enteringChildren = void 0);
  }), l;
}
function gl(t, e, n, i) {
  const { layoutId: s, layout: r, drag: a, dragConstraints: o, layoutScroll: d, layoutRoot: c, layoutCrossfade: l } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : na(t.parent)), t.projection.setOptions({
    layoutId: s,
    layout: r,
    alwaysMeasureLayout: !!a || o && mt(o),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof r == "string" ? r : "both",
    initialPromotionConfig: i,
    crossfade: l,
    layoutScroll: d,
    layoutRoot: c
  });
}
function na(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : na(t.parent);
}
function Te(t, { forwardMotionProps: e = !1 } = {}, n, i) {
  n && Wo(n);
  const s = Pn(t) ? dl : cl;
  function r(o, d) {
    let c;
    const l = {
      ...j(Us),
      ...o,
      layoutId: ml(o)
    }, { isStatic: u } = l, p = Go(o), g = s(o, u);
    if (!u && Je) {
      yl();
      const m = bl(l);
      c = m.MeasureLayout, p.visualElement = hl(t, g, l, i, m.ProjectionNode);
    }
    return b(de.Provider, { value: p, children: [c && p.visualElement ? h(c, { visualElement: p.visualElement, ...l }) : null, rl(t, o, ul(g, p.visualElement, d), g, u, e)] });
  }
  r.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const a = Ze(r);
  return a[fl] = t, a;
}
function ml({ layoutId: t }) {
  const e = j(Ji).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function yl(t, e) {
  j($s).strict;
}
function bl(t) {
  const { drag: e, layout: n } = St;
  if (!e && !n)
    return {};
  const i = { ...e, ...n };
  return {
    MeasureLayout: e?.isEnabled(t) || n?.isEnabled(t) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function xl(t, e) {
  if (typeof Proxy > "u")
    return Te;
  const n = /* @__PURE__ */ new Map(), i = (r, a) => Te(r, a, t, e), s = (r, a) => i(r, a);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (r, a) => a === "create" ? i : (n.has(a) || n.set(a, Te(a, void 0, t, e)), n.get(a))
  });
}
function ia({ top: t, left: e, right: n, bottom: i }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: i }
  };
}
function vl({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function Tl(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), i = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function _e(t) {
  return t === void 0 || t === 1;
}
function Ue({ scale: t, scaleX: e, scaleY: n }) {
  return !_e(t) || !_e(e) || !_e(n);
}
function ot(t) {
  return Ue(t) || sa(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function sa(t) {
  return ii(t.x) || ii(t.y);
}
function ii(t) {
  return t && t !== "0%";
}
function le(t, e, n) {
  const i = t - n, s = e * i;
  return n + s;
}
function si(t, e, n, i, s) {
  return s !== void 0 && (t = le(t, s, i)), le(t, n, i) + e;
}
function $e(t, e = 0, n = 1, i, s) {
  t.min = si(t.min, e, n, i, s), t.max = si(t.max, e, n, i, s);
}
function aa(t, { x: e, y: n }) {
  $e(t.x, e.translate, e.scale, e.originPoint), $e(t.y, n.translate, n.scale, n.originPoint);
}
const ai = 0.999999999999, ri = 1.0000000000001;
function _l(t, e, n, i = !1) {
  const s = n.length;
  if (!s)
    return;
  e.x = e.y = 1;
  let r, a;
  for (let o = 0; o < s; o++) {
    r = n[o], a = r.projectionDelta;
    const { visualElement: d } = r.options;
    d && d.props.style && d.props.style.display === "contents" || (i && r.options.layoutScroll && r.scroll && r !== r.root && bt(t, {
      x: -r.scroll.offset.x,
      y: -r.scroll.offset.y
    }), a && (e.x *= a.x.scale, e.y *= a.y.scale, aa(t, a)), i && ot(r.latestValues) && bt(t, r.latestValues));
  }
  e.x < ri && e.x > ai && (e.x = 1), e.y < ri && e.y > ai && (e.y = 1);
}
function yt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function oi(t, e, n, i, s = 0.5) {
  const r = k(t.min, t.max, s);
  $e(t, e, n, r, i);
}
function bt(t, e) {
  oi(t.x, e.x, e.scaleX, e.scale, e.originX), oi(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function ra(t, e) {
  return ia(Tl(t.getBoundingClientRect(), e));
}
function Sl(t, e, n) {
  const i = ra(t, n), { scroll: s } = e;
  return s && (yt(i.x, s.offset.x), yt(i.y, s.offset.y)), i;
}
const li = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), xt = () => ({
  x: li(),
  y: li()
}), ci = () => ({ min: 0, max: 0 }), M = () => ({
  x: ci(),
  y: ci()
}), He = { current: null }, oa = { current: !1 };
function Al() {
  if (oa.current = !0, !!Je)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => He.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      He.current = !1;
}
const wl = /* @__PURE__ */ new WeakMap();
function Pl(t, e, n) {
  for (const i in e) {
    const s = e[i], r = n[i];
    if (N(s))
      t.addValue(i, s);
    else if (N(r))
      t.addValue(i, _t(s, { owner: t }));
    else if (r !== s)
      if (t.hasValue(i)) {
        const a = t.getValue(i);
        a.liveStyle === !0 ? a.jump(s) : a.hasAnimated || a.set(s);
      } else {
        const a = t.getStaticValue(i);
        t.addValue(i, _t(a !== void 0 ? a : s, { owner: t }));
      }
  }
  for (const i in n)
    e[i] === void 0 && t.removeValue(i);
  return e;
}
const di = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Bl {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, i) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: i, reducedMotionConfig: s, blockInitialAnimation: r, visualState: a }, o = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = yn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const p = z.now();
      this.renderScheduledAt < p && (this.renderScheduledAt = p, C.render(this.render, !1, !0));
    };
    const { latestValues: d, renderState: c } = a;
    this.latestValues = d, this.baseTarget = { ...d }, this.initialValues = n.initial ? { ...d } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = i, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = s, this.options = o, this.blockInitialAnimation = !!r, this.isControllingVariants = ue(n), this.isVariantNode = Ks(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: l, ...u } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const p in u) {
      const g = u[p];
      d[p] !== void 0 && N(g) && g.set(d[p]);
    }
  }
  mount(e) {
    this.current = e, wl.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), oa.current || Al(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : He.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), nt(this.notifyUpdate), nt(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const i = Bt.has(e);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (a) => {
      this.latestValues[e] = a, this.props.onUpdate && C.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      s(), r && r(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in St) {
      const n = St[e];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[e] && s && i(this.props) && (this.features[e] = new s(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : M();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let i = 0; i < di.length; i++) {
      const s = di[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const r = "on" + s, a = e[r];
      a && (this.propEventSubscriptions[s] = this.on(s, a));
    }
    this.prevMotionValues = Pl(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const i = this.values.get(e);
    n !== i && (i && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let i = this.values.get(e);
    return i === void 0 && n !== void 0 && (i = _t(n === null ? void 0 : n, { owner: this }), this.addValue(e, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (Qi(i) || es(i)) ? i = parseFloat(i) : !jo(i) && it.test(n) && (i = Ns(e, n)), this.setBaseTarget(e, N(i) ? i.get() : i)), N(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const r = Bn(this.props, n, this.presenceContext?.custom);
      r && (i = r[e]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, e);
    return s !== void 0 && !N(s) ? s : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new an()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    vn.render(this.render);
  }
}
class la extends Bl {
  constructor() {
    super(...arguments), this.KeyframeResolver = Co;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: i }) {
    delete n[e], delete i[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    N(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function ca(t, { style: e, vars: n }, i, s) {
  const r = t.style;
  let a;
  for (a in e)
    r[a] = e[a];
  s?.applyProjectionStyles(r, i);
  for (a in n)
    r.setProperty(a, n[a]);
}
function Cl(t) {
  return window.getComputedStyle(t);
}
class kl extends la {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ca;
  }
  readValueFromInstance(e, n) {
    if (Bt.has(n))
      return this.projection?.isProjecting ? Ne(n) : Kr(e, n);
    {
      const i = Cl(e), s = (ln(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return ra(e, n);
  }
  build(e, n, i) {
    An(e, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return Cn(e, n, i);
  }
}
const da = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function Vl(t, e, n, i) {
  ca(t, e, void 0, i);
  for (const s in e.attrs)
    t.setAttribute(da.has(s) ? s : kn(s), e.attrs[s]);
}
class Ml extends la {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = M;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Bt.has(n)) {
      const i = Ls(n);
      return i && i.default || 0;
    }
    return n = da.has(n) ? n : kn(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return Qs(e, n, i);
  }
  build(e, n, i) {
    Xs(e, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(e, n, i, s) {
    Vl(e, n, i, s);
  }
  mount(e) {
    this.isSVGTag = Zs(e.tagName), super.mount(e);
  }
}
const Dl = (t, e) => Pn(t) ? new Ml(e) : new kl(e, {
  allowProjection: t !== qi
});
function vt(t, e, n) {
  const i = t.getProps();
  return Bn(i, e, n !== void 0 ? n : i.custom, t);
}
const Ke = (t) => Array.isArray(t);
function El(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, _t(n));
}
function Rl(t) {
  return Ke(t) ? t[t.length - 1] || 0 : t;
}
function Ll(t, e) {
  const n = vt(t, e);
  let { transitionEnd: i = {}, transition: s = {}, ...r } = n || {};
  r = { ...r, ...i };
  for (const a in r) {
    const o = Rl(r[a]);
    El(t, a, o);
  }
}
function Nl(t) {
  return !!(N(t) && t.add);
}
function Ge(t, e) {
  const n = t.getValue("willChange");
  if (Nl(n))
    return n.add(e);
  if (!n && tt.WillChange) {
    const i = new tt.WillChange("auto");
    t.addValue("willChange", i), i.add(e);
  }
}
function fa(t) {
  return t.props[ta];
}
const Fl = (t) => t !== null;
function Il(t, { repeat: e, repeatType: n = "loop" }, i) {
  const s = t.filter(Fl), r = e && n !== "loop" && e % 2 === 1 ? 0 : s.length - 1;
  return s[r];
}
const Ol = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, jl = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), zl = {
  type: "keyframes",
  duration: 0.8
}, Wl = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Ul = (t, { keyframes: e }) => e.length > 2 ? zl : Bt.has(t) ? t.startsWith("scale") ? jl(e[1]) : Ol : Wl;
function $l({ when: t, delay: e, delayChildren: n, staggerChildren: i, staggerDirection: s, repeat: r, repeatType: a, repeatDelay: o, from: d, elapsed: c, ...l }) {
  return !!Object.keys(l).length;
}
const Vn = (t, e, n, i = {}, s, r) => (a) => {
  const o = bn(i, t) || {}, d = o.delay || i.delay || 0;
  let { elapsed: c = 0 } = i;
  c = c - /* @__PURE__ */ Z(d);
  const l = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...o,
    delay: -c,
    onUpdate: (p) => {
      e.set(p), o.onUpdate && o.onUpdate(p);
    },
    onComplete: () => {
      a(), o.onComplete && o.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : s
  };
  $l(o) || Object.assign(l, Ul(t, l)), l.duration && (l.duration = /* @__PURE__ */ Z(l.duration)), l.repeatDelay && (l.repeatDelay = /* @__PURE__ */ Z(l.repeatDelay)), l.from !== void 0 && (l.keyframes[0] = l.from);
  let u = !1;
  if ((l.type === !1 || l.duration === 0 && !l.repeatDelay) && (ze(l), l.delay === 0 && (u = !0)), (tt.instantAnimations || tt.skipAnimations) && (u = !0, ze(l), l.delay = 0), l.allowFlatten = !o.type && !o.ease, u && !r && e.get() !== void 0) {
    const p = Il(l.keyframes, o);
    if (p !== void 0) {
      C.update(() => {
        l.onUpdate(p), l.onComplete();
      });
      return;
    }
  }
  return o.isSync ? new mn(l) : new mo(l);
};
function Hl({ protectedKeys: t, needsAnimating: e }, n) {
  const i = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, i;
}
function ua(t, e, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: r = t.getDefaultTransition(), transitionEnd: a, ...o } = e;
  i && (r = i);
  const d = [], c = s && t.animationState && t.animationState.getState()[s];
  for (const l in o) {
    const u = t.getValue(l, t.latestValues[l] ?? null), p = o[l];
    if (p === void 0 || c && Hl(c, l))
      continue;
    const g = {
      delay: n,
      ...bn(r || {}, l)
    }, m = u.get();
    if (m !== void 0 && !u.isAnimating && !Array.isArray(p) && p === m && !g.velocity)
      continue;
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const y = fa(t);
      if (y) {
        const _ = window.MotionHandoffAnimation(y, l, C);
        _ !== null && (g.startTime = _, T = !0);
      }
    }
    Ge(t, l), u.start(Vn(l, u, p, t.shouldReduceMotion && Ds.has(l) ? { type: !1 } : g, t, T));
    const v = u.animation;
    v && d.push(v);
  }
  return a && Promise.all(d).then(() => {
    C.update(() => {
      a && Ll(t, a);
    });
  }), d;
}
function pa(t, e, n, i = 0, s = 1) {
  const r = Array.from(t).sort((c, l) => c.sortNodePosition(l)).indexOf(e), a = t.size, o = (a - 1) * i;
  return typeof n == "function" ? n(r, a) : s === 1 ? r * i : o - r * i;
}
function Ye(t, e, n = {}) {
  const i = vt(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: s = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const r = i ? () => Promise.all(ua(t, i, n)) : () => Promise.resolve(), a = t.variantChildren && t.variantChildren.size ? (d = 0) => {
    const { delayChildren: c = 0, staggerChildren: l, staggerDirection: u } = s;
    return Kl(t, e, d, c, l, u, n);
  } : () => Promise.resolve(), { when: o } = s;
  if (o) {
    const [d, c] = o === "beforeChildren" ? [r, a] : [a, r];
    return d().then(() => c());
  } else
    return Promise.all([r(), a(n.delay)]);
}
function Kl(t, e, n = 0, i = 0, s = 0, r = 1, a) {
  const o = [];
  for (const d of t.variantChildren)
    d.notify("AnimationStart", e), o.push(Ye(d, e, {
      ...a,
      delay: n + (typeof i == "function" ? 0 : i) + pa(t.variantChildren, d, i, s, r)
    }).then(() => d.notify("AnimationComplete", e)));
  return Promise.all(o);
}
function Gl(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let i;
  if (Array.isArray(e)) {
    const s = e.map((r) => Ye(t, r, n));
    i = Promise.all(s);
  } else if (typeof e == "string")
    i = Ye(t, e, n);
  else {
    const s = typeof e == "function" ? vt(t, e, n.custom) : e;
    i = Promise.all(ua(t, s, n));
  }
  return i.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function ha(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
const Yl = Sn.length;
function ga(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? ga(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < Yl; n++) {
    const i = Sn[n], s = t.props[i];
    (Wt(s) || s === !1) && (e[i] = s);
  }
  return e;
}
const Xl = [..._n].reverse(), ql = _n.length;
function Zl(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: i }) => Gl(t, n, i)));
}
function Jl(t) {
  let e = Zl(t), n = fi(), i = !0;
  const s = (d) => (c, l) => {
    const u = vt(t, l, d === "exit" ? t.presenceContext?.custom : void 0);
    if (u) {
      const { transition: p, transitionEnd: g, ...m } = u;
      c = { ...c, ...m, ...g };
    }
    return c;
  };
  function r(d) {
    e = d(t);
  }
  function a(d) {
    const { props: c } = t, l = ga(t.parent) || {}, u = [], p = /* @__PURE__ */ new Set();
    let g = {}, m = 1 / 0;
    for (let v = 0; v < ql; v++) {
      const y = Xl[v], _ = n[y], x = c[y] !== void 0 ? c[y] : l[y], P = Wt(x), A = y === d ? _.isActive : null;
      A === !1 && (m = v);
      let B = x === l[y] && x !== c[y] && P;
      if (B && i && t.manuallyAnimateOnMount && (B = !1), _.protectedKeys = { ...g }, // If it isn't active and hasn't *just* been set as inactive
      !_.isActive && A === null || // If we didn't and don't have any defined prop for this animation type
      !x && !_.prevProp || // Or if the prop doesn't define an animation
      fe(x) || typeof x == "boolean")
        continue;
      const E = Ql(_.prevProp, x);
      let w = E || // If we're making this variant active, we want to always make it active
      y === d && _.isActive && !B && P || // If we removed a higher-priority variant (i is in reverse order)
      v > m && P, I = !1;
      const U = Array.isArray(x) ? x : [x];
      let ut = U.reduce(s(y), {});
      A === !1 && (ut = {});
      const { prevResolvedValues: Mn = {} } = _, Ma = {
        ...Mn,
        ...ut
      }, Dn = (R) => {
        w = !0, p.has(R) && (I = !0, p.delete(R)), _.needsAnimating[R] = !0;
        const $ = t.getValue(R);
        $ && ($.liveStyle = !1);
      };
      for (const R in Ma) {
        const $ = ut[R], at = Mn[R];
        if (g.hasOwnProperty(R))
          continue;
        let pt = !1;
        Ke($) && Ke(at) ? pt = !ha($, at) : pt = $ !== at, pt ? $ != null ? Dn(R) : p.add(R) : $ !== void 0 && p.has(R) ? Dn(R) : _.protectedKeys[R] = !0;
      }
      _.prevProp = x, _.prevResolvedValues = ut, _.isActive && (g = { ...g, ...ut }), i && t.blockInitialAnimation && (w = !1);
      const En = B && E;
      w && (!En || I) && u.push(...U.map((R) => {
        const $ = { type: y };
        if (typeof R == "string" && i && !En && t.manuallyAnimateOnMount && t.parent) {
          const { parent: at } = t, pt = vt(at, R);
          if (at.enteringChildren && pt) {
            const { delayChildren: Da } = pt.transition || {};
            $.delay = pa(at.enteringChildren, t, Da);
          }
        }
        return {
          animation: R,
          options: $
        };
      }));
    }
    if (p.size) {
      const v = {};
      if (typeof c.initial != "boolean") {
        const y = vt(t, Array.isArray(c.initial) ? c.initial[0] : c.initial);
        y && y.transition && (v.transition = y.transition);
      }
      p.forEach((y) => {
        const _ = t.getBaseTarget(y), x = t.getValue(y);
        x && (x.liveStyle = !0), v[y] = _ ?? null;
      }), u.push({ animation: v });
    }
    let T = !!u.length;
    return i && (c.initial === !1 || c.initial === c.animate) && !t.manuallyAnimateOnMount && (T = !1), i = !1, T ? e(u) : Promise.resolve();
  }
  function o(d, c) {
    if (n[d].isActive === c)
      return Promise.resolve();
    t.variantChildren?.forEach((u) => u.animationState?.setActive(d, c)), n[d].isActive = c;
    const l = a(d);
    for (const u in n)
      n[u].protectedKeys = {};
    return l;
  }
  return {
    animateChanges: a,
    setActive: o,
    setAnimateFunction: r,
    getState: () => n,
    reset: () => {
      n = fi();
    }
  };
}
function Ql(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !ha(e, t) : !1;
}
function rt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function fi() {
  return {
    animate: rt(!0),
    whileInView: rt(),
    whileHover: rt(),
    whileTap: rt(),
    whileDrag: rt(),
    whileFocus: rt(),
    exit: rt()
  };
}
class st {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
class tc extends st {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Jl(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    fe(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let ec = 0;
class nc extends st {
  constructor() {
    super(...arguments), this.id = ec++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === i)
      return;
    const s = this.node.animationState.setActive("exit", !e);
    n && !e && s.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const ic = {
  animation: {
    Feature: tc
  },
  exit: {
    Feature: nc
  }
};
function $t(t, e, n, i = { passive: !0 }) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n);
}
function Yt(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const sc = (t) => (e) => Tn(e) && t(e, Yt(e));
function Nt(t, e, n, i) {
  return $t(t, e, sc(n), i);
}
const ma = 1e-4, ac = 1 - ma, rc = 1 + ma, ya = 0.01, oc = 0 - ya, lc = 0 + ya;
function F(t) {
  return t.max - t.min;
}
function cc(t, e, n) {
  return Math.abs(t - e) <= n;
}
function ui(t, e, n, i = 0.5) {
  t.origin = i, t.originPoint = k(e.min, e.max, t.origin), t.scale = F(n) / F(e), t.translate = k(n.min, n.max, t.origin) - t.originPoint, (t.scale >= ac && t.scale <= rc || isNaN(t.scale)) && (t.scale = 1), (t.translate >= oc && t.translate <= lc || isNaN(t.translate)) && (t.translate = 0);
}
function Ft(t, e, n, i) {
  ui(t.x, e.x, n.x, i ? i.originX : void 0), ui(t.y, e.y, n.y, i ? i.originY : void 0);
}
function pi(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + F(e);
}
function dc(t, e, n) {
  pi(t.x, e.x, n.x), pi(t.y, e.y, n.y);
}
function hi(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + F(e);
}
function It(t, e, n) {
  hi(t.x, e.x, n.x), hi(t.y, e.y, n.y);
}
function K(t) {
  return [t("x"), t("y")];
}
const ba = ({ current: t }) => t ? t.ownerDocument.defaultView : null, gi = (t, e) => Math.abs(t - e);
function fc(t, e) {
  const n = gi(t.x, e.x), i = gi(t.y, e.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class xa {
  constructor(e, n, { transformPagePoint: i, contextWindow: s = window, dragSnapToOrigin: r = !1, distanceThreshold: a = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const p = Ae(this.lastMoveEventInfo, this.history), g = this.startEvent !== null, m = fc(p.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!g && !m)
        return;
      const { point: T } = p, { timestamp: v } = L;
      this.history.push({ ...T, timestamp: v });
      const { onStart: y, onMove: _ } = this.handlers;
      g || (y && y(this.lastMoveEvent, p), this.startEvent = this.lastMoveEvent), _ && _(this.lastMoveEvent, p);
    }, this.handlePointerMove = (p, g) => {
      this.lastMoveEvent = p, this.lastMoveEventInfo = Se(g, this.transformPagePoint), C.update(this.updatePoint, !0);
    }, this.handlePointerUp = (p, g) => {
      this.end();
      const { onEnd: m, onSessionEnd: T, resumeAnimation: v } = this.handlers;
      if (this.dragSnapToOrigin && v && v(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const y = Ae(p.type === "pointercancel" ? this.lastMoveEventInfo : Se(g, this.transformPagePoint), this.history);
      this.startEvent && m && m(p, y), T && T(p, y);
    }, !Tn(e))
      return;
    this.dragSnapToOrigin = r, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = a, this.contextWindow = s || window;
    const o = Yt(e), d = Se(o, this.transformPagePoint), { point: c } = d, { timestamp: l } = L;
    this.history = [{ ...c, timestamp: l }];
    const { onSessionStart: u } = n;
    u && u(e, Ae(d, this.history)), this.removeListeners = Ht(Nt(this.contextWindow, "pointermove", this.handlePointerMove), Nt(this.contextWindow, "pointerup", this.handlePointerUp), Nt(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), nt(this.updatePoint);
  }
}
function Se(t, e) {
  return e ? { point: e(t.point) } : t;
}
function mi(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Ae({ point: t }, e) {
  return {
    point: t,
    delta: mi(t, va(e)),
    offset: mi(t, uc(e)),
    velocity: pc(e, 0.1)
  };
}
function uc(t) {
  return t[0];
}
function va(t) {
  return t[t.length - 1];
}
function pc(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, i = null;
  const s = va(t);
  for (; n >= 0 && (i = t[n], !(s.timestamp - i.timestamp > /* @__PURE__ */ Z(e))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  const r = /* @__PURE__ */ G(s.timestamp - i.timestamp);
  if (r === 0)
    return { x: 0, y: 0 };
  const a = {
    x: (s.x - i.x) / r,
    y: (s.y - i.y) / r
  };
  return a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a;
}
function hc(t, { min: e, max: n }, i) {
  return e !== void 0 && t < e ? t = i ? k(e, t, i.min) : Math.max(t, e) : n !== void 0 && t > n && (t = i ? k(n, t, i.max) : Math.min(t, n)), t;
}
function yi(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function gc(t, { top: e, left: n, bottom: i, right: s }) {
  return {
    x: yi(t.x, n, s),
    y: yi(t.y, e, i)
  };
}
function bi(t, e) {
  let n = e.min - t.min, i = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, i] = [i, n]), { min: n, max: i };
}
function mc(t, e) {
  return {
    x: bi(t.x, e.x),
    y: bi(t.y, e.y)
  };
}
function yc(t, e) {
  let n = 0.5;
  const i = F(t), s = F(e);
  return s > i ? n = /* @__PURE__ */ Ot(e.min, e.max - i, t.min) : i > s && (n = /* @__PURE__ */ Ot(t.min, t.max - s, e.min)), Q(0, 1, n);
}
function bc(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const Xe = 0.35;
function xc(t = Xe) {
  return t === !1 ? t = 0 : t === !0 && (t = Xe), {
    x: xi(t, "left", "right"),
    y: xi(t, "top", "bottom")
  };
}
function xi(t, e, n) {
  return {
    min: vi(t, e),
    max: vi(t, n)
  };
}
function vi(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const vc = /* @__PURE__ */ new WeakMap();
class Tc {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = M(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const r = (u) => {
      const { dragSnapToOrigin: p } = this.getProps();
      p ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(Yt(u).point);
    }, a = (u, p) => {
      const { drag: g, dragPropagation: m, onDragStart: T } = this.getProps();
      if (g && !m && (this.openDragLock && this.openDragLock(), this.openDragLock = Do(g), !this.openDragLock))
        return;
      this.latestPointerEvent = u, this.latestPanInfo = p, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), K((y) => {
        let _ = this.getAxisMotionValue(y).get() || 0;
        if (J.test(_)) {
          const { projection: x } = this.visualElement;
          if (x && x.layout) {
            const P = x.layout.layoutBox[y];
            P && (_ = F(P) * (parseFloat(_) / 100));
          }
        }
        this.originPoint[y] = _;
      }), T && C.postRender(() => T(u, p)), Ge(this.visualElement, "transform");
      const { animationState: v } = this.visualElement;
      v && v.setActive("whileDrag", !0);
    }, o = (u, p) => {
      this.latestPointerEvent = u, this.latestPanInfo = p;
      const { dragPropagation: g, dragDirectionLock: m, onDirectionLock: T, onDrag: v } = this.getProps();
      if (!g && !this.openDragLock)
        return;
      const { offset: y } = p;
      if (m && this.currentDirection === null) {
        this.currentDirection = _c(y), this.currentDirection !== null && T && T(this.currentDirection);
        return;
      }
      this.updateAxis("x", p.point, y), this.updateAxis("y", p.point, y), this.visualElement.render(), v && v(u, p);
    }, d = (u, p) => {
      this.latestPointerEvent = u, this.latestPanInfo = p, this.stop(u, p), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, c = () => K((u) => this.getAnimationState(u) === "paused" && this.getAxisMotionValue(u).animation?.play()), { dragSnapToOrigin: l } = this.getProps();
    this.panSession = new xa(e, {
      onSessionStart: r,
      onStart: a,
      onMove: o,
      onSessionEnd: d,
      resumeAnimation: c
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: l,
      distanceThreshold: i,
      contextWindow: ba(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const i = e || this.latestPointerEvent, s = n || this.latestPanInfo, r = this.isDragging;
    if (this.cancel(), !r || !s || !i)
      return;
    const { velocity: a } = s;
    this.startAnimation(a);
    const { onDragEnd: o } = this.getProps();
    o && C.postRender(() => o(i, s));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(e, n, i) {
    const { drag: s } = this.getProps();
    if (!i || !Jt(e, s, this.currentDirection))
      return;
    const r = this.getAxisMotionValue(e);
    let a = this.originPoint[e] + i[e];
    this.constraints && this.constraints[e] && (a = hc(a, this.constraints[e], this.elastic[e])), r.set(a);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, s = this.constraints;
    e && mt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && i ? this.constraints = gc(i.layoutBox, e) : this.constraints = !1, this.elastic = xc(n), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && K((r) => {
      this.constraints !== !1 && this.getAxisMotionValue(r) && (this.constraints[r] = bc(i.layoutBox[r], this.constraints[r]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !mt(e))
      return !1;
    const i = e.current, { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const r = Sl(i, s.root, this.visualElement.getTransformPagePoint());
    let a = mc(s.layout.layoutBox, r);
    if (n) {
      const o = n(vl(a));
      this.hasMutatedConstraints = !!o, o && (a = ia(o));
    }
    return a;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: i, dragElastic: s, dragTransition: r, dragSnapToOrigin: a, onDragTransitionEnd: o } = this.getProps(), d = this.constraints || {}, c = K((l) => {
      if (!Jt(l, n, this.currentDirection))
        return;
      let u = d && d[l] || {};
      a && (u = { min: 0, max: 0 });
      const p = s ? 200 : 1e6, g = s ? 40 : 1e7, m = {
        type: "inertia",
        velocity: i ? e[l] : 0,
        bounceStiffness: p,
        bounceDamping: g,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...r,
        ...u
      };
      return this.startAxisValueAnimation(l, m);
    });
    return Promise.all(c).then(o);
  }
  startAxisValueAnimation(e, n) {
    const i = this.getAxisMotionValue(e);
    return Ge(this.visualElement, e), i.start(Vn(e, i, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    K((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    K((e) => this.getAxisMotionValue(e).animation?.pause());
  }
  getAnimationState(e) {
    return this.getAxisMotionValue(e).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`, i = this.visualElement.getProps(), s = i[n];
    return s || this.visualElement.getValue(e, (i.initial ? i.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    K((n) => {
      const { drag: i } = this.getProps();
      if (!Jt(n, i, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, r = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: a, max: o } = s.layout.layoutBox[n];
        r.set(e[n] - k(a, o, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: i } = this.visualElement;
    if (!mt(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    K((a) => {
      const o = this.getAxisMotionValue(a);
      if (o && this.constraints !== !1) {
        const d = o.get();
        s[a] = yc({ min: d, max: d }, this.constraints[a]);
      }
    });
    const { transformTemplate: r } = this.visualElement.getProps();
    this.visualElement.current.style.transform = r ? r({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), K((a) => {
      if (!Jt(a, e, null))
        return;
      const o = this.getAxisMotionValue(a), { min: d, max: c } = this.constraints[a];
      o.set(k(d, c, s[a]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    vc.set(this.visualElement, this);
    const e = this.visualElement.current, n = Nt(e, "pointerdown", (d) => {
      const { drag: c, dragListener: l = !0 } = this.getProps();
      c && l && this.start(d);
    }), i = () => {
      const { dragConstraints: d } = this.getProps();
      mt(d) && d.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, r = s.addEventListener("measure", i);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), C.read(i);
    const a = $t(window, "resize", () => this.scalePositionWithinConstraints()), o = s.addEventListener("didUpdate", (({ delta: d, hasLayoutChanged: c }) => {
      this.isDragging && c && (K((l) => {
        const u = this.getAxisMotionValue(l);
        u && (this.originPoint[l] += d[l].translate, u.set(u.get() + d[l].translate));
      }), this.visualElement.render());
    }));
    return () => {
      a(), n(), r(), o && o();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: s = !1, dragConstraints: r = !1, dragElastic: a = Xe, dragMomentum: o = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: s,
      dragConstraints: r,
      dragElastic: a,
      dragMomentum: o
    };
  }
}
function Jt(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function _c(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Sc extends st {
  constructor(e) {
    super(e), this.removeGroupControls = Y, this.removeListeners = Y, this.controls = new Tc(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Y;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Ti = (t) => (e, n) => {
  t && C.postRender(() => t(e, n));
};
class Ac extends st {
  constructor() {
    super(...arguments), this.removePointerDownListener = Y;
  }
  onPointerDown(e) {
    this.session = new xa(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: ba(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: i, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: Ti(e),
      onStart: Ti(n),
      onMove: i,
      onEnd: (r, a) => {
        delete this.session, s && C.postRender(() => s(r, a));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Nt(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const ne = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function _i(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const kt = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (S.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = _i(t, e.target.x), i = _i(t, e.target.y);
    return `${n}% ${i}%`;
  }
}, wc = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const i = t, s = it.parse(t);
    if (s.length > 5)
      return i;
    const r = it.createTransformer(t), a = typeof s[0] != "number" ? 1 : 0, o = n.x.scale * e.x, d = n.y.scale * e.y;
    s[0 + a] /= o, s[1 + a] /= d;
    const c = k(o, d, 0.5);
    return typeof s[2 + a] == "number" && (s[2 + a] /= c), typeof s[3 + a] == "number" && (s[3 + a] /= c), r(s);
  }
};
let we = !1;
class Pc extends Ia {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i, layoutId: s } = this.props, { projection: r } = e;
    Yo(Bc), r && (n.group && n.group.add(r), i && i.register && s && i.register(r), we && r.root.didUpdate(), r.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), r.setOptions({
      ...r.options,
      onExitComplete: () => this.safeToRemove()
    })), ne.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: i, drag: s, isPresent: r } = this.props, { projection: a } = i;
    return a && (a.isPresent = r, we = !0, s || e.layoutDependency !== n || n === void 0 || e.isPresent !== r ? a.willUpdate() : this.safeToRemove(), e.isPresent !== r && (r ? a.promote() : a.relegate() || C.postRender(() => {
      const o = a.getStack();
      (!o || !o.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), vn.postRender(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: s } = e;
    we = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), i && i.deregister && i.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function Ta(t) {
  const [e, n] = zo(), i = j(Ji);
  return h(Pc, { ...t, layoutGroup: i, switchLayoutGroup: j(ea), isPresent: e, safeToRemove: n });
}
const Bc = {
  borderRadius: {
    ...kt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: kt,
  borderTopRightRadius: kt,
  borderBottomLeftRadius: kt,
  borderBottomRightRadius: kt,
  boxShadow: wc
};
function Cc(t, e, n) {
  const i = N(t) ? t : _t(t);
  return i.start(Vn("", i, e, n)), i.animation;
}
const kc = (t, e) => t.depth - e.depth;
class Vc {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    tn(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    en(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(kc), this.isDirty = !1, this.children.forEach(e);
  }
}
function Mc(t, e) {
  const n = z.now(), i = ({ timestamp: s }) => {
    const r = s - n;
    r >= e && (nt(i), t(r - e));
  };
  return C.setup(i, !0), () => nt(i);
}
const _a = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Dc = _a.length, Si = (t) => typeof t == "string" ? parseFloat(t) : t, Ai = (t) => typeof t == "number" || S.test(t);
function Ec(t, e, n, i, s, r) {
  s ? (t.opacity = k(0, n.opacity ?? 1, Rc(i)), t.opacityExit = k(e.opacity ?? 1, 0, Lc(i))) : r && (t.opacity = k(e.opacity ?? 1, n.opacity ?? 1, i));
  for (let a = 0; a < Dc; a++) {
    const o = `border${_a[a]}Radius`;
    let d = wi(e, o), c = wi(n, o);
    if (d === void 0 && c === void 0)
      continue;
    d || (d = 0), c || (c = 0), d === 0 || c === 0 || Ai(d) === Ai(c) ? (t[o] = Math.max(k(Si(d), Si(c), i), 0), (J.test(c) || J.test(d)) && (t[o] += "%")) : t[o] = c;
  }
  (e.rotate || n.rotate) && (t.rotate = k(e.rotate || 0, n.rotate || 0, i));
}
function wi(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const Rc = /* @__PURE__ */ Sa(0, 0.5, cs), Lc = /* @__PURE__ */ Sa(0.5, 0.95, Y);
function Sa(t, e, n) {
  return (i) => i < t ? 0 : i > e ? 1 : n(/* @__PURE__ */ Ot(t, e, i));
}
function Pi(t, e) {
  t.min = e.min, t.max = e.max;
}
function H(t, e) {
  Pi(t.x, e.x), Pi(t.y, e.y);
}
function Bi(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
function Ci(t, e, n, i, s) {
  return t -= e, t = le(t, 1 / n, i), s !== void 0 && (t = le(t, 1 / s, i)), t;
}
function Nc(t, e = 0, n = 1, i = 0.5, s, r = t, a = t) {
  if (J.test(e) && (e = parseFloat(e), e = k(a.min, a.max, e / 100) - a.min), typeof e != "number")
    return;
  let o = k(r.min, r.max, i);
  t === r && (o -= e), t.min = Ci(t.min, e, n, o, s), t.max = Ci(t.max, e, n, o, s);
}
function ki(t, e, [n, i, s], r, a) {
  Nc(t, e[n], e[i], e[s], e.scale, r, a);
}
const Fc = ["x", "scaleX", "originX"], Ic = ["y", "scaleY", "originY"];
function Vi(t, e, n, i) {
  ki(t.x, e, Fc, n ? n.x : void 0, i ? i.x : void 0), ki(t.y, e, Ic, n ? n.y : void 0, i ? i.y : void 0);
}
function Mi(t) {
  return t.translate === 0 && t.scale === 1;
}
function Aa(t) {
  return Mi(t.x) && Mi(t.y);
}
function Di(t, e) {
  return t.min === e.min && t.max === e.max;
}
function Oc(t, e) {
  return Di(t.x, e.x) && Di(t.y, e.y);
}
function Ei(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function wa(t, e) {
  return Ei(t.x, e.x) && Ei(t.y, e.y);
}
function Ri(t) {
  return F(t.x) / F(t.y);
}
function Li(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
class jc {
  constructor() {
    this.members = [];
  }
  add(e) {
    tn(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (en(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((s) => e === s);
    if (n === 0)
      return !1;
    let i;
    for (let s = n; s >= 0; s--) {
      const r = this.members[s];
      if (r.isPresent !== !1) {
        i = r;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(e, n) {
    const i = this.lead;
    if (e !== i && (this.prevLead = i, this.lead = e, e.show(), i)) {
      i.instance && i.scheduleRender(), e.scheduleRender(), e.resumeFrom = i, n && (e.resumeFrom.preserveOpacity = !0), i.snapshot && (e.snapshot = i.snapshot, e.snapshot.latestValues = i.animationValues || i.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
      const { crossfade: s } = e.options;
      s === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: i } = e;
      n.onExitComplete && n.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function zc(t, e, n) {
  let i = "";
  const s = t.x.translate / e.x, r = t.y.translate / e.y, a = n?.z || 0;
  if ((s || r || a) && (i = `translate3d(${s}px, ${r}px, ${a}px) `), (e.x !== 1 || e.y !== 1) && (i += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: c, rotate: l, rotateX: u, rotateY: p, skewX: g, skewY: m } = n;
    c && (i = `perspective(${c}px) ${i}`), l && (i += `rotate(${l}deg) `), u && (i += `rotateX(${u}deg) `), p && (i += `rotateY(${p}deg) `), g && (i += `skewX(${g}deg) `), m && (i += `skewY(${m}deg) `);
  }
  const o = t.x.scale * e.x, d = t.y.scale * e.y;
  return (o !== 1 || d !== 1) && (i += `scale(${o}, ${d})`), i || "none";
}
const Pe = ["", "X", "Y", "Z"], Wc = 1e3;
let Uc = 0;
function Be(t, e, n, i) {
  const { latestValues: s } = e;
  s[t] && (n[t] = s[t], e.setStaticValue(t, 0), i && (i[t] = 0));
}
function Pa(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = fa(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: r } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", C, !(s || r));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && Pa(i);
}
function Ba({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: i, resetTransform: s }) {
  return class {
    constructor(a = {}, o = e?.()) {
      this.id = Uc++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(Kc), this.nodes.forEach(qc), this.nodes.forEach(Zc), this.nodes.forEach(Gc);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = a, this.root = o ? o.root || o : this, this.path = o ? [...o.path, o] : [], this.parent = o, this.depth = o ? o.depth + 1 : 0;
      for (let d = 0; d < this.path.length; d++)
        this.path[d].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Vc());
    }
    addEventListener(a, o) {
      return this.eventHandlers.has(a) || this.eventHandlers.set(a, new an()), this.eventHandlers.get(a).add(o);
    }
    notifyListeners(a, ...o) {
      const d = this.eventHandlers.get(a);
      d && d.notify(...o);
    }
    hasListeners(a) {
      return this.eventHandlers.has(a);
    }
    /**
     * Lifecycles
     */
    mount(a) {
      if (this.instance)
        return;
      this.isSVG = Ws(a) && !Io(a), this.instance = a;
      const { layoutId: o, layout: d, visualElement: c } = this.options;
      if (c && !c.current && c.mount(a), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (d || o) && (this.isLayoutDirty = !0), t) {
        let l, u = 0;
        const p = () => this.root.updateBlockedByResize = !1;
        C.read(() => {
          u = window.innerWidth;
        }), t(a, () => {
          const g = window.innerWidth;
          g !== u && (u = g, this.root.updateBlockedByResize = !0, l && l(), l = Mc(p, 250), ne.hasAnimatedSinceResize && (ne.hasAnimatedSinceResize = !1, this.nodes.forEach(Ii)));
        });
      }
      o && this.root.registerSharedNode(o, this), this.options.animate !== !1 && c && (o || d) && this.addEventListener("didUpdate", ({ delta: l, hasLayoutChanged: u, hasRelativeLayoutChanged: p, layout: g }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const m = this.options.transition || c.getDefaultTransition() || nd, { onLayoutAnimationStart: T, onLayoutAnimationComplete: v } = c.getProps(), y = !this.targetLayout || !wa(this.targetLayout, g), _ = !u && p;
        if (this.options.layoutRoot || this.resumeFrom || _ || u && (y || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const x = {
            ...bn(m, "layout"),
            onPlay: T,
            onComplete: v
          };
          (c.shouldReduceMotion || this.options.layoutRoot) && (x.delay = 0, x.type = !1), this.startAnimation(x), this.setAnimationOrigin(l, _);
        } else
          u || Ii(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = g;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const a = this.getStack();
      a && a.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), nt(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Jc), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: a } = this.options;
      return a && a.getProps().transformTemplate;
    }
    willUpdate(a = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Pa(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        u.shouldResetTransform = !0, u.updateScroll("snapshot"), u.options.layoutRoot && u.willUpdate(!1);
      }
      const { layoutId: o, layout: d } = this.options;
      if (o === void 0 && !d)
        return;
      const c = this.getTransformTemplate();
      this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0, this.updateSnapshot(), a && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Ni);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Fi);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(Xc), this.nodes.forEach($c), this.nodes.forEach(Hc)) : this.nodes.forEach(Fi), this.clearAllSnapshots();
      const o = z.now();
      L.delta = Q(0, 1e3 / 60, o - L.timestamp), L.timestamp = o, L.isProcessing = !0, ge.update.process(L), ge.preRender.process(L), ge.render.process(L), L.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, vn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Yc), this.sharedNodes.forEach(Qc);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, C.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      C.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !F(this.snapshot.measuredBox.x) && !F(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let d = 0; d < this.path.length; d++)
          this.path[d].updateScroll();
      const a = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = M(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: o } = this.options;
      o && o.notify("LayoutMeasure", this.layout.layoutBox, a ? a.layoutBox : void 0);
    }
    updateScroll(a = "measure") {
      let o = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === a && (o = !1), o && this.instance) {
        const d = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: a,
          isRoot: d,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : d
        };
      }
    }
    resetTransform() {
      if (!s)
        return;
      const a = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, o = this.projectionDelta && !Aa(this.projectionDelta), d = this.getTransformTemplate(), c = d ? d(this.latestValues, "") : void 0, l = c !== this.prevTransformTemplateValue;
      a && this.instance && (o || ot(this.latestValues) || l) && (s(this.instance, c), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(a = !0) {
      const o = this.measurePageBox();
      let d = this.removeElementScroll(o);
      return a && (d = this.removeTransform(d)), id(d), {
        animationId: this.root.animationId,
        measuredBox: o,
        layoutBox: d,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: a } = this.options;
      if (!a)
        return M();
      const o = a.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(sd))) {
        const { scroll: c } = this.root;
        c && (yt(o.x, c.offset.x), yt(o.y, c.offset.y));
      }
      return o;
    }
    removeElementScroll(a) {
      const o = M();
      if (H(o, a), this.scroll?.wasRoot)
        return o;
      for (let d = 0; d < this.path.length; d++) {
        const c = this.path[d], { scroll: l, options: u } = c;
        c !== this.root && l && u.layoutScroll && (l.wasRoot && H(o, a), yt(o.x, l.offset.x), yt(o.y, l.offset.y));
      }
      return o;
    }
    applyTransform(a, o = !1) {
      const d = M();
      H(d, a);
      for (let c = 0; c < this.path.length; c++) {
        const l = this.path[c];
        !o && l.options.layoutScroll && l.scroll && l !== l.root && bt(d, {
          x: -l.scroll.offset.x,
          y: -l.scroll.offset.y
        }), ot(l.latestValues) && bt(d, l.latestValues);
      }
      return ot(this.latestValues) && bt(d, this.latestValues), d;
    }
    removeTransform(a) {
      const o = M();
      H(o, a);
      for (let d = 0; d < this.path.length; d++) {
        const c = this.path[d];
        if (!c.instance || !ot(c.latestValues))
          continue;
        Ue(c.latestValues) && c.updateSnapshot();
        const l = M(), u = c.measurePageBox();
        H(l, u), Vi(o, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, l);
      }
      return ot(this.latestValues) && Vi(o, this.latestValues), o;
    }
    setTargetDelta(a) {
      this.targetDelta = a, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(a) {
      this.options = {
        ...this.options,
        ...a,
        crossfade: a.crossfade !== void 0 ? a.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== L.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(a = !1) {
      const o = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = o.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = o.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = o.isSharedProjectionDirty);
      const d = !!this.resumingFrom || this !== o;
      if (!(a || d && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: l, layoutId: u } = this.options;
      if (!(!this.layout || !(l || u))) {
        if (this.resolvedRelativeTargetAt = L.timestamp, !this.targetDelta && !this.relativeTarget) {
          const p = this.getClosestProjectingParent();
          p && p.layout && this.animationProgress !== 1 ? (this.relativeParent = p, this.forceRelativeParentToResolveTarget(), this.relativeTarget = M(), this.relativeTargetOrigin = M(), It(this.relativeTargetOrigin, this.layout.layoutBox, p.layout.layoutBox), H(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = M(), this.targetWithTransforms = M()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), dc(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : H(this.target, this.layout.layoutBox), aa(this.target, this.targetDelta)) : H(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const p = this.getClosestProjectingParent();
          p && !!p.resumingFrom == !!this.resumingFrom && !p.options.layoutScroll && p.target && this.animationProgress !== 1 ? (this.relativeParent = p, this.forceRelativeParentToResolveTarget(), this.relativeTarget = M(), this.relativeTargetOrigin = M(), It(this.relativeTargetOrigin, this.target, p.target), H(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Ue(this.parent.latestValues) || sa(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      const a = this.getLead(), o = !!this.resumingFrom || this !== a;
      let d = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (d = !1), o && (this.isSharedProjectionDirty || this.isTransformDirty) && (d = !1), this.resolvedRelativeTargetAt === L.timestamp && (d = !1), d)
        return;
      const { layout: c, layoutId: l } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(c || l))
        return;
      H(this.layoutCorrected, this.layout.layoutBox);
      const u = this.treeScale.x, p = this.treeScale.y;
      _l(this.layoutCorrected, this.treeScale, this.path, o), a.layout && !a.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (a.target = a.layout.layoutBox, a.targetWithTransforms = M());
      const { target: g } = a;
      if (!g) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Bi(this.prevProjectionDelta.x, this.projectionDelta.x), Bi(this.prevProjectionDelta.y, this.projectionDelta.y)), Ft(this.projectionDelta, this.layoutCorrected, g, this.latestValues), (this.treeScale.x !== u || this.treeScale.y !== p || !Li(this.projectionDelta.x, this.prevProjectionDelta.x) || !Li(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", g));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(a = !0) {
      if (this.options.visualElement?.scheduleRender(), a) {
        const o = this.getStack();
        o && o.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = xt(), this.projectionDelta = xt(), this.projectionDeltaWithTransform = xt();
    }
    setAnimationOrigin(a, o = !1) {
      const d = this.snapshot, c = d ? d.latestValues : {}, l = { ...this.latestValues }, u = xt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !o;
      const p = M(), g = d ? d.source : void 0, m = this.layout ? this.layout.source : void 0, T = g !== m, v = this.getStack(), y = !v || v.members.length <= 1, _ = !!(T && !y && this.options.crossfade === !0 && !this.path.some(ed));
      this.animationProgress = 0;
      let x;
      this.mixTargetDelta = (P) => {
        const A = P / 1e3;
        Oi(u.x, a.x, A), Oi(u.y, a.y, A), this.setTargetDelta(u), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (It(p, this.layout.layoutBox, this.relativeParent.layout.layoutBox), td(this.relativeTarget, this.relativeTargetOrigin, p, A), x && Oc(this.relativeTarget, x) && (this.isProjectionDirty = !1), x || (x = M()), H(x, this.relativeTarget)), T && (this.animationValues = l, Ec(l, c, this.latestValues, A, _, y)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = A;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(a) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (nt(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = C.update(() => {
        ne.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = _t(0)), this.currentAnimation = Cc(this.motionValue, [0, 1e3], {
          ...a,
          velocity: 0,
          isSync: !0,
          onUpdate: (o) => {
            this.mixTargetDelta(o), a.onUpdate && a.onUpdate(o);
          },
          onStop: () => {
          },
          onComplete: () => {
            a.onComplete && a.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const a = this.getStack();
      a && a.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Wc), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const a = this.getLead();
      let { targetWithTransforms: o, target: d, layout: c, latestValues: l } = a;
      if (!(!o || !d || !c)) {
        if (this !== a && this.layout && c && Ca(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
          d = this.target || M();
          const u = F(this.layout.layoutBox.x);
          d.x.min = a.target.x.min, d.x.max = d.x.min + u;
          const p = F(this.layout.layoutBox.y);
          d.y.min = a.target.y.min, d.y.max = d.y.min + p;
        }
        H(o, d), bt(o, l), Ft(this.projectionDeltaWithTransform, this.layoutCorrected, o, l);
      }
    }
    registerSharedNode(a, o) {
      this.sharedNodes.has(a) || this.sharedNodes.set(a, new jc()), this.sharedNodes.get(a).add(o);
      const c = o.options.initialPromotionConfig;
      o.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity: c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(o) : void 0
      });
    }
    isLead() {
      const a = this.getStack();
      return a ? a.lead === this : !0;
    }
    getLead() {
      const { layoutId: a } = this.options;
      return a ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: a } = this.options;
      return a ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: a } = this.options;
      if (a)
        return this.root.sharedNodes.get(a);
    }
    promote({ needsReset: a, transition: o, preserveFollowOpacity: d } = {}) {
      const c = this.getStack();
      c && c.promote(this, d), a && (this.projectionDelta = void 0, this.needsReset = !0), o && this.setOptions({ transition: o });
    }
    relegate() {
      const a = this.getStack();
      return a ? a.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: a } = this.options;
      if (!a)
        return;
      let o = !1;
      const { latestValues: d } = a;
      if ((d.z || d.rotate || d.rotateX || d.rotateY || d.rotateZ || d.skewX || d.skewY) && (o = !0), !o)
        return;
      const c = {};
      d.z && Be("z", a, c, this.animationValues);
      for (let l = 0; l < Pe.length; l++)
        Be(`rotate${Pe[l]}`, a, c, this.animationValues), Be(`skew${Pe[l]}`, a, c, this.animationValues);
      a.render();
      for (const l in c)
        a.setStaticValue(l, c[l]), this.animationValues && (this.animationValues[l] = c[l]);
      a.scheduleRender();
    }
    applyProjectionStyles(a, o) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        a.visibility = "hidden";
        return;
      }
      const d = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, a.visibility = "", a.opacity = "", a.pointerEvents = ee(o?.pointerEvents) || "", a.transform = d ? d(this.latestValues, "") : "none";
        return;
      }
      const c = this.getLead();
      if (!this.projectionDelta || !this.layout || !c.target) {
        this.options.layoutId && (a.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, a.pointerEvents = ee(o?.pointerEvents) || ""), this.hasProjected && !ot(this.latestValues) && (a.transform = d ? d({}, "") : "none", this.hasProjected = !1);
        return;
      }
      a.visibility = "";
      const l = c.animationValues || c.latestValues;
      this.applyTransformsToTarget();
      let u = zc(this.projectionDeltaWithTransform, this.treeScale, l);
      d && (u = d(l, u)), a.transform = u;
      const { x: p, y: g } = this.projectionDelta;
      a.transformOrigin = `${p.origin * 100}% ${g.origin * 100}% 0`, c.animationValues ? a.opacity = c === this ? l.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : l.opacityExit : a.opacity = c === this ? l.opacity !== void 0 ? l.opacity : "" : l.opacityExit !== void 0 ? l.opacityExit : 0;
      for (const m in Ut) {
        if (l[m] === void 0)
          continue;
        const { correct: T, applyTo: v, isCSSVariable: y } = Ut[m], _ = u === "none" ? l[m] : T(l[m], c);
        if (v) {
          const x = v.length;
          for (let P = 0; P < x; P++)
            a[v[P]] = _;
        } else
          y ? this.options.visualElement.renderState.vars[m] = _ : a[m] = _;
      }
      this.options.layoutId && (a.pointerEvents = c === this ? ee(o?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((a) => a.currentAnimation?.stop()), this.root.nodes.forEach(Ni), this.root.sharedNodes.clear();
    }
  };
}
function $c(t) {
  t.updateLayout();
}
function Hc(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = t.layout, { animationType: s } = t.options, r = e.source !== t.layout.source;
    s === "size" ? K((l) => {
      const u = r ? e.measuredBox[l] : e.layoutBox[l], p = F(u);
      u.min = n[l].min, u.max = u.min + p;
    }) : Ca(s, e.layoutBox, n) && K((l) => {
      const u = r ? e.measuredBox[l] : e.layoutBox[l], p = F(n[l]);
      u.max = u.min + p, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[l].max = t.relativeTarget[l].min + p);
    });
    const a = xt();
    Ft(a, n, e.layoutBox);
    const o = xt();
    r ? Ft(o, t.applyTransform(i, !0), e.measuredBox) : Ft(o, n, e.layoutBox);
    const d = !Aa(a);
    let c = !1;
    if (!t.resumeFrom) {
      const l = t.getClosestProjectingParent();
      if (l && !l.resumeFrom) {
        const { snapshot: u, layout: p } = l;
        if (u && p) {
          const g = M();
          It(g, e.layoutBox, u.layoutBox);
          const m = M();
          It(m, n, p.layoutBox), wa(g, m) || (c = !0), l.options.layoutRoot && (t.relativeTarget = m, t.relativeTargetOrigin = g, t.relativeParent = l);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: n,
      snapshot: e,
      delta: o,
      layoutDelta: a,
      hasLayoutChanged: d,
      hasRelativeLayoutChanged: c
    });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function Kc(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function Gc(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function Yc(t) {
  t.clearSnapshot();
}
function Ni(t) {
  t.clearMeasurements();
}
function Fi(t) {
  t.isLayoutDirty = !1;
}
function Xc(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Ii(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function qc(t) {
  t.resolveTargetDelta();
}
function Zc(t) {
  t.calcProjection();
}
function Jc(t) {
  t.resetSkewAndRotation();
}
function Qc(t) {
  t.removeLeadSnapshot();
}
function Oi(t, e, n) {
  t.translate = k(e.translate, 0, n), t.scale = k(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function ji(t, e, n, i) {
  t.min = k(e.min, n.min, i), t.max = k(e.max, n.max, i);
}
function td(t, e, n, i) {
  ji(t.x, e.x, n.x, i), ji(t.y, e.y, n.y, i);
}
function ed(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const nd = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, zi = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), Wi = zi("applewebkit/") && !zi("chrome/") ? Math.round : Y;
function Ui(t) {
  t.min = Wi(t.min), t.max = Wi(t.max);
}
function id(t) {
  Ui(t.x), Ui(t.y);
}
function Ca(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !cc(Ri(e), Ri(n), 0.2);
}
function sd(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const ad = Ba({
  attachResizeListener: (t, e) => $t(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Ce = {
  current: void 0
}, ka = Ba({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!Ce.current) {
      const t = new ad({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), Ce.current = t;
    }
    return Ce.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), rd = {
  pan: {
    Feature: Ac
  },
  drag: {
    Feature: Sc,
    ProjectionNode: ka,
    MeasureLayout: Ta
  }
};
function $i(t, e, n) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, r = i[s];
  r && C.postRender(() => r(e, Yt(e)));
}
class od extends st {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Eo(e, (n, i) => ($i(this.node, i, "Start"), (s) => $i(this.node, s, "End"))));
  }
  unmount() {
  }
}
class ld extends st {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Ht($t(this.node.current, "focus", () => this.onFocus()), $t(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Hi(t, e, n) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), r = i[s];
  r && C.postRender(() => r(e, Yt(e)));
}
class cd extends st {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Fo(e, (n, i) => (Hi(this.node, i, "Start"), (s, { success: r }) => Hi(this.node, s, r ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const qe = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), dd = (t) => {
  const e = qe.get(t.target);
  e && e(t);
}, fd = (t) => {
  t.forEach(dd);
};
function ud({ root: t, ...e }) {
  const n = t || document;
  ke.has(n) || ke.set(n, {});
  const i = ke.get(n), s = JSON.stringify(e);
  return i[s] || (i[s] = new IntersectionObserver(fd, { root: t, ...e })), i[s];
}
function pd(t, e, n) {
  const i = ud(e);
  return qe.set(t, n), i.observe(t), () => {
    qe.delete(t), i.unobserve(t);
  };
}
const hd = {
  some: 0,
  all: 1
};
class gd extends st {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: i, amount: s = "some", once: r } = e, a = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof s == "number" ? s : hd[s]
    }, o = (d) => {
      const { isIntersecting: c } = d;
      if (this.isInView === c || (this.isInView = c, r && !c && this.hasEnteredView))
        return;
      c && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", c);
      const { onViewportEnter: l, onViewportLeave: u } = this.node.getProps(), p = c ? l : u;
      p && p(d);
    };
    return pd(this.node.current, a, o);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(md(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function md({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const yd = {
  inView: {
    Feature: gd
  },
  tap: {
    Feature: cd
  },
  focus: {
    Feature: ld
  },
  hover: {
    Feature: od
  }
}, bd = {
  layout: {
    ProjectionNode: ka,
    MeasureLayout: Ta
  }
}, xd = {
  ...ic,
  ...yd,
  ...rd,
  ...bd
}, O = /* @__PURE__ */ xl(xd, Dl), vd = {
  some: 0,
  all: 1
};
function Td(t, e, { root: n, margin: i, amount: s = "some" } = {}) {
  const r = Fs(t), a = /* @__PURE__ */ new WeakMap(), o = (c) => {
    c.forEach((l) => {
      const u = a.get(l.target);
      if (l.isIntersecting !== !!u)
        if (l.isIntersecting) {
          const p = e(l.target, l);
          typeof p == "function" ? a.set(l.target, p) : d.unobserve(l.target);
        } else typeof u == "function" && (u(l), a.delete(l.target));
    });
  }, d = new IntersectionObserver(o, {
    root: n,
    rootMargin: i,
    threshold: typeof s == "number" ? s : vd[s]
  });
  return r.forEach((c) => d.observe(c)), () => d.disconnect();
}
function _d(t, { root: e, margin: n, amount: i, once: s = !1, initial: r = !1 } = {}) {
  const [a, o] = Mt(r);
  return Tt(() => {
    if (!t.current || s && a)
      return;
    const d = () => (o(!0), s ? void 0 : () => o(!1)), c = {
      root: e && e.current || void 0,
      margin: n,
      amount: i
    };
    return Td(t.current, d, c);
  }, [e, t, n, s, i]), a;
}
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sd = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ad = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, n, i) => i ? i.toUpperCase() : n.toLowerCase()
), Ki = (t) => {
  const e = Ad(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
}, Va = (...t) => t.filter((e, n, i) => !!e && e.trim() !== "" && i.indexOf(e) === n).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var wd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pd = Ze(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: i,
    className: s = "",
    children: r,
    iconNode: a,
    ...o
  }, d) => ie(
    "svg",
    {
      ref: d,
      ...wd,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: i ? Number(n) * 24 / Number(e) : n,
      className: Va("lucide", s),
      ...o
    },
    [
      ...a.map(([c, l]) => ie(c, l)),
      ...Array.isArray(r) ? r : [r]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W = (t, e) => {
  const n = Ze(
    ({ className: i, ...s }, r) => ie(Pd, {
      ref: r,
      iconNode: e,
      className: Va(
        `lucide-${Sd(Ki(t))}`,
        `lucide-${t}`,
        i
      ),
      ...s
    })
  );
  return n.displayName = Ki(t), n;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bd = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], Cd = W("arrow-right", Bd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kd = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
], Vd = W("award", kd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Md = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Dd = W("chevron-down", Md);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ed = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
], Rd = W("facebook", Ed);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ld = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
], Nd = W("instagram", Ld);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fd = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
], Id = W("mail", Fd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Od = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], jd = W("map-pin", Od);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zd = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], Wd = W("menu", zd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ud = [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
], $d = W("phone", Ud);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hd = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], Kd = W("scissors", Hd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gd = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], Yd = W("shield", Gd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xd = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], qd = W("star", Xd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zd = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
], Jd = W("truck", Zd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qd = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], tf = W("x", Qd), Gi = ["Collections", "Craftsmanship", "Gallery", "Testimonials", "Contact"], ef = [
  {
    name: "Velvet Royale",
    category: "Luxury Drapes",
    desc: "Hand-crafted deep-pile velvet with intricate gold-thread embroidery along every hem.",
    price: "From ₹14,500 / panel",
    img: "1555041469-a586c61ea9bc",
    tag: "Bestseller"
  },
  {
    name: "Silk Cascade",
    category: "Premium Silk",
    desc: "Pure mulberry silk falls in cascading waterfall pleats — luminous and weightless.",
    price: "From ₹22,000 / panel",
    img: "1513694203232-719a280e022f",
    tag: "New Arrival"
  },
  {
    name: "Linen Serenity",
    category: "Natural Weaves",
    desc: "Belgian linen with hand-block botanical motifs. Effortless calm meets heritage craft.",
    price: "From ₹8,500 / panel",
    img: "1493663284031-b7e3aefcae8e",
    tag: "Eco Choice"
  },
  {
    name: "Blackout Velour",
    category: "Blackout Series",
    desc: "Triple-layer blackout technology wrapped in plush velour for total privacy and silence.",
    price: "From ₹11,200 / panel",
    img: "1616594039964-ae9021a400a0",
    tag: "Premium"
  },
  {
    name: "Sheer Whisper",
    category: "Sheer Collection",
    desc: "Diaphanous organza that filters daylight into a golden haze — ethereal and serene.",
    price: "From ₹6,500 / panel",
    img: "1586023492125-27b2c045efd7",
    tag: "Popular"
  },
  {
    name: "Roman Heritage",
    category: "Roman Blinds",
    desc: "Structured Roman blinds in heritage jacquard weaves — clean folds, timeless character.",
    price: "From ₹9,800 / panel",
    img: "1631049307264-da0ec9d70304",
    tag: "Classic"
  }
], nf = [
  {
    icon: Kd,
    title: "Master Craftsmanship",
    desc: "Every panel hand-stitched by artisans with over two decades of heritage expertise."
  },
  {
    icon: Yd,
    title: "5-Year Guarantee",
    desc: "Comprehensive warranty covering fabric integrity, stitching, and all hardware."
  },
  {
    icon: Jd,
    title: "White Glove Delivery",
    desc: "Professional measurement, delivery, and full installation included with every order."
  },
  {
    icon: Vd,
    title: "Award-Winning Design",
    desc: "Recognised by the India Design Council for three consecutive years of excellence."
  }
], ht = [
  {
    name: "Priya Malhotra",
    role: "Senior Interior Designer · Delhi",
    rating: 5,
    text: "SanCurtains transformed my client's penthouse into a palace. The Velvet Royale drapes are exquisite — the craftsmanship is unlike anything I have encountered in 15 years of design work.",
    initials: "PM"
  },
  {
    name: "Rahul Singhania",
    role: "Luxury Hotelier · Mumbai",
    rating: 5,
    text: "We ordered bespoke drapes for all 48 suites of our property. Delivery was precise, installation was immaculate, and our guests constantly remark on the ambiance. Worth every rupee.",
    initials: "RS"
  },
  {
    name: "Ananya Kapoor",
    role: "Principal Architect · Bangalore",
    rating: 5,
    text: "The Silk Cascade collection is breathtaking. I specified them for a heritage bungalow restoration — they elevated the entire space to museum-quality grandeur.",
    initials: "AK"
  }
], sf = [
  { img: "1560185007-cde436f6a4d0", cols: "col-span-2 row-span-2", alt: "Grand living room with floor-to-ceiling emerald drapes" },
  { img: "1600585154340-be6161a56a0c", cols: "col-span-1 row-span-1", alt: "Minimalist bedroom curtains in ivory linen" },
  { img: "1549497538-303791108f95", cols: "col-span-1 row-span-1", alt: "Close-up of rich velvet fabric texture" },
  { img: "1584467541268-b040f83be3fd", cols: "col-span-1 row-span-2", alt: "Elegant bedroom with layered sheer and blackout drapes" },
  { img: "1618221195710-dd6b41faaea6", cols: "col-span-1 row-span-1", alt: "Classic roman blinds in heritage print" }
];
function q({
  children: t,
  delay: e = 0,
  className: n = ""
}) {
  const i = Et(null), s = _d(i, { once: !0, margin: "-80px" });
  return /* @__PURE__ */ h(
    f,
    {
      _fgT: O.div,
      _fgS: "d3bl0",
      _fgB: 1783876759592,
      _fgD: !0,
      ref: i,
      className: n,
      initial: { opacity: 0, y: 48 },
      animate: s ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.8, delay: e, ease: [0.22, 1, 0.36, 1] },
      "data-fg-d3bl0": ":0:/src/app/App.tsx:132:5:4476:255:e:motion.div:c:1",
      children: t
    }
  );
}
function af() {
  const [t, e] = Mt(!1), [n, i] = Mt(!1), [s, r] = Mt(!1), [a, o] = Mt(0);
  Tt(() => {
    const c = setTimeout(() => e(!0), 700);
    return () => clearTimeout(c);
  }, []), Tt(() => {
    const c = () => i(window.scrollY > 60);
    return window.addEventListener("scroll", c), () => window.removeEventListener("scroll", c);
  }, []);
  const d = {
    duration: 1.8,
    ease: [0.76, 0, 0.24, 1]
  };
  return /* @__PURE__ */ b(Ra, { children: [
    /* @__PURE__ */ h("style", { "data-fg-d3bl3": ":0:/src/app/App.tsx:170:7:5516:6422:e:style:s", children: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Raleway:wght@300;400;500;600;700&display=swap');

        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-raleway { font-family: 'Raleway', sans-serif; }

        .shimmer-gold {
          background: linear-gradient(120deg, #c9a84c 0%, #f0d080 35%, #c9a84c 50%, #8a6b20 65%, #c9a84c 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 4s linear infinite;
        }

        @keyframes shimmerGold {
          0% { background-position: 0% center; }
          100% { background-position: 250% center; }
        }

        .curtain-left {
          background: repeating-linear-gradient(
            90deg,
            #061410 0px, #0d2a18 12px, #122e1c 24px,
            #0a2015 36px, #071a10 48px, #0e2d1a 60px
          );
        }
        .curtain-right {
          background: repeating-linear-gradient(
            90deg,
            #0e2d1a 0px, #071a10 12px, #0a2015 24px,
            #122e1c 36px, #0d2a18 48px, #061410 60px
          );
        }

        .curtain-gold-edge-l {
          position: absolute; right: 0; top: 0; bottom: 0; width: 6px;
          background: linear-gradient(to bottom, transparent 0%, #c9a84c 15%, #f0d080 50%, #c9a84c 85%, transparent 100%);
        }
        .curtain-gold-edge-r {
          position: absolute; left: 0; top: 0; bottom: 0; width: 6px;
          background: linear-gradient(to bottom, transparent 0%, #c9a84c 15%, #f0d080 50%, #c9a84c 85%, transparent 100%);
        }
        .curtain-tassel {
          position: absolute; bottom: 30%; width: 2px; height: 60px;
          background: linear-gradient(to bottom, #c9a84c, #8a6b20);
          border-radius: 1px;
        }
        .curtain-tassel::after {
          content: '';
          position: absolute; bottom: -8px; left: -4px;
          width: 10px; height: 10px; border-radius: 50%;
          background: #c9a84c;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-30px) scale(1.08); opacity: 0.28; }
        }

        .orb-float { animation: floatOrb var(--dur, 6s) ease-in-out infinite; animation-delay: var(--delay, 0s); }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marqueeScroll 28s linear infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .card-hover {
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.3);
        }

        .gold-line {
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a84c, transparent);
        }

        .tag-pill {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 2px;
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.4);
          color: #c9a84c;
        }

        .nav-link {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f5ecd7;
          opacity: 0.7;
          transition: opacity 0.25s, color 0.25s;
          text-decoration: none;
        }
        .nav-link:hover { opacity: 1; color: #c9a84c; }

        .btn-gold {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px 36px;
          background: linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c);
          background-size: 200% auto;
          color: #0a1f0e;
          border: none;
          cursor: pointer;
          transition: background-position 0.4s, transform 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .btn-gold:hover { background-position: right center; transform: translateY(-2px); }

        .btn-outline {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 13px 36px;
          background: transparent;
          color: #f5ecd7;
          border: 1px solid rgba(245,236,215,0.4);
          cursor: pointer;
          transition: border-color 0.3s, color 0.3s, transform 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .btn-outline:hover { border-color: #c9a84c; color: #c9a84c; transform: translateY(-2px); }

        .diagonal-bg {
          background: linear-gradient(135deg, #0a1f0e 50%, #9b1b30 50%);
        }

        .feature-card {
          border: 1px solid rgba(201,168,76,0.12);
          background: rgba(17,40,25,0.6);
          backdrop-filter: blur(8px);
          transition: border-color 0.4s, background 0.4s;
        }
        .feature-card:hover {
          border-color: rgba(201,168,76,0.45);
          background: rgba(17,40,25,0.9);
        }

        .testimonial-avatar {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 1.1rem;
          width: 56px; height: 56px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #9b1b30, #c02540);
          border: 2px solid rgba(201,168,76,0.5);
          border-radius: 50%;
          color: #f5ecd7;
          flex-shrink: 0;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a1f0e; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.7); }

        html { scroll-behavior: smooth; }
      ` }),
    /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl5", _fgB: 1783876759592, className: "font-raleway overflow-x-hidden", style: { background: "#0a1f0e", color: "#f5ecd7" }, "data-fg-d3bl5": ":0:/src/app/App.tsx:347:7:11946:39340:e:div:xtetxtetxtxtxtetxtetxtetxtetxtetxtetxtetxtetxte", children: [
      /* @__PURE__ */ b(
        f,
        {
          _fgT: O.nav,
          _fgS: "d3bl7",
          _fgB: 1783876759592,
          className: "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16",
          style: { height: 72 },
          animate: {
            background: n ? "rgba(8,20,11,0.96)" : "transparent",
            backdropFilter: n ? "blur(16px)" : "blur(0px)",
            borderBottom: n ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent"
          },
          transition: { duration: 0.4 },
          "data-fg-d3bl7": ":0:/src/app/App.tsx:350:9:12085:1892:e:motion.nav:xtetxtetxte",
          children: [
            /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl9", _fgB: 1783876759592, className: "flex flex-col leading-none", "data-fg-d3bl9": ":0:/src/app/App.tsx:365:11:12653:486:e:div:ete", children: [
              /* @__PURE__ */ h(
                f,
                {
                  _fgT: "span",
                  _fgS: "d3bl10",
                  _fgB: 1783876759592,
                  className: "font-cinzel font-bold tracking-widest shimmer-gold",
                  style: { fontSize: "1.3rem" },
                  "data-fg-d3bl10": ":0:/src/app/App.tsx:366:13:12710:179:e:span:t",
                  children: "SAN"
                }
              ),
              /* @__PURE__ */ h(
                f,
                {
                  _fgT: "span",
                  _fgS: "d3bl12",
                  _fgB: 1783876759592,
                  className: "font-cinzel font-light tracking-[0.5em]",
                  style: { fontSize: "0.55rem", color: "#f5ecd7", opacity: 0.6, marginTop: 2 },
                  "data-fg-d3bl12": ":0:/src/app/App.tsx:372:13:12902:220:e:span:t",
                  children: "CURTAINS"
                }
              )
            ] }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl15", _fgB: 1783876759592, className: "hidden lg:flex items-center gap-10", "data-fg-d3bl15": ":0:/src/app/App.tsx:381:11:13181:236:e:div:x", children: Gi.map((c) => /* @__PURE__ */ h(f, { _fgT: "a", _fgS: "d3bl17", _fgB: 1783876759592, href: `#${c.toLowerCase()}`, className: "nav-link", "data-fg-d3bl17": ":0:/src/app/App.tsx:383:15:13284:100:e:a:x", children: c }, c)) }),
            /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl20", _fgB: 1783876759592, className: "flex items-center gap-4", "data-fg-d3bl20": ":0:/src/app/App.tsx:390:11:13463:492:e:div:ete", children: [
              /* @__PURE__ */ h(f, { _fgT: "a", _fgS: "d3bl21", _fgB: 1783876759592, href: "#contact", className: "hidden lg:block btn-gold", style: { fontSize: "0.65rem", padding: "11px 28px" }, "data-fg-d3bl21": ":0:/src/app/App.tsx:391:13:13517:159:e:a:t", children: "Book Consultation" }),
              /* @__PURE__ */ h(
                f,
                {
                  _fgT: "button",
                  _fgS: "d3bl23",
                  _fgB: 1783876759592,
                  className: "lg:hidden p-2",
                  onClick: () => r(!s),
                  style: { color: "#f5ecd7" },
                  "data-fg-d3bl23": ":0:/src/app/App.tsx:394:13:13689:249:e:button:x",
                  children: s ? /* @__PURE__ */ h(f, { _fgT: tf, _fgS: "d3bl25", _fgB: 1783876759592, size: 22, "data-fg-d3bl25": ":0:node_modules/lucide-react:399:29:13879:15:e:X::::::TvS" }) : /* @__PURE__ */ h(f, { _fgT: Wd, _fgS: "d3bl26", _fgB: 1783876759592, size: 22, "data-fg-d3bl26": ":0:node_modules/lucide-react:399:47:13897:18:e:Menu::::::D5X5" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ b(
        f,
        {
          _fgT: O.div,
          _fgS: "d3bl28",
          _fgB: 1783876759592,
          className: "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden",
          style: { background: "rgba(8,20,11,0.98)", backdropFilter: "blur(20px)" },
          initial: !1,
          animate: { opacity: s ? 1 : 0, pointerEvents: s ? "all" : "none" },
          transition: { duration: 0.3 },
          "data-fg-d3bl28": ":0:/src/app/App.tsx:405:9:14015:846:e:motion.div:xte",
          children: [
            Gi.map((c) => /* @__PURE__ */ h(
              f,
              {
                _fgT: "a",
                _fgS: "d3bl30",
                _fgB: 1783876759592,
                href: `#${c.toLowerCase()}`,
                className: "nav-link",
                style: { fontSize: "1rem", opacity: 1 },
                onClick: () => r(!1),
                "data-fg-d3bl30": ":0:/src/app/App.tsx:413:13:14430:257:e:a:x",
                children: c
              },
              c
            )),
            /* @__PURE__ */ h(f, { _fgT: "a", _fgS: "d3bl32", _fgB: 1783876759592, href: "#contact", className: "btn-gold mt-4", onClick: () => r(!1), "data-fg-d3bl32": ":0:/src/app/App.tsx:423:11:14712:127:e:a:t", children: "Book Consultation" })
          ]
        }
      ),
      /* @__PURE__ */ b(
        f,
        {
          _fgT: "section",
          _fgS: "d3bl37",
          _fgB: 1783876759592,
          style: { height: "100vh", minHeight: 700, position: "relative", overflow: "hidden" },
          "data-fg-d3bl37": ":0:/src/app/App.tsx:431:9:15034:8838:e:section:xtetxtetetetxtetxtetxtetxtetxte",
          children: [
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "div",
                _fgS: "d3bl39",
                _fgB: 1783876759592,
                style: {
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse 80% 60% at 50% 40%, #152e1c 0%, #0a1f0e 55%, #060e08 100%)"
                },
                "data-fg-d3bl39": ":0:/src/app/App.tsx:435:11:15212:211:e:div"
              }
            ),
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "div",
                _fgS: "d3bl41",
                _fgB: 1783876759592,
                className: "orb-float",
                style: {
                  position: "absolute",
                  top: "18%",
                  left: "12%",
                  width: 420,
                  height: 420,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(155,27,48,0.18) 0%, transparent 70%)",
                  "--dur": "7s",
                  "--delay": "0s"
                },
                "data-fg-d3bl41": ":0:/src/app/App.tsx:443:11:15469:372:e:div"
              }
            ),
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "div",
                _fgS: "d3bl42",
                _fgB: 1783876759592,
                className: "orb-float",
                style: {
                  position: "absolute",
                  top: "30%",
                  right: "8%",
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
                  "--dur": "9s",
                  "--delay": "2s"
                },
                "data-fg-d3bl42": ":0:/src/app/App.tsx:452:11:15852:373:e:div"
              }
            ),
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "div",
                _fgS: "d3bl43",
                _fgB: 1783876759592,
                className: "orb-float",
                style: {
                  position: "absolute",
                  bottom: "15%",
                  left: "25%",
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(155,27,48,0.1) 0%, transparent 70%)",
                  "--dur": "11s",
                  "--delay": "1s"
                },
                "data-fg-d3bl43": ":0:/src/app/App.tsx:461:11:16236:375:e:div"
              }
            ),
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "div",
                _fgS: "d3bl45",
                _fgB: 1783876759592,
                style: {
                  position: "absolute",
                  inset: 0,
                  opacity: 0.04,
                  backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
                  backgroundSize: "60px 60px"
                },
                "data-fg-d3bl45": ":0:/src/app/App.tsx:472:11:16661:313:e:div"
              }
            ),
            /* @__PURE__ */ b(
              f,
              {
                _fgT: O.div,
                _fgS: "d3bl47",
                _fgB: 1783876759592,
                className: "relative z-10 flex flex-col items-center justify-center text-center",
                style: { height: "100%" },
                initial: { opacity: 0 },
                animate: { opacity: t ? 1 : 0 },
                transition: { duration: 1.2, delay: 0.6 },
                "data-fg-d3bl47": ":0:/src/app/App.tsx:481:11:17017:4619:e:motion.div:xtetxtetetxtetxtetxtetxte",
                children: [
                  /* @__PURE__ */ b(
                    f,
                    {
                      _fgT: O.div,
                      _fgS: "d3bl49",
                      _fgB: 1783876759592,
                      className: "flex items-center gap-4 mb-8",
                      initial: { opacity: 0, scaleX: 0 },
                      animate: t ? { opacity: 1, scaleX: 1 } : {},
                      transition: { duration: 1, delay: 1 },
                      "data-fg-d3bl49": ":0:/src/app/App.tsx:489:13:17365:948:e:motion.div:etetetete",
                      children: [
                        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl50", _fgB: 1783876759592, style: { width: 80, height: 1, background: "linear-gradient(to right, transparent, #c9a84c)" }, "data-fg-d3bl50": ":0:/src/app/App.tsx:495:15:17635:103:e:div" }),
                        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl51", _fgB: 1783876759592, style: { width: 8, height: 8, background: "#c9a84c", transform: "rotate(45deg)" }, "data-fg-d3bl51": ":0:/src/app/App.tsx:496:15:17753:90:e:div" }),
                        /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl52", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.6rem", letterSpacing: "0.35em", color: "#c9a84c", textTransform: "uppercase" }, "data-fg-d3bl52": ":0:/src/app/App.tsx:497:15:17858:207:e:span:t", children: "Est. 2008 · Purveyors of Fine Drapes" }),
                        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl54", _fgB: 1783876759592, style: { width: 8, height: 8, background: "#c9a84c", transform: "rotate(45deg)" }, "data-fg-d3bl54": ":0:/src/app/App.tsx:500:15:18080:90:e:div" }),
                        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl55", _fgB: 1783876759592, style: { width: 80, height: 1, background: "linear-gradient(to left, transparent, #c9a84c)" }, "data-fg-d3bl55": ":0:/src/app/App.tsx:501:15:18185:102:e:div" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    f,
                    {
                      _fgT: O.h1,
                      _fgS: "d3bl57",
                      _fgB: 1783876759592,
                      className: "font-cinzel shimmer-gold",
                      style: { fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "0.12em", marginBottom: 8 },
                      initial: { opacity: 0, y: 40 },
                      animate: t ? { opacity: 1, y: 0 } : {},
                      transition: { duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] },
                      "data-fg-d3bl57": ":0:/src/app/App.tsx:505:13:18358:448:e:motion.h1:t",
                      children: "SAN"
                    }
                  ),
                  /* @__PURE__ */ h(
                    f,
                    {
                      _fgT: O.div,
                      _fgS: "d3bl59",
                      _fgB: 1783876759592,
                      className: "font-cinzel",
                      style: { fontSize: "clamp(0.9rem, 3vw, 2rem)", fontWeight: 300, letterSpacing: "0.65em", color: "#f5ecd7", opacity: 0.7, marginBottom: 24 },
                      initial: { opacity: 0 },
                      animate: t ? { opacity: 0.7 } : {},
                      transition: { duration: 1, delay: 1.3 },
                      "data-fg-d3bl59": ":0:/src/app/App.tsx:514:13:18819:422:e:motion.div:t",
                      children: "CURTAINS"
                    }
                  ),
                  /* @__PURE__ */ h(
                    f,
                    {
                      _fgT: O.div,
                      _fgS: "d3bl62",
                      _fgB: 1783876759592,
                      style: { width: 200, height: 1, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", marginBottom: 32 },
                      initial: { scaleX: 0 },
                      animate: t ? { scaleX: 1 } : {},
                      transition: { duration: 0.8, delay: 1.5 },
                      "data-fg-d3bl62": ":0:/src/app/App.tsx:525:13:19283:321:e:motion.div"
                    }
                  ),
                  /* @__PURE__ */ h(
                    f,
                    {
                      _fgT: O.p,
                      _fgS: "d3bl64",
                      _fgB: 1783876759592,
                      className: "font-playfair",
                      style: { fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)", fontStyle: "italic", color: "#f5ecd7", opacity: 0.85, maxWidth: 580, lineHeight: 1.6, marginBottom: 48, padding: "0 24px" },
                      initial: { opacity: 0, y: 20 },
                      animate: t ? { opacity: 0.85, y: 0 } : {},
                      transition: { duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] },
                      "data-fg-d3bl64": ":0:/src/app/App.tsx:533:13:19646:572:e:motion.p:t",
                      children: "Where every window becomes a masterpiece of light, texture, and timeless elegance."
                    }
                  ),
                  /* @__PURE__ */ b(
                    f,
                    {
                      _fgT: O.div,
                      _fgS: "d3bl67",
                      _fgB: 1783876759592,
                      className: "flex items-center gap-5 flex-wrap justify-center",
                      initial: { opacity: 0, y: 20 },
                      animate: t ? { opacity: 1, y: 0 } : {},
                      transition: { duration: 0.8, delay: 1.9 },
                      "data-fg-d3bl67": ":0:/src/app/App.tsx:544:13:20257:460:e:motion.div:ete",
                      children: [
                        /* @__PURE__ */ h(f, { _fgT: "a", _fgS: "d3bl68", _fgB: 1783876759592, href: "#collections", className: "btn-gold", "data-fg-d3bl68": ":0:/src/app/App.tsx:550:15:20540:67:e:a:t", children: "Explore Collections" }),
                        /* @__PURE__ */ h(f, { _fgT: "a", _fgS: "d3bl70", _fgB: 1783876759592, href: "#contact", className: "btn-outline", "data-fg-d3bl70": ":0:/src/app/App.tsx:551:15:20622:69:e:a:t", children: "Book Free Consultation" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    f,
                    {
                      _fgT: O.div,
                      _fgS: "d3bl73",
                      _fgB: 1783876759592,
                      className: "flex items-center gap-10 mt-16 flex-wrap justify-center",
                      initial: { opacity: 0 },
                      animate: t ? { opacity: 1 } : {},
                      transition: { duration: 0.8, delay: 2.2 },
                      "data-fg-d3bl73": ":0:/src/app/App.tsx:555:13:20761:851:e:motion.div:x",
                      children: [["2,400+", "Homes Adorned"], ["15+", "Years of Craft"], ["48", "Fabric Varieties"], ["4.9★", "Client Rating"]].map(([c, l]) => /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl75", _fgB: 1783876759592, className: "text-center", "data-fg-d3bl75": ":0:/src/app/App.tsx:562:17:21191:377:e:div:ete", children: [
                        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl76", _fgB: 1783876759592, className: "font-cinzel shimmer-gold", style: { fontSize: "1.6rem", fontWeight: 700 }, "data-fg-d3bl76": ":0:/src/app/App.tsx:563:19:21251:101:e:div:x", children: c }),
                        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl78", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5ecd7", opacity: 0.45, marginTop: 2 }, "data-fg-d3bl78": ":0:/src/app/App.tsx:564:19:21371:174:e:div:x", children: l })
                      ] }, l))
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ b(
              f,
              {
                _fgT: O.div,
                _fgS: "d3bl81",
                _fgB: 1783876759592,
                className: "curtain-left absolute top-0 left-0 bottom-0 z-20",
                style: { width: "50%" },
                initial: { x: 0 },
                animate: { x: t ? "-100%" : "0%" },
                transition: d,
                "data-fg-d3bl81": ":0:/src/app/App.tsx:571:11:21685:757:e:motion.div:etetxtx",
                children: [
                  /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl82", _fgB: 1783876759592, className: "curtain-gold-edge-l", "data-fg-d3bl82": ":0:/src/app/App.tsx:578:13:21964:39:e:div" }),
                  /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl83", _fgB: 1783876759592, className: "curtain-tassel", style: { right: 20 }, "data-fg-d3bl83": ":0:/src/app/App.tsx:579:13:22016:56:e:div" }),
                  [10, 22, 38, 58, 72, 85].map((c) => /* @__PURE__ */ h(
                    f,
                    {
                      _fgT: "div",
                      _fgS: "d3bl86",
                      _fgB: 1783876759592,
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${c}%`,
                        width: 1,
                        background: "rgba(201,168,76,0.06)"
                      },
                      "data-fg-d3bl86": ":0:/src/app/App.tsx:582:15:22174:228:e:div"
                    },
                    c
                  ))
                ]
              }
            ),
            /* @__PURE__ */ b(
              f,
              {
                _fgT: O.div,
                _fgS: "d3bl88",
                _fgB: 1783876759592,
                className: "curtain-right absolute top-0 right-0 bottom-0 z-20",
                style: { width: "50%" },
                initial: { x: 0 },
                animate: { x: t ? "100%" : "0%" },
                transition: d,
                "data-fg-d3bl88": ":0:/src/app/App.tsx:593:11:22492:721:e:motion.div:etetx",
                children: [
                  /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl89", _fgB: 1783876759592, className: "curtain-gold-edge-r", "data-fg-d3bl89": ":0:/src/app/App.tsx:600:13:22772:39:e:div" }),
                  /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl90", _fgB: 1783876759592, className: "curtain-tassel", style: { left: 20 }, "data-fg-d3bl90": ":0:/src/app/App.tsx:601:13:22824:55:e:div" }),
                  [15, 28, 42, 60, 75, 90].map((c) => /* @__PURE__ */ h(
                    f,
                    {
                      _fgT: "div",
                      _fgS: "d3bl92",
                      _fgB: 1783876759592,
                      style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${c}%`,
                        width: 1,
                        background: "rgba(201,168,76,0.06)"
                      },
                      "data-fg-d3bl92": ":0:/src/app/App.tsx:603:15:22945:228:e:div"
                    },
                    c
                  ))
                ]
              }
            ),
            /* @__PURE__ */ b(
              f,
              {
                _fgT: O.div,
                _fgS: "d3bl94",
                _fgB: 1783876759592,
                className: "absolute bottom-8 left-1/2 flex flex-col items-center gap-2 z-10",
                style: { transform: "translateX(-50%)" },
                animate: { y: [0, 8, 0] },
                transition: { duration: 2, repeat: 1 / 0, ease: "easeInOut" },
                initial: { opacity: 0 },
                "data-fg-d3bl94": ":0:/src/app/App.tsx:614:11:23254:599:e:motion.div:ete",
                children: [
                  /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl95", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.55rem", letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase", opacity: 0.7 }, "data-fg-d3bl95": ":0:/src/app/App.tsx:621:13:23587:161:e:span:t", children: "Discover" }),
                  /* @__PURE__ */ h(f, { _fgT: Dd, _fgS: "d3bl97", _fgB: 1783876759592, size: 16, style: { color: "#c9a84c", opacity: 0.7 }, "data-fg-d3bl97": ":0:node_modules/lucide-react:622:13:23761:68:e:ChevronDown::::::Ddn3" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl99", _fgB: 1783876759592, style: { background: "#9b1b30", padding: "14px 0", overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)" }, "data-fg-d3bl99": ":0:/src/app/App.tsx:627:9:23918:1092:e:div:e", children: /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl100", _fgB: 1783876759592, className: "marquee-track", "data-fg-d3bl100": ":0:/src/app/App.tsx:628:11:24100:895:e:div:x", children: [...Array(2)].map((c, l) => /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl102", _fgB: 1783876759592, className: "flex items-center", style: { flexShrink: 0 }, "data-fg-d3bl102": ":0:/src/app/App.tsx:630:15:24190:772:e:div:x", children: ["Luxury Drapes", "Bespoke Tailoring", "Heritage Craftsmanship", "White Glove Service", "48 Fabric Varieties", "Custom Measurements", "Free Home Consultation", "Premium Velvet", "Pure Silk"].map((u, p) => /* @__PURE__ */ b(f, { _fgT: "span", _fgS: "d3bl104", _fgB: 1783876759592, className: "flex items-center font-cinzel", style: { fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#f5ecd7", padding: "0 40px", whiteSpace: "nowrap" }, "data-fg-d3bl104": ":0:/src/app/App.tsx:632:19:24503:418:e:span:xte", children: [
        u,
        /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl106", _fgB: 1783876759592, style: { marginLeft: 40, width: 5, height: 5, background: "#c9a84c", transform: "rotate(45deg)", display: "inline-block", flexShrink: 0 }, "data-fg-d3bl106": ":0:/src/app/App.tsx:634:21:24748:147:e:span" })
      ] }, p)) }, l)) }) }),
      /* @__PURE__ */ h(f, { _fgT: "section", _fgS: "d3bl108", _fgB: 1783876759592, id: "collections", style: { padding: "120px 0 140px" }, "data-fg-d3bl108": ":0:/src/app/App.tsx:643:9:25054:4817:e:section:e", children: /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl109", _fgB: 1783876759592, style: { maxWidth: 1280, margin: "0 auto", padding: "0 40px" }, "data-fg-d3bl109": ":0:/src/app/App.tsx:644:11:25128:4724:e:div:ete", children: [
        /* @__PURE__ */ b(f, { _fgT: q, _fgS: "d3bl110", _fgB: 1783876759592, className: "text-center mb-20", "data-fg-d3bl110": ":0:/src/app/App.tsx:645:13:25210:1137:e:FadeUp:etete:::::Cac4", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl111", _fgB: 1783876759592, className: "flex items-center justify-center gap-4 mb-6", "data-fg-d3bl111": ":0:/src/app/App.tsx:646:15:25263:488:e:div:etete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl112", _fgB: 1783876759592, style: { width: 60, height: 1, background: "linear-gradient(to right, transparent, #c9a84c)" }, "data-fg-d3bl112": ":0:/src/app/App.tsx:647:17:25341:103:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl113", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.6rem", letterSpacing: "0.35em", color: "#c9a84c", textTransform: "uppercase" }, "data-fg-d3bl113": ":0:/src/app/App.tsx:648:17:25461:150:e:span:t", children: "Our Atelier" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl115", _fgB: 1783876759592, style: { width: 60, height: 1, background: "linear-gradient(to left, transparent, #c9a84c)" }, "data-fg-d3bl115": ":0:/src/app/App.tsx:649:17:25628:102:e:div" })
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "h2", _fgS: "d3bl116", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#f5ecd7", lineHeight: 1.2, marginBottom: 20 }, "data-fg-d3bl116": ":0:/src/app/App.tsx:651:15:25766:249:e:h2:te", children: [
            "The Signature ",
            /* @__PURE__ */ h(f, { _fgT: "em", _fgS: "d3bl118", _fgB: 1783876759592, style: { color: "#c9a84c" }, "data-fg-d3bl118": ":0:/src/app/App.tsx:652:31:25946:49:e:em:t", children: "Collections" })
          ] }),
          /* @__PURE__ */ h(f, { _fgT: "p", _fgS: "d3bl120", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "1rem", color: "#f5ecd7", opacity: 0.55, maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }, "data-fg-d3bl120": ":0:/src/app/App.tsx:654:15:26030:295:e:p:t", children: "Each piece is conceived in our studio, woven by master artisans, and delivered to transform your most cherished spaces." })
        ] }),
        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl122", _fgB: 1783876759592, style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }, "data-fg-d3bl122": ":0:/src/app/App.tsx:659:13:26361:3474:e:div:x", children: ef.map((c, l) => /* @__PURE__ */ h(f, { _fgT: q, _fgS: "d3bl124", _fgB: 1783876759592, delay: l * 0.08, "data-fg-d3bl124": ":0:/src/app/App.tsx:661:17:26528:3270:e:FadeUp:e:::::Cac4", children: /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl125", _fgB: 1783876759592, className: "card-hover", style: { borderRadius: 2, overflow: "hidden", background: "#112819", border: "1px solid rgba(201,168,76,0.1)", cursor: "pointer" }, "data-fg-d3bl125": ":0:/src/app/App.tsx:662:19:26588:3184:e:div:xtetxte", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl127", _fgB: 1783876759592, style: { position: "relative", height: 280, overflow: "hidden", background: "#0a1f0e" }, "data-fg-d3bl127": ":0:/src/app/App.tsx:664:21:26803:1019:e:div:etete", children: [
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "img",
                _fgS: "d3bl128",
                _fgB: 1783876759592,
                src: `https://images.unsplash.com/photo-${c.img}?w=600&h=360&fit=crop&auto=format`,
                alt: c.name,
                style: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease", display: "block" },
                onMouseEnter: (u) => {
                  u.target.style.transform = "scale(1.07)";
                },
                onMouseLeave: (u) => {
                  u.target.style.transform = "scale(1)";
                },
                "data-fg-d3bl128": ":0:/src/app/App.tsx:665:23:26920:544:e:img"
              }
            ),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl129", _fgB: 1783876759592, style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,31,14,0.8) 0%, transparent 50%)" }, "data-fg-d3bl129": ":0:/src/app/App.tsx:672:23:27487:129:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl130", _fgB: 1783876759592, style: { position: "absolute", top: 16, right: 16 }, "data-fg-d3bl130": ":0:/src/app/App.tsx:673:23:27639:156:e:div:e", children: /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl131", _fgB: 1783876759592, className: "tag-pill", "data-fg-d3bl131": ":0:/src/app/App.tsx:674:25:27722:44:e:span:x", children: c.tag }) })
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl134", _fgB: 1783876759592, style: { padding: "24px 28px 28px" }, "data-fg-d3bl134": ":0:/src/app/App.tsx:679:21:27880:1867:e:div:etetetete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl135", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.6rem", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 8, opacity: 0.8 }, "data-fg-d3bl135": ":0:/src/app/App.tsx:680:23:27946:231:e:div:x", children: c.category }),
            /* @__PURE__ */ h(f, { _fgT: "h3", _fgS: "d3bl137", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "1.4rem", fontWeight: 700, color: "#f5ecd7", marginBottom: 10 }, "data-fg-d3bl137": ":0:/src/app/App.tsx:683:23:28200:178:e:h3:x", children: c.name }),
            /* @__PURE__ */ h(f, { _fgT: "p", _fgS: "d3bl139", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.88rem", color: "#f5ecd7", opacity: 0.5, lineHeight: 1.7, marginBottom: 20 }, "data-fg-d3bl139": ":0:/src/app/App.tsx:686:23:28401:190:e:p:x", children: c.desc }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl141", _fgB: 1783876759592, className: "gold-line", style: { marginBottom: 20 }, "data-fg-d3bl141": ":0:/src/app/App.tsx:689:23:28614:58:e:div" }),
            /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl142", _fgB: 1783876759592, className: "flex items-center justify-between", "data-fg-d3bl142": ":0:/src/app/App.tsx:690:23:28695:1025:e:div:ete", children: [
              /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl143", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.75rem", color: "#c9a84c", letterSpacing: "0.08em" }, "data-fg-d3bl143": ":0:/src/app/App.tsx:691:25:28771:124:e:span:x", children: c.price }),
              /* @__PURE__ */ b(
                f,
                {
                  _fgT: "button",
                  _fgS: "d3bl145",
                  _fgB: 1783876759592,
                  style: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#f5ecd7", opacity: 0.6, fontFamily: "Cinzel, serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", transition: "opacity 0.2s, color 0.2s" },
                  onMouseEnter: (u) => {
                    u.currentTarget.style.opacity = "1", u.currentTarget.style.color = "#c9a84c";
                  },
                  onMouseLeave: (u) => {
                    u.currentTarget.style.opacity = "0.6", u.currentTarget.style.color = "#f5ecd7";
                  },
                  "data-fg-d3bl145": ":0:/src/app/App.tsx:692:25:28920:771:e:button:te",
                  children: [
                    "View Details ",
                    /* @__PURE__ */ h(f, { _fgT: Cd, _fgS: "d3bl147", _fgB: 1783876759592, size: 12, "data-fg-d3bl147": ":0:node_modules/lucide-react:696:40:29633:24:e:ArrowRight::::::s5N" })
                  ]
                }
              )
            ] })
          ] })
        ] }) }, c.name)) })
      ] }) }),
      /* @__PURE__ */ h(f, { _fgT: "section", _fgS: "d3bl149", _fgB: 1783876759592, id: "craftsmanship", style: { position: "relative", overflow: "hidden" }, "data-fg-d3bl149": ":0:/src/app/App.tsx:708:9:29931:3821:e:section:e", children: /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl150", _fgB: 1783876759592, style: { display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 600 }, "data-fg-d3bl150": ":0:/src/app/App.tsx:709:11:30023:3710:e:div:xtetxte", children: [
        /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl152", _fgB: 1783876759592, style: { position: "relative", overflow: "hidden", minHeight: 480 }, "data-fg-d3bl152": ":0:/src/app/App.tsx:711:13:30148:1121:e:div:etetxte", children: [
          /* @__PURE__ */ h(
            f,
            {
              _fgT: "img",
              _fgS: "d3bl153",
              _fgB: 1783876759592,
              src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=700&fit=crop&auto=format",
              alt: "Master artisan hand-stitching luxury drapes in our atelier",
              style: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
              "data-fg-d3bl153": ":0:/src/app/App.tsx:712:15:30237:311:e:img"
            }
          ),
          /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl154", _fgB: 1783876759592, style: { position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #0a1f0e 100%)" }, "data-fg-d3bl154": ":0:/src/app/App.tsx:717:15:30563:122:e:div" }),
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl156", _fgB: 1783876759592, style: { position: "absolute", bottom: 48, left: 48, border: "1px solid rgba(201,168,76,0.4)", padding: "20px 28px", background: "rgba(10,31,14,0.85)", backdropFilter: "blur(12px)" }, "data-fg-d3bl156": ":0:/src/app/App.tsx:719:15:30737:513:e:div:ete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl157", _fgB: 1783876759592, className: "shimmer-gold font-cinzel", style: { fontSize: "2rem", fontWeight: 700 }, "data-fg-d3bl157": ":0:/src/app/App.tsx:720:17:30943:97:e:div:t", children: "15+" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl159", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.75rem", color: "#f5ecd7", opacity: 0.6, letterSpacing: "0.15em", textTransform: "uppercase" }, "data-fg-d3bl159": ":0:/src/app/App.tsx:721:17:31057:172:e:div:t", children: "Years of Excellence" })
          ] })
        ] }),
        /* @__PURE__ */ b(f, { _fgT: q, _fgS: "d3bl162", _fgB: 1783876759592, delay: 0.2, className: "flex flex-col justify-center", style: { padding: "80px 64px 80px 72px", background: "#0a1f0e" }, "data-fg-d3bl162": ":0:/src/app/App.tsx:726:13:31313:2403:e:FadeUp:etetetetete:::::Cac4", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl163", _fgB: 1783876759592, className: "flex items-center gap-4 mb-8", "data-fg-d3bl163": ":0:/src/app/App.tsx:727:15:31455:312:e:div:ete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl164", _fgB: 1783876759592, style: { width: 40, height: 1, background: "#c9a84c" }, "data-fg-d3bl164": ":0:/src/app/App.tsx:728:17:31518:63:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl165", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.6rem", letterSpacing: "0.35em", color: "#c9a84c", textTransform: "uppercase" }, "data-fg-d3bl165": ":0:/src/app/App.tsx:729:17:31598:148:e:span:t", children: "Our Story" })
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "h2", _fgS: "d3bl167", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#f5ecd7", lineHeight: 1.3, marginBottom: 24 }, "data-fg-d3bl167": ":0:/src/app/App.tsx:731:15:31782:292:e:h2:tete", children: [
            "Handcrafted with Passion,",
            /* @__PURE__ */ h(f, { _fgT: "br", _fgS: "d3bl169", _fgB: 1783876759592, "data-fg-d3bl169": ":0:/src/app/App.tsx:732:42:31971:6:e:br" }),
            /* @__PURE__ */ h(f, { _fgT: "em", _fgS: "d3bl170", _fgB: 1783876759592, style: { color: "#c9a84c" }, "data-fg-d3bl170": ":0:/src/app/App.tsx:733:17:31994:60:e:em:t", children: "Delivered with Purpose" })
          ] }),
          /* @__PURE__ */ h(f, { _fgT: "p", _fgS: "d3bl172", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.95rem", color: "#f5ecd7", opacity: 0.6, lineHeight: 1.9, marginBottom: 16 }, "data-fg-d3bl172": ":0:/src/app/App.tsx:735:15:32089:421:e:p:t", children: "SanCurtains was founded in 2008 with a singular belief: that window treatments should be as thoughtfully designed as the rooms they inhabit. What began as a small studio in Jaipur has grown into one of India's most respected names in luxury soft furnishings." }),
          /* @__PURE__ */ h(f, { _fgT: "p", _fgS: "d3bl174", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.95rem", color: "#f5ecd7", opacity: 0.6, lineHeight: 1.9, marginBottom: 40 }, "data-fg-d3bl174": ":0:/src/app/App.tsx:738:15:32525:357:e:p:t", children: "Every panel that leaves our atelier carries the fingerprints of artisans who have spent decades perfecting their craft — each pleat measured, each seam pressed with the precision of a couturier." }),
          /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl176", _fgB: 1783876759592, style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }, "data-fg-d3bl176": ":0:/src/app/App.tsx:741:15:32897:659:e:div:x", children: [["Bespoke fitting included", ""], ["48 exclusive fabrics", ""], ["Pan-India delivery", ""], ["Custom sizing, any window", ""]].map(([c], l) => /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl178", _fgB: 1783876759592, className: "flex items-center gap-3", "data-fg-d3bl178": ":0:/src/app/App.tsx:743:19:33171:344:e:div:ete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl179", _fgB: 1783876759592, style: { width: 6, height: 6, background: "#9b1b30", borderRadius: 1, transform: "rotate(45deg)", flexShrink: 0 }, "data-fg-d3bl179": ":0:/src/app/App.tsx:744:21:33241:122:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl180", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.85rem", color: "#f5ecd7", opacity: 0.65 }, "data-fg-d3bl180": ":0:/src/app/App.tsx:745:21:33384:106:e:span:x", children: c })
          ] }, l)) }),
          /* @__PURE__ */ h(f, { _fgT: "a", _fgS: "d3bl182", _fgB: 1783876759592, href: "#contact", className: "btn-gold", style: { alignSelf: "flex-start", display: "inline-block" }, "data-fg-d3bl182": ":0:/src/app/App.tsx:749:15:33571:123:e:a:t", children: "Start Your Journey" })
        ] })
      ] }) }),
      /* @__PURE__ */ h(f, { _fgT: "section", _fgS: "d3bl185", _fgB: 1783876759592, style: { padding: "120px 0", background: "#0d2416" }, "data-fg-d3bl185": ":0:/src/app/App.tsx:755:9:33801:2043:e:section:e", children: /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl186", _fgB: 1783876759592, style: { maxWidth: 1280, margin: "0 auto", padding: "0 40px" }, "data-fg-d3bl186": ":0:/src/app/App.tsx:756:11:33875:1950:e:div:ete", children: [
        /* @__PURE__ */ b(f, { _fgT: q, _fgS: "d3bl187", _fgB: 1783876759592, className: "text-center mb-16", "data-fg-d3bl187": ":0:/src/app/App.tsx:757:13:33957:821:e:FadeUp:ete:::::Cac4", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl188", _fgB: 1783876759592, className: "flex items-center justify-center gap-4 mb-6", "data-fg-d3bl188": ":0:/src/app/App.tsx:758:15:34010:492:e:div:etete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl189", _fgB: 1783876759592, style: { width: 60, height: 1, background: "linear-gradient(to right, transparent, #c9a84c)" }, "data-fg-d3bl189": ":0:/src/app/App.tsx:759:17:34088:103:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl190", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.6rem", letterSpacing: "0.35em", color: "#c9a84c", textTransform: "uppercase" }, "data-fg-d3bl190": ":0:/src/app/App.tsx:760:17:34208:154:e:span:t", children: "The San Promise" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl192", _fgB: 1783876759592, style: { width: 60, height: 1, background: "linear-gradient(to left, transparent, #c9a84c)" }, "data-fg-d3bl192": ":0:/src/app/App.tsx:761:17:34379:102:e:div" })
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "h2", _fgS: "d3bl193", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#f5ecd7", lineHeight: 1.25 }, "data-fg-d3bl193": ":0:/src/app/App.tsx:763:15:34517:239:e:h2:tet", children: [
            "Why ",
            /* @__PURE__ */ h(f, { _fgT: "em", _fgS: "d3bl195", _fgB: 1783876759592, style: { color: "#c9a84c" }, "data-fg-d3bl195": ":0:/src/app/App.tsx:764:21:34670:48:e:em:t", children: "Discerning" }),
            " Clients Choose Us"
          ] })
        ] }),
        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl198", _fgB: 1783876759592, style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }, "data-fg-d3bl198": ":0:/src/app/App.tsx:768:13:34792:1016:e:div:x", children: nf.map((c, l) => /* @__PURE__ */ h(f, { _fgT: q, _fgS: "d3bl200", _fgB: 1783876759592, delay: l * 0.1, "data-fg-d3bl200": ":0:/src/app/App.tsx:770:17:34953:818:e:FadeUp:e:::::Cac4", children: /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl201", _fgB: 1783876759592, className: "feature-card", style: { padding: "40px 32px", borderRadius: 2 }, "data-fg-d3bl201": ":0:/src/app/App.tsx:771:19:35010:735:e:div:etete", children: [
          /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl202", _fgB: 1783876759592, style: { width: 52, height: 52, background: "rgba(155,27,48,0.15)", border: "1px solid rgba(155,27,48,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, borderRadius: 2 }, "data-fg-d3bl202": ":0:/src/app/App.tsx:772:21:35111:316:e:div:e", children: /* @__PURE__ */ h(f, { _fgT: c.icon, _fgS: "d3bl203", _fgB: 1783876759592, size: 22, style: { color: "#c9a84c" }, "data-fg-d3bl203": ":0:/src/app/App.tsx:773:23:35351:49:e:f.icon" }) }),
          /* @__PURE__ */ h(f, { _fgT: "h3", _fgS: "d3bl204", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "1.15rem", fontWeight: 700, color: "#f5ecd7", marginBottom: 12 }, "data-fg-d3bl204": ":0:/src/app/App.tsx:775:21:35448:129:e:h3:x", children: c.title }),
          /* @__PURE__ */ h(f, { _fgT: "p", _fgS: "d3bl206", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.88rem", color: "#f5ecd7", opacity: 0.5, lineHeight: 1.75 }, "data-fg-d3bl206": ":0:/src/app/App.tsx:776:21:35598:122:e:p:x", children: c.desc })
        ] }) }, c.title)) })
      ] }) }),
      /* @__PURE__ */ h(f, { _fgT: "section", _fgS: "d3bl209", _fgB: 1783876759592, id: "gallery", style: { padding: "120px 0" }, "data-fg-d3bl209": ":0:/src/app/App.tsx:785:9:35884:2072:e:section:e", children: /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl210", _fgB: 1783876759592, style: { maxWidth: 1280, margin: "0 auto", padding: "0 40px" }, "data-fg-d3bl210": ":0:/src/app/App.tsx:786:11:35948:1989:e:div:ete", children: [
        /* @__PURE__ */ b(f, { _fgT: q, _fgS: "d3bl211", _fgB: 1783876759592, className: "text-center mb-16", "data-fg-d3bl211": ":0:/src/app/App.tsx:787:13:36030:791:e:FadeUp:ete:::::Cac4", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl212", _fgB: 1783876759592, className: "flex items-center justify-center gap-4 mb-6", "data-fg-d3bl212": ":0:/src/app/App.tsx:788:15:36083:486:e:div:etete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl213", _fgB: 1783876759592, style: { width: 60, height: 1, background: "linear-gradient(to right, transparent, #c9a84c)" }, "data-fg-d3bl213": ":0:/src/app/App.tsx:789:17:36161:103:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl214", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.6rem", letterSpacing: "0.35em", color: "#c9a84c", textTransform: "uppercase" }, "data-fg-d3bl214": ":0:/src/app/App.tsx:790:17:36281:148:e:span:t", children: "Portfolio" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl216", _fgB: 1783876759592, style: { width: 60, height: 1, background: "linear-gradient(to left, transparent, #c9a84c)" }, "data-fg-d3bl216": ":0:/src/app/App.tsx:791:17:36446:102:e:div" })
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "h2", _fgS: "d3bl217", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#f5ecd7" }, "data-fg-d3bl217": ":0:/src/app/App.tsx:793:15:36584:215:e:h2:te", children: [
            "Spaces We Have ",
            /* @__PURE__ */ h(f, { _fgT: "em", _fgS: "d3bl219", _fgB: 1783876759592, style: { color: "#c9a84c" }, "data-fg-d3bl219": ":0:/src/app/App.tsx:794:32:36730:49:e:em:t", children: "Transformed" })
          ] })
        ] }),
        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl221", _fgB: 1783876759592, style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 200px)", gap: 12 }, "data-fg-d3bl221": ":0:/src/app/App.tsx:798:13:36835:1085:e:div:x", children: sf.map((c, l) => /* @__PURE__ */ b(f, { _fgT: q, _fgS: "d3bl223", _fgB: 1783876759592, delay: l * 0.1, className: c.cols, style: { overflow: "hidden", borderRadius: 2, position: "relative", background: "#0a1f0e" }, "data-fg-d3bl223": ":0:/src/app/App.tsx:800:17:37010:873:e:FadeUp:ete:::::Cac4", children: [
          /* @__PURE__ */ h(
            f,
            {
              _fgT: "img",
              _fgS: "d3bl224",
              _fgB: 1783876759592,
              src: `https://images.unsplash.com/photo-${c.img}?w=800&h=600&fit=crop&auto=format`,
              alt: c.alt,
              style: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" },
              onMouseEnter: (u) => {
                u.target.style.transform = "scale(1.06)";
              },
              onMouseLeave: (u) => {
                u.target.style.transform = "scale(1)";
              },
              "data-fg-d3bl224": ":0:/src/app/App.tsx:801:19:37173:513:e:img"
            }
          ),
          /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl225", _fgB: 1783876759592, style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,31,14,0.6) 0%, transparent 60%)", pointerEvents: "none" }, "data-fg-d3bl225": ":0:/src/app/App.tsx:808:19:37705:152:e:div" })
        ] }, l)) })
      ] }) }),
      /* @__PURE__ */ h(f, { _fgT: "section", _fgS: "d3bl227", _fgB: 1783876759592, id: "testimonials", style: { padding: "120px 0", background: "linear-gradient(135deg, #0a1f0e 0%, #170a0a 100%)" }, "data-fg-d3bl227": ":0:/src/app/App.tsx:816:9:38001:3480:e:section:e", children: /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl228", _fgB: 1783876759592, style: { maxWidth: 1e3, margin: "0 auto", padding: "0 40px" }, "data-fg-d3bl228": ":0:/src/app/App.tsx:817:11:38135:3327:e:div:etxte", children: [
        /* @__PURE__ */ b(f, { _fgT: q, _fgS: "d3bl229", _fgB: 1783876759592, className: "text-center mb-16", "data-fg-d3bl229": ":0:/src/app/App.tsx:818:13:38217:791:e:FadeUp:ete:::::Cac4", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl230", _fgB: 1783876759592, className: "flex items-center justify-center gap-4 mb-6", "data-fg-d3bl230": ":0:/src/app/App.tsx:819:15:38270:491:e:div:etete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl231", _fgB: 1783876759592, style: { width: 60, height: 1, background: "linear-gradient(to right, transparent, #c9a84c)" }, "data-fg-d3bl231": ":0:/src/app/App.tsx:820:17:38348:103:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl232", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.6rem", letterSpacing: "0.35em", color: "#c9a84c", textTransform: "uppercase" }, "data-fg-d3bl232": ":0:/src/app/App.tsx:821:17:38468:153:e:span:t", children: "Client Stories" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl234", _fgB: 1783876759592, style: { width: 60, height: 1, background: "linear-gradient(to left, transparent, #c9a84c)" }, "data-fg-d3bl234": ":0:/src/app/App.tsx:822:17:38638:102:e:div" })
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "h2", _fgS: "d3bl235", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#f5ecd7" }, "data-fg-d3bl235": ":0:/src/app/App.tsx:824:15:38776:210:e:h2:te", children: [
            "Voices of ",
            /* @__PURE__ */ h(f, { _fgT: "em", _fgS: "d3bl237", _fgB: 1783876759592, style: { color: "#c9a84c" }, "data-fg-d3bl237": ":0:/src/app/App.tsx:825:27:38917:49:e:em:t", children: "Distinction" })
          ] })
        ] }),
        /* @__PURE__ */ b(f, { _fgT: q, _fgS: "d3bl240", _fgB: 1783876759592, "data-fg-d3bl240": ":0:/src/app/App.tsx:830:13:39061:2384:e:FadeUp:etxte:::::Cac4", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl241", _fgB: 1783876759592, style: { border: "1px solid rgba(201,168,76,0.2)", padding: "52px 60px", background: "rgba(17,40,25,0.5)", backdropFilter: "blur(8px)", borderRadius: 2, marginBottom: 32, position: "relative" }, "data-fg-d3bl241": ":0:/src/app/App.tsx:831:15:39084:1583:e:div:etetete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl242", _fgB: 1783876759592, style: { position: "absolute", top: 32, left: 40, color: "#c9a84c", opacity: 0.2, fontSize: "6rem", lineHeight: 1, fontFamily: "Georgia, serif" }, "data-fg-d3bl242": ":0:/src/app/App.tsx:832:17:39301:159:e:div:t", children: '"' }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl244", _fgB: 1783876759592, className: "flex gap-2 mb-6", style: { position: "relative", zIndex: 1 }, "data-fg-d3bl244": ":0:/src/app/App.tsx:833:17:39477:299:e:div:x", children: [...Array(ht[a].rating)].map((c, l) => /* @__PURE__ */ h(f, { _fgT: qd, _fgS: "d3bl246", _fgB: 1783876759592, size: 14, fill: "#c9a84c", style: { color: "#c9a84c" }, "data-fg-d3bl246": ":0:node_modules/lucide-react:835:21:39661:70:e:Star::::::hX0" }, l)) }),
            /* @__PURE__ */ h(f, { _fgT: "p", _fgS: "d3bl247", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "clamp(1rem, 2vw, 1.25rem)", fontStyle: "italic", color: "#f5ecd7", opacity: 0.88, lineHeight: 1.8, marginBottom: 40, position: "relative", zIndex: 1 }, "data-fg-d3bl247": ":0:/src/app/App.tsx:838:17:39793:279:e:p:x", children: ht[a].text }),
            /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl249", _fgB: 1783876759592, className: "flex items-center gap-4", "data-fg-d3bl249": ":0:/src/app/App.tsx:841:17:40089:557:e:div:ete", children: [
              /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl250", _fgB: 1783876759592, className: "testimonial-avatar", "data-fg-d3bl250": ":0:/src/app/App.tsx:842:19:40149:84:e:div:x", children: ht[a].initials }),
              /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl252", _fgB: 1783876759592, "data-fg-d3bl252": ":0:/src/app/App.tsx:843:19:40252:371:e:div:ete", children: [
                /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl253", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.9rem", color: "#f5ecd7", letterSpacing: "0.08em" }, "data-fg-d3bl253": ":0:/src/app/App.tsx:844:21:40278:147:e:div:x", children: ht[a].name }),
                /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl255", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.78rem", color: "#c9a84c", opacity: 0.7, marginTop: 3 }, "data-fg-d3bl255": ":0:/src/app/App.tsx:845:21:40446:152:e:div:x", children: ht[a].role })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl258", _fgB: 1783876759592, className: "flex justify-center gap-3", "data-fg-d3bl258": ":0:/src/app/App.tsx:851:15:40710:713:e:div:x", children: ht.map((c, l) => /* @__PURE__ */ h(
            f,
            {
              _fgT: "button",
              _fgS: "d3bl260",
              _fgB: 1783876759592,
              onClick: () => o(l),
              style: {
                width: l === a ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: l === a ? "#c9a84c" : "rgba(201,168,76,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0
              },
              "data-fg-d3bl260": ":0:/src/app/App.tsx:853:19:40818:564:e:button"
            },
            l
          )) })
        ] })
      ] }) }),
      /* @__PURE__ */ b(f, { _fgT: "section", _fgS: "d3bl262", _fgB: 1783876759592, id: "contact", style: { position: "relative", overflow: "hidden", padding: "120px 40px" }, "data-fg-d3bl262": ":0:/src/app/App.tsx:874:9:41530:4485:e:section:etetete", children: [
        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl263", _fgB: 1783876759592, style: { position: "absolute", inset: 0, background: "linear-gradient(135deg, #9b1b30 0%, #7a1020 50%, #5c0b18 100%)" }, "data-fg-d3bl263": ":0:/src/app/App.tsx:875:11:41639:128:e:div" }),
        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl264", _fgB: 1783876759592, style: { position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }, "data-fg-d3bl264": ":0:/src/app/App.tsx:876:11:41778:236:e:div" }),
        /* @__PURE__ */ h(
          f,
          {
            _fgT: "div",
            _fgS: "d3bl265",
            _fgB: 1783876759592,
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
              pointerEvents: "none"
            },
            "data-fg-d3bl265": ":0:/src/app/App.tsx:877:11:42025:356:e:div"
          }
        ),
        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl266", _fgB: 1783876759592, style: { position: "relative", maxWidth: 800, margin: "0 auto", textAlign: "center" }, "data-fg-d3bl266": ":0:/src/app/App.tsx:887:11:42393:3603:e:div:e", children: /* @__PURE__ */ b(f, { _fgT: q, _fgS: "d3bl267", _fgB: 1783876759592, "data-fg-d3bl267": ":0:/src/app/App.tsx:888:13:42498:3481:e:FadeUp:etetetetete:::::Cac4", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl268", _fgB: 1783876759592, className: "flex items-center justify-center gap-4 mb-8", "data-fg-d3bl268": ":0:/src/app/App.tsx:889:15:42521:375:e:div:etete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl269", _fgB: 1783876759592, style: { width: 60, height: 1, background: "rgba(201,168,76,0.5)" }, "data-fg-d3bl269": ":0:/src/app/App.tsx:890:17:42599:76:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl270", _fgB: 1783876759592, style: { width: 7, height: 7, background: "#c9a84c", transform: "rotate(45deg)" }, "data-fg-d3bl270": ":0:/src/app/App.tsx:891:17:42692:90:e:div" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl271", _fgB: 1783876759592, style: { width: 60, height: 1, background: "rgba(201,168,76,0.5)" }, "data-fg-d3bl271": ":0:/src/app/App.tsx:892:17:42799:76:e:div" })
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "h2", _fgS: "d3bl272", _fgB: 1783876759592, className: "font-playfair", style: { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#f5ecd7", lineHeight: 1.2, marginBottom: 24 }, "data-fg-d3bl272": ":0:/src/app/App.tsx:894:15:42911:267:e:h2:tete", children: [
            "Begin Your",
            /* @__PURE__ */ h(f, { _fgT: "br", _fgS: "d3bl274", _fgB: 1783876759592, "data-fg-d3bl274": ":0:/src/app/App.tsx:895:27:43087:6:e:br" }),
            /* @__PURE__ */ h(f, { _fgT: "em", _fgS: "d3bl275", _fgB: 1783876759592, className: "shimmer-gold", "data-fg-d3bl275": ":0:/src/app/App.tsx:896:17:43110:48:e:em:t", children: "Transformation" })
          ] }),
          /* @__PURE__ */ h(f, { _fgT: "p", _fgS: "d3bl277", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "1rem", color: "#f5ecd7", opacity: 0.7, lineHeight: 1.8, marginBottom: 52, maxWidth: 520, margin: "0 auto 52px" }, "data-fg-d3bl277": ":0:/src/app/App.tsx:898:15:43193:356:e:p:t", children: "Schedule a complimentary home consultation. Our design specialist visits you, understands your space, and curates a bespoke collection — entirely at our cost." }),
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl279", _fgB: 1783876759592, style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 560, margin: "0 auto 40px", textAlign: "left" }, "data-fg-d3bl279": ":0:/src/app/App.tsx:902:15:43565:1540:e:div:etetete", children: [
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "input",
                _fgS: "d3bl280",
                _fgB: 1783876759592,
                placeholder: "Your Full Name",
                className: "font-raleway",
                style: { background: "rgba(245,236,215,0.08)", border: "1px solid rgba(245,236,215,0.2)", padding: "16px 20px", color: "#f5ecd7", fontSize: "0.9rem", outline: "none", borderRadius: 1 },
                "data-fg-d3bl280": ":0:/src/app/App.tsx:903:17:43713:319:e:input"
              }
            ),
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "input",
                _fgS: "d3bl281",
                _fgB: 1783876759592,
                placeholder: "Phone Number",
                className: "font-raleway",
                style: { background: "rgba(245,236,215,0.08)", border: "1px solid rgba(245,236,215,0.2)", padding: "16px 20px", color: "#f5ecd7", fontSize: "0.9rem", outline: "none", borderRadius: 1 },
                "data-fg-d3bl281": ":0:/src/app/App.tsx:908:17:44049:317:e:input"
              }
            ),
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "input",
                _fgS: "d3bl282",
                _fgB: 1783876759592,
                placeholder: "Your City",
                className: "font-raleway",
                style: { background: "rgba(245,236,215,0.08)", border: "1px solid rgba(245,236,215,0.2)", padding: "16px 20px", color: "#f5ecd7", fontSize: "0.9rem", outline: "none", borderRadius: 1 },
                "data-fg-d3bl282": ":0:/src/app/App.tsx:913:17:44383:314:e:input"
              }
            ),
            /* @__PURE__ */ h(
              f,
              {
                _fgT: "input",
                _fgS: "d3bl283",
                _fgB: 1783876759592,
                placeholder: "Preferred Date",
                type: "date",
                className: "font-raleway",
                style: { background: "rgba(245,236,215,0.08)", border: "1px solid rgba(245,236,215,0.2)", padding: "16px 20px", color: "#f5ecd7", fontSize: "0.9rem", outline: "none", borderRadius: 1, colorScheme: "dark" },
                "data-fg-d3bl283": ":0:/src/app/App.tsx:918:17:44714:370:e:input"
              }
            )
          ] }),
          /* @__PURE__ */ h(f, { _fgT: "button", _fgS: "d3bl284", _fgB: 1783876759592, className: "btn-gold", style: { fontSize: "0.72rem", padding: "16px 52px" }, "data-fg-d3bl284": ":0:/src/app/App.tsx:926:15:45121:144:e:button:t", children: "Confirm Consultation" }),
          /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl286", _fgB: 1783876759592, className: "flex justify-center gap-10 mt-14 flex-wrap", "data-fg-d3bl286": ":0:/src/app/App.tsx:930:15:45281:676:e:div:x", children: [
            [/* @__PURE__ */ h(f, { _fgT: $d, _fgS: "d3bl288", _fgB: 1783876759592, size: 14, "data-fg-d3bl288": ":0:node_modules/lucide-react:932:20:45380:27:e:Phone::::::DmpI" }, "p"), "+91 98765 43210"],
            [/* @__PURE__ */ h(f, { _fgT: Id, _fgS: "d3bl289", _fgB: 1783876759592, size: 14, "data-fg-d3bl289": ":0:node_modules/lucide-react:933:20:45448:26:e:Mail::::::D4VR" }, "m"), "hello@sancurtains.com"],
            [/* @__PURE__ */ h(f, { _fgT: jd, _fgS: "d3bl290", _fgB: 1783876759592, size: 14, "data-fg-d3bl290": ":0:node_modules/lucide-react:934:20:45521:29:e:MapPin::::::BveZ" }, "mp"), "Jaipur · Mumbai · Delhi"]
          ].map(([c, l], u) => /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl291", _fgB: 1783876759592, className: "flex items-center gap-2", "data-fg-d3bl291": ":0:/src/app/App.tsx:936:19:45643:273:e:div:ete", children: [
            /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl292", _fgB: 1783876759592, style: { color: "#c9a84c" }, "data-fg-d3bl292": ":0:/src/app/App.tsx:937:21:45713:48:e:span:x", children: c }),
            /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl294", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.85rem", color: "#f5ecd7", opacity: 0.65 }, "data-fg-d3bl294": ":0:/src/app/App.tsx:938:21:45782:109:e:span:x", children: l })
          ] }, u)) })
        ] }) })
      ] }),
      /* @__PURE__ */ h(f, { _fgT: "footer", _fgS: "d3bl297", _fgB: 1783876759592, style: { background: "#060f08", padding: "72px 40px 40px", borderTop: "1px solid rgba(201,168,76,0.12)" }, "data-fg-d3bl297": ":0:/src/app/App.tsx:947:9:46054:5218:e:footer:e", children: /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl298", _fgB: 1783876759592, style: { maxWidth: 1280, margin: "0 auto" }, "data-fg-d3bl298": ":0:/src/app/App.tsx:948:11:46180:5074:e:div:etete", children: [
        /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl299", _fgB: 1783876759592, style: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 64 }, "data-fg-d3bl299": ":0:/src/app/App.tsx:949:13:46243:4034:e:div:xtetxtetxtetxte", children: [
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl301", _fgB: 1783876759592, "data-fg-d3bl301": ":0:/src/app/App.tsx:951:15:46386:1478:e:div:etetete", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl302", _fgB: 1783876759592, className: "font-cinzel shimmer-gold", style: { fontSize: "1.8rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: 4 }, "data-fg-d3bl302": ":0:/src/app/App.tsx:952:17:46408:141:e:div:t", children: "SAN" }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl304", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.55rem", letterSpacing: "0.5em", color: "#f5ecd7", opacity: 0.35, textTransform: "uppercase", marginBottom: 24 }, "data-fg-d3bl304": ":0:/src/app/App.tsx:953:17:46566:178:e:div:t", children: "CURTAINS" }),
            /* @__PURE__ */ h(f, { _fgT: "p", _fgS: "d3bl306", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.85rem", color: "#f5ecd7", opacity: 0.4, lineHeight: 1.8, maxWidth: 260, marginBottom: 32 }, "data-fg-d3bl306": ":0:/src/app/App.tsx:954:17:46761:298:e:p:t", children: "Luxury window dressings crafted with heritage precision since 2008. Transforming Indian homes, one window at a time." }),
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl308", _fgB: 1783876759592, className: "flex gap-4", "data-fg-d3bl308": ":0:/src/app/App.tsx:957:17:47076:767:e:div:x", children: [Nd, Rd].map((c, l) => /* @__PURE__ */ h(
              f,
              {
                _fgT: "button",
                _fgS: "d3bl310",
                _fgB: 1783876759592,
                style: { width: 38, height: 38, border: "1px solid rgba(201,168,76,0.25)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 2, color: "#c9a84c", transition: "background 0.3s" },
                onMouseEnter: (u) => {
                  u.currentTarget.style.background = "rgba(201,168,76,0.1)";
                },
                onMouseLeave: (u) => {
                  u.currentTarget.style.background = "transparent";
                },
                "data-fg-d3bl310": ":0:/src/app/App.tsx:959:21:47185:613:e:button:e",
                children: /* @__PURE__ */ h(f, { _fgT: c, _fgS: "d3bl311", _fgB: 1783876759592, size: 15, "data-fg-d3bl311": ":0:/src/app/App.tsx:963:23:47750:18:e:Icon" })
              },
              l
            )) })
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl313", _fgB: 1783876759592, "data-fg-d3bl313": ":0:/src/app/App.tsx:970:15:47914:893:e:div:etx", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl314", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.65rem", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 20 }, "data-fg-d3bl314": ":0:/src/app/App.tsx:971:17:47936:167:e:div:t", children: "Collections" }),
            ["Velvet Royale", "Silk Cascade", "Linen Serenity", "Blackout Velour", "Sheer Whisper"].map((c) => /* @__PURE__ */ h(
              f,
              {
                _fgT: "a",
                _fgS: "d3bl317",
                _fgB: 1783876759592,
                href: "#collections",
                className: "block font-raleway",
                style: { fontSize: "0.85rem", color: "#f5ecd7", opacity: 0.45, marginBottom: 10, textDecoration: "none", transition: "opacity 0.2s, color 0.2s" },
                onMouseEnter: (l) => {
                  l.target.style.opacity = "1", l.target.style.color = "#c9a84c";
                },
                onMouseLeave: (l) => {
                  l.target.style.opacity = "0.45", l.target.style.color = "#f5ecd7";
                },
                "data-fg-d3bl317": ":0:/src/app/App.tsx:973:19:48240:526:e:a:x",
                children: c
              },
              c
            ))
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl320", _fgB: 1783876759592, "data-fg-d3bl320": ":0:/src/app/App.tsx:981:15:48854:890:e:div:etx", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl321", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.65rem", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 20 }, "data-fg-d3bl321": ":0:/src/app/App.tsx:982:17:48876:164:e:div:t", children: "Services" }),
            ["Home Consultation", "Custom Stitching", "Installation", "Fabric Sourcing", "Corporate Projects"].map((c) => /* @__PURE__ */ h(
              f,
              {
                _fgT: "a",
                _fgS: "d3bl324",
                _fgB: 1783876759592,
                href: "#",
                className: "block font-raleway",
                style: { fontSize: "0.85rem", color: "#f5ecd7", opacity: 0.45, marginBottom: 10, textDecoration: "none", transition: "opacity 0.2s, color 0.2s" },
                onMouseEnter: (l) => {
                  l.target.style.opacity = "1", l.target.style.color = "#c9a84c";
                },
                onMouseLeave: (l) => {
                  l.target.style.opacity = "0.45", l.target.style.color = "#f5ecd7";
                },
                "data-fg-d3bl324": ":0:/src/app/App.tsx:984:19:49188:515:e:a:x",
                children: c
              },
              c
            ))
          ] }),
          /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl327", _fgB: 1783876759592, "data-fg-d3bl327": ":0:/src/app/App.tsx:992:15:49789:469:e:div:etx", children: [
            /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl328", _fgB: 1783876759592, className: "font-cinzel", style: { fontSize: "0.65rem", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 20 }, "data-fg-d3bl328": ":0:/src/app/App.tsx:993:17:49811:162:e:div:t", children: "Cities" }),
            ["Jaipur (HQ)", "Mumbai", "Delhi NCR", "Bangalore", "Hyderabad"].map((c) => /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl331", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.85rem", color: "#f5ecd7", opacity: 0.45, marginBottom: 10 }, "data-fg-d3bl331": ":0:/src/app/App.tsx:995:19:50087:130:e:div:x", children: c }, c))
          ] })
        ] }),
        /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl333", _fgB: 1783876759592, className: "gold-line", style: { marginBottom: 32 }, "data-fg-d3bl333": ":0:/src/app/App.tsx:1000:13:50291:58:e:div" }),
        /* @__PURE__ */ b(f, { _fgT: "div", _fgS: "d3bl334", _fgB: 1783876759592, className: "flex items-center justify-between flex-wrap gap-4", "data-fg-d3bl334": ":0:/src/app/App.tsx:1002:13:50363:874:e:div:ete", children: [
          /* @__PURE__ */ h(f, { _fgT: "span", _fgS: "d3bl335", _fgB: 1783876759592, className: "font-raleway", style: { fontSize: "0.75rem", color: "#f5ecd7", opacity: 0.3 }, "data-fg-d3bl335": ":0:/src/app/App.tsx:1003:15:50445:213:e:span:t", children: "© 2024 SanCurtains. All rights reserved. Crafted with passion in Jaipur, India." }),
          /* @__PURE__ */ h(f, { _fgT: "div", _fgS: "d3bl337", _fgB: 1783876759592, className: "flex gap-6", "data-fg-d3bl337": ":0:/src/app/App.tsx:1006:15:50673:545:e:div:x", children: ["Privacy Policy", "Terms of Service", "Sitemap"].map((c) => /* @__PURE__ */ h(
            f,
            {
              _fgT: "a",
              _fgS: "d3bl339",
              _fgB: 1783876759592,
              href: "#",
              className: "font-raleway",
              style: { fontSize: "0.75rem", color: "#f5ecd7", opacity: 0.3, textDecoration: "none", transition: "opacity 0.2s" },
              onMouseEnter: (l) => {
                l.target.style.opacity = "0.7";
              },
              onMouseLeave: (l) => {
                l.target.style.opacity = "0.3";
              },
              "data-fg-d3bl339": ":0:/src/app/App.tsx:1008:19:50800:377:e:a:x",
              children: c
            },
            c
          )) })
        ] })
      ] }) })
    ] })
  ] });
}
const rf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: af
}, Symbol.toStringTag, { value: "Module" }));
export {
  lf as Code0_8
};
