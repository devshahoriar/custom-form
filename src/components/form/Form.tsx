"use client";

import { Form as ShedcnForm } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle, type Ref } from "react";
import {
  useForm,
  type Path,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";
import type { z, ZodType } from "zod";

import ArrayField from './ArrayField';
import CheckboxField from './CheckboxField';
import DatePickerField from './DatePickerField';
import PasswordField from './PasswordField';
import SelectField from './SelectField';
import SliderField from './SliderField';
import SwitchField from './SwitchField';
import TextAreaField from './TextAreaField';
import TextField from "./TextField";
import DropZoneField from './DropZoneField';
import RadioGroupField from './RadioGroupField';
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

export type FromRef<TfromValues extends FieldValues> = {
  control: Control<TfromValues>;
  form: ReturnType<typeof useForm<TfromValues>>;
  formState: ReturnType<typeof useForm<TfromValues>>["formState"];
  getValues: ReturnType<typeof useForm<TfromValues>>["getValues"];
  setValue: (
    name: Path<TfromValues>,
    value: TfromValues[Path<TfromValues>],
  ) => void;
  reset: (values?: Partial<TfromValues>) => void;
};

type FormProps<TSchema extends ZodType> = {
  initialValues: z.infer<TSchema>;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  mode?: UseFormProps["mode"];
  schema: TSchema;
  children: React.ReactNode;
  className?: string;
  resetOnSubmit?: boolean;
  ref?: Ref<FromRef<z.infer<TSchema>>>;
};

const Form = <TSchema extends ZodType>({
  children,
  initialValues,
  onSubmit,
  schema,
  mode = "onChange",
  className,
  resetOnSubmit = false,
  ref,
}: FormProps<TSchema>) => {
  type FormType = z.infer<typeof schema>;

  const form = useForm<FormType>({
    defaultValues: initialValues,
    mode: mode,
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: FormType) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    control: form.control,
    form,
    formState: form.formState,
    getValues: form.getValues,
    setValue: form.setValue,
    reset: form.reset,
  }));

  return (
    <FormContext.Provider
      value={{ control: form.control }}
    >
      <ShedcnForm {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
          {children}
        </form>
      </ShedcnForm>
    </FormContext.Provider>
  );
};

Form.displayName = "Form";
Form.Input = TextField;
Form.Password = PasswordField;
Form.TextArea = TextAreaField;
Form.Select = SelectField;
Form.Slider = SliderField;
Form.Switch = SwitchField;
Form.Checkbox = CheckboxField;
Form.DatePicker = DatePickerField;
Form.Array = ArrayField;
Form.DropZone = DropZoneField;
Form.RadioGroup = RadioGroupField;

export default Form;
