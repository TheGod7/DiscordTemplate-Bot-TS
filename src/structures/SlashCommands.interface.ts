import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { BotClient } from "./Client";

export interface SlashCommandOptions {
  data: SlashCommandBuilder;
  execute: (
    client: BotClient,
    interaction: ChatInputCommandInteraction<CacheType>
  ) => Promise<void>;
}

/* Example of a slash command

import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { BotClient } from "../../structures/Client";

export default {
  data: new SlashCommandBuilder() // the slash command builder
    .setName("Ping")
    .setDescription("ping of the bot"),
  execute: async (
    client: BotClient,
    interaction: ChatInputCommandInteraction<CacheType>
  ) => { //the execution of the command
    interaction.reply(
      `🏓Latency is ${
        Date.now() - interaction.createdTimestamp
      }ms. API Latency is ${Math.round(client.ws.ping)}ms`
    );
  },
};

*/
