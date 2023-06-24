chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create(
    {
      title: "Add sush as task",
      id: "content-menu-1",
      contexts: ["selection", "image"]
    }
  )
  chrome.contextMenus.create(
    {
      title: "Read this text",
      id: "content-menu-2",
      contexts: ["selection"]
    }
  )

  // Desde Aca podemos consumir una API para darle un uso mas extendido a nuestra "App Extension"
  // --> API
  chrome.contextMenus.onClicked.addListener(async (event) => {
    // console.log({ selectionText: event.selectionText });
    // chrome.storage.sync.set({ tasks: [...event.selectionText] })
    // chrome.search.query({
    //   disposition: "NEW_TAB",
    //   text: event.selectionText
    // })


    if (event.menuItemId === "content-menu-1") {
      const data = await getStorage('tasks')

      setStorage({ tasks: [...data.tasks, event.selectionText] });
    }
    else if (event.menuItemId === "content-menu-2") {
      chrome.tts.speak(event.selectionText, { 'lang': 'es-ES', 'rate': 1.0 });
    }




    // chrome.runtime.onMessage.addListener(
    //   function (request, sender, sendResponse) {
    //     console.log(sender, sendResponse);
    //     console.log(sender.id);
    //     console.log(event.selectionText)

    //     // chrome.tabs.sendMessage(sender.tab.id, { messageBackground: "hello! Received your message. Thanks you" });

    //   }
    // );

  })

})

async function getStorage(key) {
  return await chrome.storage.local.get([key])
}

function setStorage(value) {
  chrome.storage.local.set(value)
}



console.log('Inicializando');
