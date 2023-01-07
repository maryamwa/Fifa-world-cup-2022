import React from "react";

function Match({ match }) {
  function handleClick() {
    window.location.href = `/${match._id}`;
  }

  return (
    <div className="row bs" onClick={handleClick}>
      <div className="ticket">
        <b>
          <div className="ticketCountainer">
            <h3>
              {match.homeTeam} vs {match.awayTeam}
            </h3>
            <div className="Stadium">
              <p>Stadium 🏟: {match.location}</p>
            </div>
            <div>
              <p className="match_num">Match Number: {match.matchNumber}</p>
            </div>
            <div className="match_data">
              <p>Match Date: {match.dateUtc}</p>
            </div>

            <div className="Price"></div>
          </div>
        </b>

        <div></div>
      </div>
    </div>
  );
}

export default Match;
