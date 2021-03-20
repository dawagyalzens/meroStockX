import React, { Fragment, useEffect } from 'react'

import Metadata from './layouts/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'

const Home = () => {

    const disptach = useDispatch();
    
    useEffect(() => {
        disptach(getProducts());
    }, [disptach])

    return (
        <Fragment>
            <Metadata title={'Buy Latest Sneakers Online'} />
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                        <img
                            className="card-img-top mx-auto"
                            src="https://images.stockx.com/images/Nike-Dunk-High-Syracuse-2021.png?fit=clip&bg=FFFFFF&h=500&auto=compress&q=90&dpr=2&trim=color&updated_at=1610190459&fm=webp&ixlib=react-9.0.3&w=1246"
                        />
                        <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <a href="">Nike Dunk High Syracuse</a>
                        </h5>
                        <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <span id="no_of_reviews">(5 Reviews)</span>
                        </div>
                        <p className="card-text">$145.67</p>
                            <a href="#" id="view_btn" className="btn btn-block">View Details</a>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Home
