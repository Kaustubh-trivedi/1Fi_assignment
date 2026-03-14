import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    mrp: "",
    price: "",
    color: "",
    storage: "",
    description: ""
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const validImages = [];

    for (let file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select image files only");
        return;
      }
      validImages.push(file);
    }

    setImages((prev) => [...prev, ...validImages]);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post("http://localhost:5000/api/products", formData);
      toast.success("Product added successfully");
    } catch {
      toast.error("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="mrp"
            placeholder="MRP"
            type="number"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="price"
            placeholder="Variant Price"
            type="number"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="color"
            placeholder="Color"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="storage"
            placeholder="Storage"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-6"
        />

        {/* Image Upload */}

        <div className="mt-6">
          <label className="font-medium">Upload Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block mt-2"
          />

          {/* Image Preview */}

          <div className="flex flex-wrap gap-4 mt-4">

            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(img)}
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}

          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}