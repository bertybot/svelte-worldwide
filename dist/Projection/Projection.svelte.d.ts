import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		width?: number | undefined;
		/** Name of selected country*/ name?: string | undefined;
		duration?: number | undefined;
		world: TopoJSON.Topology;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ProjectionProps = typeof __propDef.props;
export type ProjectionEvents = typeof __propDef.events;
export type ProjectionSlots = typeof __propDef.slots;
export default class Projection extends SvelteComponentTyped<
	ProjectionProps,
	ProjectionEvents,
	ProjectionSlots
> {}
export {};
