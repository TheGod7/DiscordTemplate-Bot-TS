import {
  CommandBuilder,
  CommandsOptions,
  categories,
} from "../../structures/Command";
import {
  APIEmbed,
  APIEmbedField,
  CategoryChannel,
  EmbedBuilder,
  Message,
} from "discord.js";
import { BotClient } from "../../structures/Client";

export default class HelpCommand extends CommandBuilder {
  constructor(
    options: CommandsOptions = {
      name: "help",
      category: "utils",
      description: "help command used to see the commands information",
      usage: "help <Command/Category(optional)>",
      alias: "h",
    }
  ) {
    super(options);
  }

  async run(client: BotClient, message: Message, args: string[]) {
    const category = Object.keys(categories);
    const categoryDescription = Object.entries(categories);
    const CommandsValues = client.command.values();

    if (args?.length > 0) {
      const CategoryORCommand = args[0];
      let notFound = true;
      const Embed = new EmbedBuilder();

      if (category.includes(CategoryORCommand.toLowerCase())) {
        notFound = false;
        const CurrentCategory = categoryDescription.find(
          (C) => C[0] == CategoryORCommand.toLowerCase()
        );
        if (!CurrentCategory) return;

        Embed.setTitle(
          "Help Category(" + CurrentCategory[0] + ")"
        ).setDescription(CurrentCategory[1]);

        const commands: APIEmbedField[] = [];
        let CommandNumber = 1;

        for (const Command of CommandsValues) {
          const commandOptions = Command.options;

          if (commandOptions.category == CurrentCategory[0]) {
            commands.push({
              name: CommandNumber + ": " + commandOptions.name,
              value: commandOptions.description,
            });
            CommandNumber++;
          }
        }

        Embed.addFields(commands);
      } else {
        console.log("command");
        for (const Command of CommandsValues) {
          const commandOptions = Command.options;

          if (
            commandOptions.name == args[0].toLowerCase() ||
            commandOptions.alias == args[0].toLowerCase()
          ) {
            notFound = false;
            Embed.setTitle("Help for " + commandOptions.name)
              .setDescription(commandOptions.description)
              .addFields(
                { name: "Usage", value: commandOptions.usage, inline: true },
                {
                  name: "Category",
                  value: commandOptions.category,
                  inline: true,
                }
              );
          }
        }
      }

      if (notFound) {
        Embed.setTitle("No Command or Category Found").setColor("Red");
      }

      message.channel.send({ embeds: [Embed] });
    } else {
      const Embed = new EmbedBuilder().setTitle("Help");
      const commands: APIEmbedField[] = [];
      for (const Command of CommandsValues) {
        for (var i = 0; i < category.length; i++) {
          let commandsText = "";
          let CurrentCategory = category[i];
          console.log(Command.options.name);
          console.log(Command.options.category);

          if (Command.options.category == CurrentCategory) {
            commandsText += "`" + Command.options.name + "`";
          } else {
            continue;
          }

          commands.push({ name: CurrentCategory, value: commandsText });
        }
      }

      Embed.addFields(commands);
      message.channel.send({ embeds: [Embed] });
    }
  }
}
