import { OrderStatus } from "@prisma/client";

export const getOrderStatus = (orderStatus: OrderStatus) => {
  return {
    [OrderStatus.PAYMENT_CONFIRMED]: "pago",
    [OrderStatus.WAITING_FOR_PAYMENT]: "pendente",
  }[orderStatus];
};
