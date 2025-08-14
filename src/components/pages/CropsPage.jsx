import Header from "@/components/organisms/Header";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CropsPage = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <Header
        title="Crops"
        description="Manage crop lifecycles, varieties, and planning"
      />
      <div className="p-6">
        <Card className="bg-gradient-to-br from-white to-green-50 border-green-200">
          <CardContent className="p-12 text-center">
            <div className="mb-6 p-4 bg-gradient-to-br from-fresh-green/20 to-success-green/20 rounded-full inline-block">
              <ApperIcon name="Wheat" className="w-12 h-12 text-fresh-green" />
            </div>
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Crop Management Coming Soon
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              This section will include detailed crop lifecycle management, variety tracking, 
              planting schedules, growth monitoring, and harvest planning tools to optimize 
              your crop production.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="Sprout" className="w-4 h-4" />
                <span>Planting Schedules</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="TrendingUp" className="w-4 h-4" />
                <span>Growth Tracking</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                <span>Harvest Planning</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropsPage;