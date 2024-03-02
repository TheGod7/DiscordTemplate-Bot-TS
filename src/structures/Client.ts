import {
  Client,
  GatewayIntentBits,
  Partials,
  ClientOptions,
  ActivityType,
  Collection,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  REST,
  Routes,
} from "discord.js";
import { BotUtils } from "./Utils";

import "colors";
import { CommandBuilder } from "./Command";
import { SlashCommandOptions } from "./SlashCommands.interface";
import config from "../config";

export class BotClient extends Client {
  constructor(
    options: ClientOptions = {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
      ],
      allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
      },
      presence: {
        activities: [{ name: "si", type: ActivityType.Watching }],
      },
    }
  ) {
    super(options);
  }

  prefix = config.prefix;
  command = new Collection<string, CommandBuilder>();
  slash = new Collection<string, SlashCommandOptions>();
  slashJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  utils = new BotUtils(this);

  BotOwner = config.BotOwner;
  async loadCommands(): Promise<void> {
    console.log("(/) Loading commands...".white);

    this.command.clear();

    const commands = await this.utils.loadFiles("src/commands");

    if (commands.length) {
      for (const command of commands) {
        const { default: builder } = await import(command);

        const cmd: CommandBuilder = new builder();

        if (cmd.options.name) {
          this.command.set(cmd.options.name.toLocaleLowerCase(), cmd);
          console.log(
            `(/) Command successfully created Command: ${cmd.options.name}`
              .black
          );
        } else {
          console.log(`(x) Failed to load command: ${command}`.red);
        }
      }
    }
    console.log("(✔) Loaded all commands".bgBlack);
  }

  async loadSlashCommand(): Promise<void> {
    console.log("(/) Loading slash commands".white);
    this.slash.clear();
    this.slashJson = [];

    const files = await this.utils.loadFiles("src/slash");
    if (files.length) {
      for (const file of files) {
        const { default: builderSlash } = await import(file);
        if (builderSlash.data.name) {
          this.slash.set(builderSlash.data.name, builderSlash);
          this.slashJson.push(builderSlash.data.toJSON());
          console.log(
            `(/) SlashCommand successfully created: ${builderSlash.data.name}`
              .black
          );
        } else {
          console.log(`(x) Failed to load SlashCommand: ${file}`.red);
        }
      }
    }
    console.log("(✔) Loaded all SlashCommands".bgBlack);

    const rest = new REST().setToken(config.token);

    const data = await rest.put(
      Routes.applicationCommands(
        this.user?.id ? this.user?.id : "1044047370150752356"
      ),
      { body: this.slashJson }
    );
  }

  async loadEvents(): Promise<void> {
    console.log(`(/) Loading events`.white);
    const eventFiles = await this.utils.loadFiles("src/events/client");

    if (eventFiles.length > 0) {
      for (const eventFile of eventFiles) {
        const { default: eventBuilder } = await import(eventFile);

        const event = new eventBuilder();

        if (event.options.name) {
          console.log(
            `(/) Event Successfully Loaded Event: ${event.options.name}`.black
          );
          if (event.options.once) {
            this.once(event.options.name, (...args) =>
              event.run(...args, this)
            );
          } else {
            this.on(event.options.name, (...args) => event.run(...args, this));
          }
        } else {
          console.log(`(x) Failed to import: ${eventFile}`);
        }
      }
    }
    console.log(`(✔) Loaded all events`.bgBlack);
  }
}
