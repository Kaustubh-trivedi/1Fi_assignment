import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import AddProductPage from "../pages/AddProductPage";


export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route
          path="/products/:slug"
          element={<ProductPage />}
        />

        <Route path="/admin/add-product" element={<AddProductPage />} />

      </Routes>

    </BrowserRouter>
  );
}