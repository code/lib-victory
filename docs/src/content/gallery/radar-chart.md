---
id: 10
title: Radar Chart
---

```playground_norender
const characterData = [
  { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
  { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
  { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 }
];

function App() {
  const [state, setState] = React.useState({
    data: processData(characterData),
    maxima: getMaxima(characterData)
  });

  return (
    <VictoryChart polar
      theme={VictoryTheme.material}
      domain={{ y: [ 0, 1 ] }}
    >
      <VictoryGroup colorScale={["gold", "orange", "tomato"]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
      >
        {state.data.map((data, i) => {
          return <VictoryArea key={i} data={data}/>;
        })}
      </VictoryGroup>
    {
      Object.keys(state.maxima).map((key, i) => {
        return (
          <VictoryPolarAxis key={i} dependentAxis
            style={{
              axisLabel: { padding: 10 },
              axis: { stroke: "none" },
              grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
            }}
            tickLabelComponent={
              <VictoryLabel labelPlacement="vertical"/>
            }
            labelPlacement="perpendicular"
            axisValue={i + 1} label={key}
            tickFormat={(t) => Math.ceil(t * state.maxima[key])}
            tickValues={[0.25, 0.5, 0.75]}
          />
        );
      })
    }
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "grey", opacity: 0.5 }
        }}
      />

    </VictoryChart>
  );
}

function getMaxima(data) {
  const groupedData = Object.keys(data[0]).reduce((memo, key) => {
    memo[key] = data.map((d) => d[key]);
    return memo;
  }, {});
  return Object.keys(groupedData).reduce((memo, key) => {
    memo[key] = Math.max(...groupedData[key]);
    return memo;
  }, {});
}

function processData(data) {
  const maxByGroup = getMaxima(data);
  const makeDataArray = (d) => {
    return Object.keys(d).map((key) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum) => makeDataArray(datum));
}

render(<App/>);
```
