##running on VM
`CRAWL_URLS=https://website node dist/index.js`

## Docker Build

`docker build --platform=linux/amd64 -t node-puppeteer .`
`docker run --platform=linux/amd64 node-puppeteer`
`docker run --env CRAWL_URLS=https://website --platform linux/amd64 node-puppeteer`
