import React from "react";

function Match({ match }) {
 

  return (
    <div className="row bs">
      <div className="ticket">
        <b>
          <div className="ticketCountainer">
            <div>
              <p className="match_num">Match Number: {match.matchNumber}</p>
              <p className="match_num">Number of tickets sold: {match.quantity}</p>


            </div>
          </div>
        </b>

        <div></div>
      </div>
    </div>
  );
}

export default Match;
