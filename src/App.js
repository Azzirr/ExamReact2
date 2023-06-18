import Header from "./components/Header/Header";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import styles from "./App.module.scss";
import { Navigate } from "react-router-dom";
import ProductsList from "./components/ProductsList/ProductsList";
import ShopingList from "./components/ShopingList/ShopingList";
import { filterByIsFood, loadProducts } from '../src/redux/productsSlice'
import { useDispatch } from "react-redux";
import axios from "axios";
// import { Outlet } from "react-router-dom";


function App(props) {
  const dispatch = useDispatch();
  let agreement = false
  const userExist = localStorage.getItem("user");
  if (!userExist) {
    return <Navigate to="/" />;
  }

  function handleChange(){
    agreement = !agreement
    if(agreement === true){
      dispatch(filterByIsFood(agreement))
    } else if (agreement === false){
      axios.get('http://localhost:9000/products')
      .then((response) => {
        dispatch(loadProducts(response.data));
      });
    }
  } 

  return (
    <div className={styles.appWrapper}>
      <Header />
      <ProductsFilters handleChange={handleChange} />
      <ProductsList ></ProductsList>
      <ShopingList></ShopingList>
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
