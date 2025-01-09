"use client";

import Modal from "@/components/modals/Modal";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function ImageModal({
  src,
  isOpen,
  onClose
}: ImageModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image
          src={src}
          alt="Image"
          className="object-cover"
          fill
        />
      </div>
    </Modal>
  );
}