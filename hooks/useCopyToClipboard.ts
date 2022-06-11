import { useState } from "react";

const useCopyToClipboard = () => {
  const [status, setStatus] = useState("idle");

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => setStatus("success"));
  };

  return copy;
};

export default useCopyToClipboard;
