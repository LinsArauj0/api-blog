// src/models/PostModel.ts

import { db } from "../config/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// 1. Interface Post (com category_name do JOIN)
export interface Post {
    id: number;
    title: string;
    content: string;
    category_id: number | null;
    category_name?: string | null;  // vem do JOIN
    status: 'draft' | 'published';
    created_at: Date;
    updated_at: Date;
}

// 2. Tipo para criar
export interface CreatePostData {
    title: string;
    content: string;
    category_id?: number | null;
    status?: 'draft' | 'published';
}

// 3. Tipo para atualizar (tudo opcional)
export interface UpdatePostData {
    title?: string;
    content?: string;
    category_id?: number | null;
    status?: 'draft' | 'published';
}

// 4. findAll() - buscar todos COM JOIN
export async function findAll(): Promise<Post[]> {
    const SQL = `
        SELECT 
            posts.*,
            categories.name as category_name
        FROM posts
        LEFT JOIN categories ON posts.category_id = categories.id
    `;
    
    const [rows] = await db.query<RowDataPacket[]>(SQL);
    return rows as Post[];
}
// 5. findById(id) - buscar por ID COM JOIN
export async function findById(id: number): Promise<Post | null> {
    const [rows] = await db.query<RowDataPacket[]>('SELECT posts.*, categories.name as category_name FROM posts LEFT JOIN categories ON posts.category_id = categories.id WHERE posts.id =?', [id]);
    return rows[0] as Post || null;
}
// 6. findByStatus(status) - filtrar por status COM JOIN
export async function findByStatus(status: 'draft' | 'published'): Promise<Post[]> {
    const SQL = `
    SELECT 
        posts.*, categories.name as category_name
    FROM posts
    LEFT JOIN categories ON posts.category_id = categories.id
    WHERE posts.status = ? 
    `;
    const [rows] = await db.query<RowDataPacket[]>(SQL,[status]);
    return rows as Post[];
}
// 7. create(data) - criar
export async function create(data: CreatePostData): Promise<Post | null> {
    const SQL = `
        INSERT INTO posts (title, content, category_id, status)
        VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await db.query<ResultSetHeader>(SQL, [
        data.title,
        data.content,
        data.category_id || null,
        data.status || 'draft'
    ]);
    
    return findById(result.insertId);
}
// 8. update(id, data) - atualizar (UPDATE DINÂMICO!)
export async function update(id: number, data: UpdatePostData) {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.title !== undefined) {
        fields.push('title = ?');
        values.push(data.title);
    }

    if (data.content !== undefined) {
        fields.push('content = ?');
        values.push(data.content);
    }

    if (data.category_id !== undefined) {
        fields.push('category_id = ?');
        values.push(data.category_id);
    }

    if (data.status !== undefined) {
        fields.push('status = ?');
        values.push(data.status);
    }

    if (fields.length === 0) return findById(id);
    values.push(id);

    const [result] = await db.query<ResultSetHeader>(
        `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`, values);

    if (result.affectedRows === 0) return null;
    return findById(id)
}
// 9. remove(id) - deletar
export async function remove(id: number): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
// Retorna: boolean