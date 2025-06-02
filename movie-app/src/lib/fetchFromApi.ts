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

  const response = await fetch(`${process.env.BASE_URL}${endpoint}`, {
    ...options,
    cache: "no-store",
  });

  if (!response.ok) {
    const status = response.status;
    const statusText = response.statusText;
    throw new Error(`API request failed with status ${status}: ${statusText}`);
  }

  const data = await response.json();
  return data;
}
