const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = 80;

// const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

// allow cors
// app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse url encoded info as well
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// serve static react files
app.use(express.static(process.cwd() + "/frontend/build/"));
// upload files
const upload = multer();

// helpers
const {
  createItem,
  selectAll,
  selectItem,
  updateItem,
  updateImage,
  deleteItem,
} = require("./dal.js");

const { uploadFileToBlob } = require("./azurehelpers.js");

// home
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/frontend/build/index.html");
});

// create new item
app.post("/create", upload.single("image"), async (req, res) => {
  const image = req.file;
  // body fields
  const { name, description, price, quantity } = req.body;
  let imgURL = "";
  if (image) {
    // upload image to azure and return the url to store
    imgURL = await uploadFileToBlob(image);
  }
  // insert body fields with img url into DB
  try {
    createItem({
      name,
      description,
      img: imgURL,
      price,
      quantity,
    });
  } catch (err) {
    // ERROR
    return res.status(500).send("error " + err);
  }
  // OK
  res.sendStatus(200);
});

app.post("/update-image/:item", upload.single("image"), async (req, res) => {
  const itemID = req.params.item;
  const image = req.file;
  if (!image) {
    return res.send("Empty image uploaded");
  }
  // upload to azure
  const imgURL = await uploadFileToBlob(image);
  // update item image in db
  try {
    updateImage(itemID, imgURL);
  } catch (err) {
    // ERROR
    return res.status(500).send("error " + err);
  }
  // OK
  res.status(200).send("Successfully Updated Image");
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
  console.log("body", req.body);
  const { itemID, name, description, price, quantity } = req.body;
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
    return res.status(500).send("error " + err);
  }
  // OK
  res.sendStatus(200);
});

// update image on azure
app.post("/update-image/:item", upload.single("image"), async (req, res) => {
  const itemID = req.params.item;
  const image = req.file;
  if (!image) {
    return res.send("Empty image uploaded, try again");
  }
  // upload to azure
  const imgURL = await uploadFileToBlob(image);
  // update item image in db
  try {
    updateImage(itemID, imgURL);
  } catch (err) {
    // ERROR
    return res.status(500).send("error " + err);
  }
  // OK
  res.status(200).send("Successfully Updated Image");
});

// update item
app.delete("/delete", (req, res) => {
  // item ID to delete
  const { itemID } = req.body;
  try {
    deleteItem(itemID);
  } catch (err) {
    // ERROR
    return res.status(500).send("error " + err);
  }
  // OK
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
