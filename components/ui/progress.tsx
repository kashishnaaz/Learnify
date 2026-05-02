"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants=cva(
  "h-full w-full flex-1 bg-primary transition-all",
  {
    variants:{
      variant:{
        default:"bg-sky-600",
        success:"bg-emerald-700",
      },
      defaultVariants:{
        variant:"default",
      }
    }
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
       VariantProps<typeof progressVariants> {}

type CombinedProgressProps = ProgressProps & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

function Progress({
  className,
  value,
  variant,
  ...props
}: CombinedProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          progressVariants({ variant }),
          "size-full flex-1  transition-all"
        )}
        data-slot="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
