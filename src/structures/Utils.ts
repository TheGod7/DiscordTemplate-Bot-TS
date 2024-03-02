import { glob } from "glob";
import { BotClient } from "./Client";

export class BotUtils {
  constructor(client: BotClient) {
    client = client;
  }

  async loadFiles(dirname: string): Promise<string[]> {
    const files = await glob(
      `${process.cwd().replace(/\\/g, "/")}/${dirname}/**/**.ts`
    );

    files.forEach((file) => delete require.cache[require.resolve(file)]);

    return files;
  }
}
