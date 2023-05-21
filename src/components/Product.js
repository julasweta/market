import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setChangeProducts } from "../redux/productsSlice";


function Product({ item, index }) {
  const [price, setPrice] = useState();
  const dispatch = useDispatch();

  const { changeProducts } = useSelector((state) => state.products);

  /*
  const change = (targetPrice) => {
    axios
      .patch(
        `https://sheet.best/api/sheets/5dc7507e-ccea-403e-9d6f-e142dc82344d/${index-1}`,
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
        dispatch(setChangeProducts(!changeProducts));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  */


  const SHEET_ID = "1sfh7uwLfPL7j6-hWp5WGjin6PiOIG2WisWSa5sX_K5E";
   /*const ACCESS_TOKEN =
    "ya29.a0AWY7CknjDjjf2UlIAGuA01LbUDCPu_g2DYGZHhEfdLXRjdk3v22WGEA17fwJ8lAEpRjP9eb57Z2hrT2h8BcV75F8I3wjVRYLPLafpmSNNGXXSM-2X8uMfBrO2HjK9v5kGUXhM2OanXxo5QTdtxmfQYrND73LaCgYKAdISARASFQG1tDrpo-Mgq_0zCO6OoSCL4ZseTA0163";
  */


    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
   

    const change = (targetPrice) => {
      const formattedPrice = parseFloat(targetPrice).toFixed(2); // Ensure targetPrice is a valid number and format it with two decimal places
      const sheetId = 0;
      const data = {
        requests: [
          {
            repeatCell: {
              range: {
                startColumnIndex: 1,
                endColumnIndex: 2,
                startRowIndex: index,
                endRowIndex: index + 1,
                sheetId: sheetId,
              },
              cell: {
                userEnteredValue: {
                  stringValue: formattedPrice,
                },
              },
              fields: "*",
            },
          },
        ],
      };
    
      axios
        .post(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          dispatch(setChangeProducts(!changeProducts));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
    

  return (
    <tr className={index % 2 === 0 ? "even-row" : "odd-row"}>
      <td>{item[0] || 0}</td>
      <td>{item[1] || 1}</td>
      <td>{item[2] || 2}</td>
      <td>
        <input onChange={(e) => setPrice(e.target.value)}></input>
      </td>
      <td>
        <button onClick={() => change(price)}>Змінити</button>
      </td>
    </tr>
  );
}

export default Product;
