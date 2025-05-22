### 属性 Attributes

| Name        | Description                                                            | Type                                           | Default |
| ----------- | ---------------------------------------------------------------------- | ---------------------------------------------- | ------- |
| trigger     | 触发方式<br /> how the popover is triggered                            | `'click' \| 'hover'`                           | click   |
| title       | 标题<br />popover title                                                | string                                         | —       |
| content     | 内容<br />popover content, can be replaced with a default `slot`       | string                                         | ''      |
| width       | 宽度<br />popover width                                                | string / number                                | 150     |
| placement   | 出现位置<br />popover placement                                        | 见下方 Placement<br/>Check the Placement below | bottom  |
| darkMode    | 暗黑模式<br />dark mode                                                | boolean                                        | false   |
| disabled    | 是否可用<br />whether Popover is disabled                              | boolean                                        | false   |
| popperClass | 为 popper 添加类名<br />custom class name for popover                  | string                                         | —       |
| appendTo    | 在哪个元素上加入弹窗<br />which element the popover CONTENT appends to | CSSSelector / HTMLElement                      | body    |
| offset      | 设置 popover 的 偏移<br />set popover offset                           | number                                         | 10      |
| zIndex      | 设置 popover 的 z-index<br />set popover z-index                       | number                                         | 1999    |

### 属性 Placement

`'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'`

### 插槽 Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| default | 弹窗内容<br />text content of popover |

### 事件 Events

| Name  | Description                                     | Type         |
| ----- | ----------------------------------------------- | ------------ |
| open  | 弹窗显示时触发<br />triggers when popover shows | `() => void` |
| close | 弹窗关闭时触发<br />triggers when popover hides | `() => void` |

### 样式变量 Style variable

| Name                            | Default             |
| ------------------------------- | ------------------- |
| --popover-title-color           | #333333             |
| --popover-content-color         | #666666             |
| --popover-background-color      | #ffffff             |
| --popover-border-color          | #e4e7ed             |
| --popover-shadow-color          | rgba(0, 0, 0, 0.12) |
| --border-radius                 | 5px                 |
| --popover-content-padding       | 10px                |
| --popover-dark-title-color      | #ffffff             |
| --popover-dark-content-color    | #cccccc             |
| --popover-dark-background-color | #1d1e1f             |
| --popover-dark-border-color     | #414243             |
| --popover-dark-shadow-color     | rgba(0, 0, 0, 0.12) |
