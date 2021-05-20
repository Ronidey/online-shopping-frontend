import React, { Component } from 'react';
// import React, { useState, useEffect} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import axios from 'axios';

import Page from '../Page';
import ProductSizes from './ProductSizes';
import SingleProductDesc from './SingleProductDesc';
import ProductImgGroup from './ProductImgGroup';
import MainHeader from '../MainHeader';
import Search from '../Search';
import Loader from '../Loader';
import './SingleProduct.css';
import ProductAction from './ProductAction';
import AppContext from '../../AppContext';

import { getProductById, addCartItem, deleteCartItem } from '../../requests';

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      product: null,
      size: '',
      redirect: ''
    };

    this.addItemToCart = this.addItemToCart.bind(this);
    this.paramId = this.props.match.params.id;
    this.handleBuyClick = this.handleBuyClick.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.changeSize = this.changeSize.bind(this);
  }

  async componentDidMount(props, state) {
    this.mounted = true;

    try {
      const res = await getProductById(this.paramId);

      if (this.mounted) {
        this.setState({
          product: res.data.product,
          size: this.inCart ? this.inCart.size : res.data.product.sizes[0],
          isLoading: false
        });
      }
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async addItemToCart() {
    this.mounted = true;

    // 1) Getting appState and appDispacth
    const { appState, appDispatch } = this.context;
    const errMsg = encodeURIComponent(
      'You are not logged in please login first!'
    );

    // 2) If NOT Logged-in Rediect to Login page
    if (!appState.isLoggedIn) {
      return this.setState({
        redirect: `/login?returnUrl=${this.props.location.pathname}&error=${errMsg}`
      });
    }

    // 4) Handling request
    addCartItem(this.state.product._id, this.state.size)
      .then((res) => {
        appDispatch({ type: 'updateCart', payload: res.data.cart });
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  deleteFromCart() {
    this.mounted = true;
    const { appDispatch } = this.context;

    deleteCartItem(this.state.product._id)
      .then((res) => {
        appDispatch({ type: 'updateCart', payload: res.data.cart });
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  handleBuyClick() {
    const { appState, appDispatch } = this.context;
    const errMsg = encodeURIComponent(
      'You are not logged in please login first!'
    );

    if (!appState.isLoggedIn) {
      return this.setState({
        redirect: `/login?returnUrl=${this.props.location.pathname}&error=${errMsg}`
      });
    }

    // this.inCart => current product in cart
    if (this.inCart) {
      return this.setState({
        redirect: '/my-cart'
      });
    }

    addCartItem(this.state.product._id, this.state.size)
      .then((res) => {
        appDispatch({ type: 'updateCart', payload: res.data.cart });
        this.setState({
          redirect: '/my-cart'
        });
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  changeSize(size) {
    const { appDispatch } = this.context;
    this.setState({ size });

    if (this.isInCart) {
      axios
        .patch(`/users/my-cart/${this.state.product._id}`, { size })
        .then((res) => {
          appDispatch({ type: 'updateCart', payload: res.data.cart });
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  }

  render() {
    const { isLoading, product, size, redirect } = this.state;

    // Here item.product is an ID and not Object
    this.inCart = this.context.appState.user.cart.find(
      (item) => item.product == this.paramId
    );

    if (isLoading) return <Loader />;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <Page title={product.title}>
        <Search />
        <MainHeader />
        <section className='product'>
          <div className='container product__container'>
            <div className='product__view'>
              {/* Product Images */}
              <ProductImgGroup product={product} />

              {/* Product Buy & Add To Cart controls */}
              <ProductAction
                addToCart={this.addItemToCart}
                deleteFromCart={this.deleteFromCart}
                handleBuyClick={this.handleBuyClick}
                isInCart={Boolean(this.inCart)}
              />
            </div>

            <div className='product__info'>
              <h2 className='product__info__title text-capitalize'>
                {product.title}
              </h2>

              {/* ------- RATINGS ------- */}
              <div className='product-ratings'>
                <span className='stars'>
                  {product.avgRating} <AiFillStar />
                </span>
                <span className='ratings-count'>
                  ({product.ratingsCount} ratings)
                </span>
              </div>

              {/* ------- PRICE --------- */}
              <div className='product-price'>
                <span className='price--cur'>
                  &#8377;{product.currentPrice}
                </span>
                <span className='price--del'>&#8377;{product.oldPrice}</span>
                <span className='offer'>{product.off}% off</span>
              </div>

              {/* ------------ OFFERS ------------ */}
              <div className='product-offers'>
                <h4>Available offers</h4>
                <p>
                  <b>5% off</b> on SBI cards
                </p>
                <p>
                  <b>flat 100 rupees discount</b> on Axis Bank cards
                </p>
              </div>

              {/* ----------- SIZES ---------- */}
              <ProductSizes
                sizes={product.sizes}
                selectedSize={size}
                changeSize={this.changeSize}
              />

              {/* ------------ DETAILS ----------- */}
              {<SingleProductDesc desc={product.description} />}
            </div>
          </div>
        </section>
      </Page>
    );
  }
}

SingleProduct.contextType = AppContext;

export default withRouter(SingleProduct);
