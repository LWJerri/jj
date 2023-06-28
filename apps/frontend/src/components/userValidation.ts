export async function userValidation(storage: Storage) {
  const token = storage.getItem("token");

  if (!token) {
    window.location.href = "/auth";
  } else {
    const request = await fetch("http://localhost:3005/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (request.status === 401) {
      storage.clear();

      window.location.href = "/auth";
    }
  }
}
