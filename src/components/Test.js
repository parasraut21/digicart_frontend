import React, { useState, useEffect } from 'react';


export default function Card(props) {
    const [barcode, setBarcode] = useState('');
    const [items, setItems] = useState([
      { code: '8902442221154', name: 'NoteBook youVA', price: 55.00, img:"https://www.jiomart.com/images/product/600x600/490062679/classmate-single-line-soft-long-notebook-172-pgs-product-images-o490062679-p590484947-1-202203142341.jpg" },
      { code: '8902519001993', name: 'Item 2', price: 10, imgSrc: 'https://example.com/item2.jpg' },
      { code: '789', name: 'Item 3', price: 5, imgSrc: 'https://example.com/item3.jpg' },
    ]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemImgSrc, setItemImgSrc] = useState('');
  
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
      const foundItem = items.find(item => item.code === barcode);
      if (foundItem) {
        setItemName(foundItem.name);
        setItemPrice(foundItem.price);
        setItemImgSrc(foundItem.img);
        setBarcode('');
      }
    }, [barcode, items]);
  
  return (
    <div>
             <h1>Scan a barcode:</h1>
             <div>{barcode}</div>
             {itemName && (  <div>
        <div className="card mt-3 mx-3 my-3" style={{ "width": "18rem", "maxHeight": "360px" ,"display":'flex', "justifyContent":'flex-end'}}>
          <img src={itemImgSrc} alt={itemName}  style={{height : "120px",objectFit:"fill",color:"white"}} />
          <div className="card-body mx-3">
            <h5 className="card-title">{itemName}</h5>
            <div className="container w-100">
              <select className="m-2 h-100  ng-success rounded" >
                {Array.from(Array(6),(e,i)=>{
                  return(
                    <option key={i+1} value={i+1}>{i+1}</option>
                  )
                })}
              </select>
              <div className="d-inline fs-5 h-100" >Price: ₹ {itemPrice} /-</div>
            </div>
            <hr />
            <div className="removeitbtn">
              <button  className="btn btn-primary">Add To Cart</button> 
            </div>
          </div>
        </div>
      </div>
    
    )} 
    </div> 
  );
}