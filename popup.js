document.getElementById('filterBtn').addEventListener('click', () => {
  const config = {
    C: document.getElementById('C').value,
    S: document.getElementById('S').value,
    Lk: document.getElementById('Lk').value,
    P: document.getElementById('P').value,
    Lek: document.getElementById('Lek').value,
    L: document.getElementById('L').value
  };

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "filter", config: config });
  });
});

document.getElementById('resetBtn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "reset" });
  });
});