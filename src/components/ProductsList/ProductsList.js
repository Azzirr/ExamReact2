import React, { useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { loadShoppingProducts, setLoadingStateMainProducts, setDetailsSelectedProduct} from '../../redux/productsSlice';
import { CircularProgress } from "@mui/material";


import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductsList() {
  const productsList = useSelector((state) => state.products.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState(false);

  async function addProductToList(product){
    try{
      dispatch(setLoadingStateMainProducts('loading'));
      return await axios.post('http://localhost:9000/products/shoppingList/new', product)
                        .then(function (response) {
                          fetchShoppingProducts();
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
    } catch (error){
      dispatch(setLoadingStateMainProducts('error'));
    }
  }
  async function fetchShoppingProducts(){
    try{
      return await axios.get('http://localhost:9000/products/shoppingList')
                        .then((response) => {
                          dispatch((loadShoppingProducts(response.data)));
                          dispatch(setLoadingStateMainProducts('success'));
                        })
    } catch (error){
      dispatch(setLoadingStateMainProducts('error'));
    }
  }
  async function seeDetails(id){
    dispatch(setLoadingStateMainProducts('loading'))
    try {
      return await axios.get(`http://localhost:9000/products/${id}`)
                        .then((response) => {
                          dispatch(setDetailsSelectedProduct(response.data));
                          dispatch(setLoadingStateMainProducts('success'));
                          navigate('/details');
                        })
    } catch (error) {
      dispatch(setLoadingStateMainProducts('error'))
    }
  }
  function handleRightClick(id, event){
    event.preventDefault()
    setDetails(action => !details);
    seeDetails(id)
  }
  const loadingStateMainProducts = useSelector(
    (state) => state.products.loadingStateMainProducts
  )

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
        { loadingStateMainProducts === 'loading' ? <CircularProgress/> :
          productsList.map((product) => (
            <span key={product.id} onContextMenu={(event) => {handleRightClick(product.id, event)}}>
              {product.name} 
              <button onClick={() => addProductToList(product)}>ADD PRODUCT</button>
            </span>
          ))
        }
      </header>
    </div>
  );
}

export default ProductsList;
