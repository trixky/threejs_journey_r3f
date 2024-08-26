import { useState, useEffect, useRef } from "react";

export default function Clicker({ increment, keyName, color = 'darkOrchid' }) {
  console.log("render");
  const storageItemKey = `clicks-${keyName}`;

  const buttonRef = useRef();

  const [count, setCount] = useState(
    parseInt(localStorage.getItem(storageItemKey) ?? 0)
  );

  useEffect(() => {
    // buttonRef is only accessible after the first (jsx) render
    buttonRef.current.style.color = 'papayawhip';
    buttonRef.current.style.backgroundColor = 'rebeccapurple';

    return () => {
      localStorage.removeItem(storageItemKey);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(storageItemKey, count);
  }, [count]);

  function handleClick() {
    setCount(count + 1);
    increment();
  }

  return (
    <div style={{ color }}>
      <p>Clicks count: {count}</p>
      <button ref={buttonRef} onClick={handleClick}>Click me</button>
    </div>
  );
}
