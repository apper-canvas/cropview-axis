import { useState } from 'react';
import { Card, CardContent } from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const getStageIcon = (stageName) => {
  const iconMap = {
    'Seed': 'Dot',
    'Germination': 'Sprout',
    'Vegetative': 'Leaf',
    'Flowering': 'Flower',
    'Maturity': 'CheckCircle'
  };
  return iconMap[stageName] || 'Circle';
};

const getStageColor = (index, total) => {
  const colors = [
    'from-amber-500 to-yellow-500',
    'from-emerald-400 to-green-500', 
    'from-green-500 to-fresh-green',
    'from-pink-400 to-rose-500',
    'from-orange-400 to-harvest-orange'
  ];
  return colors[index % colors.length];
};

const GrowthTimeline = ({ growthStages = [], className }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  if (!growthStages || growthStages.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
            Growth Stages Timeline
          </h3>
          <div className="text-center py-8 text-gray-500">
            <ApperIcon name="Clock" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No growth stage information available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalDuration = growthStages.reduce((sum, stage) => sum + stage.duration, 0);

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold font-display text-gray-900">
            Growth Stages Timeline
          </h3>
          <div className="text-sm text-gray-500">
            Total: {totalDuration} days
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            {growthStages.map((stage, index) => (
              <div 
                key={index}
                className={cn(
                  "relative flex items-start space-x-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 rounded-lg p-3 -mx-3",
                  selectedStage === index && "bg-gray-50"
                )}
                onClick={() => setSelectedStage(selectedStage === index ? null : index)}
              >
                {/* Stage Icon */}
                <div className={cn(
                  "relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg bg-gradient-to-br",
                  getStageColor(index, growthStages.length)
                )}>
                  <ApperIcon 
                    name={getStageIcon(stage.name)} 
                    className="w-6 h-6" 
                  />
                </div>

                {/* Stage Content */}
                <div className="flex-grow min-w-0 pt-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 font-display">
                        {stage.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Duration: {stage.duration} days
                        {index > 0 && ` • Days ${growthStages.slice(0, index).reduce((sum, s) => sum + s.duration, 0) + 1}-${growthStages.slice(0, index + 1).reduce((sum, s) => sum + s.duration, 0)}`}
                      </p>
                    </div>
                    <ApperIcon 
                      name={selectedStage === index ? "ChevronUp" : "ChevronDown"} 
                      className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0 ml-2" 
                    />
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>{((stage.duration / totalDuration) * 100).toFixed(1)}% of total cycle</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={cn("h-1.5 rounded-full bg-gradient-to-r", getStageColor(index, growthStages.length))}
                        style={{ width: `${(stage.duration / totalDuration) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Expandable Description */}
                  {selectedStage === index && stage.description && (
                    <div className="mt-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {stage.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{growthStages.length}</div>
              <div className="text-xs text-gray-500">Stages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalDuration}</div>
              <div className="text-xs text-gray-500">Total Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(totalDuration / 7)}
              </div>
              <div className="text-xs text-gray-500">Weeks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(totalDuration / 30.44).toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Months</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthTimeline;