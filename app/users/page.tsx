"use client";

import { signOut } from "next-auth/react";

export default function UsersPage() {
  return (
    <div>
      <button onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}