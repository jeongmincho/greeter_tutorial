import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Greeter from "../Greeter.json";
import { useState } from "react";

const Home: NextPage = () => {
  const { address } = useAccount();
  const [greeting, setGreeting] = useState("");

  const { data: fetchedGreeting } = useContractRead({
    addressOrName: "0x576a9cAd35BE47eB5e9DE4bE2db2522A32916ABD",
    contractInterface: Greeter.abi,
    functionName: "greet",
  });

  const { config } = usePrepareContractWrite({
    addressOrName: "0x576a9cAd35BE47eB5e9DE4bE2db2522A32916ABD",
    contractInterface: Greeter.abi,
    functionName: "setGreeting",
    args: ["hi"],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function handleSetGreeting(e: any) {
    setGreeting(e.target.value);
  }

  console.log("fetchedGreeting", fetchedGreeting);

  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!address ? (
          <ConnectButton />
        ) : (
          <>
            <div>{fetchedGreeting}</div>
            <input
              placeholder="Enter a new greeting"
              value={greeting}
              onChange={handleSetGreeting}
            />
            <button
              onClick={() => {
                write?.();
              }}
            >
              Set Greeting
            </button>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
