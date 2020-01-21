import { Project, Status } from "./project.js";
type Listener = (items: Project[]) => void;

class ProjectState {
    private projects: Project[] = [];
    private static instance: ProjectState;
    private listeners: Listener[] = [];
    private constructor() {

    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new ProjectState();
            return this.instance;
        }

    }

    addproject(title: string, description: string, people: number) {

        const newProject = new Project(Math.random().toString(), title, description, people, Status.Active)
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice())
        }
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }
    getProject() {
        return this.projects;
    }
}
export const projectState = ProjectState.getInstance();