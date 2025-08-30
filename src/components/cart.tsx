import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useContext } from "react";
import { CartContext } from "@/providers/carts";
import CartItem from "./cart-item";
import { computerProductTotalPrice } from "@/app/helpers/product";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { products, total, subtotal, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });

    console.log(checkout);
  };

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
        <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex h-80 flex-col gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <CartItem
                    key={product.id}
                    product={computerProductTotalPrice(product as any) as any}
                  />
                ))
              ) : (
                <p className="text-center font-semibold">Carrinho vazio</p>
              )}
            </div>
          </ScrollArea>
        </div>

        {products.length > 0 && (
          <div className="flex flex-col gap-3">
            <Separator />

            <div className="flex items-center justify-between text-xs lg:text-sm">
              <p>Subtotal</p>
              <p>R$ {subtotal.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs lg:text-sm">
              <p>Entrega</p>
              <p>GRÁTIS</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs lg:text-sm">
              <p>Descontos</p>
              <p>- R$ {totalDiscount.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm font-bold lg:text-base">
              <p>Total</p>
              <p>R$ {total.toFixed(2)}</p>
            </div>

            <Button
              className="mt-7 font-bold uppercase"
              onClick={handleFinishPurchaseClick}
            >
              Finalizar compra
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
