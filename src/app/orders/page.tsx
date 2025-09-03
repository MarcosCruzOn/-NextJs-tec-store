import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { ShoppingBasketIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/orders-items";

async function OrderPage() {
  const user = getServerSession(authOptions);

  if (!user) {
    return <p>Acesso Negado!</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <div className="p-5">
      <Badge
        variant={"outline"}
        className="border-primary w-fit gap-1 border-2 px-3 py-2"
      >
        <ShoppingBasketIcon size={16} />
        Meus Pedidos
      </Badge>

      <h1>Seus pedidos</h1>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
