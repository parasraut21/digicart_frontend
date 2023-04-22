import React, { useEffect, useRef, useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { actionCreator } from '../state/index';
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Model from './Model'
import '../App.css';

export default function Card(props) {


  const [barcode, setBarcode] = useState('');
  const [items, setItems] = useState([
    { code: '8902442221154', name: 'NoteBook youVA', price: 55.00, img:"https://www.jiomart.com/images/product/600x600/490062679/classmate-single-line-soft-long-notebook-172-pgs-product-images-o490062679-p590484947-1-202203142341.jpg" },
    { code: '8901491504782', name: "Lays's West Indies' Hot 'n' Sweet Chilli", price: 20, img: 'https://m.media-amazon.com/images/I/718mIkrmCfL._SL1500_.jpg' },
    { code: '789', name: 'Item 3', price: 5, imgSrc: 'https://example.com/item3.jpg' },
  ]);
  const [itemsScanned, setItemsScanned] = useState([]);
  
  useEffect(() => {
    function handleKeyDown(event) {
      // Check if input is a digit
      if (/[0-9]/.test(event.key)) {
        setBarcode(prevBarcode => prevBarcode + event.key);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const foundItem = props.digiItems.find(item => item.barcode === barcode);
    if (foundItem) {
      const newItem = {
        name: foundItem.name,
        price: foundItem.price,
        imgSrc: foundItem.img,
        qty: 1
      }
      setItemsScanned(prevItems => [...prevItems, newItem]);
      setBarcode('');
    }
  }, [barcode, items]);

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator, dispatch);


//
  const handleAddToCart = async (item) => {
    props.showAlert("Successfully Item Added To Cart ","success");
    await actions.depositMoney(1);
    actions.addToCart({ name: item.name, qty:item.qty,price: item.price });
    console.log(`Added to cart: ${item.name},  ${item.qty} , ${item.price}`);
  }


  //remove itemns 
  const cartItems = useSelector(state => state.cartItems);

  //mycart
  const amount = useSelector((state) => state.amount);
  const navigate = useNavigate();
  const handlemycart = () => {
    //  navigate("/cart");
    props.showAlert("In Cart","success");
    setCartview(true)

  }
  const [cartview,setCartview] = useState(false);
  return (
    
    <div className="content-container">
        <div className='ss'>
      <h1>Scan a barcode:</h1>
      <div className="btn bg-white text-success mx-1 mr-0">
              <i className="fa fa-shopping-cart" style={{ "fontSize": "30px" }}></i>{" "}
              <span className="badge badge-warning" id="lblCartCount">
                {" "}
                {amount} {" "}
              </span>{" "}
              <button className="btn" onClick={handlemycart}>My Cart</button>
              {cartview?<Model onClose={()=>{
                setCartview(false);
                props.showAlert("Back To Home Page","success")
                }}><Cart/></Model>:null}
            </div>
            </div>
      <div>{barcode}</div>
      <div className="d-flex flex-wrap justify-content-center">
        {itemsScanned.map((item, index) => (
          <div key={index + 1} className="card mt-3 mx-3 my-3" style={{ width: '18rem', maxHeight: '360px', display: 'flex', justifyContent: 'flex-end', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
            <img src={item.imgSrc} alt={item.name} style={{ height: '120px', objectFit: 'fill', color: 'white' }} />
            <div className="card-body mx-3">
              <h5 className="card-title">{item.name}</h5>
              <div className="container w-100">
                <select className="m-2 h-100 ng-success rounded" value={item.qty} onChange={(e) => {
                  const newQty = parseInt(e.target.value);
                  setItemsScanned(prevItems => {
                    const updatedItem = { ...item, qty: newQty };
                    const updatedItems = [...prevItems];
                    updatedItems.splice(index, 1, updatedItem);
                    return updatedItems;
                  })
                }}>
                  {Array.from(Array(6), (e, i) => {
                    return <option key={i + 1} value={i + 1}>{i + 1}</option>
                  })}
                </select>
                <div className="d-inline fs-5 h-100">Price: ₹{item.price}/-</div>
              </div>
              <hr />
              <div className="removeitbtn">
                <button className="btn btn-primary" onClick={() => handleAddToCart(item)}>Add To Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 10px;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        
        .card:hover {
          transform: scale(1.02);
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
        
        .card img {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        
        .card-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .card-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .removeitbtn {
          display: flex;
          justify-content: flex-end;
        }
        
        button {
          background-color: #5cb85c;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
        }
        
        button:hover {
          background-color: #4cae4c;
        }
      `}</style>
    </div>
  );}