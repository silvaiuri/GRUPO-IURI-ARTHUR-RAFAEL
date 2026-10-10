
const express = require('express');
const appAdmin = express();
const db = require('../banco/database');
const upload = require('../util/imagens');

// LOGIN E PAINEL
appAdmin.get('/index', (req, res) => {
    res.render('admin/index-admin');
});

appAdmin.get('/', (req, res) => {
    res.render('admin/login');
});

appAdmin.post('/login', (req, res) => {
    res.redirect('/admin/index');
});

// CATEGORIAS
appAdmin.get('/categorias', (req, res) => {
    db.all('SELECT * FROM categorias ORDER BY nome', [], (erro, categorias) => {
        if (erro) {
            console.error(erro.message);
            return res.status(500).send('Erro ao consultar categorias: ' + erro.message);
        }
        res.render('admin/categorias/lista', { categorias });
    });
});

appAdmin.get('/categorias/form-cadastrar', (req, res) => {
    res.render('admin/categorias/cadastro');
});

appAdmin.post('/categorias/cadastrar', (req, res) => {
    const { nome, descricao } = req.body;

    db.run(
        'INSERT INTO categorias (nome, descricao) VALUES (?, ?)',
        [nome, descricao || ''],
        (erro) => {
            if (erro) {
                console.error(erro.message);
                return res.status(500).send('Erro ao cadastrar categoria: ' + erro.message);
            }
            res.redirect('/admin/categorias');
        }
    );
});

// LISTAR PRODUTOS
appAdmin.get('/produtos', (req, res) => {
    db.all('SELECT * FROM produtos ORDER BY id DESC', [], (erro, produtos) => {
        if (erro) {
            console.error(erro.message);
            return res.status(500).send('Erro ao consultar produtos: ' + erro.message);
        }

        let linhas = produtos.map(produto => `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome || ''}</td>
                <td>${produto.categoria || ''}</td>
                <td>R$ ${Number(produto.valor || 0).toFixed(2)}</td>
                <td>${produto.estoque ?? 0}</td>
                <td>${produto.imagem || 'Sem imagem'}</td>
            </tr>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Lista de produtos</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 30px; }
                    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
                    th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
                    th { background: #222; color: white; }
                    a { display: inline-block; margin: 10px 0; }
                </style>
            </head>
            <body>
                <h1>Produtos da loja esportiva</h1>
                <a href="/admin/produtos/form-cadastrar">+ Cadastrar produto</a>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Valor</th>
                            <th>Estoque</th>
                            <th>Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhas || '<tr><td colspan="6">Nenhum produto cadastrado.</td></tr>'}
                    </tbody>
                </table>
                <p><a href="/admin/index">Voltar ao painel</a></p>
            </body>
            </html>
        `);
    });
});

// FORMULÁRIO DE PRODUTOS
appAdmin.get('/produtos/form-cadastrar', (req, res) => {
    db.all('SELECT * FROM categorias ORDER BY nome', [], (erro, categorias) => {
        if (erro) {
            console.error(erro.message);
            return res.status(500).send('Erro ao carregar categorias: ' + erro.message);
        }
        res.render('admin/produtos/cadastro', { categorias });
    });
});

// CADASTRAR PRODUTO
appAdmin.post('/produtos/cadastrar', upload.single('imagem'), (req, res) => {
    const { nome, categoria, valor, estoque, descricao } = req.body;

    if (!nome || !nome.trim() || !categoria || valor === '' ||
        !Number.isFinite(Number(valor)) || estoque === '' ||
        !Number.isInteger(Number(estoque)) || !req.file) {
        return res.status(400).send(
            'Confira nome, categoria, valor, estoque e imagem antes de cadastrar.'
        );
    }

    db.run(
        `INSERT INTO produtos (nome, categoria, valor, estoque, descricao, imagem)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nome.trim(), categoria, Number(valor), Number(estoque),
         descricao || '', req.file.filename],
        function (erro) {
            if (erro) {
                console.error(erro.message);
                return res.status(500).send('Erro ao cadastrar produto: ' + erro.message);
            }
            res.redirect('/admin/produtos');
        }
    );
});

module.exports = appAdmin;
