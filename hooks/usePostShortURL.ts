import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

export type ShortUrlResponse = {
  slug?: string;
  url?: string;
  id?: number;
  createdAt?: string;
};

type ErrorResponse = {
  message: string;
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
    setError("");
    setStatus("pending");

    const response = await fetch(`api/generate-short-url`, {
      method: "POST",
      body: JSON.stringify({ ...data }),
    });

    const result = (await response.json()) as ShortUrlResponse | ErrorResponse;

    if ("slug" in result) {
      setData(prevState => [result, ...prevState]);
      setStatus("resolved");

      if (typeof onSuccess !== "undefined") {
        onSuccess();
      }
    }

    if ("message" in result) {
      setError(result.message);
      setStatus("rejected");
    }
  };

  return { isPending, isResolved, isRejected, getShortUrl, data, error };
};

export default usePostShortURL;
