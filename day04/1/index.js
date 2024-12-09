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
  let totalChristmasnuss = 0;
  // find forwards + backwards
  let fwdsRegEx = new RegExp("XMAS", "g");
  let bwksRegEx = new RegExp("SAMX", "g");
  data.forEach((line) => {
    // Find Fowards
    let forwards = line.match(fwdsRegEx);
    if (forwards) {
      totalChristmasnuss = totalChristmasnuss + forwards.length;
    }
    // Find Backwards
    let backwards = line.match(bwksRegEx);
    console.log(backwards);

    if (backwards) {
      totalChristmasnuss = totalChristmasnuss + backwards.length;
    }
  });
  data = data.map((line) => line.split(""));
  console.table(data);
  console.log(totalChristmasnuss);

  //iterate over each line

  // when we find an 'x'

  //Forward
}
run(inputs.test);
// run(inputs.puzzle);

// Helper Functions

function sumArr(arr) {
  return arr.reduce((acc, current) => acc + current);
}
