import { React, useState, useEffect } from "react";

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
                <td>{name}</td>
                <td>{description}</td>
                <td>{img}</td>
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
