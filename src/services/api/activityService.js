import activitiesData from "@/services/mockData/activities.json";

let activities = [...activitiesData];

const activityService = {
  delay: () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200)),

  getAll: async () => {
    await activityService.delay();
    return [...activities];
  },

  getRecentActivities: async (limit = 5) => {
    await activityService.delay();
    return [...activities]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },

  create: async (activityData) => {
    await activityService.delay();
    
    const maxId = activities.reduce((max, activity) => Math.max(max, activity.Id), 0);
    const newActivity = {
      Id: maxId + 1,
      fieldId: activityData.fieldId,
      type: activityData.type,
      date: activityData.date || new Date().toISOString().split("T")[0],
      description: activityData.description
    };
    
    activities.unshift(newActivity);
    return { ...newActivity };
  }
};

export default activityService;