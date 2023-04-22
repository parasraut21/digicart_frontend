import Footer from "../components/Footer";
import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Alert from "./Alert";

export default function Home(props) {
  const [items, setItems] = useState([]);


  const [alert, setalert] = useState(null);
  
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 3000);
  };



  const loaddata = async () => {
    const response = await fetch("http://localhost:5000/getitemdigicart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    setItems(json);
   
  };

  useEffect(() => {
    showAlert("Welcome To Digicart", "success");
    loaddata();
  }, []);

  const cardItems = items.map(({ id, name, img, price , barcode }) => ({
    id,
    name,
    img,
    price,
    barcode
  }));
  
  return (
    <>
      <div>
        <div>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
        </div>
        <div>
          <Card showAlert={showAlert} digiItems={cardItems} />
        </div>
        <div>
          <Footer showAlert={showAlert} />
        </div>
      </div>
    </>
  );
}