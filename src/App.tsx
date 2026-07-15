import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { WorkDetailPage } from "./pages/WorkDetailPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/works/:slug" element={<WorkDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
