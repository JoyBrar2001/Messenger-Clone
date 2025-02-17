"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { User } from "@prisma/client";
import Modal from "@/components/modals/Modal";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsModal({
  currentUser,
  isOpen,
  onClose
}: SettingsModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong while updating your profile")
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="name"
                id="name"
                errors={errors}
                required
                register={register}
              />

              <div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="photo"
                >
                  Photo
                </label>

                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    alt="Avatar"
                    src={image || currentUser?.image || "/images/placeholder.jpg"}
                    className="rounded-full"
                    width={48}
                    height={48}
                  />

                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={(res) => handleUpload(res)}
                    uploadPreset="joypreset"
                  >
                    <Button
                      disabled={isLoading}
                      secondary
                      type="button"
                    >
                      Change
                    </Button>
                  </CldUploadButton >
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              disabled={isLoading}
              secondary
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            
            <Button
              disabled={isLoading}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}