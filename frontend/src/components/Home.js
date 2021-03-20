import React, { Fragment, useEffect } from 'react'

import Metadata from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProducts } from '../actions/productActions'


const Home = () => {

    const alert = useAlert();
    const disptach = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products)
    
    useEffect(() => {
        
        if(error) {
            alert.success('Success');
            alert.error(error);
        }

        disptach(getProducts());

    }, [disptach, alert, error])

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
                </Fragment>
            )}

        </Fragment>
    )
}

export default Home
