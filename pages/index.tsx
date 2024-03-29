import type { NextPage } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const CreateShortUrl = dynamic(() => import("../components/create-short-url"), { ssr: false });

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Short the Long</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#0b1120]">
        <Toaster />
        <Suspense>
          <CreateShortUrl />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
