console.log("Content received")

var bodyLength = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.value) {
    InjectContentInCard();
  }
})

function InjectContentInCard() {
  const body = document.querySelectorAll("div#primary div#contents div#dismissible")
  bodyLength = body.length;

  if (!body) {
    setTimeout(InjectContentInCard, 500)
  }


  body.forEach((item) => {
    const link = item.getElementsByClassName("yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media")[0]?.href ?? ""
    ComponentDownload(item, link)
  })
}

// Función para verificar si se alcanzó el final del scroll
function isScrollAtBottom() {
  const body = document.querySelectorAll("div#primary div#contents div#dismissible")
  return body.length
  // const windowHeight = window.innerHeight;
  // const documentHeight = document.documentElement.scrollHeight;
  // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  // return scrollTop + windowHeight >= documentHeight;
}

// Función para capturar el evento de scroll
function handleScroll() {
  console.log(isScrollAtBottom());
  if (bodyLength < isScrollAtBottom()) {
    console.log("Entro a inyectar codigo");
    InjectContentInCard();
  }
}

// Capturar el evento de scroll
window.addEventListener('scroll', handleScroll);

// Ejecutar la función de inyección de código al cargar la página
window.addEventListener('load', InjectContentInCard);

/**
 * 
 * @param {Element} item 
 */
function ComponentDownload(item, link) {

  const div = document.createElement("div")
  div.id = "ytd-download-video"
  div.style.width = "100%"
  div.style.textAlign = "right"

  const imgDownload = document.createElement("img")
  imgDownload.src = chrome.runtime.getURL("download.png")

  const imgLoading = document.createElement("img")
  imgLoading.src = chrome.runtime.getURL("loading.png")
  imgLoading.classList.add("ytd-loading")



  const buttonDownload = document.createElement("button")
  buttonDownload.type = "button"
  buttonDownload.innerHTML = "Download Video"
  buttonDownload.classList.add("ytd-download")


  buttonDownload.append(imgDownload)
  buttonDownload.addEventListener('click', async function (e) {
    e.preventDefault()

    try {
      buttonDownload.prepend(imgLoading)
      const response = await fetch("http://localhost:3000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: link
        })
      })

      if (response.ok) {
        const dataJSON = await response.json()
        download(`http://localhost:3000/static/${encodeURIComponent(dataJSON.message)}`, dataJSON.message)

        console.log("Termino el tiempo...")
        buttonDownload.removeChild(imgLoading)
      }
    } catch (error) {
      console.log(error)
    }


  })

  div.appendChild(buttonDownload)

  item.appendChild(div)
}

/**
 * 
 * @param {HTMLButtonElement} element 
 * @param {boolean} clean 
 */
// function loadingProgress(element, clean = false) {
//   const imgLoading = document.createElement("img")
//   imgLoading.src = chrome.runtime.getURL("loading.png")
//   imgLoading.classList.add("ytd-loading")

//   element.prepend(imgLoading)

//   if (clean) {
//     element.removeChild(imgLoading)
//   }
// }

function download(url, nameToSave) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/mp4',
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        nameToSave,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
}