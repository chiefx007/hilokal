const LAST_KEY = "hilokal_settings_cookie";

const statusEl = document.getElementById("status");
const tokenEl = document.getElementById("token");
const sourceEl = document.getElementById("source");
const copyBtn = document.getElementById("copyBtn");
const refreshBtn = document.getElementById("refreshBtn");
const toastEl = document.getElementById("toast");

function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = "status" + (kind ? " " + kind : "");
}

function timeAgo(ts) {
  const secs = Math.round((Date.now() - ts) / 1000);
  if (secs < 5) return "just now";
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  return `${hrs}h ago`;
}

async function load() {
  setStatus("Checking...");
  tokenEl.value = "";
  sourceEl.textContent = "";
  copyBtn.disabled = true;

  const data = await chrome.storage.local.get(LAST_KEY);
  const captured = data[LAST_KEY];

  if (!captured || !captured.value) {
    setStatus(
      "No cookie captured yet. Reload hilokal.com so the 'settings' request fires, then reopen this popup.",
      "err"
    );
    return;
  }

  tokenEl.value = captured.value;
  sourceEl.textContent = `From: ${captured.url} (${timeAgo(captured.capturedAt)})`;
  setStatus("Cookie captured.", "ok");
  copyBtn.disabled = false;
}

copyBtn.addEventListener("click", async () => {
  if (!tokenEl.value) return;
  await navigator.clipboard.writeText(tokenEl.value);
  toastEl.textContent = "Copied to clipboard.";
  setTimeout(() => (toastEl.textContent = ""), 1500);
});

refreshBtn.addEventListener("click", load);

load();
