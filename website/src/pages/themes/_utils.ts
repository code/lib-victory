import { VictoryThemeDefinition } from "victory-core";
import { ControlConfig } from "./_config";
import { StrokeProps } from "./_const";

export const setNestedConfigValue = (
  config: VictoryThemeDefinition,
  paths: string | string[],
  value: unknown,
) => {
  const updatedConfig = { ...config };
  const pathsArray = Array.isArray(paths) ? paths : [paths];

  pathsArray.forEach((path) => {
    const pathArray = path.split(".");
    pathArray.reduce((acc, key, i) => {
      if (i === pathArray.length - 1) {
        acc[key] = value;
      } else {
        acc[key] = { ...acc[key] };
      }
      return acc[key];
    }, updatedConfig);
  });

  return updatedConfig;
};

export const getConfigValue = (
  config: VictoryThemeDefinition,
  path: string | string[],
) => {
  const pathString = Array.isArray(path) ? path[0] : path;
  if (!pathString) return undefined;
  const pathArray = pathString.split(".");
  return pathArray.reduce((acc, key) => {
    return acc?.[key];
  }, config);
};

// Config helpers
export const getPath = (basePath: string | string[], key: string) => {
  if (Array.isArray(basePath)) {
    return basePath.map((p) => `${p}.${key}`);
  }
  return `${basePath}.${key}`;
};

export const getNestedColorScaleConfig = (
  basePath: string | string[],
): ControlConfig[] => [
  {
    type: "colorScale",
    label: "Color Scale",
    path: getPath(basePath, "colorScale"),
  },
];

export const getBaseStrokeConfig = (
  basePath: string | string[],
  includedStrokeProps: StrokeProps[] = [],
): ControlConfig[] => {
  const config = [
    {
      type: "colorPicker",
      label: StrokeProps.STROKE,
      path: getPath(basePath, "stroke"),
    },
    {
      type: "slider",
      label: StrokeProps.STROKE_WIDTH,
      min: 0,
      max: 5,
      unit: "px",
      path: getPath(basePath, "strokeWidth"),
      default: 1,
    },
    {
      type: "select",
      label: StrokeProps.STROKE_DASH_ARRAY,
      path: getPath(basePath, "strokeDasharray"),
      options: [
        { label: "Solid", value: "0" },
        { label: "Dashed", value: "4, 4" },
        { label: "Dotted", value: "1, 1" },
        { label: "Long Dash", value: "10, 5" },
      ],
    },
    {
      type: "select",
      label: StrokeProps.STROKE_LINE_CAP,
      options: [
        { label: "Round", value: "round" },
        { label: "Square", value: "square" },
        { label: "Butt", value: "butt" },
      ],
      path: getPath(basePath, "strokeLinecap"),
    },
    {
      type: "select",
      label: StrokeProps.STROKE_LINE_JOIN,
      options: [
        { label: "Round", value: "round" },
        { label: "Bevel", value: "bevel" },
        { label: "Miter", value: "miter" },
      ],
      path: getPath(basePath, "strokeLinejoin"),
    },
  ] as ControlConfig[];
  return includedStrokeProps.length
    ? config.filter((field) =>
        includedStrokeProps.includes(field.label as StrokeProps),
      )
    : config;
};

export const getBaseLabelsConfig = (
  basePath: string | string[],
): ControlConfig[] => [
  {
    type: "slider",
    label: "Font Size",
    min: 10,
    max: 24,
    unit: "px",
    path: getPath(basePath, "fontSize"),
  },
  {
    type: "slider",
    label: "Text Padding",
    min: 0,
    max: 50,
    unit: "px",
    path: getPath(basePath, "padding"),
  },
  {
    type: "colorPicker",
    label: "Font Color",
    path: getPath(basePath, "fill"),
  },
];

export const stringifyWithoutQuotes = (config: unknown) => {
  return JSON.stringify(config, null, 2).replace(/"([^"]+)":/g, "$1:");
};
