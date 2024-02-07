import React from "react";
import { Dimensions } from "react-native";
import {
  VictoryLine as VictoryLineBase,
  VictoryLineProps,
} from "victory-line/es";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { VictoryClipContainer } from "./victory-clip-container";
import { Curve } from "./victory-primitives/curve";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryLine = wrapCoreComponent<VictoryLineProps>({
  Component: VictoryLineBase,
  defaultProps: {
    ...VictoryLineBase.defaultProps,
    dataComponent: <Curve />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <VictoryClipContainer />,
    width: Dimensions.get("window").width,
  },
});
