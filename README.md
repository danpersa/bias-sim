# Introduction

<div>
  <script type="text/javascript" src="https://d3js.org/d3.v5.min.js"></script>
  <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/billboard.css" />
  <script type="text/javascript" src="https://naver.github.io/billboard.js/release/latest/dist/billboard.js"></script>
</div>

<div>
  <div id="config-form">
    <label for="attrition-rate">Attrition Rate:</label>
    <input type="number" maxlength="2" id="attrition-rate" value="15"/>
    <label for="bias-level">Bias Level:</label>
    <input type="number" maxlength="2" id="bias-level" value="1"/>
    <button type="button" onclick="startSimulation();">Start Simulation</button>
    <button type="button" onclick="resetSimulation();">Reset Simulation</button>
  </div>
  <br/>
  <div id="attrition-rate-div">Attrition Rate: 15</div>
  <div id="bias-level-div">Bias Level: 1</div>
  <br/>
  <div id="simulation"></div>
</div>
