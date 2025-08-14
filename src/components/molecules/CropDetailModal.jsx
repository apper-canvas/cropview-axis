import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";
import { Card, CardContent } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import fieldService from "@/services/api/fieldService";
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
import GrowthTimeline from '@/components/molecules/GrowthTimeline';

const CropDetailModal = ({ crop, isOpen, onClose, onEdit }) => {
  const navigate = useNavigate();
  const [associatedFields, setAssociatedFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFieldClick = (fieldId) => {
    onClose(); // Close the modal first
    navigate(`/fields/${fieldId}`);
  };
  useEffect(() => {
    if (isOpen && crop) {
      loadAssociatedFields();
    }
  }, [isOpen, crop]);

  const loadAssociatedFields = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allFields = await fieldService.getAll();
      const fieldsWithThisCrop = allFields.filter(field => field.cropType === crop.cropType);
      setAssociatedFields(fieldsWithThisCrop);
    } catch (err) {
      setError("Failed to load associated fields");
      console.error("Error loading fields:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    onEdit(crop);
    onClose();
  };

  if (!crop) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-fresh-green/20 to-success-green/20 rounded-xl">
              <ApperIcon 
                name={getCropIcon(crop.cropType)} 
                className="w-8 h-8 text-fresh-green" 
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-gray-900">
                {crop.varietyName}
              </h2>
              <p className="text-lg text-gray-600">{crop.cropType}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={handleEditClick}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Edit2" className="w-4 h-4" />
              <span>Edit Variety</span>
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-10 w-10 p-0"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="mb-2">
                  <ApperIcon name="Clock" className="w-6 h-6 text-gray-400 mx-auto" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{crop.cycleDuration}</p>
                <p className="text-sm text-gray-500">Days Growth Cycle</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="mb-2">
                  <ApperIcon name="Calendar" className="w-6 h-6 text-gray-400 mx-auto" />
                </div>
                <Badge className={`${getSeasonColor(crop.plantingSeason)} text-sm px-3 py-1`}>
                  {crop.plantingSeason}
                </Badge>
                <p className="text-sm text-gray-500 mt-1">Planting Season</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="mb-2">
                  <ApperIcon name="MapPin" className="w-6 h-6 text-gray-400 mx-auto" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{associatedFields.length}</p>
                <p className="text-sm text-gray-500">
                  {associatedFields.length === 1 ? 'Field' : 'Fields'} Planted
                </p>
              </div>
            </CardContent>
          </Card>
</div>

        {/* Growth Stages Timeline */}
        <GrowthTimeline 
          growthStages={crop.growthStages} 
          className="mb-6"
        />

        {/* Description */}
        {crop.description && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">{crop.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Planting Requirements */}
        {crop.plantingRequirements && Object.keys(crop.plantingRequirements).length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                Planting Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(crop.plantingRequirements).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start">
                    <span className="text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-900 font-medium text-right flex-1 ml-4">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Associated Fields */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
              Associated Fields ({associatedFields.length})
            </h3>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <Loading />
              </div>
            ) : error ? (
              <Error message={error} />
            ) : associatedFields.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="MapPin" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No fields currently planted with this variety</p>
                <p className="text-sm mt-1">Fields with {crop.cropType} will appear here</p>
              </div>
            ) : (
<div className="space-y-3">
                {associatedFields.map(field => (
                  <div 
                    key={field.Id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => handleFieldClick(field.Id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg group-hover:bg-fresh-green group-hover:text-white transition-colors">
                        <ApperIcon name="MapPin" className="w-4 h-4 text-fresh-green group-hover:text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-fresh-green transition-colors">{field.name}</p>
                        <p className="text-sm text-gray-500">{field.size} acres</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {field.status}
                        </Badge>
                        <ApperIcon name="ExternalLink" className="w-4 h-4 text-gray-400 group-hover:text-fresh-green transition-colors" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Planted: {new Date(field.plantingDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export default CropDetailModal;