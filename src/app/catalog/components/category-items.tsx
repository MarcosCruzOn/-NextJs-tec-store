import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const Categoryitem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="bg-category-item-gradient flex h-[150px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg">
          <Image
            src={category.imageUrl}
            alt={category.slug}
            width={150}
            height={150}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="bg-accent rounded-br-lg rounded-bl-lg py-3">
          <p className="text-center text-sm font-semibold">{category.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default Categoryitem;
