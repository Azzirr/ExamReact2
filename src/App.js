import Header from "./components/Header/Header";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import styles from "./App.module.scss";
import { Navigate } from "react-router-dom";
import ProductsList from "./components/ProductsList/ProductsList";
import ShopingList from "./components/ShopingList/ShopingList";
// import { Outlet } from "react-router-dom";
// import ProductsList from "./components/ProductsList/ProductsList";
// import shoppingList from "./components/shoppingList/shoppingList";

function App(props) {
  const userExist = localStorage.getItem("user");
  if (!userExist) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.appWrapper}>
      <Header />
      <ProductsFilters />
      <div>
        <ProductsList></ProductsList>
        <ShopingList></ShopingList>
      </div>
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
