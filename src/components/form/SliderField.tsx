"use client";

import { cn } from "@/lib/utils";
import type { FieldValues, Path } from "react-hook-form";

import { Slider } from "../ui/slider";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useFormContext } from './Form';

type SliderFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
};

const SliderField = <T extends FieldValues>({
  name,
  label,
  description,
  className,
  disabled = false,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
}: SliderFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            {label && <FormLabel>{label}</FormLabel>}
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {field.value}
              </span>
            )}
          </div>
          <FormControl>
            <Slider
              className={cn("w-full", className)}
              value={[field.value]}
              onValueChange={(value) => field.onChange(value[0])}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
            />
          </FormControl>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SliderField;
