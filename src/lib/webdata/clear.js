import sqlite3 from "sqlite3";

const database = new (sqlite3.verbose()).Database('webdata.db', sqlite3.OPEN_READWRITE, (err) => {
    console.log(`[Database: user.log] Connect`);
    if (err) console.error(err);
})
database.run(`DELETE FROM webdata`)
database.close((err) => {
    console.log(`[Database: user.log] Close`);
    if (err) console.error(err.message);
});