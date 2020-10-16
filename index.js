const http = require('http')
// file操作系(file system)のpackage
const fs = require('fs')

const aboutPage = fs.readFileSync('about.html')
const contactPage = fs.readFileSync('contact.html')
const homePage = fs.readFileSync('index.html')

const server = http.createServer((request, response) => {
  if (request.url === '/about') {
    // returnを使うことで条件合致時にこの条件分岐を終了させる, response.endでstatus code 200が返る
    return response.end(aboutPage)
  } else if (request.url === '/contact') {
    return response.end(contactPage)
  } else if (request.url === '/') {
    return response.end(homePage)
  } else {
    response.writeHead(404)
    response.end('THE PAGE WAS NOT FOUND.')
  }
})

// node index.jsでserver起動、localhost:3000でaccess可
server.listen(3000)
