import { useState } from "react";
import "./App.css";

function App() {
  const initialProducts = [
    { name: "Wood", cost: 1200, count: 0, showButtons: false },
    { name: "Metal", cost: 1800, count: 0, showButtons: false },
    { name: "Plastic", cost: 1300, count: 0, showButtons: false },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);

  function increase(index) {
    const updatedProducts = [...products];
    updatedProducts[index].count += 1;
    setProducts(updatedProducts);
  }

  function decrease(index) {
    const updatedProducts = [...products];
    if (updatedProducts[index].count >= 2) {
      updatedProducts[index].count -= 1;
    } else {
      updatedProducts[index].showButtons = false;
      updatedProducts[index].count = 0; // Reset count to 0 when clearing
    }
    setProducts(updatedProducts);
  }

  function addToCart(index) {
    const updatedProducts = [...products];
    updatedProducts[index].showButtons = true;
    updatedProducts[index].count = 1;
    setProducts(updatedProducts);

    // Add the index of the product to the cartItems state
    setCartItems([...cartItems, index]);
  }

  function totalCost(index) {
    return products[index].count * products[index].cost; // Use products array, not cartItems
  }

  function clear(index) {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);

    // Update the products array to clear the corresponding product
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const productIndex = cartItems[index];
      updatedProducts[productIndex].showButtons = false;
      updatedProducts[productIndex].count = 0;
      return updatedProducts;
    });
  }

  return (
    <div className="App">
      <div className="display-item">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <h2>{product.name}</h2>
            <h1>{product.cost}</h1>
            {!product.showButtons ? (
              <button onClick={() => addToCart(index)}>Add to cart</button>
            ) : (
              <div>
                <button onClick={() => decrease(index)}>-</button>
                {product.count}
                <button onClick={() => increase(index)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="cart">
        {!cartItems.length ? null : (
          <div className="cart-display">
            {cartItems.map((cartItemIndex, index) => (
              <div className="cart-item" key={index}>
                <h2>
                  {products[cartItemIndex].name} : {products[cartItemIndex].count}
                </h2>
                <h1>{totalCost(cartItemIndex)}</h1>
                <button onClick={() => clear(index)}>Clear</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
