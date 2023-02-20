import { Reminder } from "./createreminder";
import {
  TodayArray,
  ThisWeekArray,
  ThisMonthArray,
  AllArray,
  ProjectArray,
  orderdatesproject,
} from "./orderlogic";
import { orderdates } from "./orderlogic";
import { Project } from "./projectlogic";
import { tempstorage } from "./tempstorage";
import { printArray, printChanges, print, DeleteDone } from "./print";

let domlogic = () => {
  document.querySelector(".addreminders").style.display = "none";
  const btn = document.querySelector(".addformreminder");
  btn.addEventListener("click", function (event) {
    document.querySelector(".addreminders").style.display = "grid";
  });

  document.querySelector(".addprojects").style.display = "none";
  const btn2 = document.querySelector(".addformproject");
  btn2.addEventListener("click", function (event) {
    document.querySelector(".addprojects").style.display = "grid";
  });

  document.querySelector(".submit").addEventListener("click", function (event) {
    event.preventDefault();
    const newreminder = Reminder.FormData();
    orderdates(newreminder);

    document.querySelector(".addreminders").style.display = "none";
    print();
  });
};

let projectsdom = () => {
  let html;
  document
    .querySelector(".projectadd")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(".addprojects").style.display = "none";
    });
  document.querySelector(".remindersproject").style.display = "none";
  document
    .querySelector(".addinput")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(".remindersproject").style.display = "grid";
    });
  document
    .querySelector(".savereminders")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let nameInput = document.querySelector("#projectname");
      if (nameInput.value === "") {
        alert("Name your project!");
        return;
      }
      const newreminder = Reminder.FormDataProject();
      tempstorage(newreminder);
      document.querySelector(".remindersproject").style.display = "none";
      document.getElementById("nameproject").value = "";
      document.getElementById("dateproject").value = "";
      document.getElementById("priorityproject").value = "";
    });

  document
    .querySelector(".projectadd")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const newproject = Project.FormData();
      orderdatesproject(newproject);
      printArray(ProjectArray);
    });

  printArray(ProjectArray);
};

let displayLogic = () => {
  let all = document.querySelector(".all");
  all.addEventListener("click", function (event) {
    print();
  });

  const pnav = document.querySelector(".pnav");
  pnav.addEventListener("click", () => {
    printArray(ProjectArray);
    console.log(ProjectArray);
  });
};

export { domlogic, displayLogic, projectsdom };
