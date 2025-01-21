
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "@services/productApi";
import { formatPrice } from "@utils/format";
import ProductDetailSkeleton from "@components/products/ProductDetailSkeleton";
import Breadcrumb from "@components/breadcrumb/Breadcrumb";




const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductQuery(Number(id));

  if (true) return <ProductDetailSkeleton />;
  if (error || !product) return <div>Error loading product details.</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumb */}
      <div className="mt-10">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
        { label: product.data.name }
      ]} />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.data.productImages[0]?.imageUrl}
            alt={product.data.name}
            className="w-full h-auto rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 md:pl-6">
          <h1 className="text-2xl font-bold">{product.data.name}</h1>
          <h2 className="text-lg text-gray-600">{product.data.description}</h2>
          <div className="flex items-center mt-4">
            <span className="text-xl font-semibold text-primary-900">
              {formatPrice(product.data.price)}
            </span>
            {product.data.oldPrice > product.data.price && (
              <span className="ml-2 text-gray-500 line-through">
                {formatPrice(product.data.oldPrice)}
              </span>
            )}
          </div>
          <div className="mt-4">
            <span className="font-semibold">Color:</span>
            <div className="flex mt-2">
              {product.data.colors.map((color) => (
                <div
                  key={color.id}
                  className={`w-6 h-6 rounded-full border-2 border-gray-300 mr-2 cursor-pointer`}
                  style={{ backgroundColor: color.hexCode }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Size:</span>
            <div className="flex mt-2">
              {product.data.sizes.map((size) => (
                <button
                  key={size.id}
                  className="border rounded-md px-3 py-1 mr-2"
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          <button className="mt-6 bg-primary-900 text-white px-4 py-2 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Descriptions</h3>
        <p className="mt-2">{product.data.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail; 