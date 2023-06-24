import fs from "node:fs"
import path from "node:path"
import express from "express"
import cors from "cors"

import ytdl from "ytdl-core"

const app = express()
const routes = express.Router()
const PORT = 3000

app.use(cors())
app.use('/static', express.static('videos'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routes.post("/download", async (req, res) => {
  const { link } = req.body

  if (!ytdl.validateURL(link)) {
    res.status(400).send({
      message: "Url not found"
    })
  }

  const { videoDetails } = await ytdl.getInfo(link)

  ytdl(link)
    .pipe(fs.createWriteStream(path.join("videos", `${videoDetails.title}.mp4`)))
    .on("open", () => {
      console.log("Descarga inicializada")
    })
    .on("ready", () => {
      console.log("Se esta descargando...")
    })
    .on("finish", () => {
      console.log("Video descargado")
      res.status(200).json({
        message: `${videoDetails.title}.mp4`
      })

      return;

    })



})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
})