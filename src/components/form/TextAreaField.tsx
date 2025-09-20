"use client";

import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from ".";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

type TextAreaFieldProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
};

const TextAreaField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  disabled = false,
  rows = 3,
}: TextAreaFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn(className)}
              disabled={disabled}
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export  default TextAreaField;
