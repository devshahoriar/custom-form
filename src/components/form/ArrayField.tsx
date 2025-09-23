import {
  useFieldArray,
  type ArrayPath,
  type FieldValues,
  type UseFieldArrayReturn,
  type Path,
} from "react-hook-form";
import { useFormContext } from './Form';

export type ArrayFieldProps<TFromValue extends FieldValues> = {
  children: (
    field: UseFieldArrayReturn<TFromValue, ArrayPath<TFromValue>, "id">,
  ) => React.ReactNode;
  name: Path<TFromValue>;
};

/**
 * 
 * @example
 * 
 * ....
 * skills: z.array(some thing)
 * .....
 * 
 * <ArrayField<FormType> name="skills">
    {({ append, fields, remove }) => {
      return (
        <>
          <Label>Skills</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-2 flex items-center gap-2">
                <TextField<FormType>
                  name={`skills.${index}`}
                  placeholder="Enter your skill"
                />
                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
              ))}
                <Button type="button" onClick={() => append("")}>
                  Add Skill
                </Button>
          </>
        );
      }}
    </ArrayField>
 */
const ArrayField = <TFromValue extends FieldValues>({
  children,
  name,
}: ArrayFieldProps<TFromValue>) => {
  const control = useFormContext<TFromValue>();
  const fieldArray = useFieldArray({ 
    control, 
    name: name as ArrayPath<TFromValue> 
  });

  return children(fieldArray);
};

export default ArrayField;
