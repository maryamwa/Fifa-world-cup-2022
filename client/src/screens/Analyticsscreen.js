import React, { useEffect, useState } from "react";
import axios from "axios";
import Match from "../components/analyticscomp";
import wc22 from "./wc22.png";

const Analyticsscreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          "http://localhost:5000/api/analytics"
        );
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div class="topnav">
        <a class="active" href="/">
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
      </div>
      <div className="row justify-content-center mt-5">
        <div className="container">
          <h1 className="recommendation">Most Selled Tickets :</h1>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            data.map((match) => {
              //show them in accending order
              return (
                <div className="row justify-content-center mt-5">
                  <div class="analytic-div">
                    <div className="reservation-ticket">
                      <Match key={match._id} match={match} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <img src={wc22} className="wc22" alt="wc22" />
      </div>
    </div>
  );
};

export default Analyticsscreen;
