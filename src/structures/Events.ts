import { ClientEvents } from "discord.js";

export interface EventsOptions {
  name: keyof ClientEvents;
  once?: boolean;
}

export abstract class EventsBuilder {
  constructor(readonly options: EventsOptions) {}
}

/* 
example:
export default class ReadyEvent extends EventsBuilder {
  constructor(options: EventsOptions = { name: "messageCreate"// the event name , once: false // if is only once default is false}) {
    super(options);
  }

  run(message: Message, client: BotClient): void {
   // The code of your event
  }
}

*/
