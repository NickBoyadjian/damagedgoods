import React, { useEffect, useRef } from 'react';
import { select, range, drag, event } from 'd3';
import { Delaunay } from 'd3-delaunay';

// What should we put inside the cells

function Voronoi(items) {
  const svgRef = useRef(null);
  const width = window.innerWidth;
  const height = 600;
  const radius = 5;

  useEffect(() => {
    if (!svgRef.current || !items) return;

    const svg = select(svgRef.current);
    const defs = svg.append("defs");
    svg.selectAll("path").remove();
    svg.selectAll("circle").remove();

    defs.append('pattern')
      .attr('id', 'pic3')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 315.5)
      .attr('height', 100)
      .append('svg:image')
      .attr('xlink:href', 'http://cammac7.github.io/img/portfolio/BLM.png')
      .attr("width", 115.5)
      .attr("height", 100)
      .attr("x", 0)
      .attr("y", 0);


    const circles = items.items.map((item, i) => {
      let newItem = item;
      newItem.x = Math.random() * (width - radius * 2) + radius;
      newItem.y = Math.random() * (height - radius * 2) + radius;
      return newItem;
    });

    let voronoi = Delaunay
      .from(circles, d => d.x, d => d.y)
      .voronoi([0, 0, width, height]);

    const mesh = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2)
      .attr("d", voronoi.render());

    const cell = svg.append("g")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .selectAll("path")
      .data(circles)
      .join("path")
      .attr("d", (d, i) => voronoi.renderCell(i))
      .attr("xlink:href", "#testanchor")
      .attr("fill", "url(#pic3)")
      .on("mouseenter", function (d, i) {
        const cell = select(this);
        console.log(d)
      })
      .on("mouseleave", function () {
        const cell = select(this);
      })
    // .call(drag()       // LEAVING HERE FOR DRAG TO CART LATER
    //   .on("start", d => circle.filter(p => p === d).raise().attr("stroke", "black"))
    //   .on("drag", d => (d.x = event.x, d.y = event.y))
    //   .on("end", d => circle.filter(p => p === d).attr("stroke", null))
    //   .on("start.update drag.update end.update", update));


    function update() {
      voronoi = Delaunay.from(circles, d => d.x, d => d.y).voronoi([0, 0, width, height]);
      cell.attr("d", (d, i) => voronoi.renderCell(i));
      mesh.attr("d", voronoi.render());
    }


    // svg.append('pattern')
    //   .attr('id', 'pic3')
    //   .attr('patternUnits', 'userSpaceOnUse')
    //   .attr('width', 315.5)
    //   .attr('height', 100)
    //   .append('svg:image')
    //   .attr('xlink:href', 'http://cammac7.github.io/img/portfolio/BLM.png')
    //   .attr("width", 115.5)
    //   .attr("height", 100)
    //   .attr("x", 0)
    //   .attr("y", 0);



    // svg.append("a")
    //   .attr("xlink:href", "#testanchor")
    //   .append('path')
    //   .attr("d", "M 0,0, 57.7,-100, 115.5,0z")
    //   .attr("transform", "translate(0, 100)")
    //   .attr("fill", "url(#pic3)");


  }, [items])

  return (
    <div>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  )
}

export default Voronoi
