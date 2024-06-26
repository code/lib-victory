---
id: 1
title: VictoryChart
category: containers
type: docs
scope:
  - sampleData
---

# VictoryChart

`VictoryChart` is a wrapper component that renders a given set of children on a set of Cartesian or polar axes. `VictoryChart` reconciles the domain for all its children, controls the layout of the chart, and coordinates animations and shared events. If no children are provided, `VictoryChart` will render a set of empty default axes.

```playground
<div>
  <VictoryChart
    theme={VictoryTheme.material}
  >
    <VictoryArea data={sampleData}/>
    <VictoryAxis/>
  </VictoryChart>
  <VictoryChart polar
    theme={VictoryTheme.material}
  >
    <VictoryArea data={sampleData}/>
    <VictoryPolarAxis/>
  </VictoryChart>
</div>
```

## animate

`type: boolean || object`

`VictoryChart` uses the standard `animate` prop. [Read about it here](/docs/common-props/#animate)

See the [Animations Guide][] for more detail on animations and transitions

*note:* `VictoryChart` controls the `animate` prop of its children when set. To animate individual children of `VictoryChart`, set the `animate` prop only on children, and not on the `VictoryChart` wrapper.

```jsx
animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
```

## backgroundComponent

`type: element`

The `backgroundComponent` prop takes a component instance which will be responsible for rendering a background if the `VictoryChart`'s `style` component includes `background` styles. The new element created from the passed `backgroundComponent` will be provided with the following properties calculated by `VictoryChart`: `height`, `polar`, `scale`, `style`, `x`, `y`, `width`. All of these props on `Background` should take precedence over what `VictoryChart` is trying to set.

_default:_ `<Background/>`

```jsx
backgroundComponent={<Background/>}
```

```playground
<VictoryChart
  height={300}
  width={300}
  domain={[-1, 1]}
  style={{
    background: { fill: "pink" }
  }}
  backgroundComponent={<Background y={20} height={100}/>}
/>
```

## children

`type: element || array[element]`

`VictoryChart` works with any combination of the following children: [VictoryArea][], [VictoryAxis][] / [VictoryPolarAxis][], [VictoryBar][], [VictoryCandlestick][], [VictoryErrorBar][], [VictoryGroup][], [VictoryLine][], [VictoryScatter][], [VictoryHistogram][], [VictoryStack][], and [VictoryVoronoi][]. Children supplied to `VictoryChart` will be cloned and rendered with new props so that all children share common props such as `domain` and `scale`.

*note:* polar charts must use `VictoryPolarAxis` rather than `VictoryAxis`

## containerComponent

`type: element`

`VictoryChart` uses the standard `containerComponent` prop. [Read about it in detail here](/docs/common-props/#containercomponent)

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

## domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryChart` uses the standard `domain` prop. [Read about it in detail here](/docs/common-props/#domain)

*note:* `VictoryChart` controls the `domain` prop of its children.

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

## domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryChart` uses the standard `domainPadding` prop. [Read about it in detail here](/docs/common-props#domainpadding)

*note: `VictoryChart` controls the `domainPadding` prop of its children.*

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

## endAngle

`type: number`

The `endAngle` props defines the overall end angle of a polar chart in degrees. This prop is used in conjunction with `startAngle` to create polar chart that spans only a segment of a circle, or to change overall rotation of the chart. This prop should be given as a number of degrees. Degrees are defined as starting at the 3 o'clock position, and proceeding counterclockwise.

_default:_ `endAngle={360}`

```playground
<div>
  <VictoryChart polar
    theme={VictoryTheme.material}
    startAngle={90}
    endAngle={450}
  >
    <VictoryPolarAxis
      tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
      labelPlacement="vertical"
    />
    <VictoryBar style={{ data: { fill: "tomato", width: 30 } }}
      data={[
        { x: 0, y: 2 },
        { x: 60, y: 3 },
        { x: 120, y: 5 },
        { x: 180, y: 4 },
        { x: 240, y: 4 },
        { x: 300, y: 4 }
      ]}
    />
  </VictoryChart>

  <VictoryChart polar
    theme={VictoryTheme.material}
    startAngle={0}
    endAngle={180}
  >
    <VictoryPolarAxis
      tickValues={[0, 45, 90, 135, 180]}
      labelPlacement="vertical"
    />
    <VictoryBar style={{ data: { fill: "tomato", width: 30 } }}
      data={[
        { x: 0, y: 2 },
        { x: 45, y: 3 },
        { x: 90, y: 5 },
        { x: 135, y: 4 },
        { x: 180, y: 7 }
      ]}
    />
  </VictoryChart>
</div>
```

## events

`type: array[object]`

`VictoryChart` uses the standard `events` prop. [Read about it in more detail here](/docs/common-props/#events)

See the [Events Guide][] for more information on defining events.

*note:* `VictoryChart` coordinates events between children using the `VictorySharedEvents` and the `sharedEvents` prop

```playground
<VictoryChart
  events={[{
    childName: "all",
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [
          {
            childName: "area-2",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "gold" }) })
          }, {
            childName: "area-3",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "orange" }) })
          }, {
            childName: "area-4",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "red" }) })
          }
        ];
      }
    }
  }]}
>
  <VictoryStack>
    <VictoryArea name="area-1" data={sampleData}/>
    <VictoryArea name="area-2" data={sampleData}/>
    <VictoryArea name="area-3" data={sampleData}/>
    <VictoryArea name="area-4" data={sampleData}/>
  </VictoryStack>
</VictoryChart>
```

## externalEventMutations

`type: array[object]`

`VictoryChart` uses the standard `externalEventMutations` prop. [Read about it in detail](/docs/common-props/#externalEventsMutations)

## groupComponent

`type: element`

`VictoryChart` uses the standard `groupComponent` prop. [Read about it in detail here](/docs/common-props/#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

## height

`type: number`

`VictoryChart` uses the standard `height` prop. [Read about it in detail here](/docs/common-props/#height)

*note:* `VictoryChart` controls the `height` prop of its children.

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

## horizontal

`type: boolean`

The horizontal prop determines whether data will be plotted horizontally. When this prop is set to true, the independent variable will be plotted on the y axis and the dependent variable will be plotted on the x axis.

_default:_ horizontal={false}

```playground
<VictoryChart horizontal
  domainPadding={{ x: 8 }}
>
  <VictoryBar
    style={{
      data: { fill: "#c43a31" }
    }}
    data={sampleData}
  />
  <VictoryScatter
    data={sampleData}
  />
</VictoryChart>
```

## innerRadius

`type: number`

When the `innerRadius` prop is set, polar charts will be hollow rather than circular.

```playground
<VictoryChart polar theme={VictoryTheme.material} innerRadius={50}>
  <VictoryPolarAxis/>
  <VictoryPolarAxis dependentAxis tickValues={[1, 3, 5]} axisAngle={40}/>
  <VictoryBar data={sampleData} style={{ data: { fill: "#c43a31", width: 30 } }}/>
</VictoryChart>
```

## maxDomain

`type: number || { x: number, y: number }`

`VictoryChart` uses the standard `maxDomain` prop. [Read about it in detail](/docs/common-props#maxDomain)

```playground
<VictoryChart maxDomain={{ y: 4.5 }}>
  <VictoryLine data={sampleData}/>
</VictoryChart>
```

## minDomain

`type: number || { x: number, y: number }`

`VictoryChart` uses the standard `minDomain` prop. [Read about it in detail](/docs/common-props#minDomain)

```playground
<VictoryChart minDomain={{ y: 0 }}>
  <VictoryLine data={sampleData}/>
</VictoryChart>
```

## padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryChart` uses the standard `padding` prop. [Read about it in detail here](/docs/common-props/#padding)

*note:* `VictoryChart` controls the `padding` prop of its children.

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

## polar

`type: boolean`

`VictoryChart` uses the standard `polar` prop. [Read about it in detail here](/docs/common-props/#polar)

*Notes:*

- `VictoryChart` controls the `polar` prop of its children
- Polar charts should use `VictoryPolarAxis` rather than `VictoryAxis`

```playground
<div>
  <VictoryChart polar
    theme={VictoryTheme.material}
  >
    <VictoryPolarAxis/>
    <VictoryBar
      data={sampleData}
      style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 }}}
    />
  </VictoryChart>

  <VictoryChart
    theme={VictoryTheme.material}
  >
    <VictoryAxis/>
    <VictoryBar
      data={sampleData}
      style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 }}}
    />
  </VictoryChart>
</div>
```

## range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually calculated based on other props. It will not typically be necessary to set a `range` prop manually**

*note:* `VictoryChart` controls the `range` prop of its children.

[Read about the `range` prop in detail](/docs/common-props/#range)

## scale

`type: scale || { x: scale, y: scale }`

`VictoryChart` uses the standard `scale` prop. [Read about it here](/docs/common-props/#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

*note:* `VictoryChart` controls the `scale` prop of its children.

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

## sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

## singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryChart` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](/docs/common-props#singlequadrantdomainpadding)

## standalone

`type: boolean`

`VictoryChart` uses the standard `standalone` prop. [Read about it in detail here](/docs/common-props/#standalone)

*note:* `VictoryChart` sets `standalone={false} for all of its children.

_default:_ `standalone={true}`

```playground
<svg width={300} height={300}>
  <circle cx={150} cy={150} r={150} fill="#c43a31"/>
  <VictoryChart
    standalone={false}
    width={300} height={300}
  />
</svg>
```

## startAngle

`type: number`

The `startAngle` props defines the overall start angle of a polar chart in degrees. This prop is used in conjunction with `endAngle` to create polar chart that spans only a segment of a circle, or to change overall rotation of the chart. This prop should be given as a number of degrees. Degrees are defined as starting at the 3 o'clock position, and proceeding counterclockwise.

_default:_ `startAngle={0}`

```playground
<div>
  <VictoryChart polar
    theme={VictoryTheme.material}
    startAngle={90}
    endAngle={450}
  >
    <VictoryPolarAxis
      tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
      labelPlacement="vertical"
    />
    <VictoryBar style={{ data: { fill: "tomato", width: 30 } }}
      data={[
        { x: 0, y: 2 },
        { x: 60, y: 3 },
        { x: 120, y: 5 },
        { x: 180, y: 4 },
        { x: 240, y: 4 },
        { x: 300, y: 4 }
      ]}
    />
  </VictoryChart>

  <VictoryChart polar
    theme={VictoryTheme.material}
    startAngle={0}
    endAngle={180}
  >
    <VictoryPolarAxis
      tickValues={[0, 45, 90, 135, 180]}
      labelPlacement="vertical"
    />
    <VictoryBar style={{ data: { fill: "tomato", width: 30 } }}
      data={[
        { x: 0, y: 2 },
        { x: 45, y: 3 },
        { x: 90, y: 5 },
        { x: 135, y: 4 },
        { x: 180, y: 7 }
      ]}
    />
  </VictoryChart>
</div>
```

## style

`type: { parent: object, background: object }`

`VictoryChart` uses the standard `style` prop. [Read about it in detail here](/docs/common-props/#style)

note: custom valid svg style properties that are supported may be included in `background` styles.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryChart
  style={{
    parent: {
      border: "1px solid #ccc"
    },
    background: {
      fill: "pink"
    }
  }}
/>
```

## theme

`type: object`

`VictoryChart` uses the standard `theme` prop. [Read about it in detail here](/docs/common-props/#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

## width

`type: number`

`VictoryChart` uses the standard `width` prop. [Read about it in detail here](/docs/common-props/#width)

*note:* `VictoryChart` controls the `width` prop of its children.

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

[victoryarea]: /docs/victory-area
[victoryaxis]: /docs/victory-axis
[victorypolaraxis]: /docs/victory-polar-axis
[victorybar]: /docs/victory-bar
[victorycandlestick]: /docs/victory-candlestick
[victoryerrorbar]: /docs/victory-errorbar
[victorygroup]: /docs/victory-group
[victoryline]: /docs/victory-line
[victoryscatter]: /docs/victory-scatter
[victoryhistogram]: /docs/victory-histogram
[victorystack]: /docs/victory-stack
[victoryvoronoi]: /docs/victory-voronoi
[grayscale theme]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-theme/grayscale.tsx
[animations guide]: /guides/animations
[events guide]: /guides/events
[themes guide]: /guides/themes
