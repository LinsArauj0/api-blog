# 📝 API Blog

API REST para blog com posts e categorias desenvolvida com **Node.js puro e TypeScript**.

---

## 🛠 Tecnologias

- Node.js
- TypeScript
- MySQL
- Arquitetura em camadas (Models, Controllers, Handlers, Routes)
- Relacionamentos entre tabelas (Foreign Key e JOINs)
- Tratamento de erros personalizado

---

## 📂 Estrutura do projeto
```
src/
├── config/         # Configurações (database)
├── models/         # Acesso ao banco de dados
├── controllers/    # Lógica de negócio e handlers
├── middlewares/    # Error handling
├── routes/         # Roteamento HTTP
├── utils/          # Funções utilitárias
└── server.ts       # Entrada da aplicação
```

---

## ⚙️ Como rodar o projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/LinsArauj0/api-blog.git
cd api-blog
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do MySQL:
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=blog_db
DB_PORT=3306
```

### 4️⃣ Criar o banco de dados
Execute o script SQL no MySQL Workbench:
```sql
CREATE DATABASE IF NOT EXISTS blog_db;
USE blog_db;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category_id INT,
  status ENUM('draft', 'published') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Dados de exemplo
INSERT INTO categories (name) VALUES 
('Tecnologia'),
('Saúde'),
('Educação');

INSERT INTO posts (title, content, category_id, status) VALUES
('Meu primeiro post', 'Conteúdo do post sobre tecnologia', 1, 'published'),
('Dicas de saúde', 'Como manter uma vida saudável', 2, 'draft');
```

### 5️⃣ Rodar o servidor
```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3001`

---

## 📚 Endpoints da API

### 📂 Categories

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/categories` | Lista todas as categorias |
| GET | `/categories/:id` | Busca categoria por ID |
| POST | `/categories` | Cria nova categoria |
| PUT | `/categories/:id` | Atualiza categoria |
| DELETE | `/categories/:id` | Deleta categoria |

#### Exemplo - Criar categoria:
```json
POST /categories
{
  "name": "Esportes"
}
```

---

### 📝 Posts

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/posts` | Lista todos os posts |
| GET | `/posts/:id` | Busca post por ID |
| GET | `/posts/status/:status` | Filtra por status (draft/published) |
| POST | `/posts` | Cria novo post |
| PUT | `/posts/:id` | Atualiza post |
| DELETE | `/posts/:id` | Deleta post |

#### Exemplo - Criar post:
```json
POST /posts
{
  "title": "Post sobre Node.js",
  "content": "Conteúdo do post aqui...",
  "category_id": 1,
  "status": "published"
}
```

---

## 🎯 Funcionalidades

- ✅ CRUD completo de categorias e posts
- ✅ Relacionamento entre tabelas (Foreign Key)
- ✅ JOINs para buscar posts com nome da categoria
- ✅ Filtro por status
- ✅ Validação de dados
- ✅ Tratamento de erros centralizado
- ✅ Arquitetura em camadas
- ✅ TypeScript com tipagem forte

---

## 📝 Scripts disponíveis
```bash
npm run dev      # Roda em modo desenvolvimento (com watch)
npm run build    # Compila o TypeScript
npm start        # Roda a versão compilada
```

---

## 👨‍💻 Autor

Desenvolvido como projeto de estudo de Node.js e TypeScript.

---

## 📄 Licença

Este projeto está sob a licença MIT.