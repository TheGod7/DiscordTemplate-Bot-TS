import { CacheType, Interaction } from "discord.js";
import { BotClient } from "../../structures/Client";
import { EventsBuilder, EventsOptions } from "../../structures/Events";

export default class InteractionEvent extends EventsBuilder {
  constructor(options: EventsOptions = { name: "interactionCreate" }) {
    super(options);
  }

  async run(
    interaction: Interaction<CacheType>,
    client: BotClient
  ): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slash.get(interaction.commandName);

    if (command) {
      command.execute(client, interaction);
    }
  }
}
