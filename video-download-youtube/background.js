chrome.webNavigation.onCompleted.addListener(function (details) {
  const url = new URL(details.url)

  if (details.url !== 'about:blank' && url.hostname === "www.youtube.com") {
    chrome.tabs.sendMessage(details.tabId, { value: true })
  }
})