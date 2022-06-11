import type { NextPage } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const CreateShortUrl = dynamic(() => import("../components/create-short-url"), { ssr: false });

const Home: NextPage = () => {
  return (
    <Suspense>
      <CreateShortUrl />
    </Suspense>
  );
};

export default Home;
