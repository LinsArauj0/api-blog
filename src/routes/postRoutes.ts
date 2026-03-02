import { IncomingMessage, ServerResponse } from "node:http";
import { 
    handleGetAllPosts,
    handleGetPostById,
    handleGetPostsByStatus,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost
} from "../controllers/PostHandler";
import { sendJson } from "../utils/sendJson";

export async function postRoutes(req: IncomingMessage, res: ServerResponse) {
    const method = req.method;
    const url = req.url || '';

    if (method === 'GET' && url === '/posts') {
        return handleGetAllPosts(req, res);
    }

    if (method === 'GET' && url.startsWith('/posts/status/')){
        const status = url.split('/')[3] as 'draft' | 'published';
        return handleGetPostsByStatus(req, res, status);
    }

    if (method === 'GET' && url.startsWith('/posts/')) {
        const id = Number(url.split('/')[2]);
        return handleGetPostById(req, res, id);
    }

    if (method === 'POST' && url === '/posts') {
        return handleCreatePost(req, res);
    }

    if (method === 'PUT' && url.startsWith('/posts/')) {
        const id = Number(url.split('/')[2]);
        return handleUpdatePost(req, res, id);
    }

    if (method === 'DELETE' && url.startsWith('/posts/')) {
        const id = Number(url.split('/')[2]);
        return handleDeletePost(req, res, id);
    }

     sendJson(res, 404, { error: 'Route not found' });
}