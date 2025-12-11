export default function GlowBackground() {
  return (
    <>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600 blur-[200px] opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600 blur-[200px] opacity-20"></div>
    </>
  );
}
