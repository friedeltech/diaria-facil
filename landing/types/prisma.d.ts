declare module "@prisma/nextjs-monorepo-workaround-plugin" {
  import { WebpackPluginInstance } from "webpack";

  export class PrismaPlugin implements WebpackPluginInstance {
    constructor();
    apply(...args: any[]): void;
  }
}
