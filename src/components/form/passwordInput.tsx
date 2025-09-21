"use client";

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { forwardRef, useId, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

const defaultRequirements = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
];

interface PasswordInputProps extends React.ComponentProps<"input"> {
  showStrengthIndicator?: boolean;
  showRequirementsList?: boolean;
  strengthRequirements?: Array<{ regex: RegExp; text: string }>;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      showStrengthIndicator = true,
      showRequirementsList = true,
      strengthRequirements,
      value,
      onChange,
      id: propId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const [internalValue, setInternalValue] = useState("");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Use controlled or uncontrolled value
    const currentValue = value !== undefined ? String(value) : internalValue;

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const requirements = strengthRequirements || defaultRequirements;

    const checkStrength = (pass: string) => {
      return requirements.map((req) => ({
        met: req.regex.test(pass),
        text: req.text,
      }));
    };

    const strength = checkStrength(currentValue);

    const strengthScore = useMemo(() => {
      return strength.filter((req) => req.met).length;
    }, [strength]);

    const getStrengthColor = (score: number) => {
      const maxScore = requirements.length;
      const percentage = score / maxScore;

      if (score === 0) return "bg-border";
      if (percentage <= 0.25) return "bg-red-500";
      if (percentage <= 0.5) return "bg-orange-500";
      if (percentage <= 0.75) return "bg-amber-500";
      return "bg-emerald-500";
    };

    const getStrengthText = (score: number) => {
      const maxScore = requirements.length;
      const percentage = score / maxScore;

      if (score === 0) return "Enter a password";
      if (percentage <= 0.5) return "Weak password";
      if (percentage <= 0.75) return "Medium password";
      return "Strong password";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
    };

    return (
      <div>
        <div className="relative">
          <Input
            {...props}
            ref={ref}
            id={id}
            className={cn("pe-9", className)}
            type={isVisible ? "text" : "password"}
            value={currentValue}
            onChange={handleInputChange}
            aria-describedby={
              showStrengthIndicator ? `${id}-description` : undefined
            }
          />
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls={id}
            tabIndex={-1}
          >
            {isVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Password strength indicator */}
        {showStrengthIndicator && (
          <>
            <div
              className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={requirements.length}
              aria-label="Password strength"
            >
              <div
                className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                style={{
                  width: `${(strengthScore / requirements.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Password strength description */}
            <p
              id={`${id}-description`}
              className="text-foreground mb-2 text-sm font-medium"
            >
              {getStrengthText(strengthScore)}. Must contain:
            </p>
          </>
        )}

        {/* Password requirements list */}
        {showRequirementsList && (
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <CheckIcon
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <XIcon
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
