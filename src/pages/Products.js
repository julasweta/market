import React from "react";
import { useEffect } from "react";
import Papa from "papaparse";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/productsSlice";
import Product from "../components/Product";


function Products() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();



  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAiD_JaoAO9eQdRh4VMZJWcybCZ0S9b6tFzVYfxFSwAjOFEsFIswewvyhJ7XtV9IUpeN59Dk-wzPU_/pub?output=csv",
      {
        download: true,
        header: true,
        complete: function (results) {
          var data = results.data;
          dispatch(setProducts(data));
        },
      }
    );
  }, [dispatch]);




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
              <Product key={index} item={product} index={index}></Product>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
