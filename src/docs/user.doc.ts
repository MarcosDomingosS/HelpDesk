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
 *                       type: number
 *                       example: 1
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
 *                       type: number
 *                       example: 1
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Permissão insuficiente (não é ADMIN)
 *       500:
 *         description: Erro interno
 */
export {};
