import { programType } from "@/types/programs";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  program: programType;
};

const ProgramCurriculumTap: React.FC<Props> = ({ program }) => {
  const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // Initialize all sections as open
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const initialState: { [key: number]: boolean } = {};
    program.curriculum.forEach((item) =>
      item.curriculumType.forEach((section) => {
        initialState[section.id] = true; // open by default
      })
    );
    setOpenSections(initialState);
  }, [program]);

  const toggle = (id: number) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-background p-4 sm:p-6 md:p-8 space-y-8 md:space-y-10">
          {program.curriculum.map((item) => (
            <div key={item.id} className="space-y-4 sm:space-y-6">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">{item.title}</h1>
              <div className="grid gap-3 sm:gap-4">
                {item.curriculumType.map((section, index) => {
                  const isOpen = openSections[section.id];
                  const height = refs.current[section.id]?.scrollHeight || 0;
                  return (
                    <div key={section.id} className="border-b border-[#8AB9FF] rounded-2xl p-4 sm:p-6">
                      <button onClick={() => toggle(section.id)} className="flex justify-between items-center w-full text-start font-semibold text-base sm:text-lg md:text-xl text-foreground">
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                          <span className="text-primary mr-2">{(index + 1).toString().padStart(2, "0")}</span>
                          {section.title}
                        </span>
                        <FontAwesomeIcon icon={faChevronDown} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div ref={(el) => { refs.current[section.id] = el; }} style={{ maxHeight: isOpen ? `${height}px` : "0px" }} className="transition-all duration-500 ease-in-out overflow-hidden">
                        <div className="grid gap-3 sm:gap-4 border-t border-gray-300 py-4 sm:py-6 mt-3 sm:mt-4">
                          {section.subtitle && (
                            <p className="text-base sm:text-lg md:text-xl text-foreground font-medium">{section.subtitle}</p>
                          )}
                          {section.description.map((des, i) => (
                            <p key={i} className="flex items-start font-normal text-sm sm:text-base md:text-lg text-foreground">
                              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mr-2 mt-1" />
                              {des}
                            </p>
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
