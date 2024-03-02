import { BotClient } from "./structures/Client";
import config from "./config";

async function Start(): Promise<void> {
  const client = new BotClient();

  await client.loadEvents();
  client.login(config.token);
}

Start();
