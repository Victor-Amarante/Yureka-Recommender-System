export function DottedBackground() {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none z-0" />

      <div
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
    </>
  );
}
