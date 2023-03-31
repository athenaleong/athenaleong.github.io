import { useRef, useState, useEffect, useCallback } from "react";

/**
     * Note: This feature was implemented by ChatGPT and clearly doesn't work.
     * It currently can be used for Desktop background. TODO: Fix the game. 
     */
function ConnectTheDots() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState<any>(false);
  const [points, setPoints] = useState<any>([]);

  /** Handles resize */
  useEffect(() => {
    if (canvasRef.current == null) {
        return;
    }
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      canvas!.width = canvas!.clientWidth;
      canvas!.height = canvas!.clientHeight;
      redraw();
    };

    const redraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();

      points.forEach((point: any, index: any) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      ctx.stroke();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [points]);

  const handleMouseDown = useCallback((event: any) => {
    const canvas: any= canvasRef.current;
    const rect = canvas!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setIsDrawing(true);
    setPoints([{ x, y }]);
  }, [canvasRef, setIsDrawing, setPoints]);


  const handleMouseMove = (event: any) => {
    if (!isDrawing) {
      return;
    }

    const canvas: any = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPoints((prevPoints: any) => [...prevPoints, { x, y }]);
  };


  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const dotSize = 2;
    const dotColor = "#9ca3af";
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw dots
    const dotSpacing = 36;
    const xCount = Math.ceil(width / dotSpacing);
    const yCount = Math.ceil(height / dotSpacing);

    ctx.fillStyle = dotColor;

    for (let x = 0; x < xCount; x++) {
      for (let y = 0; y < yCount; y++) {
        ctx.beginPath();
        if (y % 2 === 0) { 
            ctx.arc(x * dotSpacing + dotSize, y * dotSpacing + dotSize, dotSize, 0, Math.PI * 2);
        }
        else {
            ctx.arc(x * dotSpacing + dotSize + 18, y * dotSpacing + dotSize, dotSize, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    }
  }, [canvasRef]);

  return (
    <>
    <canvas
      ref={canvasRef}
    //   onMouseDown={handleMouseDown}
    //   onMouseMove={handleMouseMove}
    //   onMouseUp={handleMouseUp}
      style={{ width: "100%", height: "100%" }}
      className="absolute -z-50 bg-stone-200 dark:bg-slate-800"
    />
    <div className="h-10 flex flex-row">
    {/* {points.map((point: any, index: any) => (
        <p>
        {point.x}, {point.y}
        </p>
    ))} */}
    </div>
    </>
  );
}

export default ConnectTheDots;
