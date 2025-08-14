import Header from "@/components/organisms/Header";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const EquipmentPage = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <Header
        title="Equipment"
        description="Track machinery, maintenance schedules, and equipment utilization"
      />
      <div className="p-6">
        <Card className="bg-gradient-to-br from-white to-orange-50 border-orange-200">
          <CardContent className="p-12 text-center">
            <div className="mb-6 p-4 bg-gradient-to-br from-harvest-orange/20 to-orange-600/20 rounded-full inline-block">
              <ApperIcon name="Truck" className="w-12 h-12 text-harvest-orange" />
            </div>
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Equipment Management Coming Soon
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              This section will include machinery inventory, maintenance scheduling, 
              usage tracking, fuel consumption monitoring, and equipment performance 
              analytics to optimize your farm operations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="Wrench" className="w-4 h-4" />
                <span>Maintenance Schedules</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="Fuel" className="w-4 h-4" />
                <span>Fuel Tracking</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="BarChart" className="w-4 h-4" />
                <span>Usage Analytics</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EquipmentPage;