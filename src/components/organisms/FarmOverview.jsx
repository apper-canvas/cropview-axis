import { useState, useEffect } from "react";
import MetricCard from "@/components/molecules/MetricCard";
import { Card, CardHeader, CardContent } from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import farmMetricsService from "@/services/api/farmMetricsService";
import activityService from "@/services/api/activityService";
import { format } from "date-fns";

const FarmOverview = () => {
  const [metrics, setMetrics] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [metricsData, activitiesData] = await Promise.all([
        farmMetricsService.getMetrics(),
        activityService.getRecentActivities(5)
      ]);
      
      setMetrics(metricsData);
      setActivities(activitiesData);
    } catch (err) {
      setError("Failed to load farm overview. Please try again.");
      console.error("Error loading farm overview:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading variant="skeleton" />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadData}
      />
    );
  }

  const getActivityIcon = (type) => {
    switch (type.toLowerCase()) {
      case "harvest": return "Scissors";
      case "planting": return "Sprout";
      case "fertilizing": return "Droplets";
      case "irrigation": return "Waves";
      case "soil test": return "FlaskConical";
      case "cutting": return "Scissors";
      default: return "Activity";
    }
  };

  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Farm Area"
          value={`${metrics.totalAcres} acres`}
          icon="Map"
          color="forest"
          trend="neutral"
        />
        
        <MetricCard
          title="Active Fields"
          value={metrics.activeFields}
          icon="CheckCircle"
          color="green"
          trend="up"
          trendValue="+2"
        />
        
        <MetricCard
          title="Crop Varieties"
          value={metrics.cropTypes}
          icon="Wheat"
          color="orange"
          trend="neutral"
        />
        
        <MetricCard
          title="Upcoming Tasks"
          value={metrics.upcomingTasks}
          icon="Clock"
          color="blue"
          trend="down"
          trendValue="-3"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-white to-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-success-green">${metrics.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-success-green/20 rounded-lg">
                <ApperIcon name="DollarSign" className="w-6 h-6 text-success-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Operating Costs</p>
                <p className="text-2xl font-bold text-harvest-orange">${metrics.operatingCosts.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-harvest-orange/20 rounded-lg">
                <ApperIcon name="TrendingDown" className="w-6 h-6 text-harvest-orange" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
                <p className="text-2xl font-bold text-info-blue">{metrics.profitMargin}%</p>
              </div>
              <div className="p-3 bg-info-blue/20 rounded-lg">
                <ApperIcon name="Target" className="w-6 h-6 text-info-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold font-display text-gray-900">Recent Activities</h3>
            <ApperIcon name="Activity" className="w-5 h-5 text-gray-500" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {activities.map((activity) => (
              <div key={activity.Id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-br from-forest/20 to-fresh-green/20 rounded-lg">
                    <ApperIcon 
                      name={getActivityIcon(activity.type)} 
                      className="w-5 h-5 text-forest" 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{activity.type}</h4>
                      <span className="text-sm text-gray-500">
                        {format(new Date(activity.date), "MMM dd")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmOverview;