export async function getCurrentUser() {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // console.log(res);

  if (!res.ok) return null;

  return await res.json();
}

export async function getBalances() {
  if (typeof window === "undefined") return null; // make sure we're in browser

  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me/balances`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  return await res.json();
}

export async function getRequests() {
  if (typeof window === "undefined") return null; // make sure we're in browser

  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leave-requests/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Requests:", res);
  
  if (!res.ok) return null;
  return await res.json();
}
