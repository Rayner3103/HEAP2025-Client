// [Library Imports]
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, useContext } from "react";

// [Module Imports]
import * as EventInterface from "@/interface/event";
import { eventService } from "@/services/eventService";
import SectionWhatsNew from "@/views/home/SectionWhatsNew";
import SectionCompetition from "@/views/home/SectionCompetition";
import SectionHackathons from "@/views/home/SectionHackathon";
import SectionAll from "@/views/home/SectionAll";
import { useLoading } from "@/context/OverlayContext";
import SectionFiltered from "@/views/home/SectionFiltered";
import DisplaySection from "@/views/home/DisplaySection";
import AuthContext from "@/context/AuthContext";
import * as UserInterface from "@/interface/user";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/context/SearchContext";
import { useAlertDialog } from "@/context/AlertDialogContext";

// [Globals]
interface Filter {
  name: string;
}

// [Exports]
export default function Home() {
  const [events, setEvents] = useState<EventInterface.Event[]>([]);
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const { search } = useSearch();
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { showAlert } = useAlertDialog();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchEvent = async () => {
    try {
      const result = await eventService.getEvents();
      hideLoading();
      if (result && result.status) {
        const currentDate = new Date(Date.now());
        const unexpiredEvents = result.data.filter(
          (event: EventInterface.Event) => {
            const signupDeadline = new Date(event.signupDeadline);
            return !event.signupDeadline || signupDeadline >= currentDate;
          }
        );
        setEvents(unexpiredEvents);
        fetchFilters(result.data);
      }
    } catch (e: any) {
      hideLoading();
      showAlert({
        title: "Failure",
        message: e.message,
        okText: "Retry",
        onConfirm: () => {fetchEvent()},
      });
    }
  };

  const fetchFilters = (response: EventInterface.Event[]) => {
    let tags: string[] = response?.map((e) => e.tags).flat(1);
    tags = tags.filter((tag, pos) => tags.indexOf(tag) === pos);
    const filterArr: Filter[] = tags
      .map((tag) => ({ name: tag }))
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilters(filterArr);
  };

  useEffect(() => {
    showLoading();
    fetchEvent();
    return () => {
      hideLoading();
    };
  }, []);

  const handleFilterClick = (filterId: string) => {
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filterId)) {
        return prevSelectedFilters.filter((id) => id !== filterId);
      } else {
        return [...prevSelectedFilters, filterId];
      }
    });
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-[#FAF9E6] min-h-screen overflow-x-hidden">
      {/* Filter Bar */}
      <div className="flex items-center w-full overflow-x-hidden py-4 px-4 bg-white/80 backdrop-blur-md shadow-md rounded-xl mx-auto max-w-screen-xl">
        {/* Left scroll arrow */}
        <button
          onClick={() => scroll("left")}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-[#91ABFF] hover:scale-125 transition-transform duration-200 ease-in-out focus:outline-none"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        {/* Scrollable filter container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-3 whitespace-nowrap p-2 scrollbar-hide flex-grow rounded-lg max-w-full"
        >
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`
                flex-shrink-0
                inline-flex
                items-center
                justify-center
                px-5 py-2.5
                mx-1
                rounded-full
                text-base
                font-medium
                transition-all
                duration-300
                ease-in-out
                ${
                  selectedFilters.includes(filter.name)
                    ? "bg-[#91ABFF] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-[#91ABFF] hover:text-white"
                }
              `}
              onClick={() => handleFilterClick(filter.name)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-4 h-8 border-l border-gray-300"></div>

        {/* Clear Filters Button */}
        <button
          onClick={() => setSelectedFilters([])}
          className="ml-4 flex-shrink-0 px-4 py-2 rounded-full bg-red-400 text-white font-semibold hover:bg-red-500 transition"
        >
          Clear Filters
        </button>

        {/* Right scroll arrow */}
        <button
          onClick={() => scroll("right")}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-[#91ABFF] hover:scale-125 transition-transform duration-200 ease-in-out focus:outline-none"
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Main Sections */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-center pt-10 mb-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
        OPPORTUNITIES
      </h2>
      <div className="flex flex-col items-center justify-center gap-6 mb-10 max-w-full px-6">
        {selectedFilters.length > 0 || search !== "" ? (
          <SectionFiltered events={events} filters={selectedFilters} />
        ) : (
          <>
            <SectionWhatsNew events={events} />
            <SectionCompetition events={events} />
            <SectionHackathons events={events} />
            <DisplaySection events={events} sectionTitle="All Opportunities" />
          </>
        )}
      </div>

      {/* Floating Add Button */}
      {role !== UserInterface.Role.USER && (
        <Button
          className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 bg-gradient-to-br from-indigo-400 to-pink-500 text-white text-4xl shadow-xl hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-300 ease-in-out"
          onClick={() => navigate("/add")}
        >
          +
        </Button>
      )}
    </div>
  );
}
