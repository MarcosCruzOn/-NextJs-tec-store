"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  LogIn,
  ShoppingBag,
  PercentCircle,
  ShoppingCart,
} from "lucide-react";
import { signIn } from "next-auth/react";

export const Header = () => {
  const handleLoginClick = async () => {
    await signIn();
  };
  return (
    <Card className="mb-5">
      <CardContent className="flex h-[25px] items-center justify-between px-8 py-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="justify-start text-left">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-2 py-4">
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="justify-start gap-2"
              >
                <LogIn size={16} />
                Fazer Login
              </Button>

              <Button variant="outline" className="justify-start gap-2">
                <ShoppingBag size={16} />
                Catálogo
              </Button>

              <Button variant="outline" className="justify-start gap-2">
                <PercentCircle size={16} />
                Ofertas
              </Button>

              <Button variant="outline" className="justify-start gap-2">
                <ShoppingCart size={16} />
                Carrinho
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <h2 className="text-lg font-semibold">FSW Store</h2>

        <Button size="icon" variant="outline">
          <ShoppingCart size={20} />
        </Button>
      </CardContent>
    </Card>
  );
};
