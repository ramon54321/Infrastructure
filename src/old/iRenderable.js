// @flow

export interface IRenderable {
	render(deltaTime : number) : void;
	createUiRender() : void;
	createRender() : void;
	showRender() : void;
	hideRender() : void;
	destroyRender() : void;
}
