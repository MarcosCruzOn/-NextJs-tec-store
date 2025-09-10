import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./orders-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computerProductTotalPrice } from "@/app/helpers/product";
import { getOrderStatus } from "../helpers/status";
interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: { orderProducts: { include: { product: true } } };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  // Total sem descontos
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  // Total com descontos
  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productWithTotalPrice = computerProductTotalPrice(product.product);
      return acc + productWithTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscount = subtotal - total;
  return (
    <Card className="px-5">
      <Accordion
        type="single"
        className="w-full"
        collapsible
        defaultValue={order.id}
      >
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              Pedido com {order.orderProducts.length}
              <span className="text-sm opacity-60">
                {" "}
                Feito em: {format(order.createdAt, "dd/MM/y 'às' HH:mm")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-primary">{getOrderStatus(order.status)}</p>
                </div>

                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createdAt, "d/mm/y")}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />
                <div className="flex w-full justify-between py-2.5">
                  <p>Subtotal</p>
                  <p>{subtotal.toFixed(2)} R$</p>
                </div>

                <Separator />
                <div className="flex w-full justify-between py-2.5">
                  <p>Entrega</p>
                  <p>Grátis</p>
                </div>

                <Separator />
                <div className="flex w-full justify-between py-2.5">
                  <p>Descontos</p>
                  <p>-{totalDiscount.toFixed(2)} R$</p>
                </div>

                <Separator />
                <div className="flex w-full justify-between py-2.5 text-sm font-bold">
                  <p>Total</p>
                  <p>{total.toFixed(2)} R$</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
