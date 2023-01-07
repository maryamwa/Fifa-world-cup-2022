import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import icon1 from "./players.jpg";

function SuccessScreen() {
  return (
    <div>
      <h1 className="success-title">
        Success you have reserved your ticket
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          color="lime"
          fill="currentColor"
          class="bi bi-check"
          viewBox="0 0 16 16"
        >
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </h1>
      <img src={icon1} className="icon1" alt="players" />
      <div>
        <Link to="/">
          <Button class="go-home"><i class="fa fa-home"></i> Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessScreen;
