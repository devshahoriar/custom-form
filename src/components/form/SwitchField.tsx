"use client";

import { cn } from "@/lib/utils";
import type { FieldValues, Path } from "react-hook-form";
import { Switch } from "../ui/switch";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useFormContext } from './Form';

type SwitchFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
};

const SwitchField = <T extends FieldValues>({
  name,
  label,
  description,
  className,
  disabled = false,
}: SwitchFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            {label && <FormLabel className="text-base">{label}</FormLabel>}
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>
          <FormControl>
            <Switch
              className={cn(className)}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SwitchField;
