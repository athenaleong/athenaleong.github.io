import { useRef, useState, useEffect, useCallback } from "react";

function ConnectTheDots() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState<any>(false);
  const [points, setPoints] = useState<any>([]);

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

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default ConnectTheDots;
