import { parse, format } from "date-fns";

class Reminder {
  constructor(name, date, priority) {
    this.name = name;

    this.priority = priority;
  }

  static FormDataProject() {
    const name = document.getElementById("nameproject").value;

    const priority = document.getElementById("priorityproject").value;

    return new Reminder(name, priority);
  }

  static FormDataEditProject(reminderIndex) {
    const name = document.getElementById(`changedname-${reminderIndex}`).value;

    const priority = document.getElementById(
      `changedpriority-${reminderIndex}`
    ).value;

    return new Reminder(name, priority);
  }
}

export { Reminder };
