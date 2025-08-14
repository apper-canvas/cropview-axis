import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";

const AddCropForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    varietyName: initialData?.varietyName || "",
    cropType: initialData?.cropType || "",
    cycleDuration: initialData?.cycleDuration || "",
    plantingSeason: initialData?.plantingSeason || "",
    description: initialData?.description || ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cropTypeOptions = [
    "Corn", "Soybeans", "Wheat", "Alfalfa", "Barley", "Sunflowers", "Oats", "Rice"
  ];

  const seasonOptions = [
    "Spring", "Summer", "Fall", "Winter"
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
    
    if (!formData.varietyName.trim()) {
      newErrors.varietyName = "Variety name is required";
    }
    
    if (!formData.cropType) {
      newErrors.cropType = "Crop type is required";
    }
    
    if (!formData.cycleDuration || isNaN(formData.cycleDuration) || parseInt(formData.cycleDuration) <= 0) {
      newErrors.cycleDuration = "Valid cycle duration is required";
    }
    
    if (!formData.plantingSeason) {
      newErrors.plantingSeason = "Planting season is required";
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
        label="Variety Name"
        name="varietyName"
        value={formData.varietyName}
        onChange={handleChange}
        error={errors.varietyName}
        required
        placeholder="e.g., Pioneer P1234, Roundup Ready 2"
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
          <option value="">Select a crop type</option>
          {cropTypeOptions.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Growth Cycle Duration (days)"
        name="cycleDuration"
        type="number"
        min="1"
        value={formData.cycleDuration}
        onChange={handleChange}
        error={errors.cycleDuration}
        required
        placeholder="e.g., 120"
      />

      <FormField
        label="Planting Season"
        error={errors.plantingSeason}
        required
      >
        <select
          name="plantingSeason"
          value={formData.plantingSeason}
          onChange={handleChange}
          className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:border-fresh-green focus:outline-none focus:ring-2 focus:ring-fresh-green/20"
        >
          <option value="">Select planting season</option>
          {seasonOptions.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Description (Optional)"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Brief description of the variety..."
      >
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base placeholder:text-gray-500 focus:border-fresh-green focus:outline-none focus:ring-2 focus:ring-fresh-green/20 resize-none"
          placeholder="Brief description of the variety..."
        />
      </FormField>

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Variety" : "Add Variety"}
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

export default AddCropForm;