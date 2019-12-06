const express = require("express")
const postsRouter = require('./routers/blog.js')
const server = express()

server.use(express.json())

server.use('/api/posts', postsRouter);
server.use('/', (req, res) => {
    res.send(`<h2>Node API II Project</h2>`)
})

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n")
})
