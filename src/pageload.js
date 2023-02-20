let populate = () => {
  const populate = document.getElementById("wrapper");
  populate.innerHTML = `
  <header>To-Do-List</header>

<div class="navleft">
  <div id="reminders" class="navleft-items">reminders</div>
  <button id="b1" class="addformreminder">Add reminder</button>
  <form class="addreminders" action="submit">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />

    <label for="date">Date:</label>
    <input type="date" id="date" name="date" />

    <label for="priority">Priority:</label>
    <select id="priority" name="priority">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <input class="submit" type="submit" value="+" />
  </form>

  <div class="navleft-items">projects</div>
  <button id="b2" class="addformproject">Add Project</button>
  <form class="addprojects" action="">
    <label for="name">Name:</label>
    
    <input type="text" id="projectname" name="name" />
    
    <input type="date" id="datedate" name="date" />
    <button class="addinput">Add Reminders</button>
    <div class="remindersproject">
    <label for="name">Name:</label>
    <input type="text" id="nameproject" name="name" />

   

    <label for="priority">Priority:</label>
    <select id="priorityproject" name="priority">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <button class="savereminders">Save</button>
    </div>


    <input class="projectadd" type="submit" value="+" />
  </form>
</div>

<div class="time">
 
  <h4 class="all">Reminders</h4>
  
  
  <div class="pnav">All Projects</div>
  <div class="projectnames"></div>
</div>

<div class="content"></div>

<footer>copyright</footer>

`;

  document.getElementById("reminders").style.display = "none";
  document.getElementById("b1").style.display = "none";
  document.querySelector(".all").style.display = "none";
  document.querySelector(".addreminders").style.display = "none";
  document.querySelector(".addinput").style.display = "none";
};

export { populate };
