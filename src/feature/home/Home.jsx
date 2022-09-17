import React, { useEffect, useState } from "react";
import { MainLayout } from "../../core";
import img from "../../assets/cover.jpg";
import "./Home.scss";
import videoslots from "../../assets/SVG/videoslots.svg";
import popularslot from "../../assets/SVG/popularslot.svg";
import FAV from "../../assets/SVG/FAV.svg";
import newgames from "../../assets/SVG/newgames.svg";
import tablegames from "../../assets/SVG/tablegames.svg";
import cards from "../../assets/SVG/cards.svg";
import plusicon from "../../assets/SVG/plusicon.svg";
import { Card } from "../../shared/card/Card";
import { Loading } from "../../shared/loading/Loading";

const category = [
  { icon: videoslots, title: "Video Slots" },
  { icon: popularslot, title: "Popular Slots" },
  { icon: FAV, title: "FAV" },
  { icon: newgames, title: "New Games" },
  { icon: tablegames, title: "Table Games" },
  { icon: "url", title: "Jackpot Games" },
  { icon: cards, title: "Video Poker" },
  { icon: plusicon, title: "More" },
];

export const Home = () => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://mystake.com/api/game/getgametemplates_dev/1/1/1")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(
          result.GameTemplateNameTranslations.map((el, key) => ({
            ...el,
            key,
          }))
        );
        setImages(result.GameTemplateImages);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data.length) return;

    setPage(1);
  }, [search]);

  const nextPage = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPage(page + 1);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="img-wrapper">
        <img src={img}></img>
        <img src={img}></img>
      </div>
      <div className="search">
        <div className="info">
          <span>All Games ({data.length})</span>
          <select name="" id="">
            <option value="All Providers">All Providers</option>
          </select>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="Search Games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
        </div>
        <span className="hr"></span>
        <div></div>
      </div>
      <div className="category">
        {category.map((el, key) => (
          <div key={key}>
            <img src={el.icon} />
            <span>{el.title}</span>
          </div>
        ))}
      </div>
      <div className="games">
        {data
          .filter((el) =>
            !search ? true : el.Value.toLowerCase().match(search.toLowerCase())
          )
          .slice(0, page * 60)
          .map((el) => (
            <Card
              key={el.key}
              url={`https://static.inpcdn.com/${images[el.key * 2].CdnUrl}`}
              title={el.Value}
            ></Card>
          ))}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <button className="more" disabled={loading} onClick={nextPage}>
          see more
        </button>
      )}
    </MainLayout>
  );
};
