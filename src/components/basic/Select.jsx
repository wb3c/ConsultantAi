import { useState } from "react";

export default function Select() {
  const [isShow, setIsShow] = useState(false);
  const [items, setItems] = useState([
    {
      name: "English",
      emoji: "🇺🇸",
    },
    {
      name: "Japanice",
      emoji: "🇯🇵",
    },
    {
      name: "Bangla",
      emoji: "🇧🇩",
    },
  ]);

  const [acitve, setActive] = useState(items[0]);

  console.log(isShow);
  return (
    <div className="select">
      <sapn onClick={() => setIsShow(!isShow)} className="select-active">
        {acitve.name}
        <span className="icon">{acitve.emoji}</span>
      </sapn>

      <ul className={`dropdown ${(isShow && "show") || ""}`}>
        {items.map((d) => (
          <li key={d.name}>
            <button
              onClick={() => {
                setActive(d);
                setIsShow(false);
              }}
            >
              {d.name} <span className="icon">{d.emoji}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
