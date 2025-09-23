'use client';

import type { FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from './Form';

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  type?: HTMLInputElement["type"];
  className?: string;
  disabled?: boolean;
};

const TextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  disabled = false,
}: TextFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input 
              placeholder={placeholder} 
              type={type} 
              className={className}
              disabled={disabled}
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
