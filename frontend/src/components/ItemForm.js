import { React, useState } from "react";
import ENV from "../config";
const API_HOST = ENV.api_host;

const ItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const handleInput = (e, setter) => {
    setter(e.target.value);
  };

  const handleFileInput = (event) => {
    // capture file into state
    setImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // POST to backend
      const body = {
        name,
        description,
        image,
        price,
        quantity,
      };
      const formData = new FormData();

      for (const field in body) {
        formData.append(field, body[field]);
      }
      fetch(`${API_HOST}/create`, {
        method: "POST",
        body: formData,
      }).then(() => {
        // refresh item list on finish
        window.location.replace(`${API_HOSt}`);
      });
    } catch (e) {
      console.log("Failed to submit", e);
    }
  };

  // create new item input form
  return (
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
      <label>
        Upload Image:
        <input type="file" name="image" onChange={(e) => handleFileInput(e)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ItemForm;
