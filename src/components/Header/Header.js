import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { loadProducts } from '../../redux/productsSlice';
import axios from "axios";
function Header(props) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  const dispatch = useDispatch();
  async function fetchProducts(){
    try{
      return await axios.get('http://localhost:9000/products')
                        .then((response) => {
                            dispatch(loadProducts(response.data))
                        })
    } catch (error){
      return error;
    }
  }
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button variant="contained" onClick={fetchProducts}>Załaduj produkty</Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;