"use client";

import { Button } from "@/components/ui/button";

import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="border-accent bg-background flex min-w-[300px] flex-col items-center gap-8 border-r border-solid p-8">
      <h1 className="text-lg font-semibold">
        <span className="text-primary">tec</span> Store
      </h1>

      <div className="flex w-full flex-col gap-3">
        <Button variant="outline" className="flex w-full justify-start gap-2">
          <LayoutDashboardIcon size={16} />
          Dashboard
        </Button>

        <Link href="/dashboard/products">
          <Button
            variant="outline"
            className={`flex w-full justify-start gap-2 ${
              path.includes("/products") &&
              "bg-primary hover:bg-primary text-white"
            } `}
          >
            <PackageIcon size={16} />
            Produtos
          </Button>
        </Link>

        <Link href="/dashboard/categories">
          <Button
            variant="outline"
            className={`flex w-full justify-start gap-2 ${
              path.includes("/categories") &&
              "bg-primary hover:bg-primary text-white"
            }`}
          >
            <ListOrderedIcon size={16} />
            Categorias
          </Button>
        </Link>

        <Link href="/dashboard/orders">
          <Button
            variant="outline"
            className={`flex w-full justify-start gap-2 ${
              path.includes("/orders") &&
              "bg-primary hover:bg-primary text-white"
            }`}
          >
            <PackageSearchIcon size={16} />
            Pedidos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
