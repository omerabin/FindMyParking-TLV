'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible@1.1.3';
import { ComponentProps } from 'react';

const Collapsible = ({
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Root>) => {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
};

const CollapsibleTrigger = ({
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) => {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
};

const CollapsibleContent = ({
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
