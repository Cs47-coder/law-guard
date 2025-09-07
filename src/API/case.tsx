import { get } from "../utils/fetchHelpers";

// Fetch a legal answer from FastAPI (GET request)
export const getLegalAnswer = async (question: string, lang: string = "en") => {
  const endpoint = `/ask?question=${encodeURIComponent(question)}&lang=${lang}`;
  return await get(endpoint);
};
