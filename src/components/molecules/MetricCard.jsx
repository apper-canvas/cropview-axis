import { cn } from "@/utils/cn";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ 
  className,
  title,
  value,
  icon,
  trend,
  trendValue,
  color = "forest",
  ...props 
}) => {
  const colorClasses = {
    forest: "from-forest to-forest/80 text-white",
    green: "from-fresh-green to-success-green text-white", 
    orange: "from-harvest-orange to-orange-600 text-white",
    blue: "from-info-blue to-blue-600 text-white"
  };

  const trendColors = {
    up: "text-success-green",
    down: "text-error-red",
    neutral: "text-gray-500"
  };

  return (
    <Card 
      className={cn(
        "bg-gradient-to-br shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]",
        colorClasses[color],
        className
      )}
      {...props}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <ApperIcon name={icon} className="w-6 h-6" />
          </div>
          {trend && trendValue && (
            <div className={cn("flex items-center space-x-1", trendColors[trend])}>
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus"} 
                className="w-4 h-4" 
              />
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-3xl font-bold font-display">{value}</p>
          <p className="text-sm opacity-90">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;