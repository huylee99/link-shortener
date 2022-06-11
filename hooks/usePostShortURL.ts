import { useState } from "react";
import { prisma } from "../db/client";

type ShortUrlResponse = {
  slug?: string;
  url?: string;
  id?: number;
  createdAt?: string;
};

type Status = "idle" | "pending" | "resolved" | "rejected";

const usePostShortURL = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<ShortUrlResponse>();

  const isPending = status === "pending";
  const isResolved = status === "resolved";
  const isRejected = status === "rejected";

  const getShortUrl = async (data: { sourceUrl: string; short: string }) => {
    try {
      setStatus("pending");
      const result = (await (
        await fetch(`api/generate-short-url`, {
          method: "POST",
          body: JSON.stringify({ ...data }),
        })
      ).json()) as ShortUrlResponse;
      setData(result);
      setStatus("resolved");
    } catch (error) {
      setStatus("rejected");
    }
  };

  return { isPending, isResolved, isRejected, getShortUrl, data };
};

export default usePostShortURL;
