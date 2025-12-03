import React, { useState } from 'react';
import { Itinerary, DayPlan } from '../types';
import { MapPin, Clock, DollarSign, Lightbulb, ChevronLeft, CalendarDays } from 'lucide-react';

interface ItineraryResultProps {
  itinerary: Itinerary;
  onReset: () => void;
}

export const ItineraryResult: React.FC<ItineraryResultProps> = ({ itinerary, onReset }) => {
  const [activeDay, setActiveDay] = useState<number>(1);

  const currentDayPlan = itinerary.days.find(d => d.dayNumber === activeDay) || itinerary.days[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="relative pt-16 px-8 pb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        {itinerary.destination}, {itinerary.country}
                    </h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        <DollarSign size={16} className="text-green-600" />
                        예상 총 경비: <span className="font-semibold text-gray-800">{itinerary.totalBudgetEstimate}</span>
                    </p>
                </div>
                <button 
                    onClick={onReset}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition"
                >
                    <ChevronLeft size={16} />
                    다시 검색하기
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar: Day Navigation */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CalendarDays className="text-blue-600" size={20}/> 일정 선택
                </h3>
                <div className="space-y-2">
                    {itinerary.days.map((day) => (
                        <button
                            key={day.dayNumber}
                            onClick={() => setActiveDay(day.dayNumber)}
                            className={`w-full text-left p-3 rounded-lg transition border-l-4 ${
                                activeDay === day.dayNumber
                                    ? 'bg-blue-50 border-blue-600 text-blue-800 font-medium'
                                    : 'border-transparent hover:bg-gray-50 text-gray-600'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <span>Day {day.dayNumber}</span>
                            </div>
                            <span className="text-xs text-gray-400 block mt-1 truncate">{day.theme}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Travel Tips Card */}
             <div className="bg-amber-50 rounded-2xl shadow-sm p-6 border border-amber-100">
                <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <Lightbulb size={20} /> 여행 꿀팁
                </h3>
                <ul className="space-y-2">
                    {itinerary.travelTips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-amber-900 flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Main Content: Daily Timeline */}
        <div className="lg:col-span-2">
             <div className="bg-white rounded-2xl shadow-md p-8 min-h-[500px]">
                <div className="mb-6 border-b border-gray-100 pb-4">
                     <h2 className="text-2xl font-bold text-gray-800">Day {currentDayPlan.dayNumber}</h2>
                     <p className="text-blue-600 font-medium">{currentDayPlan.theme}</p>
                </div>
                
                <div className="relative border-l-2 border-blue-100 ml-3 space-y-10">
                    {currentDayPlan.activities.map((activity, idx) => (
                        <div key={idx} className="relative pl-8">
                            {/* Dot indicator */}
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                                <span className="text-sm font-bold text-blue-600 min-w-[60px] flex items-center gap-1">
                                    <Clock size={14}/> {activity.time}
                                </span>
                                <h4 className="text-lg font-bold text-gray-900">{activity.activity}</h4>
                            </div>
                            
                            <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                                <MapPin size={14} className="text-gray-400"/> {activity.location}
                            </div>
                            
                            <p className="text-gray-700 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm leading-relaxed">
                                {activity.description}
                            </p>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};