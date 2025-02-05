// Helper function to convert VAPID public key from base64 to uint8Array

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4); // Correct padding
  const base64 = (base64String + padding) // Add padding
    .replace(/\-/g, "+") // Replace `-` with `+`
    .replace(/_/g, "/"); // Replace `_` with `/`
  const rawData = atob(base64); // Decode base64 to binary string
  const outputArray = new Uint8Array(rawData.length); // Create Uint8Array

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// The endpoint for sending subscription information is: http://127.0.0.1:8000/notification/webpush/subscribe/
const saveSubscription = async (subscription) => {
  const response = await fetch("/webpush/subscribe/", {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(subscription),
  });

  return response.json();
};

self.addEventListener("install", (event) => {
  console.log("Service Worker install event");
});

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(
      "BNOQ9CepwOGWF4Yqv0woHZ14svEYMWzDaeYmMFIXo7SX_cXbv73jNAfZqUkK9wa0WvgEh3mZLI20ojQPgtzTxxA"
    ),
  });

  console.log(subscription);
  const response = await saveSubscription(subscription);
  console.log(response);
});

self.addEventListener("push", async (event) => {
  console.log("Push event received:", event);
  console.log("Hello");
  let data = {};

  if (event.data) {
    try {
      data = await event.data.json();
      console.log("Parsed data:", data);

      const options = {
        body: data.body || "Default body text",
        icon: data.icon || "/static/default.icon.png",
        data: {
          url: data.url || "http://127.0.0.1:8000",
        },
      };

      console.log("Notification options:", options);

      event.waitUntil(
        self.registration.showNotification(
          data.head || "Default title",
          options
        )
      );
    } catch (error) {
      console.error("Error parsing push data:", error);
      console.log("Raw push data:", event.data);
    }
  } else {
    console.log("No push data received");
  }
});
