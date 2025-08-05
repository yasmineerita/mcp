from fastmcp import FastMCP
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

mcp = FastMCP("demo-app")

mcp_server = mcp.http_app() 

mcp_server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["mcp-session-id", "content-type", "content-length"]
)

@mcp.tool
def add(a: int, b: int):
  return a+b

@mcp.tool
def subtract(a:int, b: int):
  return a-b

if __name__ == "__main__":
  config = uvicorn.Config(
    app=mcp_server,
    log_level="info",
    port=3005,
    host="0.0.0.0"
  )
  server = uvicorn.Server(config)
  server.run()


