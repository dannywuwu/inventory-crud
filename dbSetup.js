const sqlite3 = require("sqlite3").verbose();

// open database in memory
let db = new sqlite3.Database("./items.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the items database.");
});

// create db
const create = `
    CREATE TABLE IF NOT EXISTS items (
        item_id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        img TEXT,
        price INTEGER,
        quantity INTEGER
    )
`;

// insert dummy item
const insert = `
    INSERT INTO items (name, description, img, price, quantity)
    VALUES ('Hand Soap', 'Keeps hands clean', 'img.png', '$2', 5)
`;

// select dummy val
const select = `
    SELECT * FROM items
`;

// run db code synchronously
db.serialize(() => {
  db.run(create)
    .run(insert)
    .all(select, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows);
    });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
