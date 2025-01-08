"use client";

import UserBox from "@/components/users/UserBox";
import getUsers from "@/actions/getUsers";
import { User } from "@prisma/client";

interface UserListProps {
  items: User[];
};

export default function UserList({ items }: UserListProps) {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <h1 className="text-2xl font-bold text-neutral-800 py-4">
            People
          </h1>
        </div>

        {items.map((item: User) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
}