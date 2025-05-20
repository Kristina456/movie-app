export async function fetchFromApi(endpoint: string) {
  const token = process.env.AUTHORIZATION_TOKEN;

  if (!token)
    throw new Error("Missing AUTHORIZATION_TOKEN in environment variables");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(`${process.env.BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    const status = res.status;
    const statusText = res.statusText;
    throw new Error(`API request failed with status ${status}: ${statusText}`);
  }

  const data = await res.json();
  return data;
}
