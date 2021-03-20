import React, { Fragment,useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';

import Metadata from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProducts } from '../actions/productActions'


const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    const keyword = match.params.keyword
    
    useEffect(() => {
        
        if(error) {
            alert.success('Success');
            alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage));

    }, [dispatch, alert, error,keyword, currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            {loading ? <Loader />: (
                <Fragment>
                    <Metadata title={'Buy Latest Sneakers Online'} />
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products && products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </section>
                    
                    {resPerPage < productsCount && (
                                        <div className="d-flex justify-content-center mt-5">
                                        <ReactPaginate
                                            activePage={currentPage}
                                            itemsCountPerPage={resPerPage}
                                            totalItemsCount={productsCount}
                                            onChange={setCurrentPageNo}
                                            nextPageText={'Next'}
                                            nextPageText={'Next'}
                                            firstPageText={'First'}
                                            lastPageText={'Last'}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            />
                                    </div>
                    )}
                </Fragment>
            )}

        </Fragment>
    )
}

export default Home
