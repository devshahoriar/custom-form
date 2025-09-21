"use client";
import { useFormContext } from "@/components/form";
import type { FromRef } from "@/components/form/Form";
import Form from "@/components/form/Form";
import { Stapper } from "@/components/Stepper";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";
import {
  defaultEmployeeValues,
  EmployeeSchema,
  employmentFids,
  getCategoryOptions,
  getGoalOptionsFromCategory,
  personalFids,
  type EmployeeFormType,
} from "./AddEmployeeSchema";
import useTriggerFrom from "./useTriggerFrom";

const AddEmployee = ({ showHeader = false }: { showHeader?: boolean }) => {
  const ref = useRef<FromRef<EmployeeFormType>>(null);
  const submitButton = useRef<HTMLButtonElement>(null);
  const trigger = useTriggerFrom<EmployeeFormType>();

  useEffect(() => {
    console.log(ref.current?.getValues());
  }, [ref.current?.formState]);

  const handleSubmit = (data: EmployeeFormType) => {
    alert(JSON.stringify(data, null, 2));
  };
  return (
    <div className={cn(showHeader && "mx-auto mt-5 max-w-2xl", "mb-10")}>
      {showHeader && (
        <>
          <h1 className="text-3xl font-bold">New Employee</h1>
          <p>Add new Employee to your onboarding system</p>
        </>
      )}
      <Form
        ref={ref}
        onSubmit={handleSubmit}
        schema={EmployeeSchema}
        initialValues={defaultEmployeeValues}
        className="space-y-4"
        mode="onSubmit"
      >
        <Stapper onComplete={() => submitButton.current?.click()}>
          <Stapper.Step
            validate={() => trigger(ref.current?.form, [...personalFids])}
          >
            <PersonalDetailsFileds />
          </Stapper.Step>
          <Stapper.Step
            validate={() => trigger(ref.current?.form, [...employmentFids])}
          >
            <EmploymentDetailsFields />
          </Stapper.Step>
          <Stapper.Step
            validate={() =>
              trigger(ref.current?.form, ["professionalExperience"])
            }
          >
            <ProfessionalExperienceFields />
          </Stapper.Step>
          <Stapper.Step
            validate={() =>
              trigger(ref.current?.form, [
                "skillsAndGoals.skillCategory",
                "skillsAndGoals.goal",
              ])
            }
          >
            <SkillsAndGoalsFields />
          </Stapper.Step>
          <Stapper.Step
            validate={() =>
              trigger(ref.current?.form, [
                "policyAgreement.termsOfService",
                "policyAgreement.privacyPolicy",
                "policyAgreement.codeOfConduct",
                "confirmation.confirm",
              ])
            }
          >
            <PolicyFields />
          </Stapper.Step>
        </Stapper>
        <button type="submit" ref={submitButton} hidden className="hidden" />
      </Form>
    </div>
  );
};

const PersonalDetailsFileds = () => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <p className="text-muted-foreground text-sm">
          Please fill in your personal details
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Input<EmployeeFormType>
            name="personalInformation.firstName"
            label="First Name"
            placeholder="Enter your first name"
          />
          <Form.Input<EmployeeFormType>
            name="personalInformation.lastName"
            label="Last Name"
            placeholder="Enter your last name"
          />
        </div>

        <Form.Input<EmployeeFormType>
          name="personalInformation.userName"
          label="Username"
          placeholder="Enter your username"
        />

        <Form.DatePicker<EmployeeFormType>
          name="personalInformation.dbo"
          label="Date of Birth"
        />

        <Form.DropZone<EmployeeFormType>
          name="personalInformation.profileImage"
          label="Profile Image"
          title="Upload Profile Image"
          maxFiles={1}
          showPreview={true}
          onUpload={async (_files) => {
            return { id: "temp-id", url: "www.fb.com" };
          }}
          onRemove={async (_fileId, _url) => {
            return;
          }}
        />

        <Form.Password<EmployeeFormType>
          name="personalInformation.password"
          label="Password"
          placeholder="Enter your password"
          showRequirementsList
          showStrengthIndicator
        />

        <Form.Select<EmployeeFormType>
          name="personalInformation.gender"
          label="Gender"
          className="w-full"
          placeholder="Select your gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />

        <Form.Input<EmployeeFormType>
          name="personalInformation.contactNumber"
          label="Contact Number"
          placeholder="Enter your contact number"
        />

        <Form.Input<EmployeeFormType>
          name="personalInformation.email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
        />

        <Form.TextArea<EmployeeFormType>
          name="personalInformation.homeAddress"
          label="Home Address"
          placeholder="Enter your home address"
          className="min-h-20"
        />

        <div className="mt-4 border-t pt-4">
          <h4 className="mb-3 font-medium">Emergency Contact</h4>
          <div className="space-y-4">
            <Form.Input<EmployeeFormType>
              name="personalInformation.emergencyContact.name"
              label="Contact Name"
              placeholder="Enter emergency contact name"
            />

            <Form.Input<EmployeeFormType>
              name="personalInformation.emergencyContact.relationship"
              label="Relationship"
              placeholder="Enter relationship (e.g., spouse, parent)"
            />

            <Form.Input<EmployeeFormType>
              name="personalInformation.emergencyContact.contactNumber"
              label="Emergency Contact Number"
              placeholder="Enter emergency contact number"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const EmploymentDetailsFields = () => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Employment Details</h3>
        <p className="text-muted-foreground text-sm">
          Please provide your employment information
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Input<EmployeeFormType>
            name="employmentDetails.jobTitle"
            label="Job Title"
            placeholder="Enter your job title"
          />
          <Form.Input<EmployeeFormType>
            name="employmentDetails.department"
            label="Department"
            placeholder="Enter your department"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Input<EmployeeFormType>
            name="employmentDetails.employeeId"
            label="Employee ID"
            placeholder="Enter employee ID"
          />
          <Form.DatePicker<EmployeeFormType>
            name="employmentDetails.joiningDate"
            label="Joining Date"
          />
        </div>

        <Form.Input<EmployeeFormType>
          name="employmentDetails.reportingManager"
          label="Reporting Manager"
          placeholder="Enter reporting manager name"
        />

        <Form.Select<EmployeeFormType>
          name="employmentDetails.jobType"
          label="Job Type"
          placeholder="Select job type"
          className="w-full"
          options={[
            { value: "Full-time", label: "Full-time" },
            { value: "Part-time", label: "Part-time" },
            { value: "Contract", label: "Contract" },
          ]}
        />

        <Form.Input<EmployeeFormType>
          name="employmentDetails.salary"
          label="Salary"
          type="number"
          placeholder="Enter salary amount"
        />
      </div>
    </Card>
  );
};

const ProfessionalExperienceFields = () => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Professional Experience</h3>
        <p className="text-muted-foreground text-sm">
          Add your previous work experiences
        </p>
      </div>

      <Form.Array<EmployeeFormType> name="professionalExperience">
        {({ append, fields, remove }) => (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card key={field.id} className="border-dashed p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Form.Input<EmployeeFormType>
                      name={`professionalExperience.${index}.companyName`}
                      label="Company Name"
                      placeholder="Enter company name"
                    />
                    <Form.Input<EmployeeFormType>
                      name={`professionalExperience.${index}.jobTitle`}
                      label="Job Title"
                      placeholder="Enter job title"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Form.DatePicker<EmployeeFormType>
                      name={`professionalExperience.${index}.startDate`}
                      label="Start Date"
                    />
                    <Form.DatePicker<EmployeeFormType>
                      name={`professionalExperience.${index}.endDate`}
                      label="End Date"
                    />
                  </div>

                  <Form.TextArea<EmployeeFormType>
                    name={`professionalExperience.${index}.jobSummary`}
                    label="Job Summary"
                    placeholder="Describe your role and responsibilities"
                    className="min-h-20"
                  />
                </div>
              </Card>
            ))}

            <button
              type="button"
              onClick={() =>
                append({
                  companyName: "",
                  jobTitle: "",
                  startDate: new Date(),
                  endDate: new Date(),
                  jobSummary: "",
                })
              }
              className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400"
            >
              + Add Experience
            </button>
          </div>
        )}
      </Form.Array>
    </Card>
  );
};

const SkillsAndGoalsFields = () => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Skills and Goals</h3>
        <p className="text-muted-foreground text-sm">
          Select your skill category and career goals
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Form.RadioGroup<EmployeeFormType>
            name="skillsAndGoals.skillCategory"
            label="Select Skill Category"
            options={getCategoryOptions()}
            className="space-y-3"
          />
        </div>

        <div>
          <DynamicGoalsSelect />
        </div>
      </div>
    </Card>
  );
};

// Separate component for dynamic goals selection
const DynamicGoalsSelect = () => {
  const control = useFormContext<EmployeeFormType>();

  // Watch the skill category field to get real-time updates
  const selectedCategory = useWatch({
    control,
    name: "skillsAndGoals.skillCategory",
    defaultValue: "",
  });

  // Get goal options based on selected category
  const goalOptions = getGoalOptionsFromCategory(selectedCategory || "");
  const isDisabled = goalOptions.length === 0;

  return (
    <div className="space-y-2">
      <Form.Select<EmployeeFormType>
        name="skillsAndGoals.goal"
        label="Career Goals"
        placeholder={
          isDisabled
            ? "Select a skill category first to enable goals"
            : `Select your goal from ${selectedCategory} options`
        }
        options={goalOptions}
        disabled={isDisabled}
        className="w-full"
        key={selectedCategory} // Force re-render and reset when category changes
      />
      {isDisabled ? (
        <p className="text-muted-foreground text-sm">
          Please select a skill category to choose a career goal.
        </p>
      ) : (
        <p className="text-muted-foreground text-sm">
          Showing goals from:{" "}
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}{" "}
          category
        </p>
      )}
    </div>
  );
};

const PolicyFields = () => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Policy Agreement</h3>
        <p className="text-muted-foreground text-sm">
          Please review and accept our policies
        </p>
      </div>

      <div className="space-y-6">
        <Form.Checkbox<EmployeeFormType>
          name="policyAgreement.termsOfService"
          label="Terms of Service"
          description="I agree to the company's Terms of Service"
        />

        <Form.Checkbox<EmployeeFormType>
          name="policyAgreement.privacyPolicy"
          label="Privacy Policy"
          description="I agree to the company's Privacy Policy"
        />

        <Form.Checkbox<EmployeeFormType>
          name="policyAgreement.codeOfConduct"
          label="Code of Conduct"
          description="I agree to follow the company's Code of Conduct"
        />

        <div className="mt-6 border-t pt-4">
          <h4 className="mb-3 font-medium">Confirmation</h4>
          <Form.Checkbox<EmployeeFormType>
            name="confirmation.confirm"
            label="Data Accuracy Confirmation"
            description="I confirm that all the information provided above is accurate and complete"
          />
        </div>
      </div>
    </Card>
  );
};

export default AddEmployee;
