import Header from "@/components/organisms/Header";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ReportsPage = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <Header
        title="Reports"
        description="Analytics and insights to optimize your farm performance"
      />
      <div className="p-6">
        <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
          <CardContent className="p-12 text-center">
            <div className="mb-6 p-4 bg-gradient-to-br from-info-blue/20 to-blue-600/20 rounded-full inline-block">
              <ApperIcon name="FileText" className="w-12 h-12 text-info-blue" />
            </div>
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Farm Analytics Coming Soon
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              This section will include comprehensive farm analytics, productivity reports, 
              financial summaries, yield comparisons, and custom reporting tools to help 
              you make data-driven farming decisions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="BarChart3" className="w-4 h-4" />
                <span>Yield Reports</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="DollarSign" className="w-4 h-4" />
                <span>Financial Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
                <ApperIcon name="PieChart" className="w-4 h-4" />
                <span>Performance Metrics</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;