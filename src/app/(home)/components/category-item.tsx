import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import {
  Headphones,
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  SpeakerIcon,
  SquareIcon,
} from "lucide-react";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const categoriesIcon = {
    keyboard: <KeyboardIcon />,
    monitors: <MonitorIcon />,
    headphones: <Headphones />,
    mousepads: <SquareIcon />,
    speakers: <SpeakerIcon />,
    mouse: <MouseIcon />,
  };
  return (
    <Badge
      variant="outline"
      className="flex w-60 items-center justify-center gap-2 rounded-lg py-3"
    >
      {categoriesIcon[category.slug as keyof typeof categoriesIcon]}
      <span className="text-xs font-semibold">{category.name}</span>
    </Badge>
  );
};

export default CategoryItem;
