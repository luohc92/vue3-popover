import { defineComponent as ae, ref as h, watch as D, nextTick as le, computed as W, onMounted as re, onUnmounted as oe, openBlock as R, createElementBlock as N, createElementVNode as L, renderSlot as z, createBlock as ue, Teleport as ie, createVNode as se, Transition as ne, withCtx as ve, normalizeClass as A, normalizeStyle as U, toDisplayString as X, createCommentVNode as Y, createTextVNode as ce } from "vue";
const fe = { class: "popover-wrapper" }, de = { class: "popover-content" }, he = {
  key: 0,
  class: "popover-title"
}, pe = /* @__PURE__ */ ae({
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
  setup(s, { emit: T }) {
    const o = s, _ = (a) => typeof a == "number", v = h(!1), M = () => {
      v.value = !0, $("open");
    }, C = () => {
      v.value = !1, b.value = !1, l.value = o.placement || "bottom", $("close");
    }, E = [
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
    ], g = h(), i = h(), t = h(), e = h(), k = h(null), l = h(o.placement || "bottom"), $ = T, j = () => {
      if (!i.value || !t.value)
        return;
      const a = i.value.getBoundingClientRect(), r = window.innerHeight, u = window.innerWidth, y = a.top - t.value.height - 10, P = a.bottom + 10, S = a.left - t.value.width - 10, x = a.right + 10, n = (w) => {
        if (!w)
          return "bottom";
        const f = a.top < t.value.height, d = a.right + t.value.width > u, m = a.bottom + t.value.height > r, p = a.left < 0;
        switch (w) {
          case "top":
            if (f)
              return "bottom";
            if (p)
              return "top-end";
            if (d)
              return "top-start";
            break;
          case "top-start":
            if (f)
              return "bottom-start";
            if (p)
              return "top-end";
            break;
          case "top-end":
            if (f)
              return "bottom-end";
            if (d)
              return "top-start";
            break;
          case "bottom":
            if (m)
              return "top";
            if (p)
              return "bottom-end";
            if (d)
              return "bottom-start";
            break;
          case "bottom-start":
            if (m)
              return "top-start";
            if (p || d)
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
            if (f)
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
            if (f)
              return "left-start";
            break;
          case "right":
            if (d)
              return "left";
            if (f)
              return "right-start";
            if (m)
              return "right-end";
            break;
          case "right-start":
            if (d)
              return "left-start";
            if (m)
              return "top-start";
            break;
          case "right-end":
            if (d)
              return "left-end";
            if (f)
              return "right-start";
            break;
        }
        return w;
      };
      switch (l.value) {
        case "top":
          y < 0 ? l.value = "bottom" : l.value = n(l.value);
          break;
        case "bottom":
          P + t.value.height > r ? l.value = "top" : l.value = n(l.value);
          break;
        case "left":
          const w = n(l.value);
          w !== l.value ? l.value = w : S < 0 && (l.value = "right");
          break;
        case "right":
          const f = n(l.value);
          f !== l.value ? l.value = f : x + t.value.width > u && (l.value = "left");
          break;
        case "top-start":
          y < 0 ? l.value = "bottom-start" : l.value = n(l.value);
          break;
        case "top-end":
          y < 0 ? l.value = "bottom-end" : l.value = n(l.value);
          break;
        case "bottom-start":
          P + t.value.height > r ? l.value = "top-start" : l.value = n(l.value);
          break;
        case "bottom-end":
          P + t.value.height > r ? l.value = "top-end" : l.value = n(l.value);
          break;
        case "left-start":
          S < 0 ? l.value = "right-start" : l.value = n(l.value);
          break;
        case "left-end":
          S < 0 ? l.value = "right-end" : l.value = n(l.value);
          break;
        case "right-start":
          x + t.value.width > u ? l.value = "left-start" : l.value = n(l.value);
          break;
        case "right-end":
          const d = n(l.value);
          d !== l.value ? l.value = d : x + t.value.width > u && (l.value = "left-end");
          break;
      }
    }, B = () => {
      e.value = i.value.getBoundingClientRect(), v.value && g.value && (t.value = g.value.getBoundingClientRect(), j());
    }, O = () => {
      B();
    }, I = (a) => {
      const r = [];
      let u = a.parentElement;
      for (; u; ) {
        const { overflow: y, overflowX: P, overflowY: S } = window.getComputedStyle(u);
        /(auto|scroll|overlay)/.test(y + P + S) && r.push(u), u = u.parentElement;
      }
      return r;
    }, q = () => {
      if (!i.value)
        return;
      I(i.value).forEach((r) => {
        r.addEventListener("scroll", O, !0);
      });
    }, F = () => {
      if (!i.value)
        return;
      I(i.value).forEach((r) => {
        r.removeEventListener("scroll", O, !0);
      });
    };
    D(
      () => o.placement,
      (a) => {
        a && E.includes(a) && (l.value = a);
      },
      { immediate: !0 }
    ), D(
      () => v.value,
      (a) => {
        !a || le(() => {
          B(), q();
        });
      }
    );
    const G = () => {
      o.trigger !== "click" || o.disabled || (v.value ? C() : M());
    }, c = h(), J = () => {
      o.trigger !== "hover" || o.disabled || (c.value && clearTimeout(c.value), b.value = !1, M());
    }, b = h(!1), K = () => {
      o.trigger !== "hover" || o.disabled || (c.value && clearTimeout(c.value), c.value = setTimeout(() => {
        b.value || C();
      }, 300));
    }, Q = () => {
      o.trigger !== "hover" || o.disabled || (b.value = !1, c.value && clearTimeout(c.value), c.value = setTimeout(() => {
        b.value || C();
      }, 300));
    }, Z = () => {
      b.value = !0, c.value && clearTimeout(c.value);
    }, ee = W(() => {
      if (!i.value || !t.value)
        return {};
      let a = 0, r = 0, u = l.value;
      switch (E.includes(u) || (u = "bottom"), u) {
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
    }), te = W(() => {
      if (!i.value || !t.value)
        return {};
      let a = l.value;
      E.includes(a) || (a = "bottom");
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
    }), H = () => {
      e.value && (e.value = i.value.getBoundingClientRect()), g.value && (t.value = g.value.getBoundingClientRect());
    }, V = (a) => {
      g.value && !g.value.contains(a.target) && !i.value.contains(a.target) && C();
    };
    return re(() => {
      window.addEventListener("resize", H), window.addEventListener("click", V), i.value && (k.value = new MutationObserver(() => {
        v.value && B();
      }), k.value.observe(i.value, {
        attributes: !0,
        childList: !0,
        subtree: !0,
        characterData: !0
      }));
    }), oe(() => {
      v.value = !1, b.value = !1, window.removeEventListener("resize", H), window.removeEventListener("click", V), F(), k.value && (k.value.disconnect(), k.value = null);
    }), (a, r) => (R(), N("div", fe, [
      L("span", {
        class: "popover-trigger",
        ref_key: "triggerRef",
        ref: i,
        onClick: G,
        onMouseenter: J,
        onMouseleave: K
      }, [
        z(a.$slots, "reference", {}, void 0, !0)
      ], 544),
      (R(), ue(ie, { to: s.appendTo }, [
        se(ne, { name: "popoverfade" }, {
          default: ve(() => [
            v.value ? (R(), N("div", {
              key: 0,
              class: A(["popover", [s.popperClass, { "dark-mode": s.darkMode }]]),
              onMouseleave: Q,
              onMouseenter: Z,
              style: U([{ zIndex: s.zIndex, width: _(o.width) ? o.width + "px" : o.width }, te.value]),
              ref_key: "popoverRef",
              ref: g
            }, [
              L("div", {
                class: A(["popover-arrow", "popover-arrow__" + l.value]),
                style: U(ee.value)
              }, null, 6),
              L("div", de, [
                s.title ? (R(), N("div", he, X(s.title), 1)) : Y("", !0),
                a.$slots.default ? z(a.$slots, "default", { key: 2 }, void 0, !0) : z(a.$slots, "default", { key: 1 }, () => [
                  ce(X(s.content), 1)
                ], !0)
              ])
            ], 38)) : Y("", !0)
          ]),
          _: 3
        })
      ], 8, ["to"]))
    ]));
  }
});
const ge = (s, T) => {
  const o = s.__vccOpts || s;
  for (const [_, v] of T)
    o[_] = v;
  return o;
}, be = /* @__PURE__ */ ge(pe, [["__scopeId", "data-v-d51a0833"]]), we = {
  install: (s) => {
    s.component("Popover", be);
  }
};
export {
  be as Popover,
  we as default
};
