// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch ,useSelector} from 'react-redux';
// import { actionCreator } from '../state/index';
// import { bindActionCreators } from "redux";

// export default function Admin() {
 
//   const userEmail = localStorage.getItem("userEmail");
//   const handleFetch = async () => {
//     const response = await fetch('http://localhost:5000/admin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ userEmail: userEmail })
//     });
  
//     const data = await response.json();
//     setItems(data);
//   };
  

//   useEffect(() => {
//     handleFetch();
//   }, []);

//   const [items, setItems] = useState([]);


//   const cardItems = items.map(({ id, userEmail }) => ({
//     id,
//     userEmail
//   }));
 
//   const userEmails = cardItems.map((item) => item.userEmail);


// //ADMIN
// const dispatch = useDispatch();
// const actions = bindActionCreators(actionCreator, dispatch);
// var approved = false ;
// var app=false;
// const handleadmin = (id, approved) => {
//   console.log("oncliked")
//   actions.ADDTOADMIN({ id, approved: true });
//   app = true;
// };

// const handlereject = (id, approved) => {
//   console.log("oncliked")
//   actions.ADDTOADMIN({ id, approved: false });
// };



//   return (
//     <div>
//       <h2 className='ss'>Admin Page</h2>
//       <table className='table table-hover'>
//         <thead className=' text-success fs-4'>
//           <tr>
//             <th scope='col'>#</th>
//             <th scope='col'>Email</th>
//             <th scope='col'>Status</th>
//             <th scope='col'>Actions</th>
//           </tr>
//         </thead>
//         <tbody className='text-light'>
//           { cardItems.map((item,index) => (
//             <tr key={item.id}>
//               <th scope='row'>{index + 1}</th>
//               <td>{item.userEmail}</td>
//               <td>{app? 'Approved' : 'Not Approved'}</td>
//               <td>
//               <button className='btn btn-success me-3' onClick={() => handleadmin(item.id, true)}>Approve</button>

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from '../state/index';
import { bindActionCreators } from "redux";

export default function Admin() {
  const userEmail = localStorage.getItem("userEmail");
  const [items, setItems] = useState([]);

  const handleFetch = async () => {
    const response = await fetch('http://localhost:5000/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userEmail: userEmail })
    });

    const data = await response.json();
    setItems(data.map(item => ({ ...item, status: null })));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const cardItems = items.map(({ id, userEmail, status }) => ({
    id,
    userEmail,
    status,
    buttonLabel: status === true ? 'Approved' : status === false ? 'Rejected' : 'Approve',
  }));

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator, dispatch);

  const handleadmin = (id) => {
    const updatedItems = items.map(item => item.id === id ? { ...item, status: true } : item);
    setItems(updatedItems);
    actions.ADDTOADMIN({ id, approved: true });
  };

  const handlereject = (id) => {
    const updatedItems = items.map(item => item.id === id ? { ...item, status: false } : item);
    setItems(updatedItems);
    actions.ADDTOADMIN({ id, approved: false });
  };

  return (
    <div>
      <h2 className='ss'>Admin Page</h2>
      <table className='table table-hover'>
        <thead className=' text-success fs-4'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Email</th>
            <th scope='col'>Status</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-light'>
          {cardItems.map((item, index) => (
            <tr key={item.id}>
              <th scope='row'>{index + 1}</th>
              <td>{item.userEmail}</td>
              <td>{item.status === true ? 'Approved' : item.status === false ? 'Rejected' : 'Rejected'}</td>
              <td>
                <button className={`btn btn-${item.status === true ? 'success' : item.status === false ? 'danger' : 'primary'} me-3`}
                  onClick={() => item.status !== true && handleadmin(item.id)}>
                  {item.buttonLabel}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

