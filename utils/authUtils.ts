function refreshTokenFromResponse(response: Response): string | null {
  const authHeader = response.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const [, token] = authHeader.split(" ");

  localStorage.setItem("authToken", token);
  return token;
}

export { refreshTokenFromResponse };
