import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      {...props}
      height={0}
      width={0}
      sizes="100vw"
      alt={alt}
      className="w-full"
    />
  );
};

export default PromoBanner;
