// TabbedColumn.tsx
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils';


interface TabbbedColumnProps {
    tabs: number;
}

const TabbedColumn: React.FC<TabbbedColumnProps> = ({ tabs }) => {

    const { theme } = useTheme();
    const isDarkMode = theme === "light";

    // Implement your tabbed component here using the 'tabs' prop
    return (    
        <div>
        <Tabs defaultValue="1" className="w-full">
            <TabsList className={cn("w-full pl-16 relative", isDarkMode ? "bg-stone-400" : "bg-zinc-800")}>
            <h2 className={cn("absolute left-3 top-2 font-semibold", 
                isDarkMode ? "text-slate-600" : "text-gray-400" )}>
                Head
            </h2>
            {Array.from({ length: tabs }, (_, index) => (
                <TabsTrigger key={index + 1} value={`${index + 1}`}>
                    {index + 1}
                </TabsTrigger>
            ))}
            </TabsList>
            {Array.from({ length: tabs }, (_, index) => (
                <TabsContent key={index + 1} value={`${index + 1}`}>
                    <h2 className={cn(" text-center text-2xl font-semibold", isDarkMode ? "text-foreground" : "text-secondary")}>{index + 1}</h2>
                </TabsContent>
            ))}    
        </Tabs>
        </div>
    );
};

export default TabbedColumn;
