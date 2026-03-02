// src/controllers/PostController.ts

import * as PostModel from "../models/PostModel";
import * as CategoryModel from "../models/CategoryModel";
import { HttpError } from "../utils/httpError";

// 1. getAllPosts()
export async function getAllPosts() {
    return PostModel.findAll();
}
// 2. getPostById(id)
export async function getPostById(id: number) {
    if (!id || id <= 0) {
        throw new HttpError('Invalid post ID', 400);
    }

    const post = await PostModel.findById(id);
    if (!post) {
        throw new HttpError('Post not found', 404);
    }
    return post;
}
// 3. getPostsByStatus(status)
export async function getPostsByStatus(status: 'draft' | 'published') {
    if (!['draft', 'published'].includes(status)) {
        throw new HttpError('Status Invalid', 400);
    }

    return PostModel.findByStatus(status);
}
// 4. createPost(data)
export async function createPost(data: PostModel.CreatePostData) {
    if (!data.title || data.title.trim() === '') {
        throw new HttpError('Title is required', 400);
    }

    if (data.title.trim().length < 5) {
        throw new HttpError('Name must have at least 5 characters', 400);
    }

    if (!data.content || data.content.trim() === '') {
        throw new HttpError('Content is required', 400);
    }

    if (data.status && !['draft', 'published'].includes(data.status)) {
        throw new HttpError('Invalid status. Must be draft or published', 400);
    }

    if (data.category_id) {
        const categoryExists = await CategoryModel.findById(data.category_id);
        if (!categoryExists) {
            throw new HttpError('Category not found', 404);
        }
    }

    return PostModel.create(data);
}
// 5. updatePost(id, data)
export async function updatePost(id: number, data: PostModel.UpdatePostData) {
    if (!id || id <= 0) {
        throw new HttpError('Invalid post ID', 400);
    }

    if (data.title !== undefined) {
        if (data.title.trim() === '' || data.title.trim().length < 5) {
            throw new HttpError('Title must have at least 5 characters', 400);
        }
    }

    if (data.content !== undefined) {
        if (data.content.trim() === '') {
            throw new HttpError('Content is required', 400);
        }
    }

    if (data.status && !['draft', 'published'].includes(data.status)) {
        throw new HttpError('Invalid status. Must be draft or published', 400);
    }

     if (data.category_id !== undefined && data.category_id !== null) {
        const categoryExists = await CategoryModel.findById(data.category_id);
        if (!categoryExists) {
            throw new HttpError('Category not found', 404);
        }
    }

    const post = await PostModel.update(id, data);
    if (!post) {
        throw new HttpError('Post not found', 404);
    }
    return post;
}
// 6. deletePost(id)
export async function deletePost(id: number) {
    if (!id || id <= 0) {
        throw new HttpError('Invalid post ID', 400);
    }

    const deleted = await PostModel.remove(id);
    if (!deleted) {
        throw new HttpError('Post not found', 404);
    }

    return { message: 'Post deleted successfully' };
}