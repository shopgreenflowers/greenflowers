import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";
import * as Path from "path";
import { CronJob } from 'cron';
import data from "./data";
import axios from "axios";

dotenv.config();
const token = process.env.TELEGRAM_TOKEN;

export const tgBot = new TelegramBot(token || '', {polling: true});

import express from 'express';
import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req,res,next)=> {
    console.log(req.body);
    console.log(req.query);
    res.status(200).json('server worked')
    //next();
})


tgBot.on('message', (msg) => {
    if (msg.text === '/start') {
        let message = `Сорт:        🍃${data.assortment[0].name}🍃\n\nОписание: ${data.assortment[0].description}\n\nВ наличии: \n`
        data.assortment[0].items.forEach((item) => {
            message += `                        ${item.weight + "      ".substring(0, 6 - item.weight.length)}       ${"          ".substring(0, 10 - item.price.length) + item.price}\n`
        })
        tgBot.sendPhoto(msg.chat.id, Path.resolve(__dirname) + data.assortment[0].picture, {
            reply_markup: {inline_keyboard: [[{text: '📲 operator', url: `https://t.me/${data.operator}`}]]},
            caption: message
        })
    }
})
const job = new CronJob(
    '*/10 * * * *',
    async ()=> {
        try {
            console.log( await axios('https://greenflowers.onrender.com'));
        }catch(e){
            console.log('tick')
        }
    },
    null,
    true,
    'America/Los_Angeles'
);
job.start();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});