import { React, useState } from "react";

const ItemForm = () => {
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
        name,
        description,
        price,
        quantity,
      };
      fetch("http://localhost:8080/create", {
        method: "POST",
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
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ItemForm;
