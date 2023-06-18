import React, { useState } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { filterProducts} from "../../redux/productsSlice";
import { useDispatch } from "react-redux";

function ProductsFilters({handleChange}) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const filterProductsFunction = () => {
    dispatch(filterProducts(searchValue))
  }
  filterProductsFunction();

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
            onChange={handleChange}
          />
        </div>
      </FormGroup>
    </div>
  );
}

export default ProductsFilters;
