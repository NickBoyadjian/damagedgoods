import React, { useRef, useEffect } from 'react';
import useResizeObserver from '../../customHooks/useResizeObserver';
import { select, easeLinear } from 'd3';
import './style.scss'

export default function () {
	const svgRef = useRef();
	const containerRef = useRef();
	const dimensions = useResizeObserver(containerRef);


	useEffect(() => {
		if (!svgRef.current || !dimensions) return;

		const svg = select(svgRef.current);
		svg.html("");
		const { width, height } = dimensions;

		let i = 0;
		for (const sample of poissonDiscSampler(width, height, 8)) {
			if (sample.parent) {
				svg.append("line")
					.attr("x1", sample.parent[0])
					.attr("y1", sample.parent[1])
					.attr("x2", sample.parent[0])
					.attr("y2", sample.parent[1])
					.attr("stroke", "#000")
					.transition()
					.ease(easeLinear)
					.delay(sample.depth * 150)
					.duration(150)
					.attr("x2", sample[0])
					.attr("y2", sample[1]);
			}
		}

	});

	function* poissonDiscSampler(width, height, radius) {
		const k = 30; // maximum number of samples before rejection
		const radius2 = radius * radius;
		const radius2_3 = 3 * radius2;
		const cellSize = radius * Math.SQRT1_2;
		const gridWidth = Math.ceil(width / cellSize);
		const gridHeight = Math.ceil(height / cellSize);
		const grid = new Array(gridWidth * gridHeight);
		const queue = [];

		// Pick the first sample.
		yield sample(width / 2 + Math.random() * radius, height / 2 + Math.random() * radius, null);

		// Pick a random existing sample from the queue.
		pick: while (queue.length) {
			const i = Math.random() * queue.length | 0;
			const parent = queue[i];

			// Make a new candidate between [radius, 2 * radius] from the existing sample.
			for (let j = 0; j < k; ++j) {
				const a = 2 * Math.PI * Math.random();
				const r = Math.sqrt(Math.random() * radius2_3 + radius2);
				const x = parent[0] + r * Math.cos(a);
				const y = parent[1] + r * Math.sin(a);

				// Accept candidates that are inside the allowed extent
				// and farther than 2 * radius to all existing samples.
				if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
					yield sample(x, y, parent);
					continue pick;
				}
			}

			// If none of k candidates were accepted, remove it from the queue.
			const r = queue.pop();
			if (i < queue.length) queue[i] = r;
		}

		function far(x, y) {
			const i = x / cellSize | 0;
			const j = y / cellSize | 0;
			const i0 = Math.max(i - 2, 0);
			const j0 = Math.max(j - 2, 0);
			const i1 = Math.min(i + 3, gridWidth);
			const j1 = Math.min(j + 3, gridHeight);
			for (let j = j0; j < j1; ++j) {
				const o = j * gridWidth;
				for (let i = i0; i < i1; ++i) {
					const s = grid[o + i];
					if (s) {
						const dx = s[0] - x;
						const dy = s[1] - y;
						if (dx * dx + dy * dy < radius2) return false;
					}
				}
			}
			return true;
		}

		function sample(x, y, parent) {
			const s = grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = [x, y];
			s.parent = parent;
			s.depth = parent ? parent.depth + 1 : 0;
			queue.push(s);
			return s;
		}
	}

	return (
		<div ref={containerRef} className="bridson-container">
			<svg ref={svgRef} />
		</div>
	)
}
