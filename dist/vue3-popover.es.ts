import { defineComponent as I, ref as v, watch as L, nextTick as V, computed as S, onMounted as O, onUnmounted as A, openBlock as p, createElementBlock as g, createElementVNode as m, renderSlot as b, createBlock as D, Teleport as U, createVNode as j, Transition as q, withCtx as F, normalizeClass as X, normalizeStyle as Y, toDisplayString as _, createCommentVNode as x, createTextVNode as G } from "vue";
const H = { class: "popover-wrapper" }, J = { class: "popover-content" }, K = {
  key: 0,
  class: "popover-title"
}, Q = /* @__PURE__ */ I({
  __name: "popover",
  props: {
    placement: String,
    width: {
      type: [String, Number],
      default: 200
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
  setup(i, { emit: w }) {
    const r = i, f = (l) => typeof l == "number", s = v(!1), k = () => {
      s.value = !0, T("open");
    }, h = () => {
      s.value = !1, u.value = !1, T("close");
    }, y = [
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
    ], c = v(), d = v(), t = v(), T = w;
    L(
      () => s.value,
      (l) => {
        !l || V(() => {
          if (!c.value) {
            t.value = null;
            return;
          }
          t.value = c.value.getBoundingClientRect();
        });
      }
    );
    const B = () => {
      r.trigger !== "click" || r.disabled || (s.value ? h() : k());
    }, n = v(), P = () => {
      r.trigger !== "hover" || r.disabled || (n.value && clearTimeout(n.value), u.value = !1, k());
    }, u = v(!1), $ = () => {
      r.trigger !== "hover" || r.disabled || (n.value && clearTimeout(n.value), n.value = setTimeout(() => {
        u.value || h();
      }, 300));
    }, z = () => {
      r.trigger !== "hover" || r.disabled || (u.value = !1, n.value && clearTimeout(n.value), n.value = setTimeout(() => {
        u.value || h();
      }, 300));
    }, M = () => {
      u.value = !0, n.value && clearTimeout(n.value);
    }, N = S(() => {
      if (!d.value || !t.value)
        return {};
      const l = d.value.getBoundingClientRect();
      let e = 0, o = 0, a = r.placement || "bottom";
      switch (y.includes(a) || (a = "bottom"), a) {
        case "left":
          e = t.value.width - 5, o = t.value.height / 2 - 5;
          break;
        case "left-start":
          e = t.value.width - 5, o = l.height / 2 - 5;
          break;
        case "left-end":
          e = t.value.width - 5, o = t.value.height - l.height / 2 - 5;
          break;
        case "right":
          e = -5, o = t.value.height / 2 - 5;
          break;
        case "right-start":
          e = -5, o = l.height / 2 - 5;
          break;
        case "right-end":
          e = -5, o = t.value.height - l.height / 2 - 5;
          break;
        case "top":
          e = t.value.width / 2 - 5, o = t.value.height - 5;
          break;
        case "top-start":
          e = l.width / 2 - 5, o = t.value.height - 5;
          break;
        case "top-end":
          e = t.value.width - l.width / 2 - 5, o = t.value.height - 5;
          break;
        case "bottom":
          e = t.value.width / 2 - 5, o = -5;
          break;
        case "bottom-start":
          e = l.width / 2 - 5, o = -5;
          break;
        case "bottom-end":
          e = t.value.width - l.width / 2 - 5, o = -5;
          break;
      }
      return o > t.value.height && (o = t.value.height - 20), e > t.value.width && (e = t.value.width - 20), { left: `${e}px`, top: `${o}px` };
    }), E = S(() => {
      if (!d.value || !t.value)
        return {};
      let l = r.placement || "bottom";
      y.includes(l) || (l = "bottom");
      const e = d.value.getBoundingClientRect();
      let o = 0, a = 0;
      switch (l) {
        case "left":
          o = e.top - t.value.height / 2 + e.height / 2 + window.scrollY, a = e.left - t.value.width - 10 + window.scrollX;
          break;
        case "left-start":
          o = e.top + window.scrollY, a = e.left - t.value.width - 10 + window.scrollX;
          break;
        case "left-end":
          o = e.top - t.value.height + e.height + window.scrollY, a = e.left - t.value.width - 10 + window.scrollX;
          break;
        case "right":
          o = e.top - t.value.height / 2 + e.height / 2 + window.scrollY, a = e.left + e.width + 10 + window.scrollX;
          break;
        case "right-start":
          o = e.top + window.scrollY, a = e.left + e.width + 10 + window.scrollX;
          break;
        case "right-end":
          o = e.top - t.value.height + e.height + window.scrollY, a = e.left + e.width + 10 + window.scrollX;
          break;
        case "top":
          o = e.top - t.value.height - 10 + window.scrollY, a = e.left - t.value.width / 2 + e.width / 2 + window.scrollX;
          break;
        case "top-start":
          o = e.top - t.value.height - 10 + window.scrollY, a = e.left + window.scrollX;
          break;
        case "top-end":
          o = e.top - t.value.height - 10 + window.scrollY, a = e.left + e.width - t.value.width + window.scrollX;
          break;
        case "bottom":
          o = e.top + e.height + 10 + window.scrollY, a = e.left - t.value.width / 2 + e.width / 2 + window.scrollX;
          break;
        case "bottom-start":
          o = e.top + e.height + 10 + window.scrollY, a = e.left + window.scrollX;
          break;
        case "bottom-end":
          o = e.top + e.height + 10 + window.scrollY, a = e.left + e.width - t.value.width + window.scrollX;
          break;
      }
      return { position: "absolute", top: `${o}px`, left: `${a}px` };
    }), C = () => {
      c.value && (t.value = c.value.getBoundingClientRect());
    }, R = (l) => {
      c.value && !c.value.contains(l.target) && !d.value.contains(l.target) && h();
    };
    return O(() => {
      window.addEventListener("resize", C), window.addEventListener("click", R);
    }), A(() => {
      s.value = !1, u.value = !1, window.removeEventListener("resize", C), window.removeEventListener("click", R);
    }), (l, e) => (p(), g("div", H, [
      m("span", {
        class: "popover-trigger",
        ref_key: "triggerRef",
        ref: d,
        onClick: B,
        onMouseenter: P,
        onMouseleave: $
      }, [
        b(l.$slots, "reference", {}, void 0, !0)
      ], 544),
      (p(), D(U, { to: i.appendTo }, [
        j(q, { name: "popoverfade" }, {
          default: F(() => [
            s.value ? (p(), g("div", {
              key: 0,
              class: X(["popover", [i.popperClass, { "dark-mode": i.darkMode }]]),
              onMouseleave: z,
              onMouseenter: M,
              style: Y([{ zIndex: i.zIndex, width: f(r.width) ? r.width + "px" : r.width }, E.value]),
              ref_key: "popoverRef",
              ref: c
            }, [
              m("div", {
                class: X(["popover-arrow", "popover-arrow__" + i.placement]),
                style: Y(N.value)
              }, null, 6),
              m("div", J, [
                i.title ? (p(), g("div", K, _(i.title), 1)) : x("", !0),
                l.$slots.default ? b(l.$slots, "default", { key: 2 }, void 0, !0) : b(l.$slots, "default", { key: 1 }, () => [
                  G(_(i.content), 1)
                ], !0)
              ])
            ], 38)) : x("", !0)
          ]),
          _: 3
        })
      ], 8, ["to"]))
    ]));
  }
});
const W = (i, w) => {
  const r = i.__vccOpts || i;
  for (const [f, s] of w)
    r[f] = s;
  return r;
}, ee = /* @__PURE__ */ W(Q, [["__scopeId", "data-v-3b19b6e5"]]);
export {
  ee as default
};
