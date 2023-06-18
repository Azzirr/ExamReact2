import React from 'react';
import commonColumnsStyles from '../../common/styles/Columns.module.scss';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';

const ProductDetails = () => {
  const navigate = useNavigate();
  const matchProduct = useSelector((state) => state.products.detailsSelectedProduct);

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <p>Product Details</p>
        <span>Nazwa: {matchProduct.name}</span>
        <span>Kategoria: {matchProduct.category}</span>
        <span>Jedzenie: {matchProduct.isFood.toString()}</span>
        ...
      </header>
    </div>
  );
};

export default ProductDetails;