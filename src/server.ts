import 'dotenv/config';
import { createServer } from "http";
import { categoryRoutes } from './routes/categoryRoutes';
import { postRoutes } from './routes/postRoutes';

const PORT = Number(process.env.PORT) || 3001;

const server = createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }
    
    const url = req.url || '';
    
    if (url.startsWith('/categories')) {
        return categoryRoutes(req, res);
    }
    
    if (url.startsWith('/posts')) {
        return postRoutes(req, res);
    }
    
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`\n📂 Categories routes:`);
    console.log(`   GET    /categories`);
    console.log(`   GET    /categories/:id`);
    console.log(`   POST   /categories`);
    console.log(`   PUT    /categories/:id`);
    console.log(`   DELETE /categories/:id`);
    console.log(`\n📝 Posts routes:`);
    console.log(`   GET    /posts`);
    console.log(`   GET    /posts/:id`);
    console.log(`   GET    /posts/status/:status`);
    console.log(`   POST   /posts`);
    console.log(`   PUT    /posts/:id`);
    console.log(`   DELETE /posts/:id`);
});