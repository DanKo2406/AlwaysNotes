const http = require('http')
const fs = require('fs')
const serverHttp = http.createServer()
serverHttp.on('request', (req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      fs.createReadStream('client/index.html').pipe(res)
      break
    case '/styles.css':
      res.writeHead(200, {
        'Content-Type': 'text/css'
      })
      fs.createReadStream('client/styles.css').pipe(res)
      break
    case '/js.js':
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      })
      fs.createReadStream('client/js.js').pipe(res)
      break
    case 'default':
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end('404 Не найдено')
      break
  }
})
serverHttp.listen(80, () => {
  console.log('Main server ready')
})