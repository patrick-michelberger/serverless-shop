import React, {Component} from "react";
import config from "../../config";

import Product from "../Product";

import "./ProductList.css";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() { // Token returned from Stripe
    const res = await fetch(config.stripe.productsUrl, { // Backend API url
      method: 'GET'
    });
    const response = await res.json();
    const products = response.data;

    this.setState({
      products
    });
  }

  render() {
    const {products} = this.state;

    const productList = products.map((product, index) => {
      return (
          <Product id={product.id}
                   name={product.name}
                   caption={product.caption}
                   description={product.description}
                   skus={product.skus.data}
                   images={product.images} />
      );
    });

    return (
        <div id="products">
          {productList}
        </div>
    );
  }
}

export default ProductList;
