(async () => {
  const listTC = document.getElementById("list-tc")

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const tc = request.tc;

    if (tc.length > 0) {

      tc.map(({ mes, value }) => {
        // Creando varias elemento que iran en la lista
        const li = document.createElement("li")
        const divLi = document.createElement("div")
        const span1 = document.createElement("span")
        const span2 = document.createElement("span")

        // Dando estilo al elemento
        divLi.style.display = "flex";
        divLi.style.gap = "20px";

        // asignando el valor
        span1.innerText = mes
        span2.innerText = value


        // Agregando elemento por nivel a la lista
        divLi.appendChild(span1)
        divLi.appendChild(span2)
        li.appendChild(divLi)
        listTC.appendChild(li)
      })
    }
  })

  async function getTabId() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    return tab.id
  }


  function example() {
    const resuls = document.querySelectorAll("div#resultado>table>tbody>tr")
    const getTC = []

    resuls.forEach((result) => {
      const selecting = result.querySelectorAll("td")

      let mes = selecting.item(0).textContent.trim()
      let value = selecting.item(1).textContent.trim()

      getTC.push({ mes, value })

    })

    chrome.runtime.sendMessage({ tc: getTC })
  }

  chrome.scripting
    .executeScript({
      target: { tabId: await getTabId() },
      func: example,
    })
    .then(() => console.log("script injected in all frames"));

})()


