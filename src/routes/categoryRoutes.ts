import { IncomingMessage, ServerResponse } from "node:http";
import { 
    handleGetAllCategories,
    handleGetCategoryById,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory
} from "../controllers/CategoryHandler";
import { sendJson } from "../utils/sendJson";

export async function categoryRoutes(req: IncomingMessage, res: ServerResponse) {
    const method = req.method;
    const url = req.url || '';
    
    // GET /categories
    if (method === 'GET' && url === '/categories') {
        return handleGetAllCategories(req, res);
    }
    // GET /categories/:id
    if (method === 'GET' && url.startsWith('/categories/')) {
        const id = Number(url.split('/')[2]);
        return handleGetCategoryById(req, res, id);
    }
    // POST /categories
    if (method === 'POST' && url === '/categories') {
        return handleCreateCategory(req, res);
    }
        // PUT /categories/:id
    if (method === 'PUT' && url.startsWith('/categories/')){
        const id = Number(url.split('/')[2]);
        return handleUpdateCategory(req, res, id);
    } 
    // DELETE /categories/:id
    if (method === 'DELETE' && url.startsWith('/categories/')) {
        const id = Number(url.split('/')[2]);
        return handleDeleteCategory(req, res, id);
    }
    // 404
    sendJson(res, 404, { error: 'Route not found' });
}