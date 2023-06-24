const form = document.getElementById('form')
const inputContraint = document.getElementsByName('taskContraint')[0]

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputs = e.target.elements;

  chrome.storage.sync.set({ config: inputs.taskContraint.value })
})

function main() {
  const result = chrome.storage.sync.get(['config'])

  if (!result.hasOwnProperty('config')) {
    chrome.storage.sync.set({ config: inputContraint.value })
  }
}

main()