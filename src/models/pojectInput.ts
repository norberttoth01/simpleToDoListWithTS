import { AutoBind } from '../decorators/autoBind.js';
import { validate } from '../util/validator.js';
import { Validatable } from './validatable.js';
import { projectState } from './projectStateManagement.js';

export class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		this.templateElement = document.querySelector('#project-input')! as HTMLTemplateElement;
		this.hostElement = document.querySelector('#app')! as HTMLDivElement;

		const importedNode = document.importNode(this.templateElement.content, true);

		this.element = importedNode.firstElementChild! as HTMLFormElement;
		this.element.id = "user-input";

		this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

		this.configure();
		this.attach();
	}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidatable: Validatable = { value: enteredTitle, required: true };
		const descriptionValidatable: Validatable = { value: enteredDescription, required: true, minLength: 5 };
		const peopleValidatable: Validatable = { value: +enteredPeople, required: true, min: 1, max: 5 };

		if (
			validate(titleValidatable) &&
			validate(descriptionValidatable) &&
			validate(peopleValidatable)) {
			return [enteredTitle, enteredDescription, +enteredPeople];
		} else {
			alert('invalid input, please try again');
		}
		return;
	}

	private clearInputs() {
		this.titleInputElement.value = '';
		this.descriptionInputElement.value = '';
		this.peopleInputElement.value = '';
	}

	@AutoBind
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();
		if (userInput) {
			const [title, description, people] = userInput;
			projectState.addproject(title, description, people);
			console.log(projectState.getProject());
			this.clearInputs();
		}
	}

	private configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}

	private attach() {
		this.hostElement.insertAdjacentElement('afterbegin', this.element);
	}
}