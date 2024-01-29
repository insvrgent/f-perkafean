import React, { useState, useEffect } from 'react';
import './Fade.css'; // Assuming you have a CSS file for your styles

const Cart = ({ children, isOpen }) => {
  const [cartHeight, setCartHeight] = useState(0);
  const [started, start] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Set the height of the cart to match its content
      const cartContentHeight = document.getElementById('cart-content').scrollHeight;
      setCartHeight(cartContentHeight);
    }
    setTimeout(function () { //Start the timer
        start(true);
    }.bind(this), 1000)
  }, [isOpen]);

  return (
    <div style = {{visibility: started ? 'visible' : 'hidden'}} className={`cart ${isOpen ? 'fade-in-bottom' : 'fade-out-bottom'}`}>
      <div className="cart-content" id="cart-content" style={{ height: cartHeight }}>
        {children}
      </div>
    </div>
  );
};

export default Cart;
