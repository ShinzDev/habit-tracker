export default function SplashScreen() {
  return (
    // The TRD requires it to be visually centered
    <div 
      className="flex min-h-screen items-center justify-center bg-white" 
      data-testid="splash-screen" //
    >
      <h1 className="text-4xl font-bold tracking-tight text-blue-600">
        Habit Tracker
      </h1>
    </div>
  );
}