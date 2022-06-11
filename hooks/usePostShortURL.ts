import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

export type ShortUrlResponse = {
  slug?: string;
  url?: string;
  id?: number;
  createdAt?: string;
};

type usePostShortURLArgs = {
  onSuccess?: () => void;
};

type Status = "idle" | "pending" | "resolved" | "rejected";

const usePostShortURL = ({ onSuccess }: usePostShortURLArgs) => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [data, setData] = useLocalStorage<ShortUrlResponse>({ initialValue: [], key: "short-urls" });

  const isPending = status === "pending";
  const isResolved = status === "resolved";
  const isRejected = status === "rejected";

  const getShortUrl = async (data: { sourceUrl: string; short: string }) => {
    try {
      setError("");
      setStatus("pending");

      const result = (await (
        await fetch(`api/generate-short-url`, {
          method: "POST",
          body: JSON.stringify({ ...data }),
        })
      ).json()) as ShortUrlResponse;

      setData(prevState => [result, ...prevState]);
      setStatus("resolved");

      if (typeof onSuccess !== "undefined") {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }

      setStatus("rejected");
    }
  };

  return { isPending, isResolved, isRejected, getShortUrl, data, error };
};

export default usePostShortURL;
