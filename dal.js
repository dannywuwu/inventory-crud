const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./items.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the items database.");
});

/* CREATE */
// create item in db from params
const createItem = (itemData) => {
  const { name, description, img, price, quantity } = itemData;
  // parameters for sql
  const params = ["name", "description", "img", "price", "quantity"];
  // placeholders are set as (?, ?, ..., ?)
  const placeholders = params.map(() => "?").join(",");
  const sql = `INSERT INTO items(${params.join(
    ", "
  )}) VALUES (${placeholders})`;

  // run sql insert
  db.run(sql, [name, description, img, price, quantity], (err) => {
    if (err) {
      console.log(`Error creating item ${itemID}, ${err.message}`);
      throw `Error in createItem for ${itemID} within sql insert`;
    }
  });
};

/* READ */
// returns async promise containing rows data
const selectAll = async () => {
  const sql = `SELECT * FROM items`;
  return new Promise((resolve, reject) => {
    // ensure data consistency with serialize
    db.serialize(() => {
      // get all rows from db
      db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  });
};

// retrieve row matching requested itemID as async promise
const selectItem = (itemID) => {
  const sql = `SELECT * FROM items WHERE item_id = ?`;
  return new Promise((resolve, reject) => {
    // get first row matching itemID from db
    db.get(sql, [itemID], (err, row) => {
      if (err) {
        return reject(err);
      }
      // if row exists, return info else return message
      return row ? resolve(row) : resolve(`No data found for item ${itemID}`);
    });
  });
};

/* UPDATE */
// update db item data - decoupled from img insert
const updateItem = (itemID, itemData) => {
  const { name, description, price, quantity } = itemData;
  params = ["name", "description", "price", "quantity"];
  const updateCols = params.map((param) => `${param} = ?`).join(",\n");
  // sql statement
  const sql = `UPDATE items
  SET ${updateCols}
    WHERE item_id = ?`;

  // run sql update
  db.run(sql, [name, description, price, quantity, itemID], (err) => {
    if (err) {
      console.log(`Error updating item ${itemID}, ${err.message}`);
      throw `Error in updateItem for ${itemID} within sql update`;
    }
  });
};

// update db item img
const updateImage = (itemID, imgURL) => {
  // sql statement
  const sql = `UPDATE items
  SET img = ?
  WHERE item_id = ?`;

  // run sql update
  db.run(sql, [imgURL, itemID], (err) => {
    if (err) {
      console.log(`Error updating item ${itemID}, ${err.message}`);
      throw `Error in updateImage for ${itemID} within sql update`;
    }
  });
};

/* DELETE */
// delete item matching itemID
const deleteItem = (itemID) => {
  // run sql delete statement
  db.run(`DELETE FROM items WHERE item_id=?`, itemID, (err) => {
    // does nothing if itemID does not exist
    if (err) {
      console.log(`Error deleting item ${itemID}, ${err.message}`);
      throw `Error in deleteItem for ${itemID} within sql delete`;
    }
  });
};

module.exports = {
  createItem,
  selectAll,
  selectItem,
  updateItem,
  updateImage,
  deleteItem,
};
