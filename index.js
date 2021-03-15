const fs = require('fs')
const readline = require('readline');
const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123",
  port: "5432"
});
var a = 0;
var t = 0
function doStuff() {
  t++
  console.log("===========================");
  console.log(`PASSOU ${t} segundos!`);
  console.log("===========================");
}
async function processLineByLine() {
  const fileStream = fs.createReadStream('./jjsmith.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
    console: false
  });
  
  setInterval(doStuff, 1000);
  rl.on('line', function (line) {
    a++;
    pool.query(`insert into usuario (nome) values ('${line}')`)
    console.log(`${a}`);
  });
}

processLineByLine()