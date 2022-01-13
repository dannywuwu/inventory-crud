const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors");
app.use(cors());

// helpers
const {
  createItem,
  selectAll,
  selectItem,
  updateItem,
  deleteItem,
} = require("./dal.js");

// home
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// create new item
app.post("/create", (req, res) => {
  const body = req.body;
  // body fields

  // upload image to azure and return the url to store
  // insert body fields with img url into DB
});

// list all items or single item from db
app.get("/list/:item?", async (req, res) => {
  const itemID = req.params.item;
  const body = req.body;
  // body fields

  // if itemID is specified, return only data for specific ID
  if (itemID) {
    const item = await selectItem(itemID);
    return res.json({
      data: item,
    });
  } else {
    // otherwise return json array response containing all data
    const allItems = await selectAll();
    return res.json({
      data: allItems,
    });
  }
});

// update item
app.put("/update", (req, res) => {
  const body = req.body;
  // body fields

  // upload image to azure and return the url to store
  // insert body fields with img url into DB
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
