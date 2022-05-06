import DBConnection from "../db/connection.js"
import fs from "fs/promises"

const { tables } = JSON.parse(
  await fs.readFile("./migration/migrations.json", "utf-8")
);

async function query(query, values=[]) {
  return new Promise((resolve, reject)=>{
    DBConnection.query(query, values, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

(async () => {
  console.log("\x1b[33m%s\x1b[0m", "npm run migrate help - help for commands");

  if (process.argv.includes("help")) {
    console.log("npm run migrate fresh - drop every table");
    console.log("npm run migrate seed - seed tables");
    return;
  };

  DBConnection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to database ${DBConnection.config.database}`);
  });

  // Dropping
  if (process.argv.includes("fresh")) {
    await query("SET FOREIGN_KEY_CHECKS = 0");

    for await (const t of tables) {
      const res = await query(`DROP TABLE IF EXISTS ${t.name}`);

      if (res.warningCount) continue;

      console.log(`Dropped table ${t.name}`);
    };
  }

  // Creating
  for await (const t of tables) {
    // foreign = { key, table, row }
    const primary = `${t.primary_key} int PRIMARY KEY NOT NULL AUTO_INCREMENT`;
    const keys = t.foreign_keys.map((f, i) => {
      return `KEY ${t.name}_FK_${i} (${f.key})`;
    });
    const constraints = t.foreign_keys.map((f, i) => {
      return `CONSTRAINT ${t.name}_FK_${i} FOREIGN KEY (${f.key}) ` +
      `REFERENCES ${f.table} (${f.row})`;
    });
    const foreigns = t.foreign_keys.length ?
      `, ${keys.join(", ")}, ${constraints.join(", ")}` : "";
    const rows = t.rows.map((r) => `${r.name} ${r.type} ${r.attributes}`);
    const row = `${primary}, ${rows.join(", ")}${foreigns}`;
    const que = `CREATE TABLE IF NOT EXISTS ${t.name} (${row})`;
    const res = await query(que);

    if (!res.warningCount) console.log(`Created table ${t.name}`);
  };

  // Seeding
  if (process.argv.includes("seed")) {
    for await (const t of tables) {
      if (!t.values.length) continue;

      const rows = t.rows.map((r) => r.name);
      const values = t.values.map((v) => v.join(", "));
      const que = `INSERT INTO ${t.name} (${rows}) VALUES (?)`;
      const res = await query(que, t.values);

      console.log(`Successfully seed ${t.name}`);
    };
  }

  return process.exit();
})();
