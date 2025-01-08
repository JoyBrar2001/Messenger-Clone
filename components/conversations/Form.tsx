"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

import useConversation from "@/hooks/useConversation";
import MessageInput from "@/components/conversations/MessageInput";

export default function Form() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  }

  const handleUpload = (result: any) => {
    console.log(result);

    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    })
      .catch((err) => {
        console.error("Upload error:", err);
      });
  }


  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={(res) => handleUpload(res)}
        uploadPreset="joypreset"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>

      <form
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />

        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition group"
        >
          <HiPaperAirplane size={18} className="text-white -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        </button>
      </form>
    </div>
  );
}