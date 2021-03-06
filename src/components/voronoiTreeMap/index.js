import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { select, hierarchy, extent, polygonCentroid, max, min } from 'd3';
import { voronoiTreemap } from 'd3-voronoi-treemap';
import seedrandom from 'seedrandom';
import useResizeObserver from '../../customHooks/useResizeObserver';
import { getDataNested, appendImages } from './helpers';
import './style.scss';

export default function Index({ items, setItem }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const history = useHistory();

  useEffect(() => {
    async function mdo() {
      // return if the svg container isn't ready
      if (!svgRef.current || !items || !dimensions) return;

      // set up basic variables
      const { width, height } = dimensions;
      const svg = select(svgRef.current);
      svg.selectAll('*').remove(); // we do this so on rerenders everything is cleared
      const voronoi = svg.append('g').classed('voronoi', true);
      const clipPath = [[0, 0], [width, 0], [width, height], [0, height]];
      let voronoiTreeMap = voronoiTreemap().prng(new seedrandom('notice me senpai')).clip(clipPath);


      // Format the data to be grouped by region and country
      const nestedData = getDataNested(items);

      // Get all the relevant data attached needed for rendering
      const nodes1 = hierarchy(nestedData, d => d.values).sum(d => (Math.random() * 10) + 5);
      voronoiTreeMap(nodes1);

      nodes1.each(node => (node.oldPolygon = node.polygon));
      nodes1.each(node => {
        const [x0, x1] = extent(node.polygon, d => d[0]);
        const [y0, y1] = extent(node.polygon, d => d[1]);

        node.simplePolygon = node.polygon;
        const width = x1 - x0;
        const height = y1 - y0;
        node.polyProps = {
          centroid: polygonCentroid(node.simplePolygon),
          bounds: [[x0, y0], [x1, y1]],
          width,
          height,
          aspect: height / width,
          max: max([width, height]),
          min: min([width, height])
        }
      })


      let nodes = nodes1.descendants()
        .sort((a, b) => b.depth - a.depth)
        .map((d, i) => Object.assign({}, d, { id: i }));


      // append the actual nodes into the voronoi graph
      voronoi.selectAll('.node')
        .data(nodes)
        .join('g')
        .classed('node', true)
        .append('polygon')
        .attr('points', d => d.polygon)
        .attr('stroke', d => '#242424')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 1)
        .attr('stroke-linejoin', 'round')
        .attr('fill-opacity', d => d.depth === 2 ? 0.5 : 0)
        .attr('fill', "#252525")
        .attr('pointer-events', d => d.height === 0 ? 'fill' : 'none')
        .attr("stroke-width", d => 7 - d.depth * 2.8)

      const handleMouseOver = i => voronoi.selectAll('image').attr('opacity', (d, j) => i === j ? 1 : 0.5)

      const handleMouseLeave = () => voronoi.selectAll('image').attr('opacity', 1);

      //const handleClick = data => history.push(`/items/${data.data.key}`);
      const handleClick = data => setItem(data.data.key);

      appendImages(voronoi.selectAll('.node'), items, handleMouseOver, handleMouseLeave, handleClick);
    }

    mdo();

  }, [svgRef, wrapperRef, dimensions])


  return (
    <div className="wrapper" ref={wrapperRef}>
      <svg ref={svgRef} height={window.innerHeight * (3 / 4)} />
    </div>
  )
}
