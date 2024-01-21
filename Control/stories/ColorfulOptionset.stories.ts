import type { Meta, StoryObj } from "@storybook/html";

import type {
  IInputs,
  IOutputs,
} from "../ColorfulOptionset/generated/ManifestTypes";

import {
  ComponentFrameworkMockGeneratorReact,
  EnumPropertyMock,
  MetadataDB,
  OptionSetPropertyMock,
  ShkoOnline,
  StringPropertyMock,
} from "@shko.online/componentframework-mock";
import { ColorfulOptionset as Component } from "../ColorfulOptionset/index";
import { useEffect, useArgs } from "@storybook/preview-api";

import "../ColorfulOptionset/CSS/ColorfulOptionset.css";
import ReactDOM from "react-dom";

interface StoryArgs {
  options: ComponentFramework.PropertyHelper.OptionMetadata[];
  visible: boolean;
  disabled: boolean;
  icon: string;
  optionsInput: number | null;
  sortBy: "TEXT" | "VALUE";
}

export default {
  title: "PCF Component/LookupDropdown",
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.maxWidth = "350px";
      container.style.border = "dotted 1px";

      var storyResult = Story();
      if (typeof storyResult == "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  args: {
    icon: undefined,
    options: undefined,
    disabled: false,
    visible: true,
  },
  argTypes: {
    icon: {
      control: "text",
      name: "Icon",
      table: {
        category: "Parameters",
      },
    },
    options: {
      control: "object",
      name: "Options",
      table: {
        category: "Parameters",
        subcategory: "Metadata"
      },
    },
    disabled: {
      control: "boolean",
      name: "Disabled",
      table: {
        category: "Mode",
      },
    },
    visible: {
      control: "boolean",
      name: "Visible",
      table: {
        category: "Mode",
      },
    },
  },
} as Meta<StoryArgs>;

const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGeneratorReact<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement("div");
      mockGenerator = new ComponentFrameworkMockGeneratorReact(Component, {
        icon: StringPropertyMock,
        optionsInput: OptionSetPropertyMock,
        sortBy: EnumPropertyMock,
      });

      var selectionMetadata = mockGenerator.metadata.getAttributeMetadata(
        MetadataDB.CanvasLogicalName,
        "optionsInput"
      ) as ShkoOnline.PickListAttributeMetadata;

      args.options.forEach(
        (option: {
          Value: number;
          Label: string;
          Color?: string | undefined;
        }) => {
          selectionMetadata.OptionSet.Options[option.Value] = option;
        }
      );

      mockGenerator.metadata.upsertAttributeMetadata(
        MetadataDB.CanvasLogicalName,
        selectionMetadata
      );

      mockGenerator.context.mode.isControlDisabled = args.disabled;
      mockGenerator.context.mode.isVisible = args.visible;

      mockGenerator.context._SetCanvasItems({
        icon: args.icon,
        optionsInput: args.optionsInput == null ? undefined : args.optionsInput,
      });

      mockGenerator.onOutputChanged.callsFake(({ optionsInput }) => {
        updateArgs({
          optionsInput,
        });
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context._parameters.icon._SetValue(args.icon);
      mockGenerator.context._parameters.optionsInput._SetValue(
        args.optionsInput
      );

      ReactDOM.render(mockGenerator.ExecuteUpdateView(), container);
    }

    return container;
  };
};

export const Primary = {
  render: renderGenerator(),
  args: {
    icon: "FavoriteStarFill",
    options: [
      { Value: 0, Label: "First Option", Color: "#dd0000" },
      { Value: 1, Label: "Second Option", Color: "#dd0000" },
      { Value: 2, Label: "Third Option", Color: "#dddd00" },
      { Value: 4, Label: "Fourth Option", Color: "#dddd00" },
      { Value: 5, Label: "Fifth Option", Color: "#dddddd" },
      { Value: 6, Label: "Sixth Option", Color: "#dddddd" },
      { Value: 7, Label: "Seventh Option", Color: "#dddddd" },
      { Value: 8, Label: "Eighth Option", Color: "#dddddd" },
      { Value: 9, Label: "Ninth Option", Color: "#dddddd" },
      { Value: 10, Label: "Tenth Option", Color: "#dddddd" },
      { Value: 11, Label: "Eleventh Option", Color: "#dddddd" },
    ],
  },
} as StoryObj<StoryArgs>;

export const BankIcon = {
  render: renderGenerator(),
  args: {
    icon: "Bank",
    options: [
      { Value: 0, Label: "First Option", Color: "#dd0000" },
      { Value: 1, Label: "Second Option", Color: "#dd0000" },
      { Value: 2, Label: "Third Option", Color: "#dddd00" },
      { Value: 4, Label: "Fourth Option", Color: "#dddd00" },
      { Value: 5, Label: "Fifth Option", Color: "#dddddd" },
      { Value: 6, Label: "Sixth Option", Color: "#dddddd" },
      { Value: 7, Label: "Seventh Option", Color: "#dddddd" },
      { Value: 8, Label: "Eighth Option", Color: "#dddddd" },
      { Value: 9, Label: "Ninth Option", Color: "#dddddd" },
      { Value: 10, Label: "Tenth Option", Color: "#dddddd" },
      { Value: 11, Label: "Eleventh Option", Color: "#dddddd" },
    ],
  },
} as StoryObj<StoryArgs>;
