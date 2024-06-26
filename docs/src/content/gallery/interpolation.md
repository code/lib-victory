---
id: 6
title: Interpolation
---

``` playground_norender
const data = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
  { x: 5, y: 5 }
];

const cartesianInterpolations = [
  "basis",
  "bundle",
  "cardinal",
  "catmullRom",
  "linear",
  "monotoneX",
  "monotoneY",
  "natural",
  "step",
  "stepAfter",
  "stepBefore"
];

const polarInterpolations = [
  "basis",
  "cardinal",
  "catmullRom",
  "linear"
];

const InterpolationSelect = ({ currentValue, values, onChange }) => (
  <select onChange={onChange} value={currentValue} style={{ width: 75 }}>
    {values.map(
      (value) => <option value={value} key={value}>{value}</option>
    )}
  </select>
);

function App() {
  const [state, setState] = React.useState({
    interpolation: "linear",
    polar: false
  });

  return (
    <div>
      <InterpolationSelect
        currentValue={state.interpolation}
        values={state.polar ? polarInterpolations : cartesianInterpolations }
        onChange={(event) => setState({ interpolation: event.target.value })}
      />
      <input
        type="checkbox"
        id="polar"
        value={state.polar}
        onChange={
          (event) => setState({
            polar: event.target.checked,
            interpolation: "linear"
          })
        }
        style={{ marginLeft: 25, marginRight: 5 }}
      />
      <label htmlFor="polar">polar</label>
      <VictoryChart polar={state.polar} height={390}>
        <VictoryLine
          interpolation={state.interpolation} data={data}
          style={{ data: { stroke: "#c43a31" } }}
        />
        <VictoryScatter data={data}
          size={5}
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>
    </div>
  );
}

render(<App/>);
```
