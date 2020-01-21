import { ProjectInput } from "./models/pojectInput.js";
import { ProjectList } from "./models/projectlist.js";

const projectInput = new ProjectInput();
const activeProjectlist = new ProjectList("active");
const finishedProjectlist = new ProjectList("finished");
