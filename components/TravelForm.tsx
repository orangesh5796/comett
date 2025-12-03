import React, { useState } from 'react';
import { TravelFormData } from '../types';
import { MapPin, Calendar, Users, Wallet, Globe } from 'lucide-react';

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
}

export const TravelForm: React.FC<TravelFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TravelFormData>({
    country: '',
    city: '',
    duration: 3,
    people: 2,
    budget: 'standard',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'people' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.country || !formData.city) {
      alert('국가와 도시를 입력해주세요.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-blue-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">여행 계획 시작하기</h2>
        <p className="text-blue-100 text-sm">원하는 목적지와 조건을 입력하면 AI가 최적의 코스를 제안합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-4">
          {/* Country & City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Globe size={16} /> 국가
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="예: 일본"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin size={16} /> 도시
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="예: 오사카"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Duration & People */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar size={16} /> 여행 기간 (일)
              </label>
              <input
                type="number"
                name="duration"
                min="1"
                max="14"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Users size={16} /> 인원 (명)
              </label>
              <input
                type="number"
                name="people"
                min="1"
                max="20"
                value={formData.people}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Wallet size={16} /> 예산 수준
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, budget: 'budget' })}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition ${
                  formData.budget === 'budget'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                💰 알뜰형
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, budget: 'standard' })}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition ${
                  formData.budget === 'standard'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                ⚖️ 일반형
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, budget: 'luxury' })}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition ${
                  formData.budget === 'luxury'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                ✨ 호화형
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-200 transform active:scale-95 shadow-lg"
        >
          여행 일정 생성하기
        </button>
      </form>
    </div>
  );
};