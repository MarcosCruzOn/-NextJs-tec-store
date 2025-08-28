"use client";

import { ProductWithTotalPrice } from "@/app/helpers/product";
import DiscountBadge from "@/components/discount-badge";
import { Button } from "@/components/ui/button";

import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "description" | "name" | "discountPercentage" | "totalPrice"
  >;
}
const ProductInfo = ({
  product: { basePrice, description, discountPercentage, totalPrice, name },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col p-5">
      <h2 className="text-xl">{name}</h2>

      <div className="flex items-center gap-1">
        <h1 className="text-3xl font-bold">R${totalPrice.toFixed(2)}</h1>
        {discountPercentage > 0 && (
          <DiscountBadge>{discountPercentage}</DiscountBadge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          {" "}
          {Number(basePrice).toFixed(2)}R$
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        {/* <WishButton productId={product.id} wishLists={product.wishLists} /> */}

        <Button className="font-bold uppercase">Adicionar ao carrinho</Button>

        <div className="bg-accent flex items-center justify-between rounded-lg px-5 py-2 lg:bg-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <TruckIcon />

            <div className="flex flex-col">
              <p className="text-xs">
                Entrega via <span className="font-bold">tecPackge®</span>
              </p>
              <p className="text-xs text-[#8162FF]">
                Envio para <span className="font-bold">todo Brasil</span>
              </p>
            </div>
          </div>

          <p className="text-xs font-bold">Frete grátis</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
