import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";

export default function ProductPage() {

  const { slug } = useParams();
  const dispatch = useDispatch();

  const { product, emiPlans } = useSelector(
    (state) => state.products
  );

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProduct(slug));
  }, [slug]);

  // default selection
  useEffect(() => {

    if (!product?.variants?.length) return;

    const firstVariant = product.variants[0];

    setSelectedColor(firstVariant.color);
    setSelectedStorage(firstVariant.storage);
    setSelectedImage(firstVariant.images[0]);

  }, [product]);

  // variants of selected color
  const colorVariants = useMemo(() => {

    if (!product) return [];

    return product.variants.filter(
      (v) => v.color === selectedColor
    );

  }, [product, selectedColor]);

  // selected variant
  const selectedVariant = useMemo(() => {

    if (!product) return null;

    return product.variants.find(
      (v) =>
        v.color === selectedColor &&
        v.storage === selectedStorage
    );

  }, [product, selectedColor, selectedStorage]);

  if (!product || !selectedVariant)
    return <div className="p-10">Loading...</div>;

  const monthlyAmount = selectedPlan
    ? Math.round(
        (selectedVariant.price +
          selectedVariant.price *
            (selectedPlan.interestRate / 100)) /
          selectedPlan.months
      )
    : 0;

  const handleOpenModal = () => {

    if (!selectedPlan) return;

    setShowModal(true);

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (

    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-10">

        {/* LEFT SIDE IMAGES */}

        <div className="flex gap-4">

          <div className="flex flex-col gap-3">

            {selectedVariant.images.map((img, i) => (

              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 border rounded cursor-pointer
                ${selectedImage === img ? "border-teal-500" : ""}`}
              />

            ))}

          </div>

          <div className="flex-1 bg-white p-6 rounded-xl border">

            <img
              src={selectedImage}
              className="w-full object-contain h-96"
            />

          </div>

        </div>

        {/* RIGHT SIDE PRODUCT INFO */}

        <div>

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold mt-3">
            ₹{selectedVariant.price}
          </p>

          {/* COLOR */}

          <h3 className="mt-6 font-semibold">
            Color
          </h3>

          <div className="flex gap-3 mt-2">

            {[...new Set(product.variants.map(v => v.color))].map((color) => (

              <button
                key={color}
                onClick={() => {

                  const firstVariant =
                    product.variants.find(v => v.color === color);

                  setSelectedColor(color);
                  setSelectedStorage(firstVariant.storage);
                  setSelectedImage(firstVariant.images[0]);

                }}
                className={`px-4 py-2 border rounded-lg
                ${selectedColor === color
                  ? "border-teal-600"
                  : ""}`}
              >
                {color}
              </button>

            ))}

          </div>

          {/* STORAGE */}

          <h3 className="mt-6 font-semibold">
            Storage
          </h3>

          <div className="flex gap-3 mt-2">

            {colorVariants.map((variant) => (

              <button
                key={variant._id}
                onClick={() => {

                  setSelectedStorage(variant.storage);
                  setSelectedImage(variant.images[0]);

                }}
                className={`px-4 py-2 border rounded-lg
                ${selectedStorage === variant.storage
                  ? "border-teal-600"
                  : ""}`}
              >
                {variant.storage}
              </button>

            ))}

          </div>

          {/* EMI PLANS */}

          <h3 className="mt-8 font-semibold">
            Choose EMI Plan
          </h3>

          <div className="space-y-3 mt-4">

            {emiPlans.map((plan) => {

              const monthly =
                Math.round(
                  (selectedVariant.price +
                    selectedVariant.price *
                      (plan.interestRate / 100)) /
                    plan.months
                );

              const isSelected =
                selectedPlan?._id === plan._id;

              return (

                <div
                  key={plan._id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex justify-between items-center
                  ${isSelected
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-200 hover:border-teal-400"}`}
                >

                  <div>

                    <p className="font-semibold text-lg">
                      ₹{monthly} / month
                    </p>

                    <p className="text-gray-500 text-sm">
                      {plan.months} months • {plan.interestRate}% interest
                    </p>

                    {plan.cashback > 0 && (
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Cashback ₹{plan.cashback}
                      </p>
                    )}

                  </div>

                  {isSelected && (
                    <div className="text-teal-600 font-semibold text-sm">
                      Selected
                    </div>
                  )}

                </div>

              );

            })}

          </div>

          <button
            onClick={handleOpenModal}
            disabled={!selectedPlan}
            className="mt-8 w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
          >
            Proceed with EMI
          </button>

        </div>

      </div>

      {/* EMI CONFIRMATION MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={handleCloseModal}
          />

          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold">
                Confirm EMI Plan
              </h2>

              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>

            </div>

            <div className="flex gap-6 mb-6">

              <img
                src={selectedVariant.images[0]}
                className="w-28 h-28 object-contain border rounded-lg p-2"
              />

              <div>

                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-600">
                  Color: {selectedVariant.color}
                </p>

                <p className="text-gray-600">
                  Storage: {selectedVariant.storage}
                </p>

                <p className="font-semibold mt-2">
                  Price: ₹{selectedVariant.price}
                </p>

              </div>

            </div>

            <div className="border rounded-lg overflow-hidden">

              <div className="grid grid-cols-4 bg-gray-100 p-3 font-medium text-sm">

                <div>Monthly EMI</div>
                <div>Tenure</div>
                <div>Interest</div>
                <div>Cashback</div>

              </div>

              <div className="grid grid-cols-4 p-3 text-sm">

                <div>₹{monthlyAmount}</div>
                <div>{selectedPlan.months} months</div>
                <div>{selectedPlan.interestRate}%</div>
                <div>
                  {selectedPlan.cashback > 0
                    ? `₹${selectedPlan.cashback}`
                    : "—"}
                </div>

              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700" onClick={()=>{toast.success("EMI Confirmed.")}}>
                Confirm EMI
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}