import { computerProductTotalPrice } from "@/app/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{ include: { product: true } }>;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productWithTotalPrice = computerProductTotalPrice(orderProduct.product);
  return (
    <div className="flex items-center gap-4">
      <div className="roudnded-lg bg-accent flex h-20 w-28 items-center justify-center">
        <Image
          src={orderProduct.product.imageUrls[0]}
          alt={orderProduct.product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-full max-w-[80%] object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="bg-accent flex px-3 py-1">
          <p className="text-[10px]">
            Vendido e entregue por{" "}
            <span className="text-primary">tec-store</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-xs">{orderProduct.product.name}</p>
        </div>
        <div className="flex">
          <div className="flex w-full items-center justify-between">
            <p className="font-bold">
              {productWithTotalPrice.totalPrice.toFixed(2)}
            </p>

            {productWithTotalPrice.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                {Number(productWithTotalPrice.basePrice).toFixed(2)} R${" "}
              </p>
            )}

            <p className="text-xs opacity-60">Qntds{orderProduct.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
