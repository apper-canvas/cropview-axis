import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";

const AddFieldForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    size: initialData?.size || "",
    cropType: initialData?.cropType || "",
    plantingDate: initialData?.plantingDate || "",
    notes: initialData?.notes || ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cropOptions = [
    "Corn", "Soybeans", "Wheat", "Alfalfa", "Barley", "Sunflowers", "Oats", "Rice"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Field name is required";
    }
    
    if (!formData.size || isNaN(formData.size) || parseFloat(formData.size) <= 0) {
      newErrors.size = "Valid size is required";
    }
    
    if (!formData.cropType) {
      newErrors.cropType = "Crop type is required";
    }
    
    if (!formData.plantingDate) {
      newErrors.plantingDate = "Planting date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Field Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="e.g., North Field, South Pasture"
      />

      <FormField
        label="Size (acres)"
        name="size"
        type="number"
        step="0.1"
        value={formData.size}
        onChange={handleChange}
        error={errors.size}
        required
        placeholder="e.g., 45.2"
      />

      <FormField
        label="Crop Type"
        error={errors.cropType}
        required
      >
        <select
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:border-fresh-green focus:outline-none focus:ring-2 focus:ring-fresh-green/20"
        >
          <option value="">Select a crop</option>
          {cropOptions.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Planting Date"
        name="plantingDate"
        type="date"
        value={formData.plantingDate}
        onChange={handleChange}
        error={errors.plantingDate}
        required
      />

      <FormField
        label="Notes (Optional)"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Additional information about this field..."
      >
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base placeholder:text-gray-500 focus:border-fresh-green focus:outline-none focus:ring-2 focus:ring-fresh-green/20 resize-none"
          placeholder="Additional information about this field..."
        />
      </FormField>

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Field" : "Add Field"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddFieldForm;