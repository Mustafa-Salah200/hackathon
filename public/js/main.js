// YT

// main.js

const checkPermission = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No support for service worker");
  }
  if (!("Notification" in window)) {
    throw new Error("No support for notification app");
  }
};

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register(
    "/static/js/service-worker.js"
  );
  return registration;
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted")
    throw new Error("Notification Permission not granted");
};

const main = async () => {
  checkPermission();
  await requestNotificationPermission();
  await registerSW();
};
