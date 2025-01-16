
import BackendStatus from "@/features/system/backendStatus";

const System = () => {
    return ( 
        <div className="p-2">
            <div className="inline-flex w-full justify-around">
                <h1 className={"text-2xl font-semibold text-yellow-950 dark:text-orange-300 animate-bounce"}>System Settings</h1>
            </div>
            <BackendStatus />
        </div>
     );
}
 
export default System;