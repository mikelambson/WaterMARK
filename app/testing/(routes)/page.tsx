export default function Testing() {
  return (
    <div className="p-2 ml-4">
      <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Testing</h1>

      <p className="md:text-center">This route will be used to text various components and future integrations.</p>
      <p className="md:text-center text-destructive dark:text-red-300 font-medium">WARNING: components can and will break the UI during their course of development and intentional error checking!</p>

      <div className="m-8 border-2 border-black/10 dark:border-gray-500/10 rounded-lg bg-card grid grid-cols-2 grid-flow-col p-6 min-h-[50dvh] h-full gap-8">
        <div className="border-2 border-muted bg-black/25 dark:bg-white/25 rounded-lg py-4 px-8"> 
          <h2 className="text-xl font-medium underline underline-offset-8 mb-2 -ml-4">Login Development</h2>
          <p>Build login overlay component, build login form, and function useMutation to fetch and store login cookies and profile properly while session is maintained</p>
        </div>
        <div className="border-2 border-muted bg-black/25 dark:bg-white/25 rounded-lg py-4 px-8"> 
          <h2 className="text-xl font-medium underline underline-offset-8 mb-2 -ml-4">Scheduling Board Development</h2>
          <p>Change to react-dnd-kit to make use of SSE and allow for live refreshed/auto-reordered schedules</p>
        </div>
      </div>
    </div>
  );
}
