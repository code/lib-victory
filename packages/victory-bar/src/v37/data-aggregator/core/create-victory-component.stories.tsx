import React from "react";
import { createVictoryComponent } from "./create-victory-component";

export default {
  title: "v37/createVictoryComponent",
};

type ExampleProps = React.PropsWithChildren<{
  title: string;
  optionalProp?: boolean;
  defaultedProp: boolean;
}>;

const ExampleComponent = createVictoryComponent<ExampleProps>()(
  {
    displayName: "ExampleComponent",
    propTypes: {},
    defaultProps: {
      title: "Default Title",
      defaultedProp: true,
    },
    normalizeProps: {
      TITLE: (props) => props.title.toUpperCase(),
    },
    aggregateProps: {
      totalCount: (myProps, allProps) => allProps.length,
      titles: (myProps, allProps) =>
        allProps.map((props) => (props as ExampleProps).title).join(", "),
      TITLES: (myProps, allProps) =>
        allProps.map((props) => (props as { TITLE: string }).TITLE).join(", "),
    },
  },
  ({ children, ...props }) => {
    const {
      title,
      TITLE,
      optionalProp,
      defaultedProp,
      totalCount,
      titles,
      TITLES,
      // @ts-expect-error INVALID
      INVALID,
    } = props;

    return (
      <fieldset>
        <legend>{props.title}</legend>
        <pre>{JSON.stringify(props, null, 2)}</pre>
        <>{children}</>
      </fieldset>
    );
  },
);

export const Example = () => {
  return (
    <ExampleComponent title="Parent" optionalProp>
      <ExampleComponent title="Child">
        <ExampleComponent title="Grandchild" />
      </ExampleComponent>
      <ExampleComponent title="Child" />
    </ExampleComponent>
  );
};