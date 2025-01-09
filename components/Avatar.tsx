"use client";

import useActiveList from "@/hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user: User | null;
};

export default function Avatar({ user }: AvatarProps) {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative rounded-full overflow-hidden w-[44px] h-[44px]">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          fill
          className="object-cover"
        />
      </div>

      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      )}
    </div>
  );
}
