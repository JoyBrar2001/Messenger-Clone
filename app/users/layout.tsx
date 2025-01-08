import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/users/UserList";
import React from "react";

export default async function UsersPageLayout({
  children
}: {
  children: React.ReactNode
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}