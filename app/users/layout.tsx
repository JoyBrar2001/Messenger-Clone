import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

export default async function UsersPageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  );
}