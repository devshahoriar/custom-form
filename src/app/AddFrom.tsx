"use client";

import type { FromRef } from "@/components/form/Form";
import Form from "@/components/form/Form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
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
  image: z.object({
    id: z.string(),
    url: z.string().url("Invalid URL"),
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
  image: {
    id: "",
    url: "",
  },
};

const AddFrom = () => {
  const ref = useRef<FromRef<FormType>>(null);
  const handleSubmit = (data: FormType) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  const showResult = () => {
    console.log(ref.current?.getValues());
  }

  return (
    <div className="mx-auto mt-10 w-md rounded border p-3 shadow-md">
      <Form
        ref={ref}
        onSubmit={handleSubmit}
        schema={FormSchema}
        initialValues={defaultValues as FormType}
        className="space-y-4"
        mode="onSubmit"
      >
        <Form.Input<FormType>
          name="firstName"
          placeholder="Enter your first name"
          label="First Name"
          type="text"
        />
        <Form.Input<FormType>
          name="lastName"
          placeholder="Enter your last name"
          label="Last Name"
          type="text"
        />
        <Form.Input<FormType>
          name="email"
          placeholder="Enter your email"
          label="Email"
          type="email"
        />
        <Form.DatePicker<FormType>
          name="birthDay"
          label="Birthdate"
          // dateDisabled={(date) => date > new Date()}
        />
        <Form.DropZone<FormType>
          name="image"
          label="Profile Image"
          type="button"
          onUpload={async (files) => {
            return { id: "id", url: "kk" };
          }}
          title="Upload Image"
          onRemove={async (fileId, url) => {
            return;
          }}
          // onlyIcon={true}
          icon={<Camera />}
          showPreview={false}
          // className="max-w-lg"
          // className='size-10'
        />
        <Form.Select<FormType>
          name="gender"
          placeholder="Select your gender"
          className="w-full"
          options={gender.map((g) => ({
            value: g,
            label: g.charAt(0).toUpperCase() + g.slice(1),
          }))}
          label="Gender"
        />
        <Form.TextArea<FormType>
          name="address"
          placeholder="Enter your address"
          label="Address"
          className="h-24 w-full"
        />

        <Form.Checkbox<FormType>
          name="notification"
          label="Enable notifications"
          description="You can enable or disable notifications at any time."
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />

        <Form.Array<FormType> name="skills">
          {({ append, fields, remove }) => {
            return (
              <>
                <Label>Skills</Label>
                {fields.map((field, index) => (
                  <div key={field.id} className="mb-2 flex items-center gap-2">
                    <Form.Input<FormType>
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
        </Form.Array>

        <Button onClick={showResult} type="button" className="">
          Submi t
        </Button>
      </Form>
    </div>
  );
};

export default AddFrom;
