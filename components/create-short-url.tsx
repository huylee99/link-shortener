import type { NextPage } from "next";
import * as z from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "../utils/trpc";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => toast.success("Copied"));
};

export const formValidator = z.object({
  url: z.string().url(),
  slug: z.string().optional(),
});

export type FormFields = z.infer<typeof formValidator>;

const CreateShortUrl: NextPage = () => {
  const [slug, setSlug] = useState("");

  const short = `${window.location.origin}/s/${slug}`;

  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<FormFields>({
    resolver: zodResolver(formValidator),
  });

  const { isLoading, mutate } = trpc.useMutation(["url.create-short"], {
    onSuccess: data => {
      toast.success("Created successfully");
      reset();
      setSlug(data.slug);
    },
    onError: data => {
      toast.error(data.message);
    },
  });

  const shorten: SubmitHandler<FormFields> = values => {
    mutate(values);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col justify-center px-4">
      <main>
        <h1 className="text-3xl font-bold mb-10 text-sky-600 md:text-5xl text-center md:text-left">Short the Long</h1>

        <form onSubmit={handleSubmit(shorten)}>
          <div className="w-full mb-4">
            <div className={`flex rounded-md ${!!errors.url && "ring-2 ring-red-500"}`}>
              <span className="inline-flex items-center px-3 text-sm text-gray-300 bg-gray-800 rounded-l-md font-semibold">
                URL
              </span>
              <input
                type="text"
                className="rounded-none rounded-r-lg bg-gray-700 text-gray-400 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full p-2.5 focus:outline-none text-sm"
                {...register("url")}
              />
            </div>
          </div>
          <div className="w-full mb-10">
            <h3 className="font-semibold mb-2 text-gray-300">Custom your Short (optional)</h3>
            <div className="flex flex-col w-full md:flex-row md:items-center">
              <div className="flex mb-4 md:mb-0">
                <span className="inline-flex items-center px-3 text-sm text-gray-300 bg-gray-800 rounded-l-md font-semibold">
                  {window.location.origin}
                </span>
                <input
                  type="text"
                  className="rounded-none rounded-r-lg bg-gray-700 text-gray-400 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full p-2.5 focus:outline-none text-sm"
                  {...register("slug")}
                />
              </div>
              <button
                className="py-2 px-4 bg-violet-600 w-full md:w-auto ml-auto rounded-md font-medium text-white hover:bg-violet-700 transition-all disabled:opacity-70"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Shorten 🛸"}
              </button>
            </div>
          </div>
        </form>

        {!!slug && (
          <>
            <h3 className="text-center">🚀 🚀 🚀 🚀 🚀</h3>
            <div className="mt-4">
              <div className="flex items-center relative">
                <input
                  className="flex items-center px-3 text-sm bg-gray-800 text-gray-200 font-semibold rounded-md w-full py-2 pr-6"
                  defaultValue={short}
                  readOnly
                />

                <button
                  onClick={() => copyToClipboard(short)}
                  className="absolute right-2 text-sm text-gray-300 bg-slate-700 px-2 py-0.5 rounded-md cursor-pointer hover:bg-slate-600"
                >
                  Copy
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CreateShortUrl;
