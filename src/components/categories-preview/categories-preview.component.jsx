import { Fragment, useContext } from 'react';
import ProductCard from '../product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../category-preview/category-preview.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import { useSelector } from 'react-redux';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    
    // const {categoriesMap} = useContext(CategoriesContext);
    // method for calling from file/ hardcoded data
    // const categoriesMap = getCategoriesAndDocumentsFromShopData();
    
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