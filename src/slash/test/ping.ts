import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { BotClient } from "../../structures/Client";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping of the bot"),
  execute: async (
    client: BotClient,
    interaction: ChatInputCommandInteraction<CacheType>
  ) => {
    interaction.reply(
      `🏓Latency is ${
        Date.now() - interaction.createdTimestamp
      }ms. API Latency is ${Math.round(client.ws.ping)}ms`
    );
  },
};
