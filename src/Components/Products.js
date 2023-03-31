import React, { useState, useEffect } from "react";

function Products() {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter((item) => item._id !== product._id));
  };

  async function getData() {
    const url = "http://3.7.252.58:4001/product/getAllProduct";
    const response = await fetch(url, {
      method: "POST",
    });
    const jsonData = await response.json();
    setData(jsonData);
  }

  return (
    <div>
      <b>Products Listing</b>
      {data ? (
        <>
          {data.map((product) => (
            <>
              <div className="row product">
                <div className="col-md-2">
                  <img src={product.imageUrl} alt={product.name} height="150" />
                </div>
                <div className="col-md-2 product-price">
                  Rs. {product.price}
                </div>
              </div>
              {product.name}
              <br />
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </>
          ))}
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.name} - {product.price} &nbsp;
                <button onClick={() => handleRemoveFromCart(product)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default Products;
