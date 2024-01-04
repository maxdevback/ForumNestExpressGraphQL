# Forum-express-server

This server is written in express.js and has two versions of endpoints. One version has the prefix "v1.1", it is written with mongoose functionality. The second has the prefix "v1.2" and it is written in aggregate

## Installation

### Env

1. Create an .env file in the root folder
2. Fill it out using this example

```
  SESSION_SECRET: string
  CLIENT_URL: "http://localhost:3000"
  MONGODB_LINK: string
  PORT: 5000 To change the port you need to change it when creating the container
```

### Container

1. Install Docker (if not already installed) from here https://www.docker.com/products/docker-desktop/
2. Run the console in this folder
3. Create an image with this command `docker build server-express:latest .`
4. Wait for the end of image creation
5. Create and run the container through this command `docker run -p 5000:5000 server-express:latest`

## License

The entire repository is under an MIT license
