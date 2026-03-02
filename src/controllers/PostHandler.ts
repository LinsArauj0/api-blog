import { IncomingMessage, ServerResponse } from 'http';
import { sendJson } from '../utils/sendJson';
import { readJsonBody } from '../utils/readJsonBody';
import { errorHandler } from '../middlewares/errorHandler';
import * as PostController from './PostController';

export async function handleGetAllPosts(req: IncomingMessage, res: ServerResponse) {
    try {
        const posts = await PostController.getAllPosts();
        sendJson(res, 200, posts);
    } catch (error) {
        errorHandler(error, req, res);
    }
}

// 2. handleGetPostById(req, res, id)
export async function handleGetPostById(req: IncomingMessage, res: ServerResponse, id: number) {
    try {
        const post = await PostController.getPostById(id);
        sendJson(res, 200, post );
    } catch (error) {
        errorHandler(error, req, res);
    }
}
// 3. handleGetPostsByStatus(req, res, status)
export async function handleGetPostsByStatus(req: IncomingMessage, res: ServerResponse, status: 'draft' | 'published') {
    try {
        const posts = await PostController.getPostsByStatus(status);
        sendJson(res, 200, posts );
    } catch (error) {
        errorHandler(error, req, res);
    }
}
// 4. handleCreatePost(req, res)
export async function handleCreatePost(req: IncomingMessage, res: ServerResponse) {
    try {
        const data = await readJsonBody(req);
        const post =  await PostController.createPost(data);
        sendJson(res, 201, post );
    } catch (error) {
        errorHandler(error, req, res);
    }
}
// 5. handleUpdatePost(req, res, id)
export async function handleUpdatePost(req: IncomingMessage, res: ServerResponse, id: number) {
    try {
        const data = await readJsonBody(req);
        const post = await PostController.updatePost(id, data);
        sendJson(res, 200, post )
    } catch (error) {
        errorHandler(error, req, res);
    }
}
// 6. handleDeletePost(req, res, id)
export async function handleDeletePost(req: IncomingMessage, res: ServerResponse, id: number) {
    try {
        const result = await PostController.deletePost(id);
        sendJson(res, 200, result );
    } catch (error) {
        errorHandler(error, req, res);
    }
}
