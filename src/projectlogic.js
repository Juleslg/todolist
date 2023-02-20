import { tempArray } from "./tempstorage";
import { erase } from "./tempstorage";
import { parse, format } from "date-fns";

class Project {
  constructor(name, date, reminders) {
    this.name = name;
    this.date = format(new Date(date), "dd.MM.yyyy");
    this.reminders = reminders;
  }

  static FormData(
    name = document.getElementById("projectname").value,
    date = document.getElementById("datedate").value,
    reminders = tempArray
  ) {
    erase();

    return new Project(name, date, reminders);
  }

  static FormDataEdit() {
    const name = document.getElementById("changedname").value;
    const date = document.getElementById("changeddate").value;
    const reminders = tempArray;
    return new Project(name, date, reminders);
  }
}

export { Project };
