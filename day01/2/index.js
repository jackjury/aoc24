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
  let simularity = [];
  leftCol.forEach((number) => {
    let matches = getNumberOfMatches(number, rightCol);
    console.log("matches are: ", matches);
    simularity.push(matches * number);
  });
  let answer = sumArr(simularity);
  console.log(answer);
}

function getNumberOfMatches(target, arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element == target) {
      console.log("its a match");
      total++;
    }
  }
  return total;
}

// run(inputs.test);
run(inputs.puzzle);

// Helper Functions

function sumArr(arr) {
  return arr.reduce((acc, current) => acc + current);
}
