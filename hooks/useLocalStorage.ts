import { Dispatch, SetStateAction, useEffect, useState } from "react";

type useLocalStorageArgs = {
  initialValue: [];
  key: string;
};

const useLocalStorage = <T>({ initialValue, key }: useLocalStorageArgs): [T[], Dispatch<SetStateAction<T[]>>] => {
  const [data, setData] = useState<T[]>(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key)!) as T[];
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
