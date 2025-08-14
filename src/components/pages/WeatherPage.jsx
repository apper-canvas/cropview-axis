import Header from "@/components/organisms/Header";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const WeatherPage = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <Header
        title="Weather"
        description="Local weather conditions and forecasts for your farm"
      />
      <div className="p-6">
        <Card className="bg-gradient-to-br from-white to-sky-50 border-sky-200">
          <CardContent className="p-12 text-center">
            <div className="mb-6 p-4 bg-gradient-to-br from-sky-400/20 to-blue-500/20 rounded-full inline-block">
              <ApperIcon name="CloudRain" className="w-12 h-12 text-sky-500" />
            </div>
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Weather Integration Coming Soon
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              This section will include real-time weather conditions, detailed forecasts, 
              precipitation tracking, frost warnings, and agricultural weather alerts 
              to help you plan your farming activities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="Thermometer" className="w-4 h-4" />
                <span>Temperature Alerts</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="Droplets" className="w-4 h-4" />
                <span>Precipitation Tracking</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="Wind" className="w-4 h-4" />
                <span>Wind Conditions</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherPage;