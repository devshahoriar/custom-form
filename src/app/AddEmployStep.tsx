import { Stapper, Step } from "@/components/Stepper";

import type { FromRef } from "@/components/form/Form";
import Form from "@/components/form/Form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

import { z } from "zod";

const gender = ["man", "woman", "other"] as const;

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z.string().email("Please enter a valid email address"),
  gender: z
    .string()
    .refine((val) => val !== "", {
      message: "Please select a valid gender",
    })
    .refine((val) => (gender as readonly string[]).includes(val), {
      message: "Please select a valid",
    }),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100)
    .optional(),
  notification: z.boolean().refine((val) => val === true, {
    message: "You must accept notifications",
  }),
  birthDay: z
    .date({ required_error: "Please select your birth date" })
    .refine(
      (date) => {
        if (date) return date <= new Date();
      },
      {
        message: "Birth date cannot be in the future",
      },
    )
    .refine(
      (date) => {
        if (!date) return false;
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
          return age - 1 >= 18;
        }
        return age >= 18;
      },
      { message: "You must be at least 18 years old" },
    ),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
});

type FormType = z.infer<typeof FormSchema>;

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  address: undefined as string | undefined,
  notification: false,
  birthDay: undefined as Date | undefined,
  skills: ["sss"] as string[],
};

const AddEmployStep = () => {
  const ref = useRef<FromRef<FormType>>(null);
    const handleSubmit = (data: FormType) => {
      console.log("Form submitted:", data);
      // Handle form submission here
    };
  return (
    <div>
      <Form
            ref={ref}
            onSubmit={handleSubmit}
            schema={FormSchema}
            initialValues={defaultValues as FormType}
            className="space-y-4"
            mode="onSubmit"
          >
      <Stapper
        onComplete={() => console.log("complet")}
        title="Add Employee"
        className="mx-auto mt-10"
      >
        <Step>
          <h1>Shuvo</h1>
        </Step>
        <Step validate={() => ({ message: "This is error", hasError: true })}>
          <h1>Shuvo1</h1>
        </Step>
        <Step>
          <h1>Shuvo2</h1>
        </Step>
        <Step>
          <h1>Shuvo2</h1>
        </Step>
        <Step>
          <h1>Shuvo2</h1>
        </Step>
      </Stapper>
      </Form>
    </div>
  );
};

export default AddEmployStep;
