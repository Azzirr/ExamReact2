import React, { useState, useEffect } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { loadShoppingProducts, setLoadingStateMainProducts, setDetailsSelectedProduct} from '../../redux/productsSlice';
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ProductsList() {
  const productsList = useSelector((state) => state.products.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    setActiveProductIndex(0); // Ustawienie pierwszego produktu jako aktywnego po załadowaniu
  }, []);

  async function addProductToList(product){
    try {
      dispatch(setLoadingStateMainProducts('loading'));
      await axios.post('http://localhost:9000/products/shoppingList/new', product);
      fetchShoppingProducts();
    } catch (error){
      dispatch(setLoadingStateMainProducts('error'));
    }
  }

  async function fetchShoppingProducts(){
    try {
      const response = await axios.get('http://localhost:9000/products/shoppingList');
      dispatch(loadShoppingProducts(response.data));
      dispatch(setLoadingStateMainProducts('success'));
    } catch (error){
      dispatch(setLoadingStateMainProducts('error'));
    }
  }

  async function seeDetails(id){
    dispatch(setLoadingStateMainProducts('loading'))
    try {
      const response = await axios.get(`http://localhost:9000/products/${id}`);
      dispatch(setDetailsSelectedProduct(response.data));
      dispatch(setLoadingStateMainProducts('success'));
      navigate('/details');
    } catch (error) {
      dispatch(setLoadingStateMainProducts('error'))
    }
  }

  function handleRightClick(id, event){
    event.preventDefault()
    setDetails(action => !details);
    seeDetails(id)
  }

  function handleKey(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveProductIndex(prevIndex => {
        if (prevIndex === 0) {
          return productsList.length - 1;
        } else {
          return prevIndex - 1;
        }
      });
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveProductIndex(prevIndex => {
        if (prevIndex === productsList.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    } else if (event.key === "d") {
      const currentID = dispatch(setDetailsSelectedProduct(activeProduct))
      navigate("/details");
    } else if (event.key === "Backspace") {
      navigate("/");
    }
  }
  
  const activeProduct = productsList[activeProductIndex];

  const loadingStateMainProducts = useSelector(
    (state) => state.products.loadingStateMainProducts
  );


  return (
    <div
      className={commonColumnsStyles.AppColumn}
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {loadingStateMainProducts === 'loading' ? (
          <CircularProgress />
        ) : (
          productsList.map((product, index) => (
            <span
              key={product.id}
              onContextMenu={(event) => {
                handleRightClick(product.id, event);
              }}
              style={{
                backgroundColor:
                  index === activeProductIndex ? "white" : "transparent",
                border:
                  index === activeProductIndex ? "1px black solid" : "none",
                borderRadius: "16px",
                padding: "6px",
              }}
            >
              {product.name}
              <button onClick={() => addProductToList(product)}>ADD PRODUCT</button>
            </span>
          ))
        )}
      </header>
    </div>
  );
}

export default ProductsList;