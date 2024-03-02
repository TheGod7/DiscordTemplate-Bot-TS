import { Message } from "discord.js";
import { EventsBuilder, EventsOptions } from "../../structures/Events";
import { BotClient } from "../../structures/Client";

export default class ReadyEvent extends EventsBuilder {
  constructor(options: EventsOptions = { name: "messageCreate" }) {
    super(options);
  }

  run(message: Message, client: BotClient): void {
    if (message.author.bot) return;

    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.trim().split(/ +/g);
    const command = args[0].split(client.prefix)[1].toLowerCase();

    let cmd =
      client.command.find(
        (c) =>
          c.options.alias?.toLocaleLowerCase() === command.toLocaleLowerCase()
      ) ||
      client.command.find(
        (c) =>
          c.options.name.toLocaleLowerCase() === command.toLocaleLowerCase()
      );

    if (cmd) {
      if (cmd?.options.botOwner && client.BotOwner !== message.author.id) {
        message.reply("Only The bot owner");
        return;
      }

      cmd?.run(client, message, args.slice(1));
    }
  }
}
