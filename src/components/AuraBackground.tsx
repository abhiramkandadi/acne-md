const AuraBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Purple blob */}
      <div
        className="aura-blob w-[400px] h-[400px] top-[-10%] left-[-10%]"
        style={{
          background: 'hsl(271, 76%, 53%)',
          animationDuration: '14s',
        }}
      />
      {/* Green blob */}
      <div
        className="aura-blob w-[350px] h-[350px] top-[40%] right-[-15%]"
        style={{
          background: 'hsl(80, 100%, 50%)',
          animationDuration: '18s',
          animationDelay: '-5s',
        }}
      />
      {/* Pink blob */}
      <div
        className="aura-blob w-[300px] h-[300px] bottom-[-5%] left-[20%]"
        style={{
          background: 'hsl(330, 100%, 71%)',
          animationDuration: '16s',
          animationDelay: '-8s',
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
        }}
      />
    </div>
  );
};

export default AuraBackground;
