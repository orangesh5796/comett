export interface Activity {
  time: string;
  activity: string;
  description: string;
  location: string;
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  activities: Activity[];
}

export interface Itinerary {
  destination: string;
  country: string;
  totalBudgetEstimate: string;
  travelTips: string[];
  days: DayPlan[];
}

export interface TravelFormData {
  country: string;
  city: string;
  duration: number;
  people: number;
  budget: 'budget' | 'standard' | 'luxury';
}

export enum AppState {
  FORM,
  LOADING,
  RESULT,
  ERROR
}