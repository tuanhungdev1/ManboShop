import { Product } from "@types-d/product";
import { formatPrice } from "@utils/format";
import { isNewProduct, slugify } from "@utils/utils";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {



  return (
    <Link 
      to={`/product/${slugify(product.name)}`} 
      className={`group ${viewMode === 'list' ? 'flex gap-6' : 'block'}`}
    >
      <div className={`relative select-none overflow-hidden ${
        viewMode === 'list' ? 'w-[300px] aspect-[3/4]' : 'aspect-[3/4]'
      }`}>
        {/* Main Image */}
        <img
          src={product.productImages[0]?.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Image */}
        {product.productImages[1] && (
          <img
            src={product.productImages[1].imageUrl}
            alt={product.name}
            className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        )}
      <div className="absolute top-2 left-2 flex gap-2">
        
      

              {/* Discount Badge */}
              {product.oldPrice > product.price && (
                <div className=" bg-red-500 text-white px-2 py-1 text-sm">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </div>
              )}

{isNewProduct(product) && (
                <div className=" bg-green-500 text-white px-2 py-1 text-sm">
                  New
                </div>
              )}
      </div>

        
      </div> 

      {/* Product Info */}
      <div className={`${viewMode === 'list' ? 'flex-1 py-4' : 'mt-4'} space-y-2 text-[14px]`}>
        <h1 className="">
          {product.category?.name}
        </h1>
        <h3 className={`font-medium ${viewMode === 'list' ? 'text-[13px]' : ''} line-clamp-2`}>
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary-900">{formatPrice(product.price)}</span>
          {product.oldPrice > product.price && (
            <span className="text-gray-500 line-through text-sm">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Description - Only show in list view */}
        {viewMode === 'list' && product.description && (
          <p className="text-gray-600 line-clamp-3 mt-2">
            {product.description}
          </p>
        )}

        {/* Add to Cart button - Only show in list view */}
        {viewMode === 'list' && (
          <button className="mt-4 px-6 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 transition-colors">
            Add to Cart
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;