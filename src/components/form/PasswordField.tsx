'use client';

import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from ".";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { PasswordInput } from "./passwordInput";

type PasswordFieldProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  showStrengthIndicator?: boolean;
  showRequirementsList?: boolean;
  strengthRequirements?: Array<{ regex: RegExp; text: string }>;
};

const PasswordField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  disabled = false,
  showStrengthIndicator = false,
  showRequirementsList = false,
  strengthRequirements,
}: PasswordFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <PasswordInput
              placeholder={placeholder}
              className={className}
              disabled={disabled}
              showStrengthIndicator={showStrengthIndicator}
              showRequirementsList={showRequirementsList}
              strengthRequirements={strengthRequirements}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
