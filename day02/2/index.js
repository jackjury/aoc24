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
  let safe = 0;
  data.forEach((data) => {
    let report = data.split(" ").map((number) => parseInt(number));
    let errorscount = checkReport(report);

    if (errorscount === 0) {
      safe++;
    } else {
      console.log("report: ", report, " has ", errorscount, " errors!");
      let index = 0;
      while (index < report.length) {
        let removedReport = [...report];
        removedReport.splice(index, 1);
        let newErrors = checkReport(removedReport);
        if (newErrors === 0) {
          safe++;
          break;
        }
        index++;
      }
    }
  });
  console.log(safe);
}

function checkReport(report) {
  let errors = 0;
  console.log("Now looking at: ", report);
  let isAllOneWay = allOneWay([...report]);
  if (!isAllOneWay) {
    console.log(report, "is unsafe, is not one way");
    errors++;
  }
  for (let i = 0; i < report.length; i++) {
    if (i > 0) {
      let diff = report[i] - report[i - 1];
      diff = Math.abs(diff);
      if (diff > 0 && diff < 4) {
        // is safe
      } else {
        console.log(report, "is unsafe");
        errors++;
      }
    }
  }
  return errors;
}
function allOneWay(arr) {
  if (arr[0] > arr[1]) {
    while (arr.length > 1) {
      let num1 = arr.shift();
      if (num1 < arr[0]) {
        return false;
      }
    }
  }
  if (arr[0] < arr[1]) {
    while (arr.length > 1) {
      let num1 = arr.shift();
      if (num1 > arr[0]) {
        return false;
      }
    }
  }
  return true;
}

// run(inputs.test);
run(inputs.puzzle);

// Helper Functions

function sumArr(arr) {
  return arr.reduce((acc, current) => acc + current);
}
