import { GoogleGenAI, Type } from "@google/genai";
import { TravelFormData, Itinerary } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateItinerary = async (data: TravelFormData): Promise<Itinerary> => {
  const modelId = "gemini-2.5-flash";

  const budgetMap = {
    budget: "알뜰한(Budget)",
    standard: "일반적인(Standard)",
    luxury: "호화로운(Luxury)"
  };

  const prompt = `
    다음 정보를 바탕으로 한국어로 작성된 상세한 여행 일정을 JSON 형식으로 만들어주세요:
    - 국가: ${data.country}
    - 도시: ${data.city}
    - 여행 기간: ${data.duration}일
    - 인원: ${data.people}명
    - 예산 수준: ${budgetMap[data.budget]}

    각 날짜별로 아침, 점심, 오후, 저녁 일정을 포함하고, 이동 동선을 고려하여 현실적인 코스를 짜주세요.
    맛집 추천도 포함해주세요.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      systemInstruction: "당신은 세계 최고의 여행 가이드입니다. 한국인 여행객을 위해 흥미롭고 실용적인 여행 코스를 제안합니다.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING, description: "도시 이름" },
          country: { type: Type.STRING, description: "국가 이름" },
          totalBudgetEstimate: { type: Type.STRING, description: "예상 총 경비 (통화 포함)" },
          travelTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "여행 꿀팁 3-5가지"
          },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayNumber: { type: Type.INTEGER },
                theme: { type: Type.STRING, description: "그 날의 테마 (예: 역사 탐방, 미식 투어)" },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING, description: "시간대 (예: 09:00, 점심, 14:00)" },
                      activity: { type: Type.STRING, description: "활동 이름" },
                      description: { type: Type.STRING, description: "활동에 대한 상세 설명 및 팁" },
                      location: { type: Type.STRING, description: "장소 이름" }
                    },
                    required: ["time", "activity", "description", "location"]
                  }
                }
              },
              required: ["dayNumber", "theme", "activities"]
            }
          }
        },
        required: ["destination", "country", "totalBudgetEstimate", "travelTips", "days"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as Itinerary;
  }
  
  throw new Error("No response from Gemini");
};