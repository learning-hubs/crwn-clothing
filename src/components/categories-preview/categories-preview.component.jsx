import { Fragment, useContext } from 'react';
import ProductCard from '../product-card/product-card.component';
import CategoryPreview from '../category-preview/category-preview.component';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/spinner.component';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    // const {categoriesMap} = useContext(CategoriesContext);
    // method for calling from file/ hardcoded data
    // const categoriesMap = getCategoriesAndDocumentsFromShopData();
    
    return (
        <Fragment>
            {isLoading ? <Spinner/> : 
                Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products}/>
                )
            })
            }
        </Fragment>
    )
}

export default CategoriesPreview;