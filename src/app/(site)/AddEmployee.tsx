"use client";
import type { FromRef } from "@/components/form/Form";
import Form from "@/components/form/Form";
import { Stapper, Step } from "@/components/Stepper";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import z from "zod";

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
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().length(11, { message: "Phone number mast be 11" }),
  emergencyPhone: z.string().length(11, { message: "Phone number mast be 11" }),
  image: z.object({
    id: z.string({ required_error: "Image required" }),
    url: z.string({ required_error: "Image required" }),
  }),
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
  image: "",
};

const AddEmployee = ({ showHeader = false }: { showHeader?: boolean }) => {
  const ref = useRef<FromRef<FormType>>(null);
  const handleSubmit = (data: FormType) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };
  return (
    <div className={cn(showHeader && "mx-auto mt-5 max-w-2xl", "")}>
      {showHeader && (
        <>
          <h1 className="text-3xl font-bold">New Employee</h1>
          <p>Add new Employee to your onboarding system</p>
        </>
      )}
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
        >
          <Step>
            <Form.Input<FormType>
              name="firstName"
              placeholder="Enter your first name"
              label="First Name"
              type="text"
            />
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

export default AddEmployee;
