import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function Audio({ url }) {
  const [isPlay, setIsPlay] = useState(false);
  const [range, setRange] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [deuration, setDeuration] = useState(0);
  const audio = useRef(null);
  const playHandler = () => {
    if (!isPlay) {
      audio.current.play();
      setIsPlay(true);
    } else {
      audio.current.pause();
      setIsPlay(false);
    }
  };

  useEffect(() => {
    if (audio.current.duration) {
      setDeuration(audio.current.duration);
    }
    const inter = setInterval(() => {
      setRange((audio.current.currentTime / audio.current.duration) * 100);
      setCurrentTime(audio.current.currentTime);

      if (deuration === currentTime) {
        setIsPlay(false);
      }
    }, 1);
    return () => {
      clearInterval(inter);
    };
  });
  return (
    <p className="audio">
      <audio ref={audio} autoPlay={isPlay} src={url}></audio>
      <button className={`${(!isPlay && "pdd") || ""}`} onClick={playHandler}>
        {(!isPlay && <FaPlay />) || <FaPause />}
      </button>
      <span className="range">
        <span
          style={{
            width: `${range}%`,
          }}
        ></span>
      </span>
      <span>
        {(!currentTime && deuration.toFixed(2)) || currentTime.toFixed(2)}
      </span>
    </p>
  );
}
