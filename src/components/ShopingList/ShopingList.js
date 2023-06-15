import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { loadShoppingProducts, setLoadingState } from "../../redux/productsSlice";
import { CircularProgress } from "@mui/material";
import axios from "axios";


function ShoppingList() {
  const shoppingList = useSelector((state) => state.products.selectedProducts)
  const dispatch = useDispatch();
  const loadingState = useSelector(
    (state) => state.products.loadingState
  )

  async function deleteShoppingProduct(id){
    try {
      dispatch(setLoadingState('loading'));
      return await axios.delete(`http://localhost:9000/products/shoppingList/${id}`)
                        .then(
                          axios.get('http://localhost:9000/products/shoppingList')
                          .then((response) => {
                            dispatch((loadShoppingProducts(response.data)));
                            dispatch(setLoadingState('success'))
                          })
                        ) 
    } catch (error) {
      dispatch(setLoadingState('error'))
    }
  }
  
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shopping List</p>
        { loadingState === 'loading' ? <CircularProgress/> :
          shoppingList.map((product) => (
            <span key={product.id}>
              {product.name} {product.id}
              <button onClick={() => deleteShoppingProduct(product.id)}>DELETE PRODUCT</button>
            </span>
          ))
        }
      </header>
    </div>
  );
}

export default ShoppingList;
