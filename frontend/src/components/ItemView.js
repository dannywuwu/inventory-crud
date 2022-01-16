import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";

const ItemView = () => {
  const itemID = useParams();
  const [item, setItem] = useState([]);

  // fetch item from backend
  const getItem = () => {
    return fetch(`http://localhost:8080/list/${itemID.id}`).then((data) =>
      data.json()
    );
  };

  // run getItem
  useEffect(() => {
    getItem().then((res) => {
      const { data } = res;
      setItem(data);
    });
  }, []);

  const renderItem = () => {
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
  };

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
        <tbody>{renderItem()}</tbody>
      </table>
      <ImageUpload itemID={item.item_id} />
    </div>
  );
};

export default ItemView;
