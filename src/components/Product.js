import React, { useState } from "react";
import axios from "axios";

function Product({ item, index }) {
const [price, setPrice] = useState();




  const change = (targetPrice) => {
    axios
      .patch(
        `https://sheet.best/api/sheets/5dc7507e-ccea-403e-9d6f-e142dc82344d/${index}`,
        {
          price: targetPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

     
  };

  return (
    <tr className={index % 2 === 0 ? "even-row" : "odd-row"}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.purchasePrice}</td>
      <td>
       <input onChange={(e) => setPrice(e.target.value)}></input>
        
      </td>
      <td><button onClick={()=> change(price)}>Змінити</button></td>
    </tr>
  );
}

export default Product;
