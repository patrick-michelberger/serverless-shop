import React, {Component} from "react";
import "./Product.css";
import PayButton from "../PayButton";

class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentImage: 0,
      currentSku: props.skus[0]
    };
  }

  render() {
    const {id, name, caption, images, description, skus} = this.props;
    const {currentImage, currentSku} = this.state;

    const thumbnails = images.map((image, index) => {
      return <img key={index}
                  className={"product-thumbnail " + (index === currentImage
                      ? 'selected' : '')}
                  onClick={() => this.setState({currentImage: index})}
                  src={image} width="75"/>
    });

    const skuList = skus.map((sku, index) => {

      const {attributes} = sku;

      return (
          <div key={sku.id}
               className={"col-xs-2 product-sku " + (currentSku.id === sku.id
                   ? 'selected' : '')}
               onClick={() => this.setState({currentSku: sku})}>
            {attributes.size}
          </div>
      );
    });

    const price = currentSku.price + "";
    const euros = price.substring(0, price.length - 2);
    const cents = price.slice(-2);

    return (
        <div key={id} className="product row">
          <div className="product-images col-xs-12 col-sm-6 col-lg-8">
            <div className="product-image-wrapper row">
              <div className="col-xs-12 col-lg-2 d-none d-lg-block d-xl-block">
                <div className="product-thumbnails">{thumbnails}</div>
              </div>
              <div className="col-xs-12 col-lg-10">
                <img className="product-image img-fluid"
                     src={images[currentImage]}/>
              </div>
            </div>
          </div>
          <div className="product-details col-xs-12 col-sm-6 col-lg-4">
            <h2 className="product-name">{name}</h2>
            <h1 className="product-caption">{caption}</h1>
            <div
                className="product-price">
              <div>{euros}.{cents} {currentSku.currency.toUpperCase()}</div>
              <div className="product-taxes">inkl MwSt.</div>
            </div>
            <p className="product-description">{description}</p>
            <hr/>
            <div className="product-sizes-list row">
              {skuList}
            </div>
            <hr/>
            <PayButton disabled={currentSku.inventory.quantity < 1}
                       amount={price} sku={currentSku} name={name}
                       caption={caption}/>
            {currentSku.attributes ?
                <div className="product-selected-size">
                  Größe: {currentSku.attributes.size} |
                  Lager: {currentSku.inventory.quantity} St.
                </div> : null}
          </div>
        </div>
    );
  }
}
;

export default Product;