import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      "echo",
      "Echo a message",
      {
        message: z.string(),
      },
      async ({ message }) => ({
        content: [{ type: "text", text: `Tool echo: ${message}` }],
      }),
    );
  },
  {
    capabilities: {
      tools: {
        echo: {
          description: "Echo a message",
        },
      },
    },
  },
  {
    basePath: "/api",
    verboseLogs: true,
    maxDuration: 60,
  },
);

export { handler as GET, handler as POST, handler as DELETE };
