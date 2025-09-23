"use client";

import { cn } from "@/lib/utils";
import type { FieldValues, Path } from "react-hook-form";

import { Checkbox } from "../ui/checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useFormContext } from './Form';

type CheckboxFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
};

const CheckboxField = <T extends FieldValues>({
  name,
  label,
  description,
  className,
  disabled = false,
}: CheckboxFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
          <FormControl>
            <Checkbox
              className={cn(className)}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
