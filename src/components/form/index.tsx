"use client";
import { createContext, useContext } from "react";
import { type Control, type FieldValues } from "react-hook-form";

// We need to use any here to allow the context to be generic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormContext = createContext<{ control: Control<any> } | null>(
  null,
);

export const useFormContext = <T extends FieldValues = FieldValues>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context.control as Control<T>;
};
