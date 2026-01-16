/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Criar usuário
 *     description: Cria um novo usuário. Endpoint restrito a administradores.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: ADMIN
 *                 description: Papel do usuário (opcional, padrão CLIENT)
 *               department_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sucesso ao criar o usuário
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: uuid
 *                       example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *                     name:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: joao@email.com
 *                     role:
 *                       type: string
 *                       example: CLIENT
 *                     department_id:
 *                       type: uuid
 *                       example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Permissão insuficiente (não é ADMIN)
 *       500:
 *         description: Erro interno
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuários
 *     description: Retorna a lista de todos os usuários cadastrados no sistema. Endpoint restrito a administradores.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sucesso ao enviar os usuários
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *                       name:
 *                         type: string
 *                         example: João Silva
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: joao@email.com
 *                       role:
 *                         type: string
 *                         enum: [ADMIN, CLIENT]
 *                         example: CLIENT
 *                       department_id:
 *                         type: string
 *                         format: uuid
 *                         nullable: true
 *                         example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Permissão insuficiente (não é ADMIN)
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     description: Remove um usuário do sistema pelo ID. Endpoint restrito a administradores.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *           example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso (sem conteúdo)
 *       400:
 *         description: ID do usuário não informado
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Permissão insuficiente (não é ADMIN)
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Editar usuário
 *     description: Atualiza dados de um usuário existente. Endpoint restrito a administradores.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser editado
 *         example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               role:
 *                 type: string
 *                 example: ADMIN
 *                 description: Papel do usuário
 *               department_id:
 *                 type: string
 *                 example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sucesso ao editar o usuário
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *                     name:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: joao@email.com
 *                     role:
 *                       type: string
 *                       example: ADMIN
 *                     department_id:
 *                       type: string
 *                       nullable: true
 *                       example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *       400:
 *         description: ID não informado ou dados inválidos
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Permissão insuficiente (não é ADMIN)
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno
 */


export {};
