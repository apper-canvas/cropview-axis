import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = forwardRef(({ 
  className,
  label,
  error,
  required,
  helperText,
  children,
  ...props 
}, ref) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className={cn(error && "text-error-red")}>
          {label}
          {required && <span className="text-error-red ml-1">*</span>}
        </Label>
      )}
      
      {children ? children : (
        <Input
          ref={ref}
          className={cn(
            error && "border-error-red focus:border-error-red focus:ring-error-red/20"
          )}
          {...props}
        />
      )}
      
      {error && (
        <p className="text-sm text-error-red">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

FormField.displayName = "FormField";

export default FormField;