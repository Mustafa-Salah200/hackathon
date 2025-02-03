export const decodeJWT = (token) => {
  if (!token) return null;

  try {
    // Split the token into parts
    const base64Payload = token.split(".")[1];

    // Decode the Base64 payload
    const payload = atob(base64Payload);

    // Parse the JSON string
    return JSON.parse(payload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
