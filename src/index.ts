import express from "express";
import {PORT} from "./env"
import fetch from "node-fetch"

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//公開する場合は、しっかり設定する
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.listen(PORT, () => {
    console.log(`Start on port ${PORT}`)
})

app.post('/html', async(req: express.Request, res: express.Response) => {
        console.log(`post ${req.body.url}`)
        const data = await fetch(req.body.url).then((response) => {
            if(!response.ok){
                new Error("fail")
            }
            return response.text();
        }).catch((err) => console.error(err))
        console.log(data)
        res.send(data)
})

app.get('', async(req: express.Request, res: express.Response) => {
    res.send("Hello! fiecha-server")
})