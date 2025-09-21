"use client";
import type { FromRef } from "@/components/form/Form";
import Form from "@/components/form/Form";
import { Stapper } from "@/components/Stepper";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import {
  defaultEmployeeValues,
  EmployeeSchema,
  type EmployeeFormType,
} from "./AddEmployeeSchema";
import { Card } from '@/components/ui/card';

const AddEmployee = ({ showHeader = false }: { showHeader?: boolean }) => {
  const ref = useRef<FromRef<EmployeeFormType>>(null);
  const handleSubmit = (data: EmployeeFormType) => {
    console.log("Form submitted:", data);
    // Handle form submission here
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
        <Stapper>
          <Stapper.Step>
            <PersonalDetailsFileds />
          </Stapper.Step>
          <Stapper.Step>
            <EmploymentDetailsFields />
          </Stapper.Step>
          <Stapper.Step>
            <ProfessionalExperienceFields />
          </Stapper.Step>
          <Stapper.Step>
            <SkillsAndGoalsFields />
          </Stapper.Step>
          <Stapper.Step>
            <PolicyFields />
          </Stapper.Step>
        </Stapper>
      </Form>
    </div>
  );
};


const PersonalDetailsFileds = () => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <p className="text-sm text-muted-foreground">Please fill in your personal details</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          onUpload={async (_files) => {
            return { id: "temp-id", url: "temp-url" };
          }}
          onRemove={async (_fileId, _url) => {
            return;
          }}
        />

        <Form.Input<EmployeeFormType>
          name="personalInformation.password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Form.Select<EmployeeFormType>
          name="personalInformation.gender"
          label="Gender"
          placeholder="Select your gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" }
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

        <div className="border-t pt-4 mt-4">
          <h4 className="font-medium mb-3">Emergency Contact</h4>
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
        <p className="text-sm text-muted-foreground">Please provide your employment information</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          options={[
            { value: "Full-time", label: "Full-time" },
            { value: "Part-time", label: "Part-time" },
            { value: "Contract", label: "Contract" }
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
        <p className="text-sm text-muted-foreground">Add your previous work experiences</p>
      </div>
      
      <Form.Array<EmployeeFormType> name="professionalExperience">
        {({ append, fields, remove }) => (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card key={field.id} className="p-4 border-dashed">
                <div className="flex justify-between items-center mb-4">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              onClick={() => append({
                companyName: "",
                jobTitle: "",
                startDate: new Date(),
                endDate: new Date(),
                jobSummary: ""
              })}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
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
        <p className="text-sm text-muted-foreground">Share your skills and career goals</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Skills</h4>
          <Form.Array<EmployeeFormType> name="skillsAndGoals.skills">
            {({ append, fields, remove }) => (
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Form.Input<EmployeeFormType>
                      name={`skillsAndGoals.skills.${index}` as const}
                      placeholder="Enter a skill"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-3 py-2 text-red-500 hover:text-red-700 border border-red-200 rounded-md hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  // @ts-expect-error - TypeScript is confused about the array type
                  onClick={() => append("")}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  + Add Skill
                </button>
              </div>
            )}
          </Form.Array>
        </div>

        <div>
          <Form.TextArea<EmployeeFormType>
            name="skillsAndGoals.goal"
            label="Career Goals"
            placeholder="Describe your career goals and aspirations"
            className="min-h-24"
          />
        </div>
      </div>
    </Card>
  );
};

const PolicyFields = () => {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Policy Agreement</h3>
        <p className="text-sm text-muted-foreground">Please review and accept our policies</p>
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

        <div className="border-t pt-4 mt-6">
          <h4 className="font-medium mb-3">Confirmation</h4>
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
