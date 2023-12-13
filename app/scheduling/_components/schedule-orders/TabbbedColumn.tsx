// TabbedColumn.tsx
import { useTheme } from "next-themes";
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
            <h2 className={cn("pb-3 font-bold", isDarkMode ? "text-gray-500" : "text-slate-800")}>
            Number of Tabs: {tabs}
            </h2>
        </div>
    );
};

export default TabbedColumn;
