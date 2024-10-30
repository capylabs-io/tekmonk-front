"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CommonInfo } from "./CommonInfo";
import { CompetitionContest } from "./competitionContent";
import { CompetitionInstructions } from "./competitionInstructions";
import { TechnicalRegulations } from "./technicalRegulations";

const tabs = [
  { id: "1", label: "Thông tin chung", value: <CommonInfo /> },
  { id: "2", label: "Nội dung thi đấu", value: <CompetitionContest /> },
  { id: "3", label: "Hướng dẫn thi đấu", value: <CompetitionInstructions /> },
  { id: "4", label: "Quy định kỹ thuật", value: <TechnicalRegulations /> },
];
export const AccordionContest = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        {tabs.map((item: any, index: number) => {
          return (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger className="text-gray-950 text-base">
                {item.label}
              </AccordionTrigger>
              <AccordionContent>{item.value}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};
