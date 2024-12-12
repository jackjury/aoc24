const { table } = require("console");

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

  data = data.map((line) => line.split(""));
  console.table(data);
  let aLocs = findA(data);
  console.log(aLocs);

  aLocs.forEach((coord) => {
    findMas(coord, data);
  });
  console.log(totalWins);
}
let totalWins = 0;

// run(inputs.test);
run(inputs.puzzle);

function findA(matrix) {
  let aLocs = [];
  // find an A
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const element = matrix[i][j];
      if (element == "A") {
        aLocs.push([i, j]);
      }
    }
  }
  return aLocs;
}

function findMas(cords, matrix) {
  // cords = [i, j]
  // is next M
  let [i, j] = cords;
  console.log("Now looking at: ", i, " + ", j);

  // is there enough space?

  if (matrix[i - 1] && matrix[i + 1] && matrix[i][j - 1] && matrix[i][j + 1]) {
    console.log("can exist!");
    let topLeft = matrix[i - 1][j - 1];
    let botLeft = matrix[i + 1][j - 1];
    let topRight = matrix[i - 1][j + 1];
    let botRight = matrix[i + 1][j + 1];

    let pair1 = [topLeft, "A", botRight].sort().join("");
    let pair2 = [botLeft, "A", topRight].sort().join("");
    console.log(pair1, pair2);
    if (pair1 === "AMS" && pair2 === "AMS") {
      console.log("WINNER");
      totalWins++;
    }

    // let pair3 = [topLeft, "A", botRight, botLeft, "A", topRight].join("");
  }
}

// Helper Functions

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

function sumArr(arr) {
  return arr.reduce((acc, current) => acc + current);
}
