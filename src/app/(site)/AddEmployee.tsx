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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium praesentium, minus iure accusamus itaque, tempora modi architecto expedita dicta natus cupiditate! Repellat aut autem dolor accusantium consequatur. Obcaecati praesentium voluptas saepe? Dolore vero est consequatur nulla, similique aut a asperiores nam quis in earum dolores deleniti assumenda ipsa laboriosam quasi repellat placeat exercitationem. Neque obcaecati aperiam, consequatur facilis quasi repellendus, fugiat quia itaque dolor nulla reiciendis laudantium autem ratione dolore, fugit sapiente nesciunt odit. Autem illum dolore ea, totam est iure voluptatem sequi sapiente nesciunt inventore fuga quo minima dolor esse consequatur assumenda officiis incidunt velit id consectetur. Impedit corporis, error tenetur officia ratione rerum vel mollitia nam. Sint labore explicabo quos dolore sapiente, ea, autem numquam perspiciatis accusamus molestiae qui molestias error. Culpa perferendis expedita nulla, exercitationem praesentium id blanditiis ut possimus quo quis, cumque sed atque veniam voluptas reiciendis ea autem voluptatibus neque eveniet perspiciatis eum delectus unde. Alias temporibus vero eaque cupiditate laborum sit nemo necessitatibus ullam facere earum esse veniam aliquid enim, repellat magnam tempora, ea culpa ad similique saepe magni? Iusto, ducimus aperiam. Quibusdam voluptatem officiis consequatur ipsa in officia est fuga itaque. Facere tenetur praesentium quaerat alias totam repellat ipsum illo libero corrupti provident deleniti minima dolor accusamus, sit nostrum voluptates quia. Dignissimos voluptatem facere deleniti animi aspernatur tempora, voluptas aperiam dolores obcaecati accusantium saepe fuga unde! Nam quas veniam earum cumque laudantium, expedita voluptatibus minima alias libero commodi et reiciendis. Hic facere aspernatur reprehenderit nemo maxime laudantium amet eveniet dolorem porro. Repellendus aut dolores recusandae id suscipit amet qui, et assumenda quae. Eligendi, fugit aut? Assumenda dolorum error delectus laboriosam voluptatem recusandae commodi minima repellendus amet ad at blanditiis placeat illo, quaerat perferendis consequuntur tempore quas ex magnam. Reiciendis, possimus! Quod tempora quidem reiciendis nulla et! Neque dolorem commodi consectetur obcaecati aperiam quis ipsam repellendus suscipit fugiat non explicabo harum facere esse consequatur sequi consequuntur hic, a molestias tenetur vel vitae in ea? Sed dolor libero soluta illum maiores, quos a atque quae corporis ex porro vel earum ducimus error, sint suscipit iure iste perspiciatis modi unde, neque laudantium tempore? Minima maxime dolore, nihil assumenda nulla alias sed facilis, ipsam impedit recusandae unde quisquam totam ad enim temporibus similique. Repellat, inventore, asperiores exercitationem ipsam voluptate ab distinctio facere, totam nobis voluptates ipsum fugit consequuntur perferendis magni sed deleniti sunt iusto numquam temporibus magnam quam. Quasi, ex nemo, culpa aperiam optio error ipsa, harum sit ab accusantium recusandae quod eligendi! Veritatis, beatae rerum, repellendus temporibus ea necessitatibus, illum accusamus quibusdam tenetur doloremque quos itaque quis et voluptas? Blanditiis consectetur distinctio alias facere quaerat ea maxime quam debitis fuga? Aspernatur quam possimus a officia repellendus. Repellendus autem laboriosam quasi minima? Labore alias consequatur deserunt sint commodi est dolorum officia dolores quam modi eius quisquam excepturi nemo rerum, facilis eaque non exercitationem necessitatibus voluptatum odit officiis delectus qui ipsam. In enim aliquam distinctio ducimus pariatur ea minus fuga sapiente cumque! Ducimus sunt blanditiis modi voluptas! Consequuntur maiores voluptate nobis asperiores recusandae ratione at optio ut saepe?
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
