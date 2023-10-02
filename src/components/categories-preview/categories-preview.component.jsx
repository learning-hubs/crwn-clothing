import { Fragment, useContext } from 'react';
import ProductCard from '../product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../category-preview/category-preview.component';
import SHOP_DATA from '../../shop-data';
import { getCategoriesAndDocumentsFromShopData } from '../../utils/firebase/firebase.utils';

const CategoriesPreview = () => {
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = getCategoriesAndDocumentsFromShopData();
    
    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products}/>
                )
            })}
        </Fragment>
    )
}

export default CategoriesPreview;