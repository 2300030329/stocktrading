import { useState, useEffect } from "react";
import "./Portfolio.css";

const Portfolio = ({ updatePortfolio }) => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const storedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    setPortfolio(storedPortfolio);
  }, []);

  const sellStock = (id) => {
    let quantity = prompt("Enter quantity to sell:");
    quantity = parseInt(quantity);

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity!");
      return;
    }

    let updatedPortfolio = portfolio.map((stock) => {
      if (stock.id === id) {
        if (stock.count < quantity) {
          alert("Not enough stocks to sell!");
          return stock;
        }
        stock.count -= quantity;
        if (stock.count === 0) return null; // Remove if count is zero
      }
      return stock;
    }).filter(Boolean); // Remove null entries

    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    updatePortfolio(updatedPortfolio);
  };

  return (
    <div className="portfolio-container">
      <h2>Your Portfolio</h2>
      <div className="portfolio-list">
        {portfolio.length === 0 ? (
          <p>No stocks purchased yet.</p>
        ) : (
          portfolio.map((stock) => (
            <div key={stock.id} className="portfolio-card">
              <img
                src={stock.logo}
                alt={stock.name}
                className="stock-logo"
                onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
              />
              <p className="stock-name"><strong>{stock.name}</strong></p>
              <p className="stock-price">${stock.price}</p>
              <p className="stock-quantity">Qty: {stock.count}</p>
              <button className="sell-btn" onClick={() => sellStock(stock.id)}>Sell</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Portfolio;
