
# vue3-popover
## a popover for vue3.x 一款vue3.x的弹出框

## Basic usage

```html
npm i vue3-popover
```

## API

### Attributes


| Name                     | Description                                                            | Type                                                                                                                                                                           | Default    |
| ------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------  |
| trigger                  | 触发方式<br /> how the popover is triggered                             |  `'click' \| 'hover'`                                                                                                                                                | click      |
| title                    | 标题<br />popover title                                                 | string                                                                                                                                                                | —         |
| content                  | 内容<br />popover content, can be replaced with a default `slot`        |string                                                                                                                                                                 | ''         |
| width                    | 宽度<br />popover width                                                 | string / number                                                                                                                                                     | 150         |
| placement                  | 出现位置<br />popover placement                                         | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom         |
| darkMode                  | 暗黑模式<br />dark mode                                                 | boolean                                                                                                                                                                  | false         |
| disabled                  | 是否可用<br />whether Popover is disabled                               | boolean                                                                                                                                                                | false         |
| popperClass                  | 为 popper 添加类名<br />custom class name for popover                   | string                                                                                                                                                                   | —         |
| appendTo                  | 在哪个元素上加入弹窗<br />which element the popover CONTENT appends to   | CSSSelector / HTMLElement                                                                                                                                         | body         |
| zIndex                   | 设置popover的z-index<br />set popover z-index                           | number                                                                                                                                                             |1999        |

### Slots

| Name      | Description                        |
| ----------------------------- | -------------------------------------------- |
| default   | 弹窗内容<br />text content of popover            |

### Events

| Name         | Description                                  | Type                    |
| ------------ | -------------------------------------------- | ----------------------- |
| open         | 弹窗显示时触发<br />triggers when popover shows                  | `() => void` |
| close         | 弹窗关闭时触发<br />triggers when popover hides                  |`() => void` |
