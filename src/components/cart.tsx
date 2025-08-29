import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useContext } from "react";
import { CartContext } from "@/providers/carts";
import CartItem from "./cart-item";
import { computerProductTotalPrice } from "@/app/helpers/product";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <Badge
          className="border-primary w-fit gap-1 border-2 px-3 py-2"
          variant={"outline"}
        >
          <ShoppingCartIcon size={16} />
          Carrinho
        </Badge>

        {/* RENDERIZAR OS PRODUTOS */}
        <div className="flex flex-col gap-5">
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={computerProductTotalPrice(product as any) as any}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
