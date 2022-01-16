const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

// allow cors
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse url encoded info as well
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// upload files
const upload = multer();

// helpers
const {
  createItem,
  selectAll,
  selectItem,
  updateItem,
  deleteItem,
} = require("./dal.js");

const { uploadFileToBlob } = require("./azurehelpers.js");

// home
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// create new item
app.post("/create", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log("file", req.file);
  // body fields
  const { name, description, image, price, quantity } = req.body;
  // upload image to azure and return the url to store
  // insert body fields with img url into DB
  try {
    createItem({
      name,
      description,
      image,
      price,
      quantity,
    });
  } catch (err) {
    // ERROR
    res.status(500);
    res.render("error", { error: err });
    return;
  }
  // OK
  res.sendStatus(200);
});

// upload image to azure
app.post("/upload-image", upload.single("image"), (req, res) => {
  const image = req.file;
  // upload to azure
  uploadFileToBlob(image);
  // OK
  res.status(200);
  res.send("Successfully Updated Image");
});

// list all items or single item from db
app.get("/list/:item?", async (req, res) => {
  const itemID = req.params.item;
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
  // body fields
  const { itemID, name, description, price, quantity } = req.body;
  // update img handled in another function
  // insert body fields with img url into DB
  try {
    updateItem(itemID, {
      name,
      description,
      price,
      quantity,
    });
  } catch (err) {
    // ERROR
    res.status(500);
    res.render("error", { error: err });
    return;
  }
  // OK
  res.sendStatus(200);
});

// update item
app.delete("/delete", (req, res) => {
  // item ID to delete
  const { itemID } = req.body;
  try {
    deleteItem(itemID);
  } catch (err) {
    // ERROR
    res.status(500);
    res.render("error", { error: err });
    return;
  }
  // OK
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
