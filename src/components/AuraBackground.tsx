import { useEffect, useRef, useState } from "react";

const AuraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setOffset({
        x: ((clientX - w / 2) / w) * 40,
        y: ((clientY - h / 2) / h) * 40,
      });
    };

    const onMouse = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Purple blob */}
      <div
        className="aura-blob w-[400px] h-[400px] top-[-10%] left-[-10%]"
        style={{
          background: 'hsl(271, 76%, 53%)',
          animationDuration: '14s',
          transform: `translate(${offset.x * 0.8}px, ${offset.y * 0.8}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      {/* Green blob */}
      <div
        className="aura-blob w-[350px] h-[350px] top-[40%] right-[-15%]"
        style={{
          background: 'hsl(80, 100%, 50%)',
          animationDuration: '18s',
          animationDelay: '-5s',
          transform: `translate(${-offset.x * 1.2}px, ${offset.y * 0.6}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      {/* Pink blob */}
      <div
        className="aura-blob w-[300px] h-[300px] bottom-[-5%] left-[20%]"
        style={{
          background: 'hsl(330, 100%, 71%)',
          animationDuration: '16s',
          animationDelay: '-8s',
          transform: `translate(${offset.x * 0.5}px, ${-offset.y * 1.0}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      {/* Subtle secondary purple */}
      <div
        className="aura-blob w-[250px] h-[250px] top-[60%] left-[-5%]"
        style={{
          background: 'hsl(271, 76%, 53%)',
          opacity: 0.2,
          animationDuration: '20s',
          animationDelay: '-12s',
          transform: `translate(${-offset.x * 0.6}px, ${-offset.y * 0.4}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
    </div>
  );
};

export default AuraBackground;
