"use client";

import { programType } from "@/types/programs";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  program: programType;
};

const ProgramCurriculumTap: React.FC<Props> = ({ program }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full p-[24px] space-y-[40px]">
      {program.curriculum.map((item) => ( // ✅ fixed spelling
        <div key={item.id} className="space-y-[24px]">
          {/* Section Title */}
          <h1 className="font-bold text-[36px] text-foreground">{item.title}</h1>

          {/* Curriculum Items */}
          <div className="grid gap-[16px]">
            {item.curriculumType.map((section, index) => {
              const isOpen = openId === section.id;
              const height = refs.current[section.id]?.scrollHeight || 0;

              return (
                <div key={section.id} className="border-b py-3  border-1 border-[#8AB9FF] rounded-[20px] p-[24px]">
                  {/* Toggle Button */}
                  <button
                    onClick={() => toggle(section.id)}
                    className="flex justify-between items-center w-full font-semibold text-[18px] text-foreground"
                  >
                    <span className="text-[24px] ">
                      <span className="text-primary mr-2"> {(index + 1).toString().padStart(2, "0")}
    </span>{" "}{section.title}
                    </span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  <div
                    ref={(el) => {
                      refs.current[section.id] = el;
                    }}
                    style={{
                      maxHeight: isOpen ? `${height}px` : "0px",
                    }}
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                  >
                    <div className="p-[24px] grid gap-[16px] border-t border-gray-300 py-6 mt-4">
                      {section.subtitle && (
                        <p className="text-[18px] text-foreground font-medium">
                          {section.subtitle}
                        </p>
                      )}
                      {section.description.map((des, i) => (
                        <p key={i} className="font-normal text-[16px] text-foreground" ><FontAwesomeIcon icon={faCheckCircle}  className="text-primary mr-3" />{des} </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgramCurriculumTap;
