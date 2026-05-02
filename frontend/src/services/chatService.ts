export function buildChatPayLoad(activeChatId: string, inputMessage: string) {
  return {
    thread_id: activeChatId,
    messages: [
      {
        role: "user",
        content: inputMessage,
      },
    ],
  };
}

export async function sendChatMessage(
  activeChatId: string,
  inputMessage: string,
) {
  const payload = buildChatPayLoad(activeChatId, inputMessage);

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res;
}