import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import FarmOverviewPage from "@/components/pages/FarmOverviewPage";
import FieldsPage from "@/components/pages/FieldsPage";
import CropsPage from "@/components/pages/CropsPage";
import EquipmentPage from "@/components/pages/EquipmentPage";
import ReportsPage from "@/components/pages/ReportsPage";
import WeatherPage from "@/components/pages/WeatherPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<FarmOverviewPage />} />
            <Route path="/fields" element={<FieldsPage />} />
            <Route path="/crops" element={<CropsPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/weather" element={<WeatherPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;