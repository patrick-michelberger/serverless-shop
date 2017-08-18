import React, {Component} from "react";
import config from "../../config";

import "./PayButton.css";

class PayButton extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.onToken = this.onToken.bind(this);

    this.state = {
      shippingInfo: false,
      addedToBasket: false,
      alreadyOrdered: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.handler = window.StripeCheckout.configure({
      key: config.stripe.apiKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function (token) {
        self.onToken(token);
      }
    });
  }

  async onToken(token) { // Token returned from Stripe

    const {sku} = this.props;
    const {firstName, lastName, street, streetNumber, zipcode, city} = this.state;

    const res = await fetch(config.stripe.checkoutUrl, { // Backend API url
      method: 'POST',
      body: JSON.stringify({
        token,
        order: {
          currency: config.stripe.currency,
          items: [
            {
              type: 'sku',
              parent: sku.id
            }
          ],
          shipping: {
            name: firstName + " " + lastName,
            address: {
              line1: street + " " + streetNumber,
              city: city,
              postal_code: zipcode
            }
          }
        }
      }),
    });
    const data = await res.json();
    console.log('onToken'); // Logs for ease of debugging
    console.log(data);

    this.setState({
      alreadyOrdered: true
    });
  }

  openStripe(ev) {
    ev.preventDefault();

    const {amount, name, caption} = this.props;

    this.handler.open({
      name: "bwc clothing",
      description: caption,
      zipCode: true,
      currency: 'eur',
      amount: amount,
      image: 'http://www.bwc-consulting.com/image/logo%20black.jpg',
      closed: () => {
        console.log("popup closed");
      }
    });

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  isValid() {
    const {firstName, lastName, street, streetNumber, zipcode, city} = this.state;

    if (!firstName || !lastName || !street || !streetNumber || !zipcode
        || !city) {
      return false;
    }
    return true;
  }

  render() {
    const {shippingInfo, addedToBasket, alreadyOrdered} = this.state;


    console.log("document.body.scrollHeight: ", document.body.scrollHeight);

    return (

        <div>
          {alreadyOrdered ?
                <button className="btn btn-success btn-block paybutton-success-message" onClick={() => this.setState({alreadyOrdered: false})}>Vielen Dank für Deine
                  Bestellung!</button>
              :
              <div>
                {addedToBasket ? null : <button
                        onClick={() => {this.setState({addedToBasket: true}); setTimeout(() => window.scrollTo(0,document.body.scrollHeight+420), 300); }}
                        className="btn btn-primary btn-block paybutton-add-to-basket">In den
                      Warenkorb</button>}
                {shippingInfo || !addedToBasket ? null :
                    <form onSubmit={(ev) => this.openStripe(ev)}>
                      <p>Deine Lieferadresse</p>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <input type="text" className="form-control"
                                 id="inputFirstName" placeholder="Vorname"
                                 name="firstName"
                                 onChange={this.handleInputChange}
                                 onBlur={this.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-6">
                          <input type="text" className="form-control"
                                 id="inputLastName" placeholder="Nachname"
                                 name="lastName"
                                 onChange={this.handleInputChange}
                                 onBlur={this.handleInputChange}/>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-8">
                          <input type="text" className="form-control"
                                 id="inputStreet"
                                 placeholder="Strasse" name="street"
                                 onChange={this.handleInputChange}
                                 onBlur={this.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-4">
                          <input type="text" className="form-control"
                                 id="inputStreetNumber" placeholder="Nr."
                                 name="streetNumber"
                                 onChange={this.handleInputChange}
                                 onBlur={this.handleInputChange}/>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <input type="text" className="form-control"
                                 id="inputZip"
                                 placeholder="PLZ" name="zipcode"
                                 onChange={this.handleInputChange}
                                 onBlur={this.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-8">
                          <input type="text" className="form-control"
                                 id="inputCity"
                                 placeholder="Stadt" name="city"
                                 onChange={this.handleInputChange}
                                 onBlur={this.handleInputChange}/>
                        </div>
                      </div>
                      <button disabled={!this.isValid()}
                              className="btn btn-primary btn-block paybutton-pay"
                              type="submit">
                        Bezahlen
                      </button>
                    </form>
                }
              </div>
          }
        </div>
    );
  }
}

export default PayButton;
