import fieldsData from "@/services/mockData/fields.json";

let fields = [...fieldsData];

const fieldService = {
  // Simulate API delay
  delay: () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200)),

  getAll: async () => {
    await fieldService.delay();
    return [...fields];
  },

  getById: async (id) => {
    await fieldService.delay();
    const field = fields.find(f => f.Id === parseInt(id));
    if (!field) {
      throw new Error("Field not found");
    }
    return { ...field };
  },

create: async (fieldData) => {
    await fieldService.delay();
    
    // Generate new ID
    const maxId = fields.reduce((max, field) => Math.max(max, field.Id), 0);
    const newField = {
      Id: maxId + 1,
      name: fieldData.name,
      size: parseFloat(fieldData.size),
      cropType: fieldData.cropType,
      status: "planted",
      plantingDate: fieldData.plantingDate,
      expectedHarvest: fieldData.expectedHarvest || null,
      soilType: fieldData.soilType || null,
      irrigationMethod: fieldData.irrigationMethod || null,
      lastActivity: new Date().toISOString().split("T")[0],
      notes: fieldData.notes || ""
    };
    
    fields.push(newField);
    return { ...newField };
  },

update: async (id, fieldData) => {
    await fieldService.delay();
    
    const index = fields.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Field not found");
    }
    
    // Update with support for new fields
    const updatedData = {
      ...fieldData,
      expectedHarvest: fieldData.expectedHarvest || null,
      soilType: fieldData.soilType || null,
      irrigationMethod: fieldData.irrigationMethod || null
    };
    
    fields[index] = { ...fields[index], ...updatedData };
    return { ...fields[index] };
  },

  delete: async (id) => {
    await fieldService.delay();
    
    const index = fields.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Field not found");
    }
    
    const deletedField = fields.splice(index, 1)[0];
    return { ...deletedField };
  }
};

export default fieldService;