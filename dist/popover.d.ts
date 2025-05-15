import type { DefineComponent, ExtractPropTypes, Ref, ComputedRef, ComponentOptionsMixin, PublicProps, ComponentProvideOptions, PropType } from 'vue';
declare const _sfc_main: DefineComponent<ExtractPropTypes<{
    placement: PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
    width: {
        type: (StringConstructor | NumberConstructor)[];
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
}>, {
    props: any;
    isNumber: (val: number | string) => boolean;
    visible: Ref<boolean, boolean>;
    open: () => void;
    close: () => void;
    allPlacement: string[];
    popoverRef: Ref<any, any>;
    triggerRef: Ref<any, any>;
    popoverRect: Ref<any, any>;
    emits: (event: "open" | "close", ...args: any[]) => void;
    togglePopover: () => void;
    closePopoverTimer: Ref<any, any>;
    mouseenter: () => void;
    mouseIsInPopover: Ref<boolean, boolean>;
    mouseleave: () => void;
    mouseleavePopover: () => void;
    mouseenterPopover: () => void;
    popoverArrowStyle: ComputedRef<{
        left?: undefined;
        top?: undefined;
    } | {
        left: string;
        top: string;
    }>;
    popoverStyle: ComputedRef<any>;
    updatePopoverRect: () => void;
    handleClickOutside: (event: Event) => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("open" | "close")[], "open" | "close", PublicProps, Readonly<ExtractPropTypes<{
    placement: PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
    width: {
        type: (StringConstructor | NumberConstructor)[];
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
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    darkMode: boolean;
    disabled: boolean;
    width: string | number;
    zIndex: number;
    trigger: "click" | "hover";
    appendTo: string;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
