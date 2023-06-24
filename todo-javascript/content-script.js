console.log('Hello from the content script');

const contentTextOfATags = []
const aTags = document.getElementsByTagName("a")


for (const tag of aTags) {
  contentTextOfATags.push(tag.textContent)
}

chrome.storage.local.set({ contentTextOfATags })

chrome.runtime.sendMessage(null, contentTextOfATags, (res) => {
  console.log('Send Message from Content Script: ', res);
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request, sender, sendResponse);
  }
);


