import farmMetricsData from "@/services/mockData/farmMetrics.json";
import fieldsData from "@/services/mockData/fields.json";

const farmMetricsService = {
  delay: () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200)),

  getMetrics: async () => {
    await farmMetricsService.delay();
    
    // Calculate dynamic metrics based on current fields
    const totalAcres = fieldsData.reduce((sum, field) => sum + field.size, 0);
    const activeFields = fieldsData.filter(field => field.status === "planted").length;
    const cropTypes = new Set(fieldsData.map(field => field.cropType)).size;
    
    return {
      ...farmMetricsData,
      totalAcres,
      activeFields,
      cropTypes
    };
  }
};

export default farmMetricsService;