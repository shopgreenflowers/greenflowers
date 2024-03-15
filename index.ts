import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";
import * as Path from "path";
import data from "./data";

dotenv.config();
const token = process.env.TELEGRAM_TOKEN;

export const tgBot = new TelegramBot(token || '', {polling: true});

tgBot.on('message', (msg) => {
    if(msg.text==='/start') {
        let message =`Сорт:        🍃${data.assortment[0].name}🍃\n\nОписание: ${data.assortment[0].description}\n\nВ наличии: \n`
        data.assortment[0].items.forEach((item)=>{
          message+= `                        ${item.weight+"      ".substring(0,6-item.weight.length)}       ${"          ".substring(0,10-item.price.length)+item.price}\n`
        })
        tgBot.sendPhoto(msg.chat.id, Path.resolve(__dirname) + data.assortment[0].picture, {
            reply_markup: {inline_keyboard: [[{text: '📲 operator', url: `https://t.me/${data.operator}`}]]},
            caption:message
        })
    }
})