import { createServer } from 'node:http'
import { json } from 'node:stream/consumers'
import { randomUUID } from 'node:crypto'

process.loadEnvFile() 
const port = process.env.PORT ?? 3000

function sendJson(res, statusCode, body) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(body))
}

const users = [
    { id: 1, username: 'eric' },
    { id: 2, username: 'raymundo' },
]


const server = createServer(async (req, res) => {
    const { method, url } = req;
    const [pathname, queryString] = url.split('?')

    if (method === 'GET') {
        const searchParams = new URLSearchParams(queryString)

        if (pathname === '/')
            return res.end('Hola desde node 🔥')
        
        if (pathname === '/users') {
            const limit = Number(searchParams.get('limit')) || users.length;
            const offset = Number(searchParams.get('offset')) || 0
            const usersPaginated = users.slice(offset, limit + offset)
            return sendJson(res, 200, usersPaginated)
        }
    
        if (pathname === '/health') {
            return sendJson(res, 200, { uptime: process.uptime() })    
        }
    }

    if (method === 'POST') {
        if (pathname === '/users') {
            const body = await json(req)
            if (!body || !body.username)
                return sendJson(res, 400, { message: 'Name is required' })

            let newUser = { id: randomUUID(), username: body.username }

            users.push(newUser)
            
            return sendJson(res, 201, { message: 'Usuario creado' })
        }
    }

    sendJson(res, 400, { message: 'Not found'})
});

server.listen(port, () => {
    console.log(`Escuchando servidor desde: http://localhost:${port}`);
});