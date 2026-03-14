import api from "../../services/api";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductBySlug = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return res.data;
};

export const createProduct = async (data) => {

  const res = await api.post(
    "/products",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};