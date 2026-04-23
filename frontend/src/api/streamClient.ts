import { useAuth } from "@clerk/clerk-react";

export const useStreamClient = () => {
  const { getToken } = useAuth();

  const authenticatedStream = async (url: string, body: any) => {
    
    const token = await getToken();

   
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error("Session Expired");
      throw new Error("Network Response Error");
    }

    return response.body;
  };

  return { authenticatedStream };
};
