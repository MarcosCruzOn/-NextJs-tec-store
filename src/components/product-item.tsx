import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <>
      <div className="flex w-[156px] flex-col gap-4">
        <div className="bg-accent flex h-[176px] w-[156px] items-center justify-center rounded-lg">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            aria-description={product.description}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          <p>{product.name}</p>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
