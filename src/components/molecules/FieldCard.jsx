import { useState } from "react";
import { cn } from "@/utils/cn";
import { Card, CardContent } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const FieldCard = ({ field, onEdit, onDelete, onSelect, className, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "planted": return "planted";
      case "harvested": return "harvested";
      case "fallow": return "fallow";
      default: return "default";
    }
  };

  const getCropIcon = (cropType) => {
    switch (cropType.toLowerCase()) {
      case "corn": return "Wheat";
      case "soybeans": return "Leaf";
      case "wheat": return "Wheat";
      case "alfalfa": return "Clover";
      case "barley": return "Wheat";
      case "sunflowers": return "Sun";
      default: return "Sprout";
    }
  };

  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50",
        className
      )}
onClick={() => onSelect ? onSelect(field) : setIsExpanded(!isExpanded)}
      {...props}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-fresh-green/20 to-success-green/20 rounded-lg">
              <ApperIcon name={getCropIcon(field.cropType)} className="w-5 h-5 text-fresh-green" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 font-display">{field.name}</h3>
              <p className="text-sm text-gray-600">{field.cropType}</p>
            </div>
          </div>
          <Badge variant={getStatusColor(field.status)}>
            {field.status}
          </Badge>
        </div>

        {/* Basic Info */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Size</span>
            <span className="font-medium">{field.size} acres</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last Activity</span>
            <span className="font-medium">{format(new Date(field.lastActivity), "MMM dd, yyyy")}</span>
          </div>
        </div>

        {/* Expanded Details */}
{isExpanded && !onSelect && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Planting Date</span>
              <span className="font-medium">{format(new Date(field.plantingDate), "MMM dd, yyyy")}</span>
            </div>
            
            {field.notes && (
              <div className="space-y-1">
                <span className="text-sm text-gray-600">Notes</span>
                <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">{field.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(field);
                }}
                className="flex-1 px-3 py-2 text-sm bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors flex items-center justify-center space-x-1"
              >
                <ApperIcon name="Edit" className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(field);
                }}
                className="px-3 py-2 text-sm bg-error-red text-white rounded-lg hover:bg-error-red/90 transition-colors"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

{/* Expand indicator */}
        {!onSelect && (
          <div className="flex justify-center mt-3">
            <ApperIcon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              className="w-4 h-4 text-gray-400" 
            />
          </div>
        )}
        
        {onSelect && (
          <div className="flex justify-center mt-3">
            <span className="text-xs text-gray-500">Click to view details</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FieldCard;