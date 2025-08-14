import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = forwardRef(({ 
  className, 
  message = "Something went wrong", 
  onRetry,
  showRetry = true,
  icon = "AlertCircle",
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="mb-4 p-3 rounded-full bg-red-100">
        <ApperIcon 
          name={icon} 
          className="w-8 h-8 text-error-red" 
        />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="inline-flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
});

Error.displayName = "Error";

export default Error;