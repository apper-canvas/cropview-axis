import { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import CropCard from "@/components/molecules/CropCard";
import AddCropForm from "@/components/molecules/AddCropForm";
import CropDetailModal from "@/components/molecules/CropDetailModal";
import cropService from "@/services/api/cropService";
import fieldService from "@/services/api/fieldService";
import { toast } from "react-toastify";

const CropsPage = () => {
  const [crops, setCrops] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [editingCrop, setEditingCrop] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [cropsData, fieldsData] = await Promise.all([
        cropService.getAll(),
        fieldService.getAll()
      ]);
      setCrops(cropsData);
      setFields(fieldsData);
    } catch (err) {
      setError("Failed to load crops data");
      console.error("Error loading crops:", err);
      toast.error("Failed to load crops data");
    } finally {
      setLoading(false);
    }
  };

  const getFieldCount = (cropType) => {
    return fields.filter(field => field.cropType === cropType).length;
  };

  const handleAddCrop = async (cropData) => {
    try {
      const newCrop = await cropService.create(cropData);
      setCrops(prev => [...prev, newCrop]);
      setShowAddForm(false);
      toast.success("Crop variety added successfully");
    } catch (error) {
      console.error("Error adding crop:", error);
      toast.error("Failed to add crop variety");
      throw error;
    }
  };

  const handleEditCrop = async (cropData) => {
    try {
      const updatedCrop = await cropService.update(editingCrop.Id, cropData);
      setCrops(prev => prev.map(crop => 
        crop.Id === updatedCrop.Id ? updatedCrop : crop
      ));
      setEditingCrop(null);
      setShowAddForm(false);
      toast.success("Crop variety updated successfully");
    } catch (error) {
      console.error("Error updating crop:", error);
      toast.error("Failed to update crop variety");
      throw error;
    }
  };

  const handleDeleteCrop = async (cropId) => {
    try {
      await cropService.delete(cropId);
      setCrops(prev => prev.filter(crop => crop.Id !== cropId));
      toast.success("Crop variety deleted successfully");
    } catch (error) {
      console.error("Error deleting crop:", error);
      toast.error("Failed to delete crop variety");
      throw error;
    }
  };

  const handleViewDetails = (crop) => {
    setSelectedCrop(crop);
    setShowDetailModal(true);
  };

  const handleEditClick = (crop) => {
    setEditingCrop(crop);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingCrop(null);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedCrop(null);
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50">
        <Header 
          title="Crops" 
          description="Manage crop lifecycles, varieties, and planning" 
        />
        <div className="flex justify-center items-center h-96">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gray-50">
        <Header 
          title="Crops" 
          description="Manage crop lifecycles, varieties, and planning" 
        />
        <div className="p-6">
          <Error 
            message={error}
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      <Header 
        title="Crops" 
        description="Manage crop lifecycles, varieties, and planning"
        action={
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>Add Crop Variety</span>
          </Button>
        }
      />
      
      <div className="p-6">
        {crops.length === 0 ? (
          <Card className="bg-gradient-to-br from-white to-green-50 border-green-200">
            <CardContent className="p-12 text-center">
              <div className="mb-6 p-4 bg-gradient-to-br from-fresh-green/20 to-success-green/20 rounded-full inline-block">
                <ApperIcon name="Wheat" className="w-12 h-12 text-fresh-green" />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
                No Crop Varieties Yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Start managing your crop varieties by adding your first variety. 
                Track growth cycles, planting seasons, and see which fields are planted with each variety.
              </p>
              <Button
                variant="primary"
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 mx-auto"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Add Your First Variety</span>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crops.map(crop => (
              <CropCard
                key={crop.Id}
                crop={crop}
                fieldCount={getFieldCount(crop.cropType)}
                onViewDetails={handleViewDetails}
                onEdit={handleEditClick}
                onDelete={handleDeleteCrop}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      <Modal 
        isOpen={showAddForm} 
        onClose={handleCloseForm}
        className="max-w-2xl"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-fresh-green/20 to-success-green/20 rounded-lg">
              <ApperIcon name="Wheat" className="w-6 h-6 text-fresh-green" />
            </div>
            <h2 className="text-2xl font-bold font-display text-gray-900">
              {editingCrop ? "Edit Crop Variety" : "Add New Crop Variety"}
            </h2>
          </div>
          <AddCropForm
            initialData={editingCrop}
            onSubmit={editingCrop ? handleEditCrop : handleAddCrop}
            onCancel={handleCloseForm}
          />
        </div>
      </Modal>

      {/* Detail Modal */}
      <CropDetailModal
        crop={selectedCrop}
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        onEdit={handleEditClick}
      />
    </div>
  );
};

export default CropsPage;