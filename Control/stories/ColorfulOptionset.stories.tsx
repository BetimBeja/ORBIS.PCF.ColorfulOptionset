
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react'
import type { ReactElement } from 'react';
import type { IInputs, IOutputs } from '../ColorfulOptionset/generated/ManifestTypes'

import { useEffect, useState } from 'react'
import { ComponentFrameworkMockGeneratorReact, EnumPropertyMock, OptionSetPropertyMock, ShkoOnline, StringPropertyMock } from '@shko.online/componentframework-mock'
import { ColorfulOptionset as Component } from '../ColorfulOptionset/index'
import { useArgs } from '@storybook/client-api'
import { useMemo } from '@storybook/addons'

import "../ColorfulOptionset/css/ColorfulOptionset.css";

interface StoryArgs {
    options: ComponentFramework.PropertyHelper.OptionMetadata[],
    visible: boolean,
    disabled: boolean,
    icon: string,
    optionsInput: number|null,
    sortBy: "TEXT" | "VALUE"
}

export default {
    title: 'PCF Component/LookupDropdown',
    decorators: [
        (Story) => (
          <div style={{ margin: '3em' , maxWidth:'350px'}}>
            {Story()}
          </div>
        )
      ],
      parameters: {
        // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout
        layout: 'fullscreen'
      },
      // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
      argTypes: {
      }
    } as Meta<StoryArgs>;

    const Template = ({ }: StoryArgs) => {     
        const [args, updateArgs] = useArgs() as unknown as [
          args: StoryArgs,
          updateArgs: (args: Partial<StoryArgs>) => void,
        ]
      
        const mockGenerator = useMemo(() => {
      
          const mockGenerator: ComponentFrameworkMockGeneratorReact<IInputs, IOutputs> =
            new ComponentFrameworkMockGeneratorReact(Component, {
          icon: StringPropertyMock,
          optionsInput: OptionSetPropertyMock,
          sortBy: EnumPropertyMock<"TEXT" | "VALUE">
            });
      
            var selectionMetadata =
            mockGenerator.metadata.getAttributeMetadata('!CanvasApp', 'optionsInput') as
            ShkoOnline.PickListAttributeMetadata;

        selectionMetadata.OptionSet = {
            IsCustomOptionSet: true,
            MetadataId: '',
            Name: 'optionset',
            OptionSetType: 11,
            Options: {
            }
        };

        args.options.forEach((option: {
            Value: number;
            Label: string;
            Color?: string | undefined;
        }) => {
            selectionMetadata.OptionSet.Options[option.Value] = option;
        })

        mockGenerator.metadata.upsertAttributeMetadata('!CanvasApp', selectionMetadata);

        mockGenerator.context.mode.isControlDisabled = args.disabled;
        mockGenerator.context.mode.isVisible = args.visible;

            mockGenerator.context._SetCanvasItems({
                icon: args.icon,
                optionsInput: args.optionsInput==null ? undefined : args.optionsInput
              });
      
        
      
              mockGenerator.onOutputChanged.callsFake(() => {
                mockGenerator.context._parameters.optionsInput._Refresh();
                updateArgs({ optionsInput: mockGenerator.context._parameters.optionsInput.raw });
            });
    
            mockGenerator.ExecuteInit();
            return mockGenerator;
        });

        useEffect(() => {
            mockGenerator.context._parameters.icon._SetValue(args.icon);
            mockGenerator.context._parameters.optionsInput._SetValue(args.optionsInput);
            setComponent(mockGenerator.ExecuteUpdateView());
        },            [args.icon,args.optionsInput]);
      
        const [component, setComponent] = useState<ReactElement>(<></>);

        return component;
      }
      
      export const Primary = Template.bind({}) as StoryObj<StoryArgs>
      Primary.args = {
      disabled: false,
      icon: 'FavoriteStarFill',
      options: [
        { Value: 0, Label: 'First Option', Color: '#dd0000' },
        { Value: 1, Label:'Second Option', Color: '#dd0000' },
        { Value: 2, Label: 'Third Option', Color: '#dddd00' },
        { Value: 4, Label: 'Fourth Option', Color: '#dddd00' },
        { Value: 5, Label: 'Fifth Option', Color: '#dddddd' },
        { Value: 6, Label: 'Sixth Option', Color: '#dddddd' },
        { Value: 7, Label: 'Seventh Option', Color: '#dddddd' },
        { Value: 8, Label: 'Eighth Option', Color: '#dddddd' },
        { Value: 9, Label: 'Ninth Option', Color: '#dddddd' },
        { Value: 10, Label: 'Tenth Option', Color: '#dddddd' },
        { Value: 11, Label: 'Eleventh Option', Color: '#dddddd' },
      ],
      }
      
  