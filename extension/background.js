// Watches outgoing requests on hilokal.com and grabs the "Cookie" request
// header from whichever request's URL contains "settings" (the XHR the
// user pointed at in DevTools > Network).

const LAST_KEY = "hilokal_settings_cookie";

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (!details.url.includes("settings")) return;
    if (!details.requestHeaders) return;

    const cookieHeader = details.requestHeaders.find(
      (h) => h.name.toLowerCase() === "cookie"
    );
    if (!cookieHeader || !cookieHeader.value) return;

    chrome.storage.local.set({
      [LAST_KEY]: {
        value: cookieHeader.value,
        url: details.url,
        capturedAt: Date.now(),
      },
    });
  },
  { urls: ["https://www.hilokal.com/*", "https://*.hilokal.com/*"] },
  ["requestHeaders", "extraHeaders"]
);
