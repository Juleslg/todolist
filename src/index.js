import "./style.css";
import { populate } from "./pageload";
import { domlogic, displayLogic, projectsdom } from "./domlogic";
import { compareAsc, format } from "date-fns";

const today = format(new Date(), "dd.MM.yyyy");
console.log(today);
populate();
domlogic();
displayLogic();
projectsdom();
