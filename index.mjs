import { Bard } from "googlebard";
import express, { response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
let bot = new Bard(`__Secure-1PSID=${process.env.ID}`);

const app = express();
const server = createServer(app);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api.search", async (req, res) => {
  var query = decodeURI(req.url).split("/api.search?").pop();
  if (query != undefined) {
    let response = await bot.ask(
      `Search for "${query}", and return results in json format as, {"text": $text, "image": $img, "video": $vid, "link": $link, "title": $title, "releated_search_on_google": [$list]}`
    );
    res.json(response.split("```json").pop().split("```")[0]);
  } else {
    res.send(404);
  }
});

server.listen(process.env.PORT, '0.0.0.0');
