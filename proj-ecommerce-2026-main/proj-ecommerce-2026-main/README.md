## 🛍️ Projeto E-commerce 
---

Este é o guia para o projeto de site de E-commerce, que será a avaliação do 3º trimestre.

O projeto será divido em etapas com prazos e entregas bem definidos.

### 📅 1ª etapa - Área Administrativa
Para **1ª etapa** será desenvolvida a *Área Administrativa* do site de e-commerce. Essa área administrativa é uma espécie de "sistema interno" ao site, onde é gerenciada toda a parte de cadastro de produtos que serão comercializados no site, e possui o acesso é restrito aos funcionários da empresa.

Funcionalidades mínimas:
- Cadastro e listagem de categorias
- Cadastro e listagem de produtos
- Remoção de categorias e produtos (v2)
- Login (v2)

O sistema encontra-se parcialmente desenvolvido neste Github. Faça o download do projeto completo, e leia as informações abaixo para conhecer em detalhe o projeto e saber o que deve ser feito.

Detalhamento do projeto:
* Pastas:
```
banco\ -  contém o JS de criação do banco (SQL) e o arquivo do banco de dados (.db) propriamente dito.
```
```
public\ -  contém arquivo(s) css e a subpasta uploads\ para onde são enviados as imagens cadastradas
```
```
rotas\ -  contém os arquivos onde as rotas são programadas. Até o momento, possui apenas a rota da área administrativa (admin.js). 
A parte de Categorias já está pronta. Falta programar a parte de Produtos.
```
```
util\ - contém o script para fazer upload de arquivos (não é necessário mexer neste arquivo (ou pasta))
```
```
views\ - essa é a pasta que mais contém arquivos e outras subpastas. Todos os arquivos HTML (.EJS) ficam aqui, organizados por área (admin, admin/categorias, admin/produtos), bem como as "partes de arquivos", como header, menu e footer (admin/partials).
A listagem de produtos está incompleta. Todo os resto está funcional, porém deverá ser modificado/atualizado mediante alteração no banco de dados (novos campos.)
```

O primeiro passo é **alterar a tabela** (banco/database.js) acrescentando novos campos, deixando os produtos mais completos de informações.

**Prazo de entrega:** +- 02 semanas
**Forma de entrega:** github


### 📅 2ª etapa - Página Inicial
Página inicial do site...