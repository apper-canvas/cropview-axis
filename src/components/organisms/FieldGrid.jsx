import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FieldCard from "@/components/molecules/FieldCard";
import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import AddFieldForm from "@/components/molecules/AddFieldForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import fieldService from "@/services/api/fieldService";

const FieldGrid = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);

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