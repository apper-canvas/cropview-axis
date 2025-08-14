import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import FieldCard from "@/components/molecules/FieldCard";
import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import Badge from "@/components/atoms/Badge";
import AddFieldForm from "@/components/molecules/AddFieldForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import fieldService from "@/services/api/fieldService";
import activityService from "@/services/api/activityService";
const FieldGrid = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [editingField, setEditingField] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [fieldActivities, setFieldActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);

  const loadFields = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fieldService.getAll();
      setFields(data);
    } catch (err) {
      setError("Failed to load fields. Please try again.");
      console.error("Error loading fields:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadFieldActivities = async (fieldId) => {
    try {
      setActivitiesLoading(true);
      const activities = await activityService.getAll();
      const fieldSpecificActivities = activities
        .filter(activity => activity.fieldId === fieldId.toString())
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5); // Show last 5 activities
      setFieldActivities(fieldSpecificActivities);
    } catch (error) {
      console.error("Error loading field activities:", error);
      setFieldActivities([]);
    } finally {
      setActivitiesLoading(false);
    }
  };

  // Load field activities when a field is selected
  useEffect(() => {
    if (selectedField) {
      loadFieldActivities(selectedField.Id);
    }
  }, [selectedField]);

  useEffect(() => {
    loadFields();
  }, []);

  const handleAddField = async (formData) => {
    try {
      const newField = await fieldService.create(formData);
      setFields(prev => [...prev, newField]);
      setIsAddModalOpen(false);
      toast.success("Field added successfully!");
    } catch (err) {
      toast.error("Failed to add field. Please try again.");
      console.error("Error adding field:", err);
    }
  };

  const handleEditField = async (formData) => {
    try {
      const updatedField = await fieldService.update(editingField.Id, formData);
      setFields(prev => prev.map(f => f.Id === editingField.Id ? updatedField : f));
      setEditingField(null);
      toast.success("Field updated successfully!");
    } catch (err) {
      toast.error("Failed to update field. Please try again.");
      console.error("Error updating field:", err);
    }
  };

  const handleDeleteField = async (field) => {
    if (window.confirm(`Are you sure you want to delete ${field.name}?`)) {
      try {
        await fieldService.delete(field.Id);
        setFields(prev => prev.filter(f => f.Id !== field.Id));
        toast.success("Field deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete field. Please try again.");
        console.error("Error deleting field:", err);
      }
    }
  };

  if (loading) {
    return <Loading variant="skeleton" />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadFields}
      />
    );
  }

  if (fields.length === 0) {
    return (
      <Empty
        icon="Map"
        title="No fields found"
        description="Start by adding your first field to track your farming operations."
        actionLabel="Add First Field"
        onAction={() => setIsAddModalOpen(true)}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-display text-gray-900">Field Management</h2>
            <p className="text-gray-600">Manage your farm fields and track crop progress</p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            Add New Field
          </Button>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
<FieldCard
              key={field.Id}
              field={field}
              onSelect={setSelectedField}
              onEdit={setEditingField}
              onDelete={handleDeleteField}
            />
          ))}
        </div>
      </div>

      {/* Add Field Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Field"
        size="md"
      >
        <AddFieldForm
          onSubmit={handleAddField}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Field Modal */}
{/* Field Detail Modal */}
      <Modal
        isOpen={!!selectedField}
        onClose={() => setSelectedField(null)}
        title=""
        size="lg"
      >
        {selectedField && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedField.name}</h2>
                <Badge 
                  variant={selectedField.status === 'planted' ? 'success' : 
                          selectedField.status === 'harvested' ? 'warning' : 'secondary'}
                  className="mt-2"
                >
                  {selectedField.status}
                </Badge>
              </div>
              <button
                onClick={() => {
                  setEditingField(selectedField);
                  setSelectedField(null);
                }}
                className="px-4 py-2 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors flex items-center space-x-2"
              >
                <ApperIcon name="Edit" className="w-4 h-4" />
                <span>Edit Field</span>
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-gray-600">Size</span>
                <p className="font-medium">{selectedField.size} acres</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-600">Crop Type</span>
                <p className="font-medium">{selectedField.cropType}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-600">Planting Date</span>
                <p className="font-medium">{format(new Date(selectedField.plantingDate), "MMM dd, yyyy")}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-600">Expected Harvest</span>
                <p className="font-medium">{selectedField.expectedHarvest ? format(new Date(selectedField.expectedHarvest), "MMM dd, yyyy") : "Not set"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-600">Soil Type</span>
                <p className="font-medium">{selectedField.soilType || "Not specified"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-600">Irrigation Method</span>
                <p className="font-medium">{selectedField.irrigationMethod || "Not specified"}</p>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {fieldActivities.length > 0 ? (
                  fieldActivities.map((activity) => (
                    <div key={activity.Id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <ApperIcon name="Activity" className="w-5 h-5 text-fresh-green" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{activity.type}</span>
                          <span className="text-sm text-gray-500">{format(new Date(activity.date), "MMM dd")}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent activities</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-3 pt-4 border-t">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => toast.info("Activity logging feature coming soon!")}
              >
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Log Activity
              </Button>
              <Button
                variant="secondary"
                onClick={() => toast.info("Archive feature coming soon!")}
              >
                <ApperIcon name="Archive" className="w-4 h-4" />
              </Button>
            </div>

            {/* Notes Section */}
            {selectedField.notes && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedField.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Field Modal */}
      <Modal
        isOpen={!!editingField}
        onClose={() => setEditingField(null)}
        title="Edit Field"
        size="md"
      >
        {editingField && (
          <AddFieldForm
            initialData={editingField}
            onSubmit={handleEditField}
            onCancel={() => setEditingField(null)}
          />
        )}
      </Modal>
    </>
  );

};

export default FieldGrid;