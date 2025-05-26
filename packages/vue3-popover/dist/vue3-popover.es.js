import { defineComponent as le, ref as d, watch as W, nextTick as re, computed as A, onMounted as oe, onUnmounted as ue, openBlock as T, createElementBlock as z, createElementVNode as M, renderSlot as $, createBlock as ie, Teleport as se, createVNode as ne, Transition as ve, withCtx as ce, normalizeClass as U, normalizeStyle as X, toDisplayString as Y, createCommentVNode as j, createTextVNode as fe } from "vue";
const de = { class: "popover-wrapper" }, he = { class: "popover-content" }, pe = {
  key: 0,
  class: "popover-title"
}, ge = /* @__PURE__ */ le({
  __name: "Popover",
  props: {
    placement: String,
    width: {
      type: [String, Number],
      default: 200
    },
    offset: {
      type: Number,
      default: 10
    },
    title: String,
    content: String,
    zIndex: {
      type: Number,
      default: 1999
    },
    trigger: {
      type: String,
      default: "click"
    },
    popperClass: String,
    appendTo: {
      type: String,
      default: "body"
    },
    darkMode: Boolean,
    disabled: Boolean
  },
  emits: ["open", "close"],
  setup(s, { expose: _, emit: R }) {
    const o = s, E = (a) => typeof a == "number", h = d(!1), x = () => {
      h.value = !0, O("open");
    }, k = () => {
      h.value = !1, b.value = !1, l.value = o.placement || "bottom", O("close");
    }, B = [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end"
    ], g = d(), i = d(), t = d(), e = d(), y = d(null), l = d(o.placement || "bottom"), O = R, q = () => {
      if (!i.value || !t.value)
        return;
      const a = i.value.getBoundingClientRect(), r = window.innerHeight, u = window.innerWidth, P = a.top - t.value.height - 10, S = a.bottom + 10, C = a.left - t.value.width - 10, L = a.right + 10, n = (w) => {
        if (!w)
          return "bottom";
        const c = a.top < t.value.height, f = a.right + t.value.width > u, m = a.bottom + t.value.height > r, p = a.left < 0;
        switch (w) {
          case "top":
            if (c)
              return "bottom";
            if (p)
              return "top-end";
            if (f)
              return "top-start";
            break;
          case "top-start":
            if (c)
              return "bottom-start";
            if (p)
              return "top-end";
            break;
          case "top-end":
            if (c)
              return "bottom-end";
            if (f)
              return "top-start";
            break;
          case "bottom":
            if (m)
              return "top";
            if (p)
              return "bottom-end";
            if (f)
              return "bottom-start";
            break;
          case "bottom-start":
            if (m)
              return "top-start";
            if (p || f)
              return "bottom-end";
            break;
          case "bottom-end":
            if (m)
              return "top-end";
            if (p)
              return "bottom-start";
            break;
          case "left":
            if (p)
              return "right";
            if (c)
              return "left-start";
            if (m)
              return "left-end";
            break;
          case "left-start":
            if (p)
              return "right-start";
            if (m)
              return "top-start";
            break;
          case "left-end":
            if (p)
              return "right-end";
            if (c)
              return "left-start";
            break;
          case "right":
            if (f)
              return "left";
            if (c)
              return "right-start";
            if (m)
              return "right-end";
            break;
          case "right-start":
            if (f)
              return "left-start";
            if (m)
              return "top-start";
            break;
          case "right-end":
            if (f)
              return "left-end";
            if (c)
              return "right-start";
            break;
        }
        return w;
      };
      switch (l.value) {
        case "top":
          P < 0 ? l.value = "bottom" : l.value = n(l.value);
          break;
        case "bottom":
          S + t.value.height > r ? l.value = "top" : l.value = n(l.value);
          break;
        case "left":
          const w = n(l.value);
          w !== l.value ? l.value = w : C < 0 && (l.value = "right");
          break;
        case "right":
          const c = n(l.value);
          c !== l.value ? l.value = c : L + t.value.width > u && (l.value = "left");
          break;
        case "top-start":
          P < 0 ? l.value = "bottom-start" : l.value = n(l.value);
          break;
        case "top-end":
          P < 0 ? l.value = "bottom-end" : l.value = n(l.value);
          break;
        case "bottom-start":
          S + t.value.height > r ? l.value = "top-start" : l.value = n(l.value);
          break;
        case "bottom-end":
          S + t.value.height > r ? l.value = "top-end" : l.value = n(l.value);
          break;
        case "left-start":
          C < 0 ? l.value = "right-start" : l.value = n(l.value);
          break;
        case "left-end":
          C < 0 ? l.value = "right-end" : l.value = n(l.value);
          break;
        case "right-start":
          L + t.value.width > u ? l.value = "left-start" : l.value = n(l.value);
          break;
        case "right-end":
          const f = n(l.value);
          f !== l.value ? l.value = f : L + t.value.width > u && (l.value = "left-end");
          break;
      }
    }, N = () => {
      i.value && (e.value = i.value.getBoundingClientRect()), h.value && g.value && (t.value = g.value.getBoundingClientRect(), q());
    }, I = () => {
      N();
    }, H = (a) => {
      const r = [];
      let u = a.parentElement;
      for (; u; ) {
        const { overflow: P, overflowX: S, overflowY: C } = window.getComputedStyle(u);
        /(auto|scroll|overlay)/.test(P + S + C) && r.push(u), u = u.parentElement;
      }
      return r;
    }, F = () => {
      if (!i.value)
        return;
      H(i.value).forEach((r) => {
        r.addEventListener("scroll", I, !0);
      });
    }, G = () => {
      if (!i.value)
        return;
      H(i.value).forEach((r) => {
        r.removeEventListener("scroll", I, !0);
      });
    };
    W(
      () => o.placement,
      (a) => {
        a && B.includes(a) && (l.value = a);
      },
      { immediate: !0 }
    ), W(
      () => h.value,
      (a) => {
        !a || re(() => {
          N(), F();
        });
      }
    );
    const J = () => {
      o.trigger !== "click" || o.disabled || (h.value ? k() : x());
    }, v = d(), K = () => {
      o.trigger !== "hover" || o.disabled || (v.value && clearTimeout(v.value), b.value = !1, x());
    }, b = d(!1), Q = () => {
      o.trigger !== "hover" || o.disabled || (v.value && clearTimeout(v.value), v.value = setTimeout(() => {
        b.value || k();
      }, 300));
    }, Z = () => {
      o.trigger !== "hover" || o.disabled || (b.value = !1, v.value && clearTimeout(v.value), v.value = setTimeout(() => {
        b.value || k();
      }, 300));
    }, ee = () => {
      b.value = !0, v.value && clearTimeout(v.value);
    }, te = A(() => {
      if (!i.value || !t.value)
        return {};
      let a = 0, r = 0, u = l.value;
      switch (B.includes(u) || (u = "bottom"), u) {
        case "left":
          a = t.value.width - 5, r = t.value.height / 2 - 5;
          break;
        case "left-start":
          a = t.value.width - 5, r = e.value.height / 2 - 5;
          break;
        case "left-end":
          a = t.value.width - 5, r = t.value.height - e.value.height / 2 - 5;
          break;
        case "right":
          a = -5, r = t.value.height / 2 - 5;
          break;
        case "right-start":
          a = -5, r = e.value.height / 2 - 5;
          break;
        case "right-end":
          a = -5, r = t.value.height - e.value.height / 2 - 5;
          break;
        case "top":
          a = t.value.width / 2 - 5, r = t.value.height - 5;
          break;
        case "top-start":
          a = e.value.width / 2 - 5, r = t.value.height - 5;
          break;
        case "top-end":
          a = t.value.width - e.value.width / 2 - 5, r = t.value.height - 5;
          break;
        case "bottom":
          a = t.value.width / 2 - 5, r = -5;
          break;
        case "bottom-start":
          a = e.value.width / 2 - 5, r = -5;
          break;
        case "bottom-end":
          a = t.value.width - e.value.width / 2 - 5, r = -5;
          break;
      }
      return r > t.value.height && (r = t.value.height - 20), a > t.value.width && (a = t.value.width - 20), { left: `${a}px`, top: `${r}px` };
    }), ae = A(() => {
      if (!i.value || !t.value)
        return {};
      let a = l.value;
      B.includes(a) || (a = "bottom");
      let r = 0, u = 0;
      switch (a) {
        case "left":
          r = e.value.top - t.value.height / 2 + e.value.height / 2, u = e.value.left - t.value.width - o.offset;
          break;
        case "left-start":
          r = e.value.top, u = e.value.left - t.value.width - o.offset;
          break;
        case "left-end":
          r = e.value.top - t.value.height + e.value.height, u = e.value.left - t.value.width - o.offset;
          break;
        case "right":
          r = e.value.top - t.value.height / 2 + e.value.height / 2, u = e.value.left + e.value.width + o.offset;
          break;
        case "right-start":
          r = e.value.top, u = e.value.left + e.value.width + o.offset;
          break;
        case "right-end":
          r = e.value.top - t.value.height + e.value.height, u = e.value.left + e.value.width + o.offset;
          break;
        case "top":
          r = e.value.top - t.value.height - o.offset, u = e.value.left - t.value.width / 2 + e.value.width / 2;
          break;
        case "top-start":
          r = e.value.top - t.value.height - o.offset, u = e.value.left;
          break;
        case "top-end":
          r = e.value.top - t.value.height - o.offset, u = e.value.left + e.value.width - t.value.width;
          break;
        case "bottom":
          r = e.value.top + e.value.height + o.offset, u = e.value.left - t.value.width / 2 + e.value.width / 2;
          break;
        case "bottom-start":
          r = e.value.top + e.value.height + o.offset, u = e.value.left;
          break;
        case "bottom-end":
          r = e.value.top + e.value.height + o.offset, u = e.value.left + e.value.width - t.value.width;
          break;
      }
      return { top: `${r}px`, left: `${u}px` };
    }), V = () => {
      e.value && (e.value = i.value.getBoundingClientRect()), g.value && (t.value = g.value.getBoundingClientRect());
    }, D = (a) => {
      g.value && !g.value.contains(a.target) && !i.value.contains(a.target) && k();
    };
    return oe(() => {
      window.addEventListener("resize", V), window.addEventListener("click", D), i.value && (y.value = new MutationObserver(() => {
        h.value && N();
      }), y.value.observe(i.value, {
        attributes: !0,
        childList: !0,
        subtree: !0,
        characterData: !0
      }));
    }), ue(() => {
      h.value = !1, b.value = !1, window.removeEventListener("resize", V), window.removeEventListener("click", D), G(), y.value && (y.value.disconnect(), y.value = null);
    }), _({
      open: x,
      close: k
    }), (a, r) => (T(), z("div", de, [
      M("span", {
        class: "popover-trigger",
        ref_key: "triggerRef",
        ref: i,
        onClick: J,
        onMouseenter: K,
        onMouseleave: Q
      }, [
        $(a.$slots, "reference", {}, void 0, !0)
      ], 544),
      (T(), ie(se, { to: s.appendTo }, [
        ne(ve, { name: "popoverfade" }, {
          default: ce(() => [
            h.value ? (T(), z("div", {
              key: 0,
              class: U(["popover", [s.popperClass, { "dark-mode": s.darkMode }]]),
              onMouseleave: Z,
              onMouseenter: ee,
              style: X([{ zIndex: s.zIndex, width: E(o.width) ? o.width + "px" : o.width }, ae.value]),
              ref_key: "popoverRef",
              ref: g
            }, [
              M("div", {
                class: U(["popover-arrow", "popover-arrow__" + l.value]),
                style: X(te.value)
              }, null, 6),
              M("div", he, [
                s.title ? (T(), z("div", pe, Y(s.title), 1)) : j("", !0),
                a.$slots.default ? $(a.$slots, "default", { key: 2 }, void 0, !0) : $(a.$slots, "default", { key: 1 }, () => [
                  fe(Y(s.content), 1)
                ], !0)
              ])
            ], 38)) : j("", !0)
          ]),
          _: 3
        })
      ], 8, ["to"]))
    ]));
  }
});
const be = (s, _) => {
  const R = s.__vccOpts || s;
  for (const [o, E] of _)
    R[o] = E;
  return R;
}, me = /* @__PURE__ */ be(ge, [["__scopeId", "data-v-14a94e9e"]]), ke = {
  install: (s) => {
    s.component("Popover", me);
  }
};
export {
  me as Popover,
  ke as default
};
