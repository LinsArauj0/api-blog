import { db } from "../config/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Category {
    id: number;
    name: string;
    created_at: Date;
}

export interface CreateCategoryData {
    name: string;
}

export async function findAll(): Promise<Category[]> {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM categories');
    return rows as Category[];
}

export async function findById(id: number): Promise<Category | null> {
    const [rows] = await db.query<RowDataPacket[]>(
        'SELECT * FROM categories WHERE id = ?', 
        [id]
    );
    return (rows[0] as Category) || null;
}

export async function findByName(name: string): Promise<Category | null> {
    const [rows] = await db.query<RowDataPacket[]>(
        'SELECT * FROM categories WHERE name = ?', 
        [name]
    );
    return (rows[0] as Category) || null;
}

export async function create(data: CreateCategoryData): Promise<Category> {
    const [result] = await db.query<ResultSetHeader>(
        'INSERT INTO categories (name) VALUES (?)', 
        [data.name]
    );
    
    const created = await findById(result.insertId);
    
    if (!created) {
        throw new Error('Failed to fetch created category');
    }

    return created;
}

export async function update(id: number, name: string): Promise<Category | null> {
    const [result] = await db.query<ResultSetHeader>(
        'UPDATE categories SET name = ? WHERE id = ?',
        [name, id]
    );
    
    if (result.affectedRows === 0) return null;
    return findById(id);
}

export async function remove(id: number): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
        'DELETE FROM categories WHERE id = ?', 
        [id]
    );
    return result.affectedRows > 0;
}