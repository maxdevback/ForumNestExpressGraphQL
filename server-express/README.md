### INFO

This server is written in express.js and has two versions of endpoints. One version has the prefix "v1.1", it is written with mongoose functionality. The second has the prefix "v1.2" and it is written in aggregate

## Installation

# Env

- Create an .env file in the root folder
- Fill it out using this example

```
  SESSION_SECRET=""
  CLIENT_URL="http://localhost:3000"
  MONGODB_LINK=
  PORT= 5000 To change the port you need to change it when creating the container
```

# Container

- Install Docker (if not already installed) from here https://www.docker.com/products/docker-desktop/
- Run the console in this folder
- Create an image with this command `docker build server-express:latest .`
- Wait for the end of image creation
- Create and run the container through this command `docker run -p 5000:5000 server-express:latest`

## License

The entire repository is under an MIT license
