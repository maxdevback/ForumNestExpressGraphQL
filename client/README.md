# Info

This is a simple frontend for interacting with backend servers.

## Installation

### Optional

- You can change the backend's url and prefix to a different one

### Required

1. Install Docker (if not already installed) from here https://www.docker.com/products/docker-desktop/
2. Run the console in this folder
3. Create an image with this command `docker build client:latest .`
4. Wait for the end of image creation
5. Create and run the container through this command `docker run -p 3000:80 client:latest`

## License

The entire repository is under an MIT license
