FROM python:3.11-slim
COPY . /app
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 3005
CMD ["python", "mcp_server.py"]

# docker build --tag mcp_backend .
# docker run --name mcp_backend -p 3005:3005 <containerID> 