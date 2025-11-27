import { useState } from "react";
import "./Market.css";

const stockData = [
  { id: 1, name: "Apple", price: 150, logo: "https://logo.clearbit.com/apple.com" },
  { id: 2, name: "Google", price: 2800, logo: "https://logo.clearbit.com/google.com" },
  { id: 3, name: "Tesla", price: 900, logo: "https://logo.clearbit.com/tesla.com" },
  { id: 4, name: "Amazon", price: 3400, logo: "https://logo.clearbit.com/amazon.com" },
  { id: 5, name: "Microsoft", price: 310, logo: "https://logo.clearbit.com/microsoft.com" },
  { id: 6, name: "Netflix", price: 450, logo: "https://logo.clearbit.com/netflix.com" },
  { id: 7, name: "Meta", price: 400, logo: "https://logo.clearbit.com/meta.com" },
  { id: 8, name: "Nvidia", price: 700, logo: "https://logo.clearbit.com/nvidia.com" },
  { id: 9, name: "Intel", price: 280, logo: "https://logo.clearbit.com/intel.com" },
  { id: 10, name: "Samsung", price: 1200, logo: "https://logo.clearbit.com/samsung.com" },
  { id: 11, name: "IBM", price: 130, logo: "https://logo.clearbit.com/ibm.com" },
  { id: 12, name: "Sony", price: 150, logo: "https://logo.clearbit.com/sony.com" },
  { id: 13, name: "Adobe", price: 500, logo: "https://logo.clearbit.com/adobe.com" },
  { id: 14, name: "PayPal", price: 250, logo: "https://logo.clearbit.com/paypal.com" },
  { id: 15, name: "Uber", price: 80, logo: "https://logo.clearbit.com/uber.com" },
  { id: 16, name: "Airbnb", price: 145, logo: "https://logo.clearbit.com/airbnb.com" },
  { id: 17, name: "Twitter", price: 50, logo: "https://logo.clearbit.com/x.com" },
  { id: 18, name: "Facebook", price: 220, logo: "https://logo.clearbit.com/facebook.com" },
  { id: 19, name: "Snapchat", price: 70, logo: "https://logo.clearbit.com/snapchat.com" },
  { id: 20, name: "Spotify", price: 300, logo: "https://logo.clearbit.com/spotify.com" }
];

const Market = ({ updatePortfolio }) => {
  const [stocks] = useState(stockData);

  const buyStock = (stock) => {
    let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    let newStock = JSON.parse(JSON.stringify(stock));

    const existingStock = portfolio.find((item) => item.id === newStock.id);
    if (existingStock) {
      existingStock.count = (existingStock.count || 0) + 1;
    } else {
      newStock.count = 1;
      portfolio.push(newStock);
    }

    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    updatePortfolio(portfolio);
  };

  return (
    <div className="market-container">
      <h2>Stock Market</h2>
      <div className="stock-list">
        {stocks.map((stock) => (
          <div key={stock.id} className="stock-card">
            <img src={stock.logo} alt={stock.name} className="stock-logo" onError={(e) => e.target.src = "https://via.placeholder.com/50"} />
            <p className="stock-name">{stock.name}</p>
            <p className="stock-price">${stock.price}</p>
            <button className="buy-btn" onClick={() => buyStock(stock)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
