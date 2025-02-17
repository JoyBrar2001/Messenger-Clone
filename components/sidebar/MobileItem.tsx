"use client";

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface MobileItemProps {
  href: string;
  label: string;
  active?: boolean;
  icon: IconType;
  onClick?: () => void;
};

export default function MobileItem({
  href,
  label,
  active,
  icon: Icon,
  onClick
}: MobileItemProps) {
  const handleOnClick = () => {
    if (onClick) {
      return onClick();
    }
  }

  return (
    <Link
      onClick={handleOnClick}
      href={href}
      className={clsx(
        "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100",
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}