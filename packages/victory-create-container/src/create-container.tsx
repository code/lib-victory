import {
  VictoryZoomContainer,
  useVictoryZoomContainer,
} from "victory-zoom-container";
import {
  VictorySelectionContainer,
  useVictorySelectionContainer,
} from "victory-selection-container";
import React from "react";
import { VictoryContainer } from "victory-core";
import { forOwn, groupBy, isEmpty, toPairs } from "lodash";
import {
  VictoryVoronoiContainer,
  useVictoryVoronoiContainer,
} from "victory-voronoi-container";
import {
  VictoryCursorContainer,
  useVictoryCursorContainer,
} from "victory-cursor-container";
import {
  VictoryBrushContainer,
  useVictoryBrushContainer,
} from "victory-brush-container";

function ensureArray<T>(thing: T): [] | T | T[] {
  if (!thing) {
    return [];
  } else if (!Array.isArray(thing)) {
    return [thing];
  }
  return thing;
}

const combineEventHandlers = (eventHandlersArray: any[]) => {
  // takes an array of event handler objects and produces one eventHandlers object
  // creates a custom combinedHandler() for events with multiple conflicting handlers
  return eventHandlersArray.reduce((localHandlers, finalHandlers) => {
    forOwn(localHandlers, (localHandler, eventName) => {
      const existingHandler = finalHandlers[eventName];
      if (existingHandler) {
        // create new handler for event that concats the existing handler's mutations with new ones
        finalHandlers[eventName] = function combinedHandler(...params) {
          // named for debug clarity
          // sometimes handlers return undefined; use empty array instead, for concat()
          const existingMutations = ensureArray(existingHandler(...params));
          const localMutations = ensureArray(localHandler(...params));
          return existingMutations.concat(localMutations);
        };
      } else {
        finalHandlers[eventName] = localHandler;
      }
    });
    return finalHandlers;
  });
};

const combineDefaultEvents = (defaultEvents: any[]) => {
  // takes a defaultEvents array and returns one equal or lesser length,
  // by combining any events that have the same target
  const eventsByTarget = groupBy(defaultEvents, "target");
  const events = toPairs(eventsByTarget).map(([target, eventsArray]) => {
    const newEventsArray = eventsArray.filter(Boolean);
    return isEmpty(newEventsArray)
      ? null
      : {
          target,
          eventHandlers: combineEventHandlers(
            eventsArray.map((event) => event.eventHandlers),
          ),
          // note: does not currently handle eventKey or childName
        };
  });
  return events.filter(Boolean);
};

export type ContainerType =
  | "zoom"
  | "selection"
  | "brush"
  | "cursor"
  | "voronoi";

/**
 * Container hooks are used to provide the container logic to the container components through props and a modified children object
 * - These hooks contain shared logic for both web and Victory Native containers.
 * - In this utility, we call multiple of these hooks with the props returned by the previous to combine the container logic.
 */
const CONTAINER_HOOKS = {
  zoom: useVictoryZoomContainer,
  selection: useVictorySelectionContainer,
  brush: useVictoryBrushContainer,
  cursor: useVictoryCursorContainer,
  voronoi: useVictoryVoronoiContainer,
};

/**
 * Container hooks are wrappers that return a VictoryContainer with the props provided by their respective hooks, and the modified children.
 * - These containers are specific to the web. Victory Native has its own container components.
 * - For this utility, we only need the container components to extract the defaultEvents.
 */
const CONTAINER_COMPONENTS = {
  zoom: VictoryZoomContainer,
  selection: VictorySelectionContainer,
  brush: VictoryBrushContainer,
  cursor: VictoryCursorContainer,
  voronoi: VictoryVoronoiContainer,
};

type ContainerComponents = Record<
  ContainerType,
  React.ComponentType<any> & {
    defaultEvents: (props: any) => any[];
  }
>;

export function makeCreateContainerFunction<
  TContainerComponents extends ContainerComponents,
>(
  containerComponents: TContainerComponents,
  VictoryContainerBase: typeof VictoryContainer,
) {
  type ContainerProps<T extends ContainerType> = React.ComponentProps<
    TContainerComponents[T]
  >;

  return function combineContainers<
    TContainerA extends ContainerType,
    TContainerB extends ContainerType,
  >(containerA: TContainerA, containerB: TContainerB) {
    const ContainerA = containerComponents[containerA];
    const ContainerB = containerComponents[containerB];
    const useContainerA = CONTAINER_HOOKS[containerA];
    const useContainerB = CONTAINER_HOOKS[containerB];

    const CombinedContainer = (
      props: ContainerProps<TContainerA> & ContainerProps<TContainerB>,
    ) => {
      const { children: childrenA, props: propsA } = useContainerA(props);
      const { children: combinedChildren, props: combinedProps } =
        useContainerB({
          ...propsA,
          children: childrenA,
        });

      return (
        <VictoryContainerBase {...combinedProps}>
          {combinedChildren}
        </VictoryContainerBase>
      );
    };

    CombinedContainer.displayName = `Victory${containerA}${containerB}Container`;
    CombinedContainer.role = "container";
    CombinedContainer.defaultEvents = (
      props: ContainerProps<TContainerA> & ContainerProps<TContainerB>,
    ) =>
      combineDefaultEvents([
        ...ContainerA.defaultEvents(props),
        ...ContainerB.defaultEvents(props),
      ]);

    return CombinedContainer;
  };
}

export const createContainer = makeCreateContainerFunction(
  CONTAINER_COMPONENTS,
  VictoryContainer,
);
