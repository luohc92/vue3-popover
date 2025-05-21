import { defineComponent as K, ref as p, watch as O, nextTick as Q, computed as I, onMounted as Z, onUnmounted as ee, openBlock as P, createElementBlock as X, createElementVNode as Y, renderSlot as x, createBlock as te, Teleport as oe, createVNode as re, Transition as ae, withCtx as le, normalizeClass as L, normalizeStyle as H, toDisplayString as V, createCommentVNode as D, createTextVNode as ie } from "vue";
const ne = { class: "popover-wrapper" }, se = { class: "popover-content" }, ue = {
  key: 0,
  class: "popover-title"
}, ce = /* @__PURE__ */ K({
  __name: "Popover",
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
  setup(n, { emit: R }) {
    const i = n, T = (r) => typeof r == "number", f = p(!1), N = () => {
      f.value = !0, z("open");
    }, y = () => {
      f.value = !1, g.value = !1, o.value = i.placement || "bottom", z("close");
    }, _ = [
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
    ], w = p(), u = p(), t = p(), k = p(null), o = p(i.placement || "bottom"), z = R, W = () => {
      if (!u.value || !t.value)
        return;
      const r = u.value.getBoundingClientRect(), e = window.innerHeight, a = window.innerWidth, l = r.top - t.value.height - 10, C = r.bottom + 10, B = r.left - t.value.width - 10, S = r.right + 10, s = (m) => {
        if (!m)
          return "bottom";
        const v = r.top < t.value.height, d = r.right + t.value.width > a, b = r.bottom + t.value.height > e, h = r.left < 0;
        switch (m) {
          case "top":
            if (v)
              return "bottom";
            if (h)
              return "top-end";
            if (d)
              return "top-start";
            break;
          case "top-start":
            if (v)
              return "bottom-start";
            if (h)
              return "top-end";
            break;
          case "top-end":
            if (v)
              return "bottom-end";
            if (d)
              return "top-start";
            break;
          case "bottom":
            if (b)
              return "top";
            if (h)
              return "bottom-end";
            if (d)
              return "bottom-start";
            break;
          case "bottom-start":
            if (b)
              return "top-start";
            if (h || d)
              return "bottom-end";
            break;
          case "bottom-end":
            if (b)
              return "top-end";
            if (h)
              return "bottom-start";
            break;
          case "left":
            if (h)
              return "right";
            if (v)
              return "left-start";
            if (b)
              return "left-end";
            break;
          case "left-start":
            if (h)
              return "right-start";
            if (b)
              return "top-start";
            break;
          case "left-end":
            if (h)
              return "right-end";
            if (v)
              return "left-start";
            break;
          case "right":
            if (d)
              return "left";
            if (v)
              return "right-start";
            if (b)
              return "right-end";
            break;
          case "right-start":
            if (d)
              return "left-start";
            if (b)
              return "top-start";
            break;
          case "right-end":
            if (d)
              return "left-end";
            if (v)
              return "right-start";
            break;
        }
        return m;
      };
      switch (o.value) {
        case "top":
          l < 0 ? o.value = "bottom" : o.value = s(o.value);
          break;
        case "bottom":
          C + t.value.height > e ? o.value = "top" : o.value = s(o.value);
          break;
        case "left":
          const m = s(o.value);
          m !== o.value ? o.value = m : B < 0 && (o.value = "right");
          break;
        case "right":
          const v = s(o.value);
          v !== o.value ? o.value = v : S + t.value.width > a && (o.value = "left");
          break;
        case "top-start":
          l < 0 ? o.value = "bottom-start" : o.value = s(o.value);
          break;
        case "top-end":
          l < 0 ? o.value = "bottom-end" : o.value = s(o.value);
          break;
        case "bottom-start":
          C + t.value.height > e ? o.value = "top-start" : o.value = s(o.value);
          break;
        case "bottom-end":
          C + t.value.height > e ? o.value = "top-end" : o.value = s(o.value);
          break;
        case "left-start":
          B < 0 ? o.value = "right-start" : o.value = s(o.value);
          break;
        case "left-end":
          B < 0 ? o.value = "right-end" : o.value = s(o.value);
          break;
        case "right-start":
          S + t.value.width > a ? o.value = "left-start" : o.value = s(o.value);
          break;
        case "right-end":
          const d = s(o.value);
          d !== o.value ? o.value = d : S + t.value.width > a && (o.value = "left-end");
          break;
      }
    }, M = () => {
      w.value && (t.value = w.value.getBoundingClientRect(), W());
    };
    O(
      () => i.placement,
      (r) => {
        r && _.includes(r) && (o.value = r);
      },
      { immediate: !0 }
    ), O(
      () => f.value,
      (r) => {
        !r || Q(() => {
          M();
        });
      }
    );
    const A = () => {
      i.trigger !== "click" || i.disabled || (f.value ? y() : N());
    }, c = p(), U = () => {
      i.trigger !== "hover" || i.disabled || (c.value && clearTimeout(c.value), g.value = !1, N());
    }, g = p(!1), j = () => {
      i.trigger !== "hover" || i.disabled || (c.value && clearTimeout(c.value), c.value = setTimeout(() => {
        g.value || y();
      }, 300));
    }, q = () => {
      i.trigger !== "hover" || i.disabled || (g.value = !1, c.value && clearTimeout(c.value), c.value = setTimeout(() => {
        g.value || y();
      }, 300));
    }, F = () => {
      g.value = !0, c.value && clearTimeout(c.value);
    }, G = I(() => {
      if (!u.value || !t.value)
        return {};
      const r = u.value.getBoundingClientRect();
      let e = 0, a = 0, l = o.value;
      switch (_.includes(l) || (l = "bottom"), l) {
        case "left":
          e = t.value.width - 5, a = t.value.height / 2 - 5;
          break;
        case "left-start":
          e = t.value.width - 5, a = r.height / 2 - 5;
          break;
        case "left-end":
          e = t.value.width - 5, a = t.value.height - r.height / 2 - 5;
          break;
        case "right":
          e = -5, a = t.value.height / 2 - 5;
          break;
        case "right-start":
          e = -5, a = r.height / 2 - 5;
          break;
        case "right-end":
          e = -5, a = t.value.height - r.height / 2 - 5;
          break;
        case "top":
          e = t.value.width / 2 - 5, a = t.value.height - 5;
          break;
        case "top-start":
          e = r.width / 2 - 5, a = t.value.height - 5;
          break;
        case "top-end":
          e = t.value.width - r.width / 2 - 5, a = t.value.height - 5;
          break;
        case "bottom":
          e = t.value.width / 2 - 5, a = -5;
          break;
        case "bottom-start":
          e = r.width / 2 - 5, a = -5;
          break;
        case "bottom-end":
          e = t.value.width - r.width / 2 - 5, a = -5;
          break;
      }
      return a > t.value.height && (a = t.value.height - 20), e > t.value.width && (e = t.value.width - 20), { left: `${e}px`, top: `${a}px` };
    }), J = I(() => {
      if (!u.value || !t.value)
        return {};
      let r = o.value;
      _.includes(r) || (r = "bottom");
      const e = u.value.getBoundingClientRect();
      let a = 0, l = 0;
      switch (r) {
        case "left":
          a = e.top - t.value.height / 2 + e.height / 2 + window.scrollY, l = e.left - t.value.width - 10 + window.scrollX;
          break;
        case "left-start":
          a = e.top + window.scrollY, l = e.left - t.value.width - 10 + window.scrollX;
          break;
        case "left-end":
          a = e.top - t.value.height + e.height + window.scrollY, l = e.left - t.value.width - 10 + window.scrollX;
          break;
        case "right":
          a = e.top - t.value.height / 2 + e.height / 2 + window.scrollY, l = e.left + e.width + 10 + window.scrollX;
          break;
        case "right-start":
          a = e.top + window.scrollY, l = e.left + e.width + 10 + window.scrollX;
          break;
        case "right-end":
          a = e.top - t.value.height + e.height + window.scrollY, l = e.left + e.width + 10 + window.scrollX;
          break;
        case "top":
          a = e.top - t.value.height - 10 + window.scrollY, l = e.left - t.value.width / 2 + e.width / 2 + window.scrollX;
          break;
        case "top-start":
          a = e.top - t.value.height - 10 + window.scrollY, l = e.left + window.scrollX;
          break;
        case "top-end":
          a = e.top - t.value.height - 10 + window.scrollY, l = e.left + e.width - t.value.width + window.scrollX;
          break;
        case "bottom":
          a = e.top + e.height + 10 + window.scrollY, l = e.left - t.value.width / 2 + e.width / 2 + window.scrollX;
          break;
        case "bottom-start":
          a = e.top + e.height + 10 + window.scrollY, l = e.left + window.scrollX;
          break;
        case "bottom-end":
          a = e.top + e.height + 10 + window.scrollY, l = e.left + e.width - t.value.width + window.scrollX;
          break;
      }
      return { position: "absolute", top: `${a}px`, left: `${l}px` };
    }), $ = () => {
      w.value && (t.value = w.value.getBoundingClientRect());
    }, E = (r) => {
      w.value && !w.value.contains(r.target) && !u.value.contains(r.target) && y();
    };
    return Z(() => {
      window.addEventListener("resize", $), window.addEventListener("click", E), u.value && (k.value = new MutationObserver(() => {
        f.value && M();
      }), k.value.observe(u.value, {
        attributes: !0,
        childList: !0,
        subtree: !0,
        characterData: !0
      }));
    }), ee(() => {
      f.value = !1, g.value = !1, window.removeEventListener("resize", $), window.removeEventListener("click", E), k.value && (k.value.disconnect(), k.value = null);
    }), (r, e) => (P(), X("div", ne, [
      Y("span", {
        class: "popover-trigger",
        ref_key: "triggerRef",
        ref: u,
        onClick: A,
        onMouseenter: U,
        onMouseleave: j
      }, [
        x(r.$slots, "reference", {}, void 0, !0)
      ], 544),
      (P(), te(oe, { to: n.appendTo }, [
        re(ae, { name: "popoverfade" }, {
          default: le(() => [
            f.value ? (P(), X("div", {
              key: 0,
              class: L(["popover", [n.popperClass, { "dark-mode": n.darkMode }]]),
              onMouseleave: q,
              onMouseenter: F,
              style: H([{ zIndex: n.zIndex, width: T(i.width) ? i.width + "px" : i.width }, J.value]),
              ref_key: "popoverRef",
              ref: w
            }, [
              Y("div", {
                class: L(["popover-arrow", "popover-arrow__" + o.value]),
                style: H(G.value)
              }, null, 6),
              Y("div", se, [
                n.title ? (P(), X("div", ue, V(n.title), 1)) : D("", !0),
                r.$slots.default ? x(r.$slots, "default", { key: 2 }, void 0, !0) : x(r.$slots, "default", { key: 1 }, () => [
                  ie(V(n.content), 1)
                ], !0)
              ])
            ], 38)) : D("", !0)
          ]),
          _: 3
        })
      ], 8, ["to"]))
    ]));
  }
});
const ve = (n, R) => {
  const i = n.__vccOpts || n;
  for (const [T, f] of R)
    i[T] = f;
  return i;
}, de = /* @__PURE__ */ ve(ce, [["__scopeId", "data-v-6d5fdba4"]]), he = {
  install: (n) => {
    n.component("Popover", de);
  }
};
export {
  de as Popover,
  he as default
};
