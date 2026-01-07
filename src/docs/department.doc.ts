/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Listar departamentos
 *     description: Retorna a lista de todos os departamentos. Endpoint restrito a administradores.
 *     tags:
 *       - Departments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso ao enviar os departamentos
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
 *                   example: Sucesso ao enviar os departamentos
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
 *                         example: Suporte Técnico
 *                       slaMinutes:
 *                         type: number
 *                         example: 120
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-01-07T13:22:10.000Z
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Permissão insuficiente (não é ADMIN)
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /departments/create:
 *   post:
 *     summary: Criar departamento
 *     description: Cria um novo departamento. Endpoint restrito a administradores.
 *     tags:
 *       - Departments
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
 *               - slaMinutes
 *             properties:
 *               name:
 *                 type: string
 *                 example: Suporte Técnico
 *               slaMinutes:
 *                 type: number
 *                 example: 120
 *     responses:
 *       201:
 *         description: Sucesso ao criar departamento
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
 *                   example: Sucesso ao criar departamento
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *                     name:
 *                       type: string
 *                       example: Suporte Técnico
 *                     slaMinutes:
 *                       type: number
 *                       example: 120
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-01-07T13:22:10.000Z
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Permissão insuficiente (não é ADMIN)
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     summary: Deletar departamento
 *     description: Remove um departamento pelo ID. Endpoint restrito a administradores.
 *     tags:
 *       - Departments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do departamento
 *         schema:
 *           type: string
 *           format: uuid
 *           example: de4afa28-122d-48b3-aff0-9ae0a44c46ad
 *     responses:
 *       204:
 *         description: Departamento deletado com sucesso (sem conteúdo)
 *       400:
 *         description: ID do departamento não informado
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Permissão insuficiente (não é ADMIN)
 *       404:
 *         description: Departamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

export {};