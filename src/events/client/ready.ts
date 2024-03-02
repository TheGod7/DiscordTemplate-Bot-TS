import { BotClient } from "../../structures/Client";
import { EventsBuilder, EventsOptions } from "../../structures/Events";

export default class ReadyEvent extends EventsBuilder {
  constructor(options: EventsOptions = { name: "ready", once: true }) {
    super(options);
  }

  async run(client: BotClient): Promise<void> {
    await client.loadCommands();
    await client.loadSlashCommand();
  }
}
