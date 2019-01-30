# Bias Simulation

The goal of this experiment is to get an impression on how unconscious bias can affect the structure of a company. This was inspired by [this talk](https://www.youtube.com/watch?v=nLjFTHTgEVU).

Let's explain what the simulation is about:

 - We assume that there is an organization, with 7 layers
   - On the level 1 there are the senior members of the organization
   - On level 7 we have the most junior members
 - We assume that at each level, there are 50% man and 50% women
 - Before beginning the simulation, two parameters can be set:
    - **Attrition rate**:
    On every step of the simulation, as assume that some employees leave the company.
    We assume that half of these employees are women and half man.
    The *attrition rate* gives the percentage of employees who decide to leave.
    - **Bias level**: We'll explain this later.

Starting the simulation:
The simulation has 20 steps. Here is what happens during each steps:
 - We start from Level 1.
 We assume that the percentage of employees, given by the *attrition rate* leave the company.
 - We have two ways of filling in the open positions:
 We assume that we fill in half of the open positions by hiring new employees and the other half by promoting existing employees from the previous level.
 - We assume that both the hiring and the promotion processes are biased towards men, by a factor given by the *bias level*. See the next chapters about the *Hiring process* and *Promotion process* below.



### Hiring process
Let's assume that we have 10 positions to fill. We assume that we have 100 candidates, 50 women and 50 men.


## Promotion process

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
    <br/><br/>
    <button type="button" onclick="startSimulation();">Start Simulation</button>
    <button type="button" onclick="resetSimulation();">Reset Simulation</button>
  </div>
  <br/>
  <div id="attrition-rate-div">Attrition Rate: 15</div>
  <div id="bias-level-div">Bias Level: 1</div>
  <br/>
  <div id="simulation"></div>
</div>
