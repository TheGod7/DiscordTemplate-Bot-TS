import { Client, Message } from "discord.js";

export const categories = {
  development: "development category only for owners of the bot",
  utils: "utils category only for owners of the bot",
  //put here the category of your bot and a description
};

type categoryResolve = keyof typeof categories;

export interface CommandsOptions {
  name: string;
  category: categoryResolve;
  alias?: string;
  description: string;
  usage: string;
  botOwner?: boolean;
  hide?: boolean;
}

export abstract class CommandBuilder {
  constructor(readonly options: CommandsOptions) {}

  abstract run(client: Client, message: Message, args: string[]): void;
}

/*
A simple Example of a command
import { CommandBuilder, CommandsOptions } from "../../structures/Command";
import { Message } from "discord.js";
import { BotClient } from "../../structures/Client";

export default class TestCommand extends CommandBuilder {
  constructor(
    options: CommandsOptions = {
      name: "Test", // name of the command
      category: "development",// the category
      description: "Testing purposes", // a description of the command
      usage: "Test", // a example of use
      botOwner: true, // if only the bot owner
    }
  ) {
    super(options);
  }

  async run(client: BotClient, message: Message, args: string[] ) {
    //The code of your command
  }
}

*/
