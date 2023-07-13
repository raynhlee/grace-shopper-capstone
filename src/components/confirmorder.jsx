import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

const ConfirmOrder = ({cartData, setCartData, cartSubtotal,  cartFinalPrice, cartTax }) => {
    const [input, setInput] = useState('')

    const handleCheckout = async (event) => {
    
        event.preventDefault();
    
        Promise.all(
          cartData.map((order) =>
            fetchFromAPI({
              path: `/orders/${order.id}`,
              method: "delete",
            })
          )
        );
        setCartData([]);
        swal(
          "Thank you for your order! Confirmation email will be arriving shortly."
        ).then(() => {
          history.push("/");
        });
      };
    
      
      return(
        <>
    <h1 id='cart-header'>Checkout</h1>
    <div id='confirm-order-enter-info'>
      <div id='confirm-order-payment-address'>
    <div id='cart-container'>
      <div id='confirm-order-main-div'>
        <div id='confirm-order-cart-info-div'>
        <h3 id='my-order'>Cart</h3>
        <p id='confirm-order-price-and-amount-items'>${cartFinalPrice} total • {cartData.length} item(s)</p>
        </div>
        <div id='checkout-cart-images'>
          {cartData &&
            cartData.map((item, index) => {
              return (
                <img key={index} src={item?.image} id='cart-item-image-confirm-order'/>
              );
            })}
        </div>
      </div>
      </div>
      <div id='payment-div'>
          <h3 id='my-order'>Payment</h3>
          <p id='cannot-enter-info'>*You cannot enter any information here as this is not a real business and we do not want your information.</p>
          <div id='payment-info-form'>
            <label htmlFor="card-info" id='enter-credit-or-debit'>Enter credit or debit card information</label>
            <p className="payment-input"> Card number</p>
            <p className="payment-input"> Exp MM/YY</p>
            <p className="payment-input"> Enter CVV</p>
            <p className="payment-input"> Name on card</p>
          </div>

          <h3 id='my-order'>Shipping address</h3>
          <p id='cannot-enter-info'>*You cannot enter any information here as this is not a real business and we do not want your information.</p>
          <form id='payment-info-form'>
            <div id='first-last-name-confirm-order'>
              <p id='first-name-confirm-payment'> First name</p>
              <p id='last-name-confirm-payment'> Last name</p>
            </div>
            <p className="payment-input"> Address line 1</p>
            <p className="payment-input"> Address line 2 (optional)</p>
            <p className="payment-input"> Zip code</p>
            <p className="payment-input"> City</p>
            <p className="payment-input"> State</p>
            <p className="payment-input"> Phone number</p>
         
          </form>
      </div>
      </div>
      <div id='order-summary-aside'>
        <h3 id='order-summary-aside-header'>Order summary</h3>
        <div id='order-summary-aside-subtotal-div'>
          {cartData.length > 1
            ? <p id='order-summary-aside-subtotal-label'>Subtotal ({cartData.length} items)</p>
            : <p id='order-summary-aside-subtotal-label'>Subtotal (1 item)</p>
          }
          <p id='order-summary-aside-subtotal'>${cartSubtotal}</p>
        </div>
        <div id='order-summary-aside-subtotal-div'>
          <p id='order-summary-aside-subtotal-label'>Regional fees</p>
          <p id='order-summary-aside-subtotal'>$1</p>
        </div>
        <div id='order-summary-aside-subtotal-div'>
          <p id='order-summary-aside-subtotal-label'>Estimated tax</p>
          <p id='order-summary-aside-subtotal'>${cartTax}</p>
        </div>
        <div id='order-summary-aside-total-div'>
          <p>Total</p>
          <p>${cartFinalPrice}</p>
        </div>
      <button onClick={() => {
        handleCheckout()
      }} id='check-out-button'>Place order</button>
      </div>
      </div>
      
      
    </>
      )
}

export default ConfirmOrder;