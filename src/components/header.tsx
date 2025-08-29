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
  LogOut,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import Cart from "./cart";

export const Header = () => {
  const { status, data } = useSession();
  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogOutClick = async () => {
    await signOut();
  };
  // };
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
              {status === "unauthenticated" && (
                <Button
                  onClick={handleLoginClick}
                  variant="outline"
                  className="justify-start gap-2"
                >
                  <LogIn size={16} />
                  Fazer Login
                </Button>
              )}

              {status === "authenticated" && (
                <div className="flex flex-col">
                  <div className="my-4 flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        {data.user?.name?.[0].toUpperCase()}
                      </AvatarFallback>
                      {data.user?.image && (
                        <AvatarImage src={data.user.image} />
                      )}
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-medium">{data.user?.name}</p>
                      <p className="text-sm opacity-75">Boas compras!</p>
                    </div>
                  </div>
                  <Separator />
                </div>
              )}

              {status === "authenticated" && (
                <Button
                  onClick={handleLogOutClick}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOut size={16} />
                  Fazer Logout
                </Button>
              )}

              <Link href="/catalog">
                <Button variant="outline" className="justify-start gap-2">
                  <ShoppingBag size={16} />
                  Catálogo
                </Button>
              </Link>

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

        <Link href="/">
          <h1 className="text-lg font-semibold">tec-store</h1>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <ShoppingCart size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Cart />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};
