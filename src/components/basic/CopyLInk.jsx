import { useEffect, useRef, useState } from "react";

export default function Copylink({ link }) {
  const [isCopy, setIsCopy] = useState(false);
  const textRef = useRef(null);

  const handler = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (error) {
      console.error("Error copying text:", error);
    }
    setIsCopy(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCopy(false);
    }, 1000);

    // Clean up the timeout when the component is unmounted
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopy]);
  return (
    <div className="copylink">
      <div ref={textRef} className="copylink-url">
        {link}
      </div>
      <button className={(isCopy && "active") || ""} onClick={handler}>
        {(isCopy && "Coped") || "Copy"}
      </button>
    </div>
  );
}
