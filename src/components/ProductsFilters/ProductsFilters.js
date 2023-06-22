import React, { useEffect, useState } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { filterProducts, filterByIsFood, loadProducts} from "../../redux/productsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function ProductsFilters({handleChange}) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const filterProductsFunction = () => {
    dispatch(filterProducts(searchValue))
  }
  const [agreement, setAgreement] = useState(false);

  function handleInternalChange(event){
    const value = event.target.checked;
    setAgreement(value);
    if(value === true){
      dispatch(filterByIsFood(value))
    } else if (value === false){
      axios.get('http://localhost:9000/products')
      .then((response) => {
        dispatch(loadProducts(response.data));
      });
    }
  }  

  useEffect(() => {
    if(searchValue !== ''){
      filterProductsFunction();
    }
  }, [searchValue])
  return (
    <div className={styles.filtersHeaderWrapper}>
      <Typography variant="h4">Filtruj produkty: </Typography>
      <FormGroup>
        <div className={styles.filtersForm}>
          <FormControlLabel
            control={
              <TextField
                margin="dense"
                label="Nazwa"
                variant="outlined"
                onChange={(event) => setSearchValue(event.target.value)}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Tylko produkty spożywcze"
            type="checkbox"
            name="agreement"
            checked={agreement}
            onChange={handleInternalChange}
          />
        </div>
      </FormGroup>
    </div>
  );
}

export default ProductsFilters;
