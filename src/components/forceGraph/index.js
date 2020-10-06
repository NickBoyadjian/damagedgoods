import React, { useEffect, useRef } from 'react';
import {
  select,
  drag,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  event, forceRadial
} from 'd3';
import useResizeObserver from '../../customHooks/useResizeObserver';
import './style.scss';

export default function Index() {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const dnodes = [
    { id: "root", value: "Your sense of fashion" },
    { id: "restore", value: "restore" },
    { id: "repair", value: "repair" },
    { id: "renew", value: "renew" },
    { id: "revive", value: "revive" },
    { id: "rebirth", value: "rebirth" },
    { id: "refine", value: "refine" },
    { id: "recycle", value: "recycle" },
    { id: "restyle", value: "restyle" },
    { id: "repent", value: "repent" },
  ];

  const dlinks = [
    { source: "root", target: "restore", value: 0.5 },
    { source: "root", target: "repair", value: 0.4 },
    { source: "root", target: "renew", value: 0.4 },
    { source: "root", target: "revive", value: 0.4 },
    { source: "root", target: "rebirth", value: 0.6 },
    { source: "root", target: "refine", value: 0.5 },
    { source: "root", target: "recycle", value: 0.3 },
    { source: "root", target: "restyle", value: 0.1 },
    { source: "root", target: "repent", value: 0.2 },
  ]

  useEffect(() => {
    if (!svgRef.current || !dimensions) return;

    const { width, height } = dimensions;
    const svg = select(svgRef.current);
    svg.html("");

    const links = dlinks.map(d => Object.create(d));
    const nodes = dnodes.map(d => Object.create(d));

    const simulation = forceSimulation(nodes)
      .force("link", forceLink(links).id(d => d.id).distance(d => (width / 2) * d.value))
      .force("charge", forceManyBody())
      .force("center", forceCenter(width / 2, height / 2))
      .force("collision", forceCollide().radius(d => 75))


    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.1)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 5);

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("opacity", "0")
      .call(drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))


    const labels = svg.append("g")
      .attr("class", "labels")
      .attr("stroke", "#fff")
      .attr("fill", "#fff")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("stroke-width", d => d.id == "root" ? 1.5 : 1)
      .attr("font-size", d => {
        if (d.id == "root") {
          if (width > 1000)
            return 50;
          else
            return 30;
        } else {
          if (width > 1000)
            return 40;
          else
            return 20;
        }
      })
      .text(d => d.value)
      .attr("x", 100)
      .attr("y", 100)
      .call(drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      labels
        .attr("x", d => d.x)
        .attr("y", d => d.y)
    });

    function dragstarted(d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }


  }, [svgRef, dimensions])

  return (
    <div className="force-container" ref={wrapperRef}>
      <svg ref={svgRef} height={500} />
    </div>
  )
}
