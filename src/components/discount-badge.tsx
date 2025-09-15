import { Badge, BadgeProps } from "./ui/badge";
import { ArrowBigDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DiscountBadge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <Badge className={cn("px-1 py-0.5", className)} {...props}>
      <ArrowBigDownIcon size={16} />
      {children}%
    </Badge>
  );
};

export default DiscountBadge;
