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
  let leftCol = [];
  let rightCol = [];
  data.forEach((line) => {
    line = line.split("  ");
    leftCol.push(parseInt(line[0]));
    rightCol.push(parseInt(line[1]));
  });
  leftCol = leftCol.sort((a, b) => a - b);
  rightCol = rightCol.sort((a, b) => a - b);
  let pairs = [];
  for (let i = 0; i < leftCol.length; i++) {
    let output = [leftCol[i], rightCol[i]];
    pairs.push(output);
  }
  let distances = [];
  pairs.forEach((pair) => {
    // order pairs
    pair = pair.sort((a, b) => a - b);
    // Find the distance
    let distance = pair[1] - pair[0];
    distances.push(distance);
  });
  let answer = sumArr(distances);
  console.log(answer);
}
run(inputs.puzzle);
// run(inputs.puzzle);

// Helper Functions

function sumArr(arr) {
  return arr.reduce((acc, current) => acc + current);
}
