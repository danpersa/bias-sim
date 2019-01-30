// Script
var biasLevel = 1;
const SPEED = 100;
const STEPS = 20;
var attritionRate = 15;
var data = [
  ["x", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7"],
  ["men", 50, 50, 50, 50, 50, 50, 50],
  ["women", 50, 50, 50, 50, 50, 50, 50]
];

var chart = bb.generate({
  data: {
    x: "x",
    columns: data,
    type: "bar",
    order: null,
    groups: [
      [
        "men",
        "women"
      ]
    ]
  },
  axis: {
    rotated: true,
    x: {
      type: "category"
    }
  },
  bindto: "#simulation"
});

function rand(max) {
  return Math.floor((Math.random() * max) + 1);
}

const MEN_INDEX = 1;
const WOMEN_INDEX = 2;

function simulatePerformanceReview(maxGrade) {
  return rand(maxGrade);
}

function simlateAttritionForLevel(level, rate, data) {
  // we assume that half of the people who leave are men hand half women
  const newData = data.slice();
  const halfAttrition = Math.floor(rate / 2);
  newData[MEN_INDEX][level] = newData[MEN_INDEX][level] - halfAttrition;
  newData[WOMEN_INDEX][level] = newData[WOMEN_INDEX][level] - halfAttrition;
  return newData;
}

// most performant first
function sortByPerformance(people) {
  people.sort(function(a, b){
    return b.performance - a.performance;
  });
}

function employeeHasGender(gender) {
  return function(employee) {
    return employee.gender === gender;
  }
}

function simulateFillInFromPreviousLevel(level, data, numberOfPositions) {

    // generate an array containing the number of people and their performance reviews
    const employees = [];
    for (var i = 0; i < data[MEN_INDEX][level + 1]; i++) {
      employees.push({gender: 'M', performance: simulatePerformanceReview(100 + biasLevel)})
    }
    for (var i = 0; i < data[WOMEN_INDEX][level + 1]; i++) {
      employees.push({gender: 'F', performance: simulatePerformanceReview(100)})
    }

    sortByPerformance(employees);

    const promotedEmployees = employees.slice(0, numberOfPositions);
    const numberOfMenToPromote = promotedEmployees.filter(employeeHasGender("M")).length;
    const numberOfWomenToPromote = promotedEmployees.filter(employeeHasGender("F")).length;
    console.log("Number of men to promote: ", numberOfMenToPromote);
    console.log("Number of women to promote: ", numberOfWomenToPromote);
    const newData = data.slice();
    newData[MEN_INDEX][level] = newData[MEN_INDEX][level] + numberOfMenToPromote;
    newData[WOMEN_INDEX][level] = newData[WOMEN_INDEX][level] + numberOfWomenToPromote;

    newData[MEN_INDEX][level + 1] = newData[MEN_INDEX][level + 1] - numberOfMenToPromote;
    newData[WOMEN_INDEX][level + 1] = newData[WOMEN_INDEX][level + 1] - numberOfWomenToPromote;
    return newData;
}

var currentTime = 1000;

function simulateLevel(level) {
  if (level == 1) {
    setTimeout(function() {
      data = simlateAttritionForLevel(level, attritionRate, data);
      chart.load({
        columns: data
      });
    }, currentTime);
  }

  currentTime += SPEED;
  setTimeout(function() {
    data = simlateAttritionForLevel(level, Math.floor(attritionRate), data);

    const numberOfPositions = 100 - (data[MEN_INDEX][level] + data[WOMEN_INDEX][level]);
    console.log("number of positions to be filled: ", numberOfPositions);
    const numberOfPositionsForHire = Math.floor(numberOfPositions / 2);
    const numberOfPositionsForPromotion = numberOfPositions - numberOfPositionsForHire;
    data = simulateFillInFromPreviousLevel(level, data, numberOfPositionsForPromotion);
    data = simulateHire(level, data, numberOfPositionsForHire);
    chart.load({
      columns: data
    });
  }, currentTime);
}

function simulateLevel7() {
  currentTime += SPEED;
  setTimeout(function() {
    const numberOfPositions = 100 - (data[MEN_INDEX][7] + data[WOMEN_INDEX][7]);
    data = simulateHire(7, data, numberOfPositions);
    chart.load({
      columns: data
    });
  }, currentTime);
}

function simulateHire(level, data, numberOfPositions) {
  console.log("Number of positions to be filled: ", numberOfPositions);
  const numberOfMenCandidates = Math.floor(numberOfPositions / 2);
  const numberOfWomenCandidates = numberOfPositions - numberOfMenCandidates;
  // generate an array containing the number of people and their test results
  const candidates = [];
  for (var i = 0; i < 50; i++) {
    candidates.push({gender: 'M', performance: simulatePerformanceReview(100 + biasLevel)})
  }
  for (var i = 0; i < 50; i++) {
    candidates.push({gender: 'F', performance: simulatePerformanceReview(100)})
  }
  sortByPerformance(candidates);
  var hiredCandidates = candidates.slice(0, numberOfPositions);
  var numberOfMenToHire = hiredCandidates.filter(employeeHasGender("M")).length;
  var numberOfWomenToHire = hiredCandidates.filter(employeeHasGender("F")).length;
  console.log("Number of men to hire: ", numberOfMenToHire);
  console.log("Number of women to hire: ", numberOfWomenToHire);
  const newData = data.slice();
  newData[MEN_INDEX][level] = newData[MEN_INDEX][level] + numberOfMenToHire;
  newData[WOMEN_INDEX][level] = newData[WOMEN_INDEX][level] + numberOfWomenToHire;
  return newData;
}

function simulate() {
  simulateLevel(1);
  simulateLevel(2);
  simulateLevel(3);
  simulateLevel(4);
  simulateLevel(5);
  simulateLevel(6);
  simulateLevel7();
}

function startSimulation() {
  currentTime = 200;
  const attritionRateStr = document.getElementById("attrition-rate").value;
  document.getElementById("attrition-rate-div").innerHTML = "Attrition Rate: " + attritionRateStr;
  attritionRate = parseInt(attritionRateStr, 10);

  const biasLevelStr = document.getElementById("bias-level").value;
  document.getElementById("bias-level-div").innerHTML = "Bias Level: " + biasLevelStr;
  biasLevel = parseInt(biasLevel, 10);

  for (var i = 0; i < STEPS; i++) {
    simulate();
  }
}

function resetSimulation() {
  data = [
    ["x", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7"],
    ["men", 50, 50, 50, 50, 50, 50, 50],
    ["women", 50, 50, 50, 50, 50, 50, 50]
  ];
  chart.load({
    columns: data
  });
}
