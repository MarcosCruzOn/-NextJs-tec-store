import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex w-[170px] flex-col gap-4">
        <div className="bg-accent relative flex h-[176px] w-[170px] items-center justify-center rounded-lg">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            aria-description={product.description}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute top-3 left-3">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <p>{product.name}</p>
          </div>

          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
              <>
                <p className="text-l font-semibold">
                  {product.totalPrice.toFixed(2)}R$
                </p>
                <p className="text-xs line-through opacity-75">
                  {Number(product.basePrice).toFixed(2)}R$
                </p>
              </>
            ) : (
              <p className="mr-0.5 text-xl font-semibold">
                R$ {product.totalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
