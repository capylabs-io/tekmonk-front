import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  className,
}) => {
  return (
    <div
      className={cn("grid border-b border-gray-200 mt-4", className, {
        "grid-cols-2": tabs.length === 2,
        "grid-cols-3": tabs.length === 3,
        "grid-cols-4": tabs.length === 4,
        "grid-cols-5": tabs.length === 5,
      })}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="focus:outline-none"
        >
          <div className={cn(" text-center flex items-center justify-center")}>
            <div
              className={cn(
                "py-3",
                activeTabId === tab.id
                  ? "border-b-4 border-primary-40 text-primary-95"
                  : "text-gray-50"
              )}
            >
              {tab.label}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
