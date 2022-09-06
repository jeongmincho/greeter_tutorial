import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Greeter from "./Greeter.json";
import { useState } from "react";

function App() {
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
    args: [greeting],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function handleSetGreeting(e) {
    setGreeting(e.target.value);
  }

  console.log("fetchedGreeting: ", fetchedGreeting);

  return (
    <div className="App">
      <header className="App-header">
        {!address ? (
          <ConnectButton />
        ) : (
          <>
            <div>{fetchedGreeting}</div>
            <input
              placeholder="Enter a new greeting"
              value={greeting}
              onChange={handleSetGreeting}
            ></input>
            <button
              onClick={() => {
                write?.();
              }}
            >
              Set Greeting
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
