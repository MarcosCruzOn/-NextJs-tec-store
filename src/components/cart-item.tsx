import { CartContext, CartProduct } from "@/providers/carts";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Trash2Icon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProductClick = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="item-center flex justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-accent flex h-20 w-20 items-center justify-center rounded-lg">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-xs">{product.name}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold">{product.totalPrice.toFixed(2)}</p>
          {product.discountPercentage > 0 && (
            <p className="opaciity-75 text-xs line-through">
              {Number(product.basePrice).toFixed(2)} R$
            </p>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={handleDecreaseQuantityClick}
          >
            <ArrowLeftIcon size={8} />
          </Button>

          <span className="text-xs">{product.quantity}</span>

          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={handleIncreaseQuantityClick}
          >
            <ArrowRightIcon size={8} />
          </Button>
        </div>
      </div>
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={handleRemoveProductClick}
      >
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
