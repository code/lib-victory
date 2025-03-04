import React, { forwardRef } from "react";
import { usePreviewOptions } from "../../_providers/previewOptionsProvider";
import Toggle from "../toggle";
import PreviewColorScaleSelect from "./preview-color-scale-select";

type Props = {
  isOpen: boolean;
};

export const Options = forwardRef<HTMLDivElement, Props>(({ isOpen }, ref) => {
  const { showTooltips, setShowTooltips } = usePreviewOptions();

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="absolute w-[400px] right-0 mt-1 border border-grayscale-300 bg-white rounded-md z-50 p-4 shadow-md"
          ref={ref}
        >
          <h1 className="text-base font-bold mb-4 text-gray-800">
            Preview Settings
          </h1>
          <PreviewColorScaleSelect size="sm" />
          <Toggle
            id="show-tooltips"
            label="Show tooltips instead of labels"
            checked={showTooltips}
            onChange={setShowTooltips}
            className="mt-4"
            size="xs"
          />
        </div>
      )}
    </div>
  );
});
