import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Match from "../components/match";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TicketPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          `http://localhost:5000/api/shop/${id}`
        );
        setData(response);
        setLoading(false);
        console.log(response);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
    //for ignoring warning yasta
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.get(
        `http://localhost:5000/api/shop/${id}`
      );
      var json = JSON.parse(JSON.stringify(response));
    } catch (error) {
      console.error(error.message);
    }
    const matchNumber = json[0].matchNumber;
    const category = parseInt(document.getElementById("category").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const email = document.getElementById("email").value;
    const number = document.getElementById("cardnumber").value;
    const expirationMonth = parseInt(document.getElementById("expmonth").value);
    const expirationYear = parseInt(document.getElementById("expyear").value);
    const cvc = document.getElementById("cvc").value;

    var price;
    if (category === 1) {
      price = 75;
    } else if (category === 2) {
      price = 125;
    } else if (category === 3) {
      price = 195;
    }

    const card = {
      number,
      expirationMonth,
      expirationYear,
      cvc,
    };

    const tickets = [
      {
        category,
        quantity,
        price,
      },
    ];
    const info = {
      email,
      matchNumber,
      tickets,
      card,
    };

    axios
      .post("http://localhost:5000/api/reservations", info)
      .then((res) => {
        if (res.status === 200) {
          navigate("/success");
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div>
      <div class="topnav">
        <a class="active" href="../">
          <i class="fa fa-home"></i> Home
        </a>
        <a href="analytics">
          <i class="fa fa-chart-line"></i>
          Analytics
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
          {loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>Error</h1>
          ) : (
            data.map((match) => {
              return (
                <div className="row justify-content-center mt-5">
                  <div class="Reservation-div">
                    <div className="reservation-ticket">
                      <Match key={match._id} match={match} />
                    </div>

                    {/*  div_one*/}

                    <div className="div_one">
                      <div className="category_div">
                        <span className="categorytitle" for="category">
                          Category:
                        </span>
                        <select
                          classname="categoryname"
                          id="category"
                          name="category"
                        >
                          <option value="1">Category 1--75$</option>
                          <option value="2">Category 2--125$</option>
                          <option value="3">Category 3--195$</option>
                        </select>
                      </div>
                      {/*  */}
                      <div class="Quantity_div">
                        <span className="Quantityname" for="quantity">
                          Quantity:
                        </span>
                        <select
                          className="quantitynumber"
                          id="quantity"
                          name="quantity"
                          placeholder="Quantity"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                      {/*  */}
                      <div className="email_div">
                        <label className="lablestyleemail" for="email">
                          E-mail:
                        </label>

                        <input
                          className="email_input"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    {/* payment */}
                    <div className="payment">
                      <label className="Payment-title">
                        Payment <i class="fa fa-money-bill-1-wave"></i>:
                      </label>
                      <label className="lablestylecardnumber" for="cardnumber">
                        <i class="fa-regular fa-credit-card"></i> Card Number:
                      </label>

                      <input
                        className="cardnumber_input"
                        type="text"
                        id="cardnumber"
                        name="cardnumber"
                        placeholder="4242424242424242"
                        maxlength="16"
                        pattern="[0-9]{16}"
                      />

                      <label className="lablestyleexpmonth" for="expmonth">
                        <i class="fa fa-calendar-days"></i> Expiration Month:
                      </label>

                      <input
                        className="expmonth_input"
                        type="text"
                        id="expmonth"
                        name="expmonth"
                        placeholder="07"
                        maxlength="2"
                      />

                      <label className="lablestyleexpyear" for="expyear">
                        <i class="fa fa-calendar-days"></i> Expiration Year:
                      </label>

                      <input
                        className="expyear_input"
                        type="text"
                        id="expyear"
                        name="expyear"
                        placeholder="2032"
                        maxlength="4"
                      />

                      <label className="lablestylecvc" for="cvc">
                        <i class="fa fa-shield"></i> CVC:
                      </label>

                      <input
                        className="cvc_input"
                        type="text"
                        id="cvc"
                        name="cvc"
                        placeholder="421"
                        maxlength="3"
                      />
                    </div>
                    {/* ==================== Payment ===================== */}
                    <button className="paybutton" onClick={handleShow}>
                      PAY
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>

            <Button variant="primary" onClick={handleSubmit}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default TicketPage;
