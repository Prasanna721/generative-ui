'use client';

import React from 'react';
import { Button, Slider, Text } from '@generative-ui/core';

export default function ComponentsPage() {
  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Components Showcase</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Slider</h2>

        <div className="space-y-6">
          <div className="w-64">
            <p className="mb-2">Default Slider</p>
            <Slider />
          </div>

          <div className="w-64">
            <p className="mb-2">Slider with custom value</p>
            <Slider value={30} />
          </div>

          <div className="w-96">
            <p className="mb-2">Range Slider (wider)</p>
            <Slider value={[20, 80]} />
          </div>

          <div>
            <p className="mb-2">Different sizes with different widths</p>
            <div className="space-y-4">
              <div>
                <Slider className="w-48" value={50} size="xs" />
              </div>
              <div className="w-56">
                <Slider value={50} size="s" />
              </div>
              <div className="w-64">
                <Slider value={50} size="m" />
              </div>
              <div className="w-72">
                <Slider value={50} size="l" />
              </div>
              <div className="w-80">
                <Slider value={50} size="xl" />
              </div>
            </div>
          </div>

          <div className="w-96">
            <p className="mb-2">Custom colors</p>
            <Slider
              value={60}
              trackColorActive="#FF6F00"
              trackColorInactive="#FFE0B2"
              thumbColor="#FF6F00"
            />
          </div>

          <div className="w-64">
            <p className="mb-2">With steps and stops</p>
            <Slider
              value={40}
              step={10}
              showStops={true}
            />
          </div>

          <div className="h-64">
            <p className="mb-2">Vertical Slider</p>
            <Slider
              value={70}
              orientation="vertical"
              size="m"
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Button</h2>

        <div className="space-y-6">
          <div>
            <p className="mb-2">Button Variants</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="elevated">Elevated</Button>
              <Button variant="filled">Filled</Button>
              <Button variant="filledTonal">Filled Tonal</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </div>
          </div>


          <div>
            <p className="mb-2">Button Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="extraSmall">Extra Small</Button>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
              <Button size="extraLarge">Extra Large</Button>
            </div>
          </div>

          <div>
            <p className="mb-2">Button Shapes</p>
            <div className="flex flex-wrap gap-4">
              <Button shape="round">Round</Button>
              <Button shape="square">Square</Button>
            </div>
          </div>

          <div>
            <p className="mb-2">Buttons with Icons</p>
            <div className="flex flex-wrap gap-4">
              <Button iconName="User" iconPosition="start">Profile</Button>
              <Button iconName="Heart" iconPosition="end">Like</Button>
              <Button iconName="Search" />
              <Button iconName="Download" variant="filled">Download</Button>
            </div>
          </div>

          <div>
            <p className="mb-2">Toggle Buttons</p>
            <div className="flex flex-wrap gap-4">
              <Button isToggleButton isSelected={false}>Not Selected</Button>
              <Button isToggleButton isSelected={true}>Selected</Button>
              <Button isToggleButton isSelected={true} shape="round">Round Selected</Button>
            </div>
          </div>

          <div>
            <p className="mb-2">Button States</p>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div>
            <p className="mb-2">Padding Width Options</p>
            <div className="flex flex-wrap gap-4">
              <Button paddingWidth="16dp" size="small">16dp Padding</Button>
              <Button paddingWidth="24dp" size="small">24dp Padding</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Text</h2>

        <div className="space-y-8">
          <div>
            <p className="mb-4 text-gray-600">Display Variants</p>
            <div className="space-y-2">
              <Text variant="display" size="large">Display Large</Text>
              <Text variant="display" size="medium">Display Medium</Text>
              <Text variant="display" size="small">Display Small</Text>
            </div>
          </div>

          <div>
            <p className="mb-4 text-gray-600">Headline Variants</p>
            <div className="space-y-2">
              <Text variant="headline" size="large">Headline Large</Text>
              <Text variant="headline" size="medium">Headline Medium</Text>
              <Text variant="headline" size="small">Headline Small</Text>
            </div>
          </div>

          <div>
            <p className="mb-4 text-gray-600">Title Variants</p>
            <div className="space-y-2">
              <Text variant="title" size="large">Title Large</Text>
              <Text variant="title" size="medium">Title Medium</Text>
              <Text variant="title" size="small">Title Small</Text>
            </div>
          </div>

          <div>
            <p className="mb-4 text-gray-600">Body Variants</p>
            <div className="space-y-2">
              <Text variant="body" size="large">Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              <Text variant="body" size="medium">Body Medium - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              <Text variant="body" size="small">Body Small - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </div>
          </div>

          <div>
            <p className="mb-4 text-gray-600">Label Variants</p>
            <div className="space-y-2">
              <Text variant="label" size="large">Label Large</Text>
              <Text variant="label" size="medium">Label Medium</Text>
              <Text variant="label" size="small">Label Small</Text>
            </div>
          </div>

          <div>
            <p className="mb-4 text-gray-600">Custom Colors</p>
            <div className="space-y-2">
              <Text variant="headline" size="medium" color="#6200EE">Purple Headline</Text>
              <Text variant="body" size="large" color="#FF6F00">Orange Body Text</Text>
              <Text variant="label" size="medium" color="#00C853">Green Label</Text>
            </div>
          </div>

          <div>
            <p className="mb-4 text-gray-600">Custom HTML Elements</p>
            <div className="space-y-2">
              <Text variant="body" size="medium" as="div">Body text rendered as div</Text>
              <Text variant="label" size="large" as="button" className="hover:underline cursor-pointer">Label rendered as button</Text>
              <Text variant="title" size="small" as="span">Title rendered as span</Text>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}