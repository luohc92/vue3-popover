import { PropType, DefineComponent, ExtractPropTypes, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';

declare const _default: __VLS_WithTemplateSlots< DefineComponent<ExtractPropTypes<{
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
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    close: (...args: any[]) => void;
    open: (...args: any[]) => void;
}, string, PublicProps, Readonly< ExtractPropTypes<{
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
    onClose?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
}>, {
    width: string | number;
    zIndex: number;
    trigger: "click" | "hover";
    appendTo: string;
    darkMode: boolean;
    disabled: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>, {
    reference?(_: {}): any;
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
