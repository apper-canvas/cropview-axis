import cropsData from "@/services/mockData/crops.json";

let crops = [...cropsData];

const cropService = {
  // Simulate API delay
  delay: () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200)),

  getAll: async () => {
    await cropService.delay();
    return [...crops];
  },

  getById: async (id) => {
    await cropService.delay();
    const crop = crops.find(c => c.Id === parseInt(id));
    if (!crop) {
      throw new Error("Crop variety not found");
    }
    return { ...crop };
  },

  create: async (cropData) => {
    await cropService.delay();
    
    // Generate new ID
    const maxId = crops.reduce((max, crop) => Math.max(max, crop.Id), 0);
    const newCrop = {
      Id: maxId + 1,
      varietyName: cropData.varietyName,
      cropType: cropData.cropType,
      cycleDuration: parseInt(cropData.cycleDuration),
      plantingSeason: cropData.plantingSeason,
      description: cropData.description || "",
      plantingRequirements: cropData.plantingRequirements || {},
      createdDate: new Date().toISOString().split("T")[0]
    };
    
    crops.push(newCrop);
    return { ...newCrop };
  },

  update: async (id, cropData) => {
    await cropService.delay();
    
    const index = crops.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Crop variety not found");
    }
    
    crops[index] = { ...crops[index], ...cropData };
    return { ...crops[index] };
  },

  delete: async (id) => {
    await cropService.delay();
    
    const index = crops.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Crop variety not found");
    }
    
    const deletedCrop = crops.splice(index, 1)[0];
    return { ...deletedCrop };
  }
};

export default cropService;