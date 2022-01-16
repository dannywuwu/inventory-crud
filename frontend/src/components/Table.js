import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Table = () => {
  const [items, setItems] = useState([]);

  // fetch items from backend
  const getItems = () => {
    return fetch("http://localhost:8080/list").then((data) => data.json());
  };

  // run getItems
  useEffect(() => {
    getItems().then((res) => {
      const { data } = res;
      setItems(data);
    });
  }, []);

  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price ($)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const { item_id, name, description, img, price, quantity } = item;
            return (
              <tr key={item_id}>
                <td>{item_id}</td>
                <td>
                  <Link to={`/item/${item_id}`}>{name}</Link>
                </td>
                <td>{description}</td>
                <td>
                  <img src={img} alt={`${name} thumbnail`} />
                </td>
                <td>{price}</td>
                <td>{quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
