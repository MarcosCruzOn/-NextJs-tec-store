import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, className, ...props }: ImageProps) => {
  return (
    <Image
      {...props}
      height={0}
      width={0}
      sizes="100vw"
      alt={alt}
      className={cn("h-auto w-full", className)}
    />
  );
};

export default PromoBanner;
