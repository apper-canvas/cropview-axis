import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ title, description, action, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-6 py-6",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-display text-gray-900">{title}</h1>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>
        
{action && (
          <div className="flex items-center space-x-4">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;