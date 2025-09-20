import { cn } from "@/lib/utils";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useState,
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
} from "react";
import { Button } from "./ui/button";

type TypeStepContext = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  steps: number;
};

const StepperContext = createContext<TypeStepContext | null>(null);

const useStepContext = () => {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error("useStapeContext must be used within a StepperProvider");
  }
  return ctx;
};

type StepperProps = {
  children: ReactNode;
  initialStep?: number;
  title: string;
  className?: string;
};

// Stepper Component
export const Stapper = ({
  children,
  initialStep = 1,
  title,
  className,
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const stepCount = getSteps(children).length;
  return (
    <StepperContext.Provider
      value={{ currentStep, setCurrentStep, steps: stepCount }}
    >
      <StepContent title={title} className={className}>
        {children}
      </StepContent>
    </StepperContext.Provider>
  );
};

const StepContent = ({
  children,
  className,
  title,
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) => {
  const { steps, currentStep, setCurrentStep } = useStepContext();
  const activeStep = getSteps(children)[
    currentStep - 1
  ] as ReactElement<StepProps>;
  const nextStep = () => {
    if (activeStep?.props?.validate && !activeStep.props.validate()) {
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps));
  };
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div
        className={cn("max-w-xl rounded-lg border p-6 shadow-md", className)}
      >
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <StepIndicatorHeader />
        {activeStep}
        <div className="mt-4 flex justify-between">
          <Button onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          <Button onClick={nextStep} disabled={currentStep === steps}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
// Step Component

type StepProps = {
  children: ReactNode;
  validate?: () => boolean;
};

export const Step = ({ children, validate }: StepProps) => {
  const { steps } = useStepContext();
  return (
    <>
      {children} {steps}
    </>
  );
};

// Step indicator header
const StepIndicatorHeader = () => {
  const { currentStep, steps } = useStepContext();
  return (
    <div className="mb-4 flex items-center justify-between">
      {Array.from({ length: steps }, (_, i) => i + 1).map((step, index) => {
        return (
          <div key={step} className="flex flex-1 items-center">
            <StepIndicator
              isCurrent={currentStep === step}
              isCompleted={currentStep > step}
              position={step}
            />
            {index < steps - 1 && <StepBar isCompleted={currentStep > step} />}
          </div>
        );
      })}
    </div>
  );
};

const StepIndicator = ({
  isCompleted,
  isCurrent,
  position,
}: {
  isCurrent: boolean;
  isCompleted: boolean;
  position: string | number;
}) => {
  const baseClasses =
    "flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300";
  if (isCurrent) {
    return (
      <div className={`${baseClasses} border-blue-500 bg-blue-500 text-white`}>
        {position}
      </div>
    );
  }
  if (isCompleted) {
    return (
      <div
        className={`${baseClasses} border-green-500 bg-green-500 text-white text-sm`}
      >
        ✓
      </div>
    );
  }
  return (
    <div className={`${baseClasses} border-gray-300 bg-white text-gray-500`}>
      {position}
    </div>
  );
};

const StepBar = ({ isCompleted }: { isCompleted: boolean }) => {
  return (
    <div
      className={`h-1 flex-1 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
    />
  );
};

// Utility function to count Step components
const getSteps = (children: ReactNode): ReactNode[] =>
  Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Step,
  );
