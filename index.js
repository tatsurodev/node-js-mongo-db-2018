const http = require('http')

const server = http.createServer((request, response) => {
  console.log(request.url)
  response.end('HELLO NODE JS')
})

// node index.jsでserver起動、localhost:3000でaccess可
server.listen(3000)
