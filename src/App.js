import { useState } from "react";
import "./App.css";

function App() {
  const initialProducts = [
    { name: "Wood", cost: 1200, count: 0, showButtons: false },
    { name: "Metal", cost: 1800, count: 0, showButtons: false },
    { name: "Plastic", cost: 1300, count: 0, showButtons: false },
  ];

  const [products, setProducts] = useState(initialProducts);

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
    }
    setProducts(updatedProducts);
  }

  function addToCart(index) {
    const updatedProducts = [...products];
    updatedProducts[index].showButtons = true;
    updatedProducts[index].count = 1;
    setProducts(updatedProducts);
  }

  
  // function totalCost(index) {
  //   return products[index].count * products[index].cost;
  // }

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
                <button onClick={decrease.bind(null, index)}>-</button>
                {product.count}
                <button onClick={increase.bind(null, index)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="cart"></div>
    </div>
  );
}

export default App;
