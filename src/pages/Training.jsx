import { useState } from "react";

export default function Training() {
  const menuitem = [
    {
      name: "website",
    },
    {
      name: "text",
    },
    {
      name: "pdf",
    },
  ];

  const [active, setActive] = useState(menuitem[0].name);
  return (
    <div className="training">
      <div className="container">
        <h1 className="title">Trainging Materials</h1>

        <ul className="training-menu">
          {menuitem.map((d, i) => (
            <li key={i}>
              <button
                onClick={() => setActive(d.name)}
                className={(active === d.name && "active") || ""}
              >
                {d.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="training-form bg-white">
          <h4>update your information</h4>
          {(active === "text" && (
            <textarea name="" id="" placeholder="Type here ..."></textarea>
          )) ||
            (active === "website" && (
              <input type="text" placeholder="https://example.com" />
            )) ||
            (active === "pdf" && (
              <input
                type="file"
                accept=".fdf"
                placeholder="https://example.com"
              />
            ))}

          <button className="btn">Update</button>
        </div>
      </div>
    </div>
  );
}
