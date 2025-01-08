"use client";

import React from 'react';
import useConversation from '@/hooks/useConversation';
import clsx from 'clsx';
import EmptyState from '@/components/EmptyState';

export default function ConversationsPage() {
  const { isOpen } = useConversation();

  return (
    <div className={clsx(
      "lg:pl-80 h-full lg:block",
      isOpen ? "block" : "hidden"
    )}>
      <EmptyState />
    </div>
  );
}