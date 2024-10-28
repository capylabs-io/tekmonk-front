"use client";

import { memo, useEffect, useRef, useState } from "react";
import { CommonInfo } from "./rules/CommonInfo";
import { CompetitionContest } from "./rules/competitionContent";
import { TechnicalRegulations } from "./rules/technicalRegulations";
import { CompetitionInstructions } from "./rules/competitionInstructions";
const tabs = [
  { id: "1", label: "Thông tin chung" },
  { id: "2", label: "Nội dung thi đấu" },
  { id: "3", label: "Hướng dẫn thi đấu" },
  { id: "4", label: "Quy định kỹ thuật" },
];
const ContestRules = ({changeRuleAction} : {changeRuleAction: (step:string) => void}) => {
  const [activeTab, setActiveTab] = useState("1");
  const scrollPosition = useRef(0);
  const handleTabChange = (tabId:any) => {
    scrollPosition.current = window.scrollY; // Lưu vị trí cuộn hiện tại
    setActiveTab(tabId);
  };
  useEffect(() => {
    window.scrollTo(0, scrollPosition.current);
  }, [activeTab]);

  return (
    <div className="w-full h-full min-h-[500px] mix-w-[400px] max-w-4xl mx-auto px-4 mt-4">
      <nav className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              handleTabChange(tab.id)
              changeRuleAction(tab.id)
            }}
            className={`flex-1 py-2 px-1 text-center text-sm font-medium text-SubheadMd ${
              activeTab === tab.id
                ? "text-primary-950 border-b-2 border-primary-600"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="mt-4">
        {activeTab === "1" && <CommonInfo />}
        {activeTab === "2" && <CompetitionContest />}
        {activeTab === "3" && <CompetitionInstructions />}
        {activeTab === "4" && <TechnicalRegulations />}
      </div>
    </div>
  );
};

export default memo(ContestRules);
