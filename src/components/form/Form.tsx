"use client";

import { Form as ShedcnForm } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle, type Ref } from "react";
import {
  useForm,
  type Control,
  type FieldValues,
  type Path,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";
import type { z, ZodType } from "zod";
import { FormContext } from ".";
import ArrayField from './ArrayField';
import CheckboxField from './CheckboxField';
import DatePickerField from './DatePickerField';
import SelectField from './SelectField';
import SliderField from './SliderField';
import SwitchField from './SwitchField';
import TextAreaField from './TextAreaField';
import TextField from "./TextField";
import DropZoneField from './DropZoneField';

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
Form.TextArea = TextAreaField;
Form.Select = SelectField;
Form.Slider = SliderField;
Form.Switch = SwitchField;
Form.Checkbox = CheckboxField;
Form.DatePicker = DatePickerField;
Form.Array = ArrayField;
Form.DropZone = DropZoneField;

export default Form;
