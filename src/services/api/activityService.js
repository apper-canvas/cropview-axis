import activitiesData from "@/services/mockData/activities.json";

let activities = [...activitiesData];

const activityService = {
  delay: () => new Promise(resolve => setTimeout(resolve, 500)),

  getAll: async () => {
    await activityService.delay();
    return [...activities];
  },

  getById: async (id) => {
    await activityService.delay();
    const activity = activities.find(a => a.Id === parseInt(id));
    if (!activity) {
      throw new Error("Activity not found");
    }
    return { ...activity };
  },

  getByFieldId: async (fieldId) => {
    await activityService.delay();
    return activities
      .filter(activity => activity.fieldId === fieldId.toString())
      .map(activity => ({ ...activity }));
  },

  create: async (activityData) => {
    await activityService.delay();
    
    // Generate new ID
    const maxId = activities.reduce((max, activity) => Math.max(max, activity.Id), 0);
    const newActivity = {
      Id: maxId + 1,
      fieldId: activityData.fieldId,
      type: activityData.type,
      date: activityData.date,
      description: activityData.description
    };
    
    activities.push(newActivity);
    return { ...newActivity };
  },

  update: async (id, activityData) => {
    await activityService.delay();
    
    const index = activities.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Activity not found");
    }
    
    activities[index] = { ...activities[index], ...activityData };
    return { ...activities[index] };
  },

  delete: async (id) => {
    await activityService.delay();
    
    const index = activities.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Activity not found");
    }
    
    const deletedActivity = activities.splice(index, 1)[0];
    return { ...deletedActivity };
  }
};

export default activityService;