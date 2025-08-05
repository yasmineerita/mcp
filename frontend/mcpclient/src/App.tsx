import { useEffect, useState } from 'react';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

export default function App() {
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [connected, setConnected] = useState(false);
  let sessionId: string | undefined = undefined;

  useEffect(() => {
    const connectClient = async () => {
      const baseUrl = new URL("http://0.0.0.0:3005/mcp/");

      try {
        const newClient = new Client({
          name: 'streamable-http-client',
          version: '1.0.0'
        });
        // const sseTransport = new SSEClientTransport(baseUrl);
        // await newClient.connect(sseTransport);

        const transport = new StreamableHTTPClientTransport(new URL(baseUrl));
        await newClient.connect(transport);
        sessionId = transport.sessionId;
        console.log("Transport created with session ID: ", sessionId)

        console.log("Connected using Streamable HTTP transport");
        setClient(newClient);
        setConnected(true);
        const tools = await newClient.listTools()
        console.log("tools: ", tools)
      } catch (error) {
        console.error("Failed to connect:", error);
        // TODO: fallback logic to SSE transport
        
      }
    };

    connectClient();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">MCP Client Connection</h1>
      {connected ? (
        <p className="text-green-600">Connected to MCP Server</p>
      ) : (
        <p className="text-red-600">Connecting...</p>
      )}
    </div>
  );
}
