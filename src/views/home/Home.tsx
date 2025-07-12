// [Library Imports]
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

// [Module Imports]
import * as EventInterface from "@/interface/event";
import { eventService } from "@/services/eventService";
import SectionWhatsNew from "@/views/home/SectionWhatsNew";
import SectionCompetition from "@/views/home/SectionCompetition";
import SectionHackathons from "@/views/home/SectionHackathon";
import { useLoading } from '@/context/OverlayContext';
import { se } from "date-fns/locale";
import SectionFiltered from "./SectionFiltered";

// [Globals]
interface dataSchema {
  id: number;
  name: number;
  created_at: number;
}

interface Filter {
  name: string;
}

// [Exports]
export default function Home() {
  const [events, setEvents] = useState<EventInterface.Event[]>([]);
  const { showLoading, hideLoading } = useLoading();
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchEvent = async () => {
    try {
      const result = await eventService.getEvents();
      if (result && result.status) {
        setEvents(result.data);
        fetchFilters(result.data);
        hideLoading();
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const fetchFilters = (response: EventInterface.Event[]) => {
    // Extract out all tags and flatten them into string[]
    let tags: string[] = response?.map(
      e => e.tags
    ).flat(1)
    console.log(events);
    // Only keep unique tags
    tags = tags.filter(function(tag, pos) {
      return tags.indexOf(tag) == pos
    })
    // Fit filter format of Filter[]
    const filterArr: Filter[] = tags.map(
      tag => ({name: tag})
    )
    setFilters(filterArr);
  };

  useEffect(() => {
    showLoading();
    fetchEvent();
  }, []);

  const handleFilterClick = (filterId: string) => {
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filterId)) {
        // If already selected, remove it
        return prevSelectedFilters.filter((id) => id !== filterId);
      } else {
        // If not selected, add it
        return [...prevSelectedFilters, filterId];
      }
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div>
      <div className="flex items-center w-full max-w-screen px-auto py-4 min-h-10">
        {/* Left scroll arrow */}
        <button
          onClick={() => scroll('left')}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        {/* Scrollable filter container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto whitespace-nowrap py-2 px-2 scrollbar-hide flex-grow"
        >
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`
                flex-shrink-0
                inline-flex
                items-center
                justify-center
                px-6 py-3
                mx-2
                rounded-full
                text-lg
                font-medium
                transition-colors
                duration-300
                ease-in-out
                ${selectedFilters.includes(filter.name)
                  ? 'bg-indigo-400 text-white' // Selected state: Specific background color, dark text
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
              onClick={() => handleFilterClick(filter.name)}
            >
              {/* Removed icon rendering: {filter.icon && <span className="mr-2">{getIcon(filter.icon)}</span>} */}
              <span>{filter.name}</span> {/* Text is now the only content, centered by parent justify-center */}
            </button>
          ))}
        </div>

        {/* Right scroll arrow */}
        <button
          onClick={() => scroll('right')}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
    </div>
        {
          selectedFilters.length > 0 ? (
            <div>
              <h2 className="text-4xl font-bold mb-6 text-center pt-6">
                OPPORTUNITIES
              </h2>
              <div className="flex flex-col items-center justify-center gap-4 mb-8 w-screen px-10">
                <SectionFiltered events={events} filters={selectedFilters} />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl font-bold mb-6 text-center pt-6">
                OPPORTUNITIES
              </h2>
              <div className="flex flex-col items-center justify-center gap-4 mb-8 w-screen px-10">
                <SectionWhatsNew events={events} />
                <SectionCompetition events={events} />
                <SectionHackathons events={events} />
              </div>
            </div>
          )
        }
    </div>



    
  );
}
