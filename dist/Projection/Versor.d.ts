export declare class Versor {
	static fromAngles([l, p, g]: [number, number, number]): [number, number, number, number];
	static toAngles([a, b, c, d]: [number, number, number, number]): [number, number, number];
	static interpolateAngles(
		a: [number, number, number],
		b: [number, number, number]
	): (t: number) => [number, number, number];
	static interpolateLinear(
		[a1, b1, c1, d1]: [number, number, number, number],
		[a2, b2, c2, d2]: [number, number, number, number]
	): (t: number) => [number, number, number, number];
	static interpolate(
		[a1, b1, c1, d1]: [number, number, number, number],
		[a2, b2, c2, d2]: [number, number, number, number]
	): (t: number) => [number, number, number, number];
}
