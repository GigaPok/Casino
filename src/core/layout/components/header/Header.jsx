import React, { useState } from "react";
import "./Header.scss";

const navigation = [
  {
    title: "Sports",
    link: "#",
    id: 1,
  },
  {
    title: "In-Play",
    link: "#",
    id: 2,
  },
  {
    title: "Casino",
    link: "#",
    id: 3,
  },
  {
    title: "Live Casino",
    link: "#",
    id: 4,
  },
  {
    title: "Virtual Sports",
    link: "#",
    id: 5,
  },
];

export const Header = () => {
  const [active, setActive] = useState(2);

  return (
    <div id="header">
      <div className="nav">
        <ul>
          {navigation.map((el) => (
            <li key={el.id}>
              <a
                href={el.link}
                className={active === el.id ? "active" : ""}
                onClick={() => setActive(el.id)}
              >
                {el.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="auth">
        <ul>
          <li>
            <a href="#" className="join">
              Join
            </a>
          </li>
          <li>
            <a href="#">Log In</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
