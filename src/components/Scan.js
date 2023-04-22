import React from 'react'

export default function Scan() {
     const [barcode, setBarcode] = useState('');
  const [items, setItems] = useState([
    { code: '8902442221154', name: 'NoteBook youVA',img:"https://www.jiomart.com/images/product/600x600/490062679/classmate-single-line-soft-long-notebook-172-pgs-product-images-o490062679-p590484947-1-202203142341.jpg",price:"22.00" },
    { code: '8902519001993', name: 'Item 2' },
    { code: '789', name: 'Item 3' },
  ]);
  const [itemName, setItemName] = useState('');

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
      setBarcode('');
    }
  }, [barcode, items]);

  return (
    <div>
       <div>
      <h1>Scan a barcode:</h1>
      <div>{barcode}</div>
      {itemName && (
        <div className='card'>
          <div className='crad-body'>
            <div className='cart-title'>{itemName}</div>
            <div className='card-text'>Code: {barcode}</div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
