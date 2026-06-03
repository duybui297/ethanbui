import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        category: 'bg-accent-50 text-accent-500 border border-transparent',
        outline: 'border border-border-hi text-text-2',
        success: 'bg-success/10 text-success border border-transparent',
        danger: 'bg-danger/10 text-danger border border-transparent',
        muted: 'bg-bg-muted text-text-2 border border-transparent'
      }
    },
    defaultVariants: { variant: 'category' }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
