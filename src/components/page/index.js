import React, { useEffect, useRef } from 'react';
import { Delaunay } from 'd3-delaunay';
import randomNumber from '../../helpers/randomNumber';

function Page({ items }) {

  const canvasRef = useRef(null);
  const width = window.innerWidth;
  const height = 600;


  useEffect(() => {
    if (!canvasRef || !items) return;

    const getImages = _ => items.map(item => {
      const img = new Image();
      img.src = `http://localhost:1337${item.preview[0].formats.large.url}`;
      return img;
    });

    const context = canvasRef.current.getContext('2d');
    const particles = items.map((item, i) => [randomNumber(width / 3, width / 2), randomNumber(height / 3, height / 2), item]);
    const images = getImages();
    let patterns = [];
    images.forEach(image => {
      image.onload = () => {
        patterns.push(context.createPattern(image, "repeat"));
        update();
      };
    })

    const delaunay = Delaunay.from(particles);
    const voronoi = delaunay.voronoi([0, 0, width, height]);

    function update() {
      context.clearRect(0, 0, width, height);


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
      context.stroke();

    }

    context.canvas.ontouchmove =
      context.canvas.onmousemove = function (event) {
        event.preventDefault();
        const index = delaunay.find(event.pageX, event.pageY);
        particles[index] = [event.layerX, event.layerY];
        update();
      };

    update();
  }, [canvasRef, items, width])

  return (
    <>
      <canvas width={width} height={height} ref={canvasRef} />
    </>
  )
}

export default Page
