import { makeAutoObservable } from "mobx";

export class UserStore {
	constructor() {
		makeAutoObservable(this);
		this.setTestNum();
	}

	testNum = 1;

	setTestNum() {
		this.testNum = this.testNum + 1;
	}
}
