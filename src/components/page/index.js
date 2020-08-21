import React, { useEffect, useRef, useState } from 'react';
import { Delaunay } from 'd3-delaunay';
import randomNumber from '../../helpers/randomNumber';
import useResizeObserver from '../../customHooks/useResizeObserver';
import './style.scss';

function Page({ items }) {

  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const height = 600;
  const [mouseDown, setMouseDown] = useState(false);

  const [hoveredItem, setHoveredItem] = useState();


  useEffect(() => {
    if (!canvasRef || !items || !dimensions) return;

    const width = window.innerWidth - 20;

    canvasRef.current.width = width;

    const getImages = _ => items.map(item => {
      const img = new Image();
      img.src = `http://localhost:1337${item.front_image.formats.thumbnail.url}`;
      return img;
    });

    const context = canvasRef.current.getContext('2d');
    const particles = items.map((item, i) => [width * Math.random(), height * Math.random(), item]);
    const images = getImages();
    let patterns = [];
    images.forEach(image => {
      image.onload = () => {
        patterns.push(context.createPattern(image, "repeat"));
        update();
      };
    })

    let delaunay = Delaunay.from(particles);

    function update() {
      context.clearRect(0, 0, width, height);

      delaunay = Delaunay.from(particles);
      const voronoi = delaunay.voronoi([0.5, 0.5, width - 0.5, height - 0.5]);


      for (let i = 0, n = particles.length; i < n; ++i) {
        context.save();
        context.beginPath();
        voronoi.renderCell(i, context);
        context.translate(particles[i][0], particles[i][1]);
        context.fillStyle = patterns[i];
        context.fill();
        context.restore();
      }

      context.beginPath();
      voronoi.render(context);
      voronoi.renderBounds(context);
      context.strokeStyle = "#000";
      context.lineWidth = 5;
      context.stroke();

    }

    context.canvas.ontouchmove =
      context.canvas.onmousemove = function (event) {
        event.preventDefault();
        const index = delaunay.find(event.pageX, event.pageY);
        const item = particles[index][2];

        console.log(item)
        setHoveredItem(item)

        update();
      };

    update();
  }, [canvasRef, items])

  return (
    <div className="wrapper" ref={wrapperRef}>
      <canvas ref={canvasRef} height={height} ref={canvasRef} />
      <div>Tooltip{hoveredItem ? hoveredItem.name : ""}</div>
    </div>
  )
}

export default Page
