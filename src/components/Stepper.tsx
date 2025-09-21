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

export type StepError = {
  hasError: boolean;
  message?: string;
};

type TypeStepContext = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  steps: number;
  stepErrors?: Record<number, StepError>;
  setStepErrors?: Dispatch<SetStateAction<Record<number, StepError>>>;
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
  title?: string;
  className?: string;
  onComplete?: () => void | Promise<void>;
  completeLabel?: string;
};

// Stepper Component
export const Stapper = ({
  children,
  initialStep = 1,
  title,
  className,
  onComplete,
  completeLabel = "Complete",
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [stepErrors, setStepErrors] = useState<Record<number, StepError>>({});
  const stepCount = getSteps(children).length;
  return (
    <StepperContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        steps: stepCount,
        setStepErrors,
        stepErrors,
      }}
    >
      <StepContent
        completeLabel={completeLabel}
        onComplete={onComplete}
        title={title}
        className={className}
      >
        {children}
      </StepContent>
    </StepperContext.Provider>
  );
};

const useStep = (children: ReactNode) => {
  const { currentStep, setCurrentStep, steps, setStepErrors, stepErrors } =
    useStepContext();
  const stepsComponents = getSteps(children);

  const activeStep = stepsComponents[
    currentStep - 1
  ] as ReactElement<StepProps>;

  const validateStep = async (): Promise<StepError> => {
    const validate = activeStep?.props?.validate
    if (validate) {
      const validationResult = await validate();

      if (validationResult.hasError && setStepErrors) {
        setStepErrors((prev) => ({ ...prev, [currentStep]: validationResult }));
      }
      return validationResult;
    }
    return { hasError: false,message: ""};
  };

  const handelNext = async (onComplete?: () => void | Promise<void>) => {
    const validationResult = await validateStep();
    if (validationResult.hasError) {
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps));
    if (currentStep === steps && onComplete) {
      await onComplete();
    }
  };

  const handelPrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return {
    handelNext,
    handelPrev,
    stepErrors,
    currentStep,
    steps,
    step: activeStep,
  };
};

const StepContent = ({
  children,
  className,
  title,
  onComplete,
  completeLabel,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
  onComplete?: () => void | Promise<void>;
  completeLabel?: string;
}) => {
  const { handelNext, handelPrev, currentStep, steps, stepErrors, step } =
    useStep(children);

  return (
    <>
      <div
        className={cn("", className)}
      >
        {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
        <StepIndicatorHeader />
        {step}
        <div className="mt-4 flex justify-between">
          <Button type='button' onClick={() => handelPrev()} disabled={currentStep === 1}>
            Previous
          </Button>
          <Button type='button' onClick={() => handelNext(onComplete)}>
            {currentStep === steps ? completeLabel : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
};

// Step Component
type StepProps = {
  children: ReactNode;
  validate?: () => StepError | Promise<StepError>;
};

export const Step = ({ children }: StepProps) => {
  const { stepErrors, currentStep } = useStepContext();
  const error = stepErrors ? stepErrors[currentStep] : undefined;
  return (
    <>
      {error?.hasError && (
        <p className="mb-2 text-center text-sm text-red-500">{error.message}</p>
      )}
      {children}
    </>
  );
};

// Step indicator header
const StepIndicatorHeader = () => {
  const { currentStep, steps } = useStepContext();
  return (
    <div className="mx-auto mb-4 flex items-center justify-between">
      {Array.from({ length: steps }, (_, i) => i + 1).map((step, index) => {
        return (
          <div
            key={step}
            className={cn("flex items-center", index < steps - 1 && "flex-1")}
          >
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
  isError,
}: {
  isCurrent: boolean;
  isCompleted: boolean;
  position: string | number;
  isError?: boolean;
}) => {
  const baseClasses =
    "flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300";

  if (isError) {
    return (
      <div
        className={`${baseClasses} border-red-500 bg-red-500 text-sm text-white`}
      >
        !
      </div>
    );
  }

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
        className={`${baseClasses} border-green-500 bg-green-500 text-sm text-white`}
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

const StepBar = ({ isCompleted }: { isCompleted: boolean }) => (
  <div
    className={`h-1 flex-1 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
  />
);

// Utility function to count Step components
const getSteps = (children: ReactNode): ReactNode[] =>
  Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Step,
  );
