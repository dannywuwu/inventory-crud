import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import ENV from "../config";
const API_HOST = ENV.api_host;

const ItemView = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleInput = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // POST to backend
      const body = {
        itemID: id,
        name: name ? name : null,
        description: description ? description : null,
        price: price ? price : null,
        quantity: quantity ? quantity : null,
      };
      fetch(`${API_HOST}/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(() => {
        // refresh item list on finish
        window.location.reload();
      });
    } catch (e) {
      console.log("Failed to submit", e);
    }
  };

  // fetch item from backend
  const getItem = () => {
    return fetch(`${API_HOST}/list/${id}`).then((data) => data.json());
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
        <img src={img} alt={`${name} thumbnail`} />
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
      {/* update item form */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => handleInput(e, setName)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => handleInput(e, setDescription)}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => handleInput(e, setPrice)}
          />
        </label>
        <label>
          Quantity:
          <input
            type="text"
            value={quantity}
            onChange={(e) => handleInput(e, setQuantity)}
          />
        </label>
        <input type="submit" value="Update Item" />
      </form>
      <ImageUpload itemID={id} />
    </div>
  );
};

export default ItemView;
