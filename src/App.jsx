import { useState, useMemo } from "react";
import Clicker from "./Clicker";
import People from "./People";

export default function App({ children, clickerCount }) {
  const [hasClicker, setHasClicker] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  function incrementTotalCount() {
    setTotalCount((prev) => prev + 1);
  }

  const colors = useMemo(() => {
    console.log("colors computation");
    return Array(clickerCount)
      .fill()
      .map(() => `hsl(${Math.floor(Math.random() * 360)}deg, 100%, 70%)`);
  }, [clickerCount]);

  return (
    <>
      {children}
      <button onClick={() => setHasClicker(!hasClicker)}>
        {hasClicker ? "Hide" : "Show"} Clicker
      </button>
      <p>Total count: {totalCount}</p>
      {hasClicker && (
        <>
          {Array(clickerCount)
            .fill()
            .map((_, index) => (
              <Clicker
                increment={incrementTotalCount}
                key={"clicker-" + index}
                keyName={String.fromCharCode(97 + index)}
                color={colors[index]}
              />
            ))}
        </>
      )}
      <People />
    </>
  );
}
