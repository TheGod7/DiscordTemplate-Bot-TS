import { CommandBuilder, CommandsOptions } from "../../structures/Command";
import { SlashCommandOptions } from "../../structures/SlashCommands.interface";
import { Message, Collection } from "discord.js";
import { BotClient } from "../../structures/Client";

export default class TestCommand extends CommandBuilder {
  constructor(
    options: CommandsOptions = {
      name: "reload",
      category: "development",
      description: "Reload command for testing purposes",
      usage: "reload",
      botOwner: true,
    }
  ) {
    super(options);
  }

  async run(client: BotClient, message: Message, args: string[]) {
    const msg = await message.channel.send("Recharging commands and events...");

    client.loadCommands();
    client.loadSlashCommand();

    msg.edit("ready all are reloaded");
  }
}
