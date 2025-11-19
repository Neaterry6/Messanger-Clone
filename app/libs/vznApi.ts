export async function getVznTextReply(prompt: string, endpoint: string) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error("VZN API error");
  const data = await res.json();
  return data.reply; 
}

export async function getVznImageReply(prompt: string, endpoint: string) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error("VZN Image API error");
  const data = await res.json();
  return data.imageUrl; 
}
