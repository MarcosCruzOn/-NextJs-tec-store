import { ProductWithTotalPrice } from "@/app/helpers/product";

import Image from "next/image";
import { Badge } from "./ui/badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <>
      <div className="flex w-[156px] flex-col gap-4">
        <div className="bg-accent relative flex h-[176px] w-[156px] items-center justify-center rounded-lg">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            aria-description={product.description}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
          <Badge className="absolute top-2 left-2">
            {product.discountPercentage}%
          </Badge>
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
    </>
  );
};

export default ProductItem;
