import { useState } from "react";
import { cn } from "@/utils/cn";
import { Card, CardContent } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const getCropIcon = (cropType) => {
  const iconMap = {
    Corn: "Wheat",
    Soybeans: "Leaf",
    Wheat: "Wheat",
    Alfalfa: "Clover",
    Barley: "Wheat",
    Sunflowers: "Sun",
    Oats: "Wheat",
    Rice: "Wheat"
  };
  return iconMap[cropType] || "Sprout";
};

const getSeasonColor = (season) => {
  const colorMap = {
    Spring: "bg-green-100 text-green-800",
    Summer: "bg-yellow-100 text-yellow-800",
    Fall: "bg-orange-100 text-orange-800",
    Winter: "bg-blue-100 text-blue-800"
  };
  return colorMap[season] || "bg-gray-100 text-gray-800";
};

const CropCard = ({ crop, fieldCount = 0, onViewDetails, onEdit, onDelete, className, ...props }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await onDelete(crop.Id);
    } catch (error) {
      console.error("Error deleting crop:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(crop);
  };

  return (
    <Card 
      className={cn(
        "group hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200 hover:border-fresh-green/50",
        className
      )}
      onClick={() => onViewDetails(crop)}
      {...props}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-fresh-green/20 to-success-green/20 rounded-lg">
              <ApperIcon 
                name={getCropIcon(crop.cropType)} 
                className="w-6 h-6 text-fresh-green" 
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold font-display text-gray-900 group-hover:text-fresh-green transition-colors">
                {crop.varietyName}
              </h3>
              <p className="text-sm text-gray-500">{crop.cropType}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditClick}
              className="h-8 w-8 p-0"
            >
              <ApperIcon name="Edit2" className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteClick}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Growth Cycle</span>
            <span className="font-medium text-gray-900">{crop.cycleDuration} days</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Planting Season</span>
            <Badge className={cn("text-xs", getSeasonColor(crop.plantingSeason))}>
              {crop.plantingSeason}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Currently Planted</span>
            <div className="flex items-center space-x-1">
              <ApperIcon name="MapPin" className="w-3 h-3 text-gray-400" />
              <span className="font-medium text-gray-900">
                {fieldCount} {fieldCount === 1 ? 'field' : 'fields'}
              </span>
            </div>
          </div>
        </div>

        {crop.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {crop.description}
          </p>
        )}

        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-500 mx-auto" />
              <div>
                <p className="font-medium text-gray-900">Delete Variety?</p>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <ApperIcon name="Calendar" className="w-3 h-3" />
            <span>Added {new Date(crop.createdDate).toLocaleDateString()}</span>
          </div>
          <ApperIcon 
            name="ChevronRight" 
            className="w-4 h-4 text-gray-400 group-hover:text-fresh-green transition-colors" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CropCard;