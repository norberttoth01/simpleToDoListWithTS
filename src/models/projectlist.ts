import { projectState } from "./projectStateManagement.js";
import { Project } from "./project.js";

export class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.querySelector('#project-list')! as HTMLTemplateElement;
        this.hostElement = document.querySelector('#app')! as HTMLDivElement;
        this.assignedProjects = [];

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild! as HTMLElement;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects;
            this.renderProject()
        })
        this.attach();
        this.renderContent();
    }
    private renderProject() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listEl.appendChild(listItem);
        }
    }
    private renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}