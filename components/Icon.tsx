import { Ionicons } from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

function Icon({
  name,
  size,
  color,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons name={name} size={size} color={color} {...rest} />;
}

export default Icon;
