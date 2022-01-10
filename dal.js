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
  const { name, desc, img, price, quantity } = itemData;
  // parameters for sql
  const params = ["name", "description", "img", "price", "quantity"];
  // placeholders are set as (?, ?, ..., ?)
  const placeholders = params.map(() => "?").join(",");
  const sql = `INSERT INTO items(${params.join(
    ", "
  )}) VALUES (${placeholders})`;

  // run sql insert
  db.run(sql, [name, desc, img, price, quantity], (err) => {
    if (err) {
      return console.log(err.message);
    }
  });
};

/* READ */
// calls callback on all returned rows
const selectAll = (callback) => {
  const sql = `SELECT * FROM items`;
  // ensure data consistency with serialize
  db.serialize(() => {
    // get all rows from db
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }

      return callback(rows);
    });
  });
};

// retrieve row matching requested itemID
const selectItem = (itemID, callback) => {
  const sql = `SELECT * FROM items WHERE item_id = ?`;
  // get first row matching itemID from db
  db.get(sql, [itemID], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    // if row exists, return info else return message
    return row
      ? callback({
          data: row,
        })
      : callback({
          data: `No data found for item ${itemID}`,
        });
  });
};

/* UPDATE */
// update db item data - decoupled from img insert
const updateItem = (itemID, itemData) => {
  const { name, description, img, price, quantity } = itemData;
  // parameters for sql
  const params = ["name", "description", "img", "price", "quantity"];
  const updateCols = params.map((param) => `${param} = ?`).join(",\n");
  // sql statement
  const sql = `UPDATE items
  SET ${updateCols}
  WHERE item_id = ?`;

  // run sql insert
  db.run(sql, [name, description, img, price, quantity, itemID], (err) => {
    if (err) {
      return console.log(err.message);
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
      return console.error(err.message);
    }
    selectAll(console.log);
  });
};

module.exports = {
  selectAll,
  selectItem,
  createItem,
  deleteItem,
};
