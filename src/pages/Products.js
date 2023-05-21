import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/productsSlice";
import Product from "../components/Product";

function Products() {
  const { products, changeProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();


const url = `https://sheets.googleapis.com/v4/spreadsheets/1sfh7uwLfPL7j6-hWp5WGjin6PiOIG2WisWSa5sX_K5E/values/products?key=AIzaSyB8fiftAh5Ms8YjLfTggSzTt516ip7JOII`;


  
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        dispatch(setProducts(data.values));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [changeProducts, dispatch]);

  return (
    <div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Назва продукту</th>
            <th>Ціна</th>
            <th>Закупівельна ціна</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => (
              index !=0?
              <Product key={index} item={product} index={index}></Product>: null
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
