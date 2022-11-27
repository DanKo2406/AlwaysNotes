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

// https://www.npmjs.com/package/json-server
// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database/db.json')
const middlewares = jsonServer.defaults()

// Добавляем дефолтных посредников (logger, static, cors и no-cache)
server.use(middlewares)

// Добавляем кастомные маршруты перед роутером `JSON Server`
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// Для обработки POST, PUT и PATCH необходимо использовать body-parser
server.use(jsonServer.bodyParser)
server.use((req, _, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Передаем управление роутеру `JSON Server`
  next()
})

// Используем дефолтный роутер
server.use(router)
server.listen(3000, () => {
  console.log('Server ready')
})