import { PropType } from "vue";
declare const _default: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        placement: PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
        width: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
        title: StringConstructor;
        content: StringConstructor;
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        trigger: {
            type: PropType<"click" | "hover">;
            default: string;
        };
        popperClass: StringConstructor;
        appendTo: {
            type: StringConstructor;
            default: string;
        };
        darkMode: BooleanConstructor;
        disabled: BooleanConstructor;
    }>> & Readonly<{
        onOpen?: (...args: any[]) => any;
        onClose?: (...args: any[]) => any;
    }>, {
        open: () => void;
        close: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "close")[], import("vue").PublicProps, {
        darkMode: boolean;
        disabled: boolean;
        width: string | number;
        offset: number;
        zIndex: number;
        trigger: "click" | "hover";
        appendTo: string;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        placement: PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
        width: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
        title: StringConstructor;
        content: StringConstructor;
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        trigger: {
            type: PropType<"click" | "hover">;
            default: string;
        };
        popperClass: StringConstructor;
        appendTo: {
            type: StringConstructor;
            default: string;
        };
        darkMode: BooleanConstructor;
        disabled: BooleanConstructor;
    }>> & Readonly<{
        onOpen?: (...args: any[]) => any;
        onClose?: (...args: any[]) => any;
    }>, {
        open: () => void;
        close: () => void;
    }, {}, {}, {}, {
        darkMode: boolean;
        disabled: boolean;
        width: string | number;
        offset: number;
        zIndex: number;
        trigger: "click" | "hover";
        appendTo: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    placement: PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    title: StringConstructor;
    content: StringConstructor;
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    trigger: {
        type: PropType<"click" | "hover">;
        default: string;
    };
    popperClass: StringConstructor;
    appendTo: {
        type: StringConstructor;
        default: string;
    };
    darkMode: BooleanConstructor;
    disabled: BooleanConstructor;
}>> & Readonly<{
    onOpen?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
}>, {
    open: () => void;
    close: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "close")[], "open" | "close", {
    darkMode: boolean;
    disabled: boolean;
    width: string | number;
    offset: number;
    zIndex: number;
    trigger: "click" | "hover";
    appendTo: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        reference: (_: {}) => any;
        default: (_: {}) => any;
    };
});
export default _default;
