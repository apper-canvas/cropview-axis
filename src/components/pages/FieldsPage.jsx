import Header from "@/components/organisms/Header";
import FieldGrid from "@/components/organisms/FieldGrid";

const FieldsPage = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <Header
        title="Fields"
        description="Manage and monitor all your farm fields in one place"
      />
      <div className="p-6">
        <FieldGrid />
      </div>
    </div>
  );
};

export default FieldsPage;