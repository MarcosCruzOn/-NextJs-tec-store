import { twMerge } from "tailwind-merge";
import { Badge, BadgeProps } from "./ui/badge";
import { ArrowBigDownIcon } from "lucide-react";

const DiscountBadge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <Badge className={twMerge("px-1 py-0.5", className)} {...props}>
      <ArrowBigDownIcon size={16} />
      {children}%
    </Badge>
  );
};

export default DiscountBadge;
