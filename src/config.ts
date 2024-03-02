import { config } from "dotenv";
config();

export default {
  token: process.env.TOKEN ? process.env.TOKEN : "",
  BotOwner: process.env.BOTOWNER ? process.env.BOTOWNER : "",
  prefix: process.env.PREFIX ? process.env.PREFIX : "",
};
// Here put all of your env variables
