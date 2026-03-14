import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  const variant = product.variants?.[0];

  return (

    <Link
      to={`/products/${product.slug}`}
      className="bg-white rounded-xl border hover:shadow-lg transition p-4"
    >

      <img
        src={variant?.images?.[0]}
        alt={product.name}
        className="h-44 mx-auto object-contain"
      />

      <h3 className="font-semibold mt-4">
        {product.name}
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        Starting ₹{variant?.price}
      </p>

      <p className="text-xs text-green-600 mt-1">
        EMI available
      </p>

    </Link>
  );
}