import React, { useEffect, useState } from "react";
import axios from "axios";
import Match from "../components/match";
import q22 from "./q22.jpg";

function Homescreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  console.log(search);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          "http://localhost:5000/api/shop"
        );
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div class="topnav">
        <a class="active" href="localhost:3000">
          <i class="fa fa-home"></i> Home
        </a>
        <a href="analytics">
          <i class="fa fa-chart-line"></i> Analytics
        </a>
        <a
          href="https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022/tickets"
          rel="noreferrer"
          target="_blank"
        >
          <i class="fas fa-futbol"></i> Fifa
        </a>

        <text className="title">Fifa World Cup 2022</text>
        <input
          type="text"
          placeholder="Search by team"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row justify-content-center mt-5">
        <div className="recommendation">GET YOUR TICKET :</div>
        <div className="container">
          {loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>Error</h1>
          ) : (
            data
              .filter((match) => {
                return search.toLowerCase() === ""
                  ? match
                  : match.homeTeam.toLowerCase().includes(search) ||
                      match.awayTeam.toLowerCase().includes(search);
              })
              .map((match) => {
                return (
                  <div className="com-md-9 mt-2">
                    <Match match={match} />
                  </div>
                );
              })
          )}
        </div>
      </div>
      <img src={q22} className="q22" alt="q22" />
    </div>
  );
}

export default Homescreen;
