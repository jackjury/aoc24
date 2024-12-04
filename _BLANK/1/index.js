const fs = require("fs").promises;
let inputs = {
  test: "./test.txt",
  puzzle: "./input.txt",
};

async function importTxt(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    let lines = data.split("\n");
    return lines;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function run(file) {
  let data = await importTxt(file);
  console.log(data);
}
run(inputs.test);
// run(inputs.puzzle);

// Helper Functions

function sumArr(arr) {
  return arr.reduce((acc, current) => acc + current);
}
