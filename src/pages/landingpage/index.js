import React, { useRef, useEffect } from 'react';
import * as PathData from 'path-data';
import imagetracer from 'imagetracerjs';

import './style.scss';
import useResizeObserver from '../../customHooks/useResizeObserver';

export default function Index() {
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        if (!canvasRef.current) return;

    }, [canvasRef]);

    return (
        <div className="wrapper" ref={wrapperRef}>
            <canvas ref={canvasRef} />
        </div>
    )
}
