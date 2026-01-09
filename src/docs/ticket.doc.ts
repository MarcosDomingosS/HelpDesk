/**
 * @swagger
 * /tickets/create:
 *   post:
 *     summary: Criar ticket
 *     description: |
 *       Cria um novo ticket de atendimento.
 *       
 *       - Apenas usuários com papel **CLIENT** podem criar tickets
 *       - O usuário autenticado é obtido via token JWT (não enviado no body)
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *               - departmentId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Problema ao acessar o sistema
 *               description:
 *                 type: string
 *                 example: Não consigo fazer login desde ontem
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *                 example: HIGH
 *               departmentId:
 *                 type: string
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       201:
 *         description: Ticket criado com sucesso
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
 *                   example: Sucesso ao criar o ticket
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1f3d2c10-9b0a-4d2c-9c5b-abc123456789
 *                     title:
 *                       type: string
 *                       example: Problema ao acessar o sistema
 *                     description:
 *                       type: string
 *                       example: Não consigo fazer login desde ontem
 *                     status:
 *                       type: string
 *                       example: OPEN
 *                     priority:
 *                       type: string
 *                       example: HIGH
 *                     department:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 550e8400-e29b-41d4-a716-446655440000
 *                         name:
 *                           type: string
 *                           example: Suporte Técnico
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-01-08T18:30:00.000Z
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Apenas clientes podem criar tickets
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /tickets/assign/{ticketId}:
 *   patch:
 *     summary: Assumir um ticket
 *     description: |
 *       Atribui um ticket ao agente autenticado.
 *
 *       - Apenas usuários com papel **AGENT** podem assumir tickets
 *       - O agente é identificado automaticamente via token JWT
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         description: ID do ticket a ser atribuído
 *         schema:
 *           type: string
 *           example: 3f74ccb8-6a46-4714-b8d3-2ab624da8377
 *     responses:
 *       200:
 *         description: Ticket atribuído com sucesso
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
 *                   example: Sucesso ao atribuir ticket ao agente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 3f74ccb8-6a46-4714-b8d3-2ab624da8377
 *                     status:
 *                       type: string
 *                       example: IN_PROGRESS
 *                     assignedAgent:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 9a1b2c3d-1234-4567-890a-bcdef1234567
 *                         name:
 *                           type: string
 *                           example: Maria Souza
 *                         email:
 *                           type: string
 *                           example: maria@empresa.com
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-01-08T19:10:00.000Z
 *       400:
 *         description: ID do ticket não informado
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Apenas agentes podem assumir tickets
 *       404:
 *         description: Ticket não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /tickets/update-status/{ticketId}:
 *   patch:
 *     summary: Atualiza o status de um ticket
 *     description: |
 *       Atualiza o status de um ticket existente.
 *       Apenas agentes autorizados podem alterar o status.
 *       Dependendo da regra de negócio, somente o agente atribuído ao ticket pode realizar a ação.
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - OPEN
 *                   - IN_PROGRESS
 *                   - RESOLVED
 *                   - CLOSED
 *                 example: IN_PROGRESS
 *     responses:
 *       200:
 *         description: Status alterado com sucesso
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
 *                   example: Status alterado com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/TicketResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               statusNaoInformado:
 *                 summary: Status não informado
 *                 value:
 *                   success: false
 *                   message: Status não informado
 *               ticketNaoInformado:
 *                 summary: Ticket não informado
 *                 value:
 *                   success: false
 *                   message: Ticket não informado
 *       403:
 *         description: Permissão negada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Apenas agentes já atribuidos ao ticket podem alterar o seu status
 *       404:
 *         description: Ticket não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Ticket não foi encontrado
 */


export {};