import React, { Fragment, useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import Metadata from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProducts } from '../actions/productActions'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)


const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [brand, setBrand] = useState('')
    const [rating, setRating] = useState(0)

    const brands = [
        'Nike',
        'Puma',
        'Reebok',
        'Adidas',
        'Converse',
        'New Balance',
        'Vans'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword;
    
    useEffect(() => {   
        if(error) {
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage, price, brand, rating));

    }, [dispatch, alert, error,  keyword, currentPage, price, brand, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if(keyword) {
        count = filteredProductsCount;
    }

    return (
        <Fragment>
            {loading ? <Loader />: (
                <Fragment>
                    <Metadata title={'Buy Latest Sneakers Online'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                                <h4 className="mb-3 mb-5">
                                                    Price Range
                                                </h4>
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Brands
                                                </h4>

                                                <ul className="pl-0">
                                                    {brands.map(brand =>(
                                                        <li
                                                            style={{cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={brand}
                                                        onClick={() => setBrand(brand)}
                                                        >
                                                            {brand}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className="my-3" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star =>(
                                                        <li
                                                            style={{cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={star}
                                                        onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        
                                        {products && products.map(product => (
                                        <Product key={product._id} product={product} col={5}/>
                                        ))}
                                       
                                    </div>
                                </Fragment>
                            ) : (
                                products && products.map(product => (
                                <Product key={product._id} product={product} col={4} />
                            ))
                            )}
                        </div>
                    </section>
                    
                    {resPerPage < count && (
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
