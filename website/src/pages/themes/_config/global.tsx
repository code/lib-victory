import { OptionsPanelConfig } from ".";
import { getBaseLabelsConfig, getBaseStrokeConfig } from "../_utils";

const globalOptionsConfig: OptionsPanelConfig = {
  title: "Global Options",
  description: "Customize the appearance of all charts.",
  controls: [
    {
      type: "section",
      label: "Chart Size",
      controls: [
        {
          type: "slider",
          label: "Width",
          min: 150,
          max: 500,
          unit: "px",
          path: [
            "chart.width",
            "axis.width",
            "area.width",
            "bar.width",
            "boxplot.width",
            "candlestick.width",
            "errorbar.width",
            "group.width",
            "histogram.width",
            "line.width",
            "pie.width",
            "scatter.width",
            "stack.width",
            "voronoi.width",
          ],
        },
        {
          type: "slider",
          label: "Height",
          min: 150,
          max: 500,
          unit: "px",
          path: [
            "chart.height",
            "axis.height",
            "area.height",
            "bar.height",
            "boxplot.height",
            "candlestick.height",
            "errorbar.height",
            "group.height",
            "histogram.height",
            "line.height",
            "pie.height",
            "scatter.height",
            "stack.height",
            "voronoi.height",
          ],
        },
        {
          type: "slider",
          label: "Padding",
          min: 0,
          max: 100,
          unit: "px",
          path: [
            "chart.padding",
            "axis.padding",
            "area.padding",
            "bar.padding",
            "boxplot.padding",
            "candlestick.padding",
            "errorbar.padding",
            "group.padding",
            "histogram.padding",
            "line.padding",
            "pie.padding",
            "scatter.padding",
            "stack.padding",
            "voronoi.padding",
          ],
        },
      ],
    },
    {
      type: "section",
      label: "Labels",
      controls: getBaseLabelsConfig([
        "axis.style.axisLabel",
        "polarAxis.style.tickLabels",
        "polarDependentAxis.style.tickLabels",
        "tooltip.style",
        "area.style.labels",
        "bar.style.labels",
        "candlestick.style.labels",
        "errorbar.style.labels",
        "histogram.style.labels",
        "legend.style.labels",
        "line.style.labels",
        "pie.style.labels",
        "scatter.style.labels",
        "voronoi.style.labels",
        "boxplot.style.maxLabels",
        "boxplot.style.medianLabels",
        "boxplot.style.minLabels",
        "boxplot.style.q1Labels",
        "boxplot.style.q3Labels",
      ]),
    },
    {
      type: "section",
      label: "Data",
      controls: getBaseStrokeConfig([
        "area.style.data",
        "bar.style.data",
        "candlestick.style.data",
        "errorbar.style.data",
        "histogram.style.data",
        "line.style.data",
        "pie.style.data",
        "scatter.style.data",
        "voronoi.style.data",
      ]),
    },
  ],
};

export default globalOptionsConfig;
