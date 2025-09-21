import z from "zod";

export const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const phoneSchema = z.string().min(10);

export const checkUserNameUnique = async (username: string) => {
  const existingUsernames = ["john_doe", "jane_smith", "admin"];
  await new Promise((resolve) => setTimeout(resolve, 500));
  return !existingUsernames.includes(username);
};

export const checkEmailUnique = async (email: string) => {
  const existingEmails = ["admin@admin.com", "root@root.com"];
  await new Promise((resolve) => setTimeout(resolve, 500));
  return !existingEmails.includes(email);
};

const passwordRequirements = {
  minLength: 8,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

const passwordSchema = z
  .string()
  .min(
    passwordRequirements.minLength,
    `Password must be at least ${passwordRequirements.minLength} characters long`,
  )
  .refine((val) => passwordRequirements.hasUpperCase.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => passwordRequirements.hasLowerCase.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => passwordRequirements.hasNumber.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => passwordRequirements.hasSpecialChar.test(val), {
    message: "Password must contain at least one special character",
  });

export const EmployeeDetailsSchema1 = z.object({
  jobTitle: z.string().min(2, "Job Title is required"),
  department: z.string().min(2, "Department is required"),
  employeeId: z.string().min(2, "Employee ID is required"),
  joiningDate: z.date({
    required_error: "Joining Date is required",
    invalid_type_error: "Joining Date is required",
  }),
  reportingManager: z.string().min(2, "Reporting Manager is required"),
});

export const jobType = ["Full-time", "Part-time", "Contract"] as const;

export const EmploymentDetails2 = z
  .object({
    jobType: z.enum(jobType, {
      errorMap: () => ({ message: "Job Type is required" }),
    }),
    salary: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          return !isNaN(Number(val)) && Number(val) > 0;
        },
        {
          message: "Salary must be a positive number",
        },
      )
      .transform((val) => (val ? Number(val) : undefined)),
  })
  .superRefine((data, ctx) => {
    if (
      data.jobType === "Full-time" &&
      (data?.salary === undefined || data.salary <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Salary is required for Full-time employees and must be a positive number",
        path: ["salary"],
      });
      return true;
    }
  });

export const genderTypes = ["male", "female", "other"] as const;

export const EmployeeSchema = z.object({
  personalInformation: z.object({
    firstName: z.string().min(2, "First Name is required"),
    lastName: z.string().min(2, "Last Name is required"),
    userName: z
      .string()
      .min(2, "User Name is required")
      .refine(async (val) => await checkUserNameUnique(val), {
        message: "User Name already exists",
      }),
    dbo: z.date({
      message: "Date of Birth is required",
      invalid_type_error: "Date of Birth is required",
    }),
    profileImage: z.object({
      id: z.string(),
      url: z.string(),
    }),
    password: passwordSchema,
    gender: z.enum(genderTypes, {
      errorMap: () => ({ message: "Select your gender" }),
    }),
    contactNumber: phoneSchema,
    email: z
      .string()
      .email("Invalid email address")
      .refine(async (val) => await checkEmailUnique(val), {
        message: "Email already exists",
      }),
    homeAddress: z.string().min(5, "Home Address is required"),
    emergencyContact: z.object({
      name: z.string().min(2, "Contact Name is required"),
      relationship: z.string().min(2, "Relationship is required"),
      contactNumber: phoneSchema,
    }),
  }),
  employmentDetails: z.intersection(EmployeeDetailsSchema1, EmploymentDetails2),
  professionalExperience: z.array(
    z
      .object({
        companyName: z.string().min(2, "Company Name is required"),
        jobTitle: z.string().min(2, "Job Title is required"),
        startDate: z.date({ required_error: "Start Date is required" }),
        endDate: z.date({ required_error: "End Date is required" }),
        jobSummary: z.string().min(10, "Job Summary is required"),
      })
      .superRefine((data, ctx) => {
        if (data.endDate < data.startDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "End Date cannot be before Start Date",
          });
        }
      })
      .optional(),
  ),
  skillsAndGoals: z.object({
    skillCategory: z.string().min(1, "Please select a skill category"),
    goal: z.string().min(1, "Please select a career goal"),
  }),
  policyAgreement: z.object({
    termsOfService: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms of Service",
    }),
    privacyPolicy: z.boolean().refine((val) => val === true, {
      message: "You must accept the Privacy Policy",
    }),
    codeOfConduct: z.boolean().refine((val) => val === true, {
      message: "You must accept the Code of Conduct",
    }),
  }),
  confirmation: z.object({
    confirm: z.boolean().refine((val) => val === true, {
      message: "You must confirm that the information provided is accurate",
    }),
  }),
});

export type EmployeeFormType = z.infer<typeof EmployeeSchema>;

export const defaultEmployeeValues: EmployeeFormType = {
  personalInformation: {
    firstName: "",
    lastName: "",
    userName: "",

    dbo: new Date(),
    profileImage: {
      id: "",
      url: "",
    },
    password: "",
    gender: "male",
    contactNumber: "",
    email: "",
    homeAddress: "",
    emergencyContact: {
      name: "",
      relationship: "",
      contactNumber: "",
    },
  },
  employmentDetails: {
    jobTitle: "",
    department: "",
    employeeId: "",
    joiningDate: new Date(),
    reportingManager: "",
    jobType: "Full-time",
    salary: 0,
  },
  professionalExperience: [],
  skillsAndGoals: {
    skillCategory: "",
    goal: "",
  },
  policyAgreement: {
    termsOfService: false,
    privacyPolicy: false,
    codeOfConduct: false,
  },
  confirmation: {
    confirm: false,
  },
};

export const skillsOptions = {
  engineering: [
    { value: "react", label: "React" },
    { value: "nodejs", label: "NodeJS" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "docker", label: "Docker" },
  ],
  hr: [
    { value: "recruitment", label: "Recruitment" },
    { value: "employee-relations", label: "Employee Relations" },
    { value: "training", label: "Training and Development" },
    { value: "payroll", label: "Payroll Management" },
    { value: "performance-management", label: "Performance Management" },
  ],
  marketing: [
    { value: "seo", label: "SEO" },
    { value: "content-marketing", label: "Content Marketing" },
    { value: "social-media", label: "Social Media" },
    { value: "email-marketing", label: "Email Marketing" },
    { value: "analytics", label: "Analytics" },
  ],
};

// Helper function to get goal options based on selected skill category
export const getGoalOptionsFromCategory = (selectedCategory: string) => {
  if (
    !selectedCategory ||
    !skillsOptions[selectedCategory as keyof typeof skillsOptions]
  ) {
    return [];
  }

  return skillsOptions[selectedCategory as keyof typeof skillsOptions];
};

// Helper function to get category options for radio buttons
export const getCategoryOptions = () => {
  return Object.keys(skillsOptions).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
  }));
};

export const personalFids = [
  "personalInformation.firstName",
  "personalInformation.lastName",
  "personalInformation.userName",
  "personalInformation.dbo",
  "personalInformation.profileImage",
  "personalInformation.password",
  "personalInformation.gender",
  "personalInformation.contactNumber",
  "personalInformation.email",
  "personalInformation.homeAddress",
  "personalInformation.emergencyContact.name",
  "personalInformation.emergencyContact.relationship",
  "personalInformation.emergencyContact.contactNumber",
] as const;

export const employmentFids = [
  "employmentDetails.jobTitle",
  "employmentDetails.department",
  "employmentDetails.employeeId",
  "employmentDetails.joiningDate",
  "employmentDetails.reportingManager",
  "employmentDetails.jobType",
  "employmentDetails.salary",
] as const;
