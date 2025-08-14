import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = forwardRef(({ 
  className,
  title = "No data found",
  description = "There's nothing here yet",
  icon = "Package",
  actionLabel,
  onAction,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center min-h-[300px] p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
        <ApperIcon 
          name={icon} 
          className="w-12 h-12 text-gray-400" 
        />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          className="inline-flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
});

Empty.displayName = "Empty";

export default Empty;