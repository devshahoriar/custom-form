"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { FieldValues, Path } from "react-hook-form";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { Matcher } from 'react-day-picker';
import { useFormContext } from './Form';

type DatePickerFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  dateDisabled?: Matcher | Matcher[];
};

const DatePickerField = <T extends FieldValues>({
  name,
  label,
  placeholder = "Pick a date",
  className,
  disabled,
  dateDisabled
}: DatePickerFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    className,
                  )}
                  disabled={disabled}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                captionLayout='dropdown'
                disabled={dateDisabled}
            
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePickerField;
