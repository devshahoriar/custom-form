import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

const useTriggerFrom = <T extends FieldValues>() => {
  const triggerForm = async (
    form: UseFormReturn<T> | null | undefined,
    paths: Path<T>[],
  ) => {
    if (!form) return { hasError: true, message: "Form is not initialized" };
    const triggerResult = await form.trigger(paths);
    if (!triggerResult) {
      return { hasError: true, message: "Form has errors" };
    }
    return { hasError: false,message: "" };
  };
  return triggerForm;
};

export default useTriggerFrom;
