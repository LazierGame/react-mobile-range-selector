# react 时间范围选择器

基于 React 的移动端范围选择器。

该组件可以通过拖拽修改一定范围内的跨度。

## 特性


## 配置
| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| range | 当前选择器的范围 | string[] | [] |
| value | 范围值(左边到右边) | [number, number] / null | null |
| height | 当前滑动区高度 | number | 100 |
| splitWidth | 当前滑动条刻度的距离 | number | 100 |
| disabledRanges | 禁用的范围区域(左值，右值，颜色) | [number, number,color ][] | [] |
| disableBoxBorderWidth | 禁用区域的边框宽度，为 0 则没有边框 | number | 0 |
| disabled| 组件禁用 | boolean| false|
| isSnapToGrid | 滑动完成停留时是否对其刻度 | boolean | true |
| snap | 停留时刻度值，1 表示整格，0.5 表示半格 | number | 1 |
| ruler | 选择器是否展示标尺 | boolean | true |
| scrollSpeed | 滑块贴近边缘，反方向滚动速度 | number | 25 |
| scrollLeft | 当前左边距离原点的距离,动态调整 | number  | undefined |
| onChange | 修改范围后的回调 | (value: TimeRange | null) => void| undefined |
| onContainClick | 点击区域块的回调，返回当前点击的数值 | (value: number) => void| undefined |

## 安装

```bash
npm install react-time-range-selector
```

或者

```bash
yarn add react-time-range-selector
```


## Changelog

### 0.1.14

- 对于特定的业务开发已完成，后续版本将更改为通用版本。


### 0.1.9
- 添加 两个禁止块之间的隔离线宽度(为 0 则没有)
- 重构配置项
- 添加手势库，拖动时候也会触发点击事件
- 优雅降级，在不可以使用 scrollTo 情况下不设置

### 0.1.8
- 添加 "draggable" (可拖拽)配置

### 0.1.5
- 当滑块超过当前视口时，滚动条可以自己滚动
- 控制滚动条滚动位置
- 添加滚动条滑动速度

### 0.0.8
- 添加标尺
- 添加是否对齐格子
- 添加格子间距
- 添加范围
- 添加初始化滚动值
- 添加点击，双击事件并出当前节点值(配合业务)
- 添加滚动事件并传出当前滚动位置(距离节点)
- 去除 单击增加，双击删除的代码(由业务方决定)


### 0.0.6(todo)
- 抽离时间? 变为范围选择器
- (可用度量, 时间/长度/面积/体积)
- 测试

### 0.0.5
- 监听外部数值修改而修改

### 0.0.4
- 固定头部高度

### 0.0.3
- 设置  DndContext 为单例防止出错 `two HTML5 backends at the same time`

### 0.0.2
- 添加默认值，保证可用

### 0.0.1
- 可用，项目名为 react-time-range-selector


