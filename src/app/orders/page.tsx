import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { ShoppingBasketIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/orders-items";

async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="font-bold">Acesso Negado!</p>
        <p className="text-sm opacity-60">Faça o login</p>
      </div>
    );
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
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

      <h1 className="mt-5">Seus pedidos</h1>

      <div className="mt-5 flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
