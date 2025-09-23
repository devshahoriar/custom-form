'use client';

import type { FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useFormContext } from './Form';

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type RadioGroupFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  options: RadioOption[];
  className?: string;
  disabled?: boolean;
};

const RadioGroupField = <T extends FieldValues>({
  name,
  label,
  options,
  className,
  disabled = false,
}: RadioGroupFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={className}
              disabled={disabled}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    disabled={option.disabled || disabled}
                  />
                  <FormLabel 
                    htmlFor={option.value}
                    className="cursor-pointer font-normal"
                  >
                    {option.label}
                  </FormLabel>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioGroupField;
