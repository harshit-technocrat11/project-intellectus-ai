import axios from "axios";

export interface ChatResponse {
  summary: string;
  generated_sql: string;
  data: {
    columns: string[];
    rows: any[];
  };
}

export async function sendQuestion(question: string): Promise<ChatResponse> {
  const response = await axios.post("http://localhost:8000/chat", {
    question,
  });

  return response.data;
}
