import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { loadShoppingProducts, setLoadingState } from '../../redux/productsSlice';

import axios from "axios";

function ProductsList() {
  const productsList = useSelector((state) => state.products.list);
  const dispatch = useDispatch();

  async function addProductToList(product){
    try{
      dispatch(setLoadingState('loading'));
      return await axios.post('http://localhost:9000/products/shoppingList/new', product)
                        .then(function (response) {
                          fetchShoppingProducts();
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
    } catch (error){
      dispatch(setLoadingState('error'));
    }
  }
  async function fetchShoppingProducts(){
    try{
      return await axios.get('http://localhost:9000/products/shoppingList')
                        .then((response) => {
                          dispatch((loadShoppingProducts(response.data)));
                          dispatch(setLoadingState('success'));
                        })
    } catch (error){
      dispatch(setLoadingState('error'));
    }
  }

  return (
    <div className={commonColumnsStyles.AppColumn}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {/* Poniżej znajduje się ostylowany aktywny produkt do zadania 5 */}
        {/* <span
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "16px",
            padding: "6px",
          }}
        >
          Przykładowy aktywny produkt
        </span> */}
        {
          productsList.map((product) => (
            <span>
              {product.name} {product.id}
              <button onClick={() => addProductToList(product)}>ADD PRODUCT</button>
            </span>
          ))
        }
      </header>
    </div>
  );
}

export default ProductsList;
