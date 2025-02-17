import React from "react";
import { signOut } from "next-auth/react";

import EmptyState from "@/components/EmptyState";

export default function UsersPage() {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
}