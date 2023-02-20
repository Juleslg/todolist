import {
  AllArray,
  TodayArray,
  ThisMonthArray,
  ThisWeekArray,
} from "./orderlogic";
import { Reminder } from "./createreminder";
import { orderdates, reorderdates } from "./orderlogic";
import { ProjectArray, deleteReminder } from "./orderlogic";
import { Project } from "./projectlogic";
import { parse, format } from "date-fns";
import { tempstorage, tempArray } from "./tempstorage";

let DeleteDone = (projectArray) => {
  let done = document.querySelectorAll(".done");
  done.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      let projectDiv = button.parentElement;
      let projectId = projectDiv.getAttribute("data-id");
      projectDiv.remove();
      deleteProjectByName(getProjectName(projectDiv));
      let projectElements = document.querySelectorAll(`.project-${index}`);
      let projectIndex = `${index}`;
      projectArray.splice(projectIndex, 1);
      localStorage.setItem("ProjectArray", JSON.stringify(projectArray));

      projectElements.forEach((element) => element.remove());
    });

    function getProjectName(projectDiv) {
      let pElements = projectDiv.querySelectorAll("p");
      for (let i = 0; i < pElements.length; i++) {
        if (pElements[i].textContent.startsWith("name:")) {
          return pElements[i].textContent.split(":")[1].trim();
        }
      }
      return "";
    }

    function deleteProjectByName(projectName) {
      let updatedProjectArray = projectArray.filter(
        (project) => project.name !== projectName
      );
      localStorage.setItem("ProjectArray", JSON.stringify(updatedProjectArray));
      printChangesProjects(updatedProjectArray);
    }
  });
};

let print = () => {
  let html = `<h3>Reminders</h3>`;
  for (let i = 0; i < AllArray.length; i++) {
    let reminder = AllArray[i];
    html += `<div class="reminder">
      <p>Reminder</p>
        <p>Name: ${reminder.name}</p>
        <p>Date: ${reminder.date}</p>
        <p>Priority: ${reminder.priority}</p>
        <button class="done">✓</button>
        <button class="modify">Modify</button>
      </div>`;
    setTimeout(function () {
      printChanges(AllArray);
    }, 1000);
  }

  document.querySelector(".content").innerHTML = html;

  console.log(AllArray);
};

function saveProjectsToLocalStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Function to get the projects from local storage
function getProjectsFromLocalStorage() {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
}

function printArray(arr) {
  const content = document.querySelector(".content");
  content.innerHTML = "";
  arr.forEach((project, index) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "projectprint";
    projectDiv.innerHTML = `<p>Project</p>`;
    for (const key in project) {
      if (Array.isArray(project[key])) {
        const remindersDiv = document.createElement("div");
        remindersDiv.classList.add("remindersdiv");
        remindersDiv.innerHTML = `<p>Reminders:</p>`;
        project[key].forEach((reminder) => {
          const reminderDiv = document.createElement("div");
          reminderDiv.innerHTML = `<p>Name: ${reminder.name}</p>
                                    
                                    <p>Priority: ${reminder.priority}</p>
                                    <label><input type="checkbox" id="box-${index}" class="box" />Done</label>
                                   `;
          const checkboxKey = `box-${index}-${reminder.name}-${reminder.priority}`;
          const checkboxValue = localStorage.getItem(checkboxKey);
          if (checkboxValue !== null) {
            reminderDiv.querySelector(".box").checked =
              JSON.parse(checkboxValue);
          }
          reminderDiv.addEventListener("click", (event) => {
            if (event.target.matches(".box")) {
              const checkbox = event.target;
              const checkboxKey = `box-${index}-${reminder.name}-${reminder.priority}`;
              const checkboxValue = JSON.stringify(checkbox.checked);
              localStorage.setItem(checkboxKey, checkboxValue);
            }
          });
          remindersDiv.appendChild(reminderDiv);
        });
        projectDiv.appendChild(remindersDiv);
      } else {
        const p = document.createElement("p");
        p.textContent = `${key}: ${project[key]}`;
        projectDiv.appendChild(p);
      }
    }

    content.appendChild(projectDiv);
    const modifyButton = document.createElement("button");
    modifyButton.textContent = "Modify Project";
    modifyButton.classList.add("modifyprojects");
    projectDiv.appendChild(modifyButton);

    const doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    doneButton.classList.add("done");
    projectDiv.appendChild(doneButton);

    const CreateButton = document.createElement("button");
    CreateButton.textContent = "Add Reminder";
    CreateButton.classList.add("Create");
    projectDiv.appendChild(CreateButton);
  });

  function printProjectNames(arr) {
    const content = document.querySelector(".projectnames");
    content.innerHTML = "";

    arr.forEach((project, index) => {
      const nameDiv = document.createElement("div");
      nameDiv.textContent = project.name;
      nameDiv.classList.add(`project-${index}`); // set a class with the unique identifier
      content.appendChild(nameDiv);

      // add event listener to the div
      nameDiv.addEventListener("click", () => {
        printArray([project]);
      });
    });
  }

  printProjectNames(arr);
  printChangesProjects(ProjectArray);
  DeleteDone(ProjectArray);
}

function printChanges(array) {
  const modifyButtons = document.querySelectorAll(".modify");
  modifyButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const reminder = array[index];
      let html = `
            <div class="form">
              <p>Modify Reminder</p>
              <input type="text" id="changedname" value="${reminder.name}" />
              
                <input type="date" id="changeddate" name="date" value="${reminder.date}" />
             
              <input type="text" id="changedpriority" value="${reminder.priority}" />
              <button class="save">Save</button>
            </div>
          `;
      document.querySelector(".content").innerHTML += html;

      const saveButton = document.querySelector(".save");
      saveButton.addEventListener("click", function () {
        const newreminder = Reminder.FormDataEdit();
        orderdates(newreminder);

        let html = ``;
        array.splice(index, 1);
        console.log(array);

        document.querySelector(".content").innerHTML = html;
        printArray(array);
      });
    });
  });
}

function printChangesProjects(array) {
  const CreateButton = document.querySelectorAll(".Create");
  CreateButton.forEach((button, projectIndex) => {
    button.addEventListener("click", function () {
      let html3 = ` <div class="remindersprojectadded">
              <label for="name">Name:</label>
              <input type="text" id="nameprojectadded" name="name" />
      
              <label for="priority">Priority:</label>
              <select id="priorityprojectadded" name="priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button class="createreminder">Save</button>
            </div>`;
      document.querySelector(".content").innerHTML += html3;

      const saveremindersButton = document.querySelector(".createreminder");
      saveremindersButton.addEventListener("click", function () {
        const newreminder = {
          name: document.querySelector("#nameprojectadded").value,
          priority: document.querySelector("#priorityprojectadded").value,
        };
        console.log(newreminder);
        array[projectIndex].reminders.push(newreminder);
        console.log(array);
        localStorage.setItem("ProjectArray", JSON.stringify(array));
        printArray(ProjectArray);
      });
    });
  });

  const modifyButtons = document.querySelectorAll(".modifyprojects");
  modifyButtons.forEach((button, projectIndex) => {
    button.addEventListener("click", function () {
      const project = array[projectIndex];
      let html = `
            <div class="form">
              <p>Modify Project</p>
              <input type="text" id="changednameproject" value="${project.name}" />
              
              <input type="date" id="changeddateproject" name="date" value="${project.date}" />
              <button class="saveprojects">Save</button>
            </div>
          `;
      document.querySelector(".content").innerHTML += html;

      for (
        let reminderIndex = 0;
        reminderIndex < array[projectIndex].reminders.length;
        reminderIndex++
      ) {
        const reminder = array[projectIndex].reminders[reminderIndex];

        let html2 = `
              <div class="form-${reminderIndex}">
                <p>Modify Reminder</p>
                <input type="text" id="changedname-${reminderIndex}" value="${reminder.name}" />
              
                <input type="text" id="changedpriority-${reminderIndex}" value="${reminder.priority}" />
                <button class="savereminder" data-reminder-index="${reminderIndex}">Save</button>
              </div>
            `;
        document.querySelector(".content").innerHTML += html2;
      }

      const saveRemindersButtons = document.querySelectorAll(".savereminder");

      saveRemindersButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          const reminderIndex = button.dataset.reminderIndex;
          const newreminder = {
            name: document.querySelector(`#changedname-${reminderIndex}`).value,
            priority: document.querySelector(
              `#changedpriority-${reminderIndex}`
            ).value,
          };
          tempArray.push(newreminder);
          array[projectIndex].reminders.splice(reminderIndex, 1);
          document.querySelector(`.form-${reminderIndex}`).remove();
        });
      });

      const saveButton = document.querySelector(".saveprojects");
      saveButton.addEventListener("click", function () {
        const changedName = document.querySelector("#changednameproject").value;
        const changedDate = document.querySelector("#changeddateproject").value;
        const changedProject = {
          name: changedName,
          date: changedDate,
          reminders: tempArray,
        };
        array.push(changedProject);

        let html = ``;
        array.splice(projectIndex, 1);

        document.querySelector(".content").innerHTML = html;
        console.log(array);
        printArray(ProjectArray);
      });
    });
  });
}

export { printArray, printChanges, print, printChangesProjects, DeleteDone };
