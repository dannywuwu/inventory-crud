import React from "react";
import Table from "../components/Table";
import ItemForm from "../components/ItemForm";

const Home = () => {
  return (
    <div>
      <Table />
      <h3>Create new item</h3>
      <ItemForm />
    </div>
  );
};

export default Home;
