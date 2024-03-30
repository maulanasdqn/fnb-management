import { FC, ReactElement, useState } from 'react';

export type Tab = {
  title: string;
  content: JSX.Element;
};

export type TabsProps = {
  tabs: Tab[];
};

export const Tabs: FC<TabsProps> = ({ tabs }): ReactElement => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className=" shadow-lg rounded-md text-grey-400 md:text-md text-xs">
      <div className="flex w-full justify-between">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              activeTab === index ? 'bg-white text-black font-bold' : ''
            } px-4 py-2 font-medium focus:outline-none`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-4">{tabs[activeTab].content}</div>
    </div>
  );
};
