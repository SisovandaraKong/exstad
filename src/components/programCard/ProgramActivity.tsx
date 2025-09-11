import { programType } from "@/types/programs";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type Props = {
  program: programType;
};

const ProgramActivityTap: React.FC<Props> = ({ program }) => {
  const [selectedGenerationId, setSelectedGenerationId] = useState(
    program.openingprogram[0]?.id || null
  );

  const selectedGeneration = program.openingprogram.find(
    (gen) => gen.id === selectedGenerationId
  );

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTab = tabsRef.current.find(
      (tab) => tab?.dataset.id === selectedGenerationId?.toString()
    );
    if (currentTab && underlineRef.current) {
      const { offsetLeft, offsetWidth } = currentTab;
      underlineRef.current.style.transform = `translateX(${offsetLeft}px)`;
      underlineRef.current.style.width = `${offsetWidth}px`;
    }
  }, [selectedGenerationId, program.openingprogram]);

  return (
    <div className="w-full bg-background grid p-4 sm:p-6 md:p-8 gap-10">
  <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">{program.title}</h1>

  {/* Scrollable row */}

<div className="relative flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 mt-2 scrollbar-hide">
    {program.openingprogram.map((gen, index) => (
      <button
        key={gen.id}
        data-id={gen.id}
        ref={(el): void => { tabsRef.current[index] = el; }}
        onClick={() => setSelectedGenerationId(gen.id)}
        className={`px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-2xl font-medium whitespace-nowrap text-sm sm:text-base md:text-lg ${
          selectedGenerationId === gen.id ? "text-primary" : "text-foreground hover:bg-gray-200"
        }`}
      >
        Generation {gen.generation}
      </button>
    ))}
    <div ref={underlineRef} className="absolute bottom-0 h-1 bg-primary transition-all duration-300 rounded" />
  </div>


  {selectedGeneration?.activities?.length ? (
    selectedGeneration.activities.map((section) => (
      <div key={section.id} className="space-y-4 sm:space-y-6">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">{section.title}</h2>
        <div className="grid gap-4 sm:gap-6">
          {section.activityType.map((activity) => (
            <div key={activity.id} className="relative flex flex-col gap-4 sm:gap-6 my-4 sm:my-6 p-4 sm:p-6 md:p-8 rounded-2xl border-l-0.5 border-transparent">
              <div className="absolute top-0 left-0 h-full w-0.5 rounded-l-2xl bg-gradient-to-b from-[#328BE6] to-transparent"></div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl text-foreground">{activity.title}</h3>
              <p className="font-normal text-sm sm:text-base md:text-lg text-foreground">{activity.description}</p>
              <Image
                unoptimized
                height={500}
                width={500}
                src={activity.image}
                alt={activity.title}
                className="rounded-2xl w-full h-auto max-h-96 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center text-sm sm:text-base md:text-lg">No activities for this generation yet.</p>
  )}
</div>
  
  );
};

export default ProgramActivityTap;
