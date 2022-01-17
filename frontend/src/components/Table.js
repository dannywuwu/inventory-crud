import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ENV from "../config";
const API_HOST = ENV.api_host;

const Table = () => {
  const [items, setItems] = useState([]);

  // fetch items from backend
  const getItems = () => {
    return fetch(`${API_HOST}/list`).then((data) => data.json());
  };

  const handleDelete = (itemID) => {
    const body = {
      itemID,
    };
    fetch(`${API_HOST}/delete`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      // refresh item list on finish
      window.location.reload();
    });
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
                <td>
                  <button onClick={() => handleDelete(item_id)}>
                    Delete Item
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
