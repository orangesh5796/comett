import React, { useState } from 'react';
import { TravelForm } from './components/TravelForm';
import { ItineraryResult } from './components/ItineraryResult';
import { generateItinerary } from './services/geminiService';
import { TravelFormData, Itinerary, AppState } from './types';
import { Plane, Map as MapIcon, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.FORM);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormSubmit = async (data: TravelFormData) => {
    setAppState(AppState.LOADING);
    setErrorMsg(null);
    try {
      const result = await generateItinerary(data);
      setItinerary(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setErrorMsg("일정을 생성하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setAppState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setItinerary(null);
    setAppState(AppState.FORM);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Plane size={24} />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">Wanderlust AI</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        {appState === AppState.FORM && (
          <div className="w-full animate-fade-in-up">
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                당신만의 완벽한 <span className="text-blue-600">여행 일정</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                복잡한 계획은 AI에게 맡기고 설렘만 챙기세요. 국가, 도시, 일정만 알려주시면 최적의 코스를 제안해드립니다.
              </p>
            </div>
            <TravelForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="text-center animate-pulse flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6">
                 <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                 <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">여행 코스를 계획 중입니다...</h2>
            <p className="text-gray-500">맛집을 찾고 동선을 최적화하고 있어요.</p>
          </div>
        )}

        {appState === AppState.RESULT && itinerary && (
          <ItineraryResult itinerary={itinerary} onReset={resetApp} />
        )}

        {appState === AppState.ERROR && (
           <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg border border-red-100">
             <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <MapIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
             </div>
             <h3 className="text-lg font-medium text-gray-900 mb-2">오류가 발생했습니다</h3>
             <p className="text-gray-500 mb-6">{errorMsg}</p>
             <button 
                onClick={resetApp}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
             >
                다시 시도하기
             </button>
           </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Wanderlust AI. All rights reserved. Powered by Gemini.
        </div>
      </footer>
    </div>
  );
};

export default App;