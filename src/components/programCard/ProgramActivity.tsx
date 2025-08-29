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
    <div className="w-full bg-background grid p-[24px] gap-[40px]">
      <h1 className="font-bold text-[36px] text-foreground">{program.title}</h1>

      {/* ✅ Scrollable row with hidden scrollbar */}
      <div className="relative flex gap-4 overflow-x-auto pb-2 mt-2 scrollbar-hide">
        {program.openingprogram.map((gen, index) => (
          <button
            key={gen.id}
            data-id={gen.id}
            ref={(el): void => {
              tabsRef.current[index] = el;
            }}
            onClick={() => setSelectedGenerationId(gen.id)}
            className={`px-4 py-2 rounded-2xl font-medium whitespace-nowrap ${
              selectedGenerationId === gen.id
                ? "text-primary"
                : "text-foreground hover:bg-gray-200"
            }`}
          >
            Generation {gen.generation}
          </button>
        ))}

        {/* underline */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-1 bg-primary transition-all duration-300 rounded"
        />
      </div>

      {selectedGeneration?.activities?.length ? (
        selectedGeneration.activities.map((section) => (
          <div key={section.id}>
            <h2 className="font-bold text-[36px] text-foreground">{section.title}</h2>
            <div>
              {section.activityType.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col gap-[24px] my-[24px] p-[24px] rounded-2xl border-l-1 border-transparent relative"
                >
                  <div className="absolute top-0 left-0 h-full w-0.5 rounded-l-2xl bg-gradient-to-b from-[#328BE6] to-transparent"></div>
                  <h3 className="font-bold text-[20px] text-foreground">{activity.title}</h3>
                  <p className="font-normal text-[16px] text-foreground">{activity.description}</p>
                  <Image
                    unoptimized
                    height={500}
                    width={500}
                    src={activity.image}
                    alt={activity.title}
                    className="rounded-[24px] w-full h-[364px]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">
          No activities for this generation yet.
        </p>
      )}
    </div>
  );
};

export default ProgramActivityTap;
