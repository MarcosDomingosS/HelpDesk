# 📘 Documento de Requisitos – Sistema HelpDesk

Este documento descreve de forma detalhada os **Requisitos Funcionais (RF)**, **Regras de Negócio (RN)** e **Requisitos Não Funcionais (RNF)** do sistema **HelpDesk**, um sistema de gestão de chamados de suporte desenvolvido em Node.js com Express.

---

## 📌 1. Requisitos Funcionais (RF)

Os requisitos funcionais descrevem **o que o sistema deve fazer**, ou seja, suas funcionalidades principais.

### 🔐 RF — Autenticação e Usuários

* **RF01** – O sistema deve permitir que usuários se autentiquem utilizando e-mail e senha.
* **RF02** – O sistema deve gerar um token JWT após autenticação bem-sucedida.
* **RF03** – O sistema deve permitir o logout do usuário, invalidando o token ativo.
* **RF04** – O sistema deve permitir o cadastro de usuários com perfis distintos (ADMIN, AGENT, CLIENT).
* **RF05** – O sistema deve permitir que administradores listem todos os usuários cadastrados.

---

### 🎫 RF — Tickets (Chamados)

* **RF06** – O sistema deve permitir que clientes criem novos tickets de suporte.
* **RF07** – O sistema deve permitir a visualização de tickets por status, prioridade e data.
* **RF08** – O sistema deve permitir que agentes assumam tickets disponíveis.
* **RF09** – O sistema deve permitir a alteração do status de um ticket.
* **RF10** – O sistema deve permitir que administradores reatribuam tickets entre agentes.

---

### 💬 RF — Mensagens

* **RF11** – O sistema deve permitir o envio de mensagens associadas a um ticket.
* **RF12** – O sistema deve permitir mensagens internas visíveis apenas para agentes e administradores.
* **RF13** – O sistema deve exibir o histórico completo de mensagens de um ticket.

---

### 🔔 RF — Notificações

* **RF14** – O sistema deve notificar usuários quando houver novas mensagens em seus tickets.
* **RF15** – O sistema deve notificar agentes quando um ticket for atribuído a eles.
* **RF16** – O sistema deve notificar administradores quando ocorrer violação de SLA.

---

## 📕 2. Regras de Negócio (RN)

As regras de negócio definem **o que é permitido ou proibido** dentro do domínio do sistema, garantindo consistência e integridade das operações.

### 👤 RN — Usuários e Permissões

* **RN01** – Um usuário só pode acessar informações relacionadas à sua própria conta, exceto administradores.
* **RN02** – Apenas usuários com perfil ADMIN podem gerenciar outros usuários.
* **RN03** – Agentes só podem atuar em tickets do departamento ao qual pertencem.

---

### 🎫 RN — Tickets

* **RN04** – Um ticket deve obrigatoriamente estar vinculado a um cliente e a um departamento.
* **RN05** – Um ticket com status `CLOSED` não pode sofrer alterações.
* **RN06** – Um ticket só pode ser marcado como `RESOLVED` por um agente ou administrador.
* **RN07** – Um cliente não pode alterar o status de um ticket após sua criação.

---

### 💬 RN — Mensagens

* **RN08** – Mensagens internas não devem ser visíveis para clientes.
* **RN09** – Não é permitido enviar mensagens em tickets fechados.
* **RN10** – Toda mensagem deve ficar registrada para fins de auditoria.

---

### ⏱️ RN — SLA

* **RN11** – O tempo de SLA deve iniciar no momento da criação do ticket.
* **RN12** – Se o tempo de resolução ultrapassar o SLA definido, o ticket deve ser marcado como violado.
* **RN13** – Tickets com SLA violado devem ter prioridade elevada automaticamente.

---

## 📗 3. Requisitos Não Funcionais (RNF)

Os requisitos não funcionais descrevem **como o sistema deve se comportar**, abrangendo desempenho, segurança, arquitetura e qualidade.

### ⚡ RNF — Desempenho

* **RNF01** – O sistema deve responder às requisições em até 300ms em 95% dos casos.
* **RNF02** – O sistema deve suportar no mínimo 1.000 usuários simultâneos.

---

### 🔐 RNF — Segurança

* **RNF03** – O sistema deve utilizar autenticação baseada em JWT.
* **RNF04** – As senhas devem ser armazenadas utilizando hash seguro (bcrypt ou equivalente).
* **RNF05** – O sistema deve proteger rotas sensíveis por middleware de autenticação e autorização.

---

### 🧱 RNF — Arquitetura e Tecnologia

* **RNF06** – O backend deve ser desenvolvido em Node.js utilizando Express e TypeScript.
* **RNF07** – O sistema deve seguir arquitetura em camadas (controller, service, repository).
* **RNF08** – O banco de dados relacional deve ser PostgreSQL ou equivalente.

---

### 📄 RNF — Confiabilidade e Manutenção

* **RNF09** – O sistema deve registrar logs de erro e auditoria.
* **RNF10** – O sistema deve possuir documentação de API via Swagger.
* **RNF11** – O sistema deve possuir testes automatizados para regras críticas de negócio.

---

## 🧠 Observação Final

* **Controllers** implementam Requisitos Funcionais (RF)
* **Services** concentram Regras de Negócio (RN)
* **Infraestrutura e Configurações** atendem aos Requisitos Não Funcionais (RNF)

Este documento pode ser utilizado como base para **SRS**, **documentação técnica**, **planejamento de desenvolvimento** ou **portfólio profissional**.
