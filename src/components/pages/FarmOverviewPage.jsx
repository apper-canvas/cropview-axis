import Header from "@/components/organisms/Header";
import FarmOverview from "@/components/organisms/FarmOverview";

const FarmOverviewPage = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <Header
        title="Farm Overview"
        description="Monitor your farm's key metrics and recent activities"
      />
      <div className="p-6">
        <FarmOverview />
      </div>
    </div>
  );
};

export default FarmOverviewPage;