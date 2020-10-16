const http = require('http')

const server = http.createServer((request, response) => {
  if (request.url === '/about') {
    // returnを使うことで条件合致時にこの条件分岐を終了させる, response.endでstatus code 200が返る
    return response.end('THE ABOUT PAGE')
  } else if (request.url === '/contact') {
    return response.end('THE CONTACT PAGE')
  } else if (request.url === '/') {
    return response.end('THE HOME PAGE')
  } else {
    response.writeHead(404)
    response.end('THE PAGE WAS NOT FOUND.')
  }
})

// node index.jsでserver起動、localhost:3000でaccess可
server.listen(3000)
