# 🗂️ Documento de Entidades – Sistema HelpDesk

Este documento descreve detalhadamente as **entidades do domínio** do sistema **HelpDesk**, incluindo propósito, atributos principais e relacionamentos. Ele complementa o documento de requisitos (RF, RN e RNF).

---

## 👤 Entidade: User (Usuário)

### 📌 Descrição

Representa qualquer pessoa que acessa o sistema. Usuários podem ter diferentes perfis, que definem permissões e responsabilidades.

### 🧱 Atributos

* `id` (PK)
* `name`
* `email`
* `password`
* `role` (`ADMIN` | `AGENT` | `CLIENT`)
* `created_at`
* `updated_at`

### 🔗 Relacionamentos

* Um usuário pode **criar vários tickets** (CLIENT)
* Um usuário pode **ser responsável por vários tickets** (AGENT)
* Um usuário pode **enviar várias mensagens**
* Um usuário pode **receber várias notificações**

---

## 🏢 Entidade: Department (Departamento)

### 📌 Descrição

Representa uma área ou setor da empresa responsável por atender determinados tipos de chamados, cada um com seu SLA específico.

### 🧱 Atributos

* `id` (PK)
* `name`
* `sla_minutes`
* `created_at`

### 🔗 Relacionamentos

* Um departamento possui **vários tickets**
* Um departamento pode possuir **vários agentes**

---

## 🎫 Entidade: Ticket (Chamado)

### 📌 Descrição

Representa uma solicitação de suporte aberta por um cliente e atendida por agentes.

### 🧱 Atributos

* `id` (PK)
* `title`
* `description`
* `status` (`OPEN` | `IN_PROGRESS` | `RESOLVED` | `CLOSED`)
* `priority` (`LOW` | `MEDIUM` | `HIGH`)
* `user_id` (FK → User)
* `department_id` (FK → Department)
* `assigned_agent_id` (FK → User)
* `created_at`
* `updated_at`

### 🔗 Relacionamentos

* Um ticket pertence a **um cliente**
* Um ticket pertence a **um departamento**
* Um ticket pode ser atribuído a **um agente**
* Um ticket possui **várias mensagens**
* Um ticket possui **registros de SLA**

---

## 💬 Entidade: Message (Mensagem)

### 📌 Descrição

Representa a comunicação entre cliente e agentes dentro de um ticket.

### 🧱 Atributos

* `id` (PK)
* `ticket_id` (FK → Ticket)
* `sender_id` (FK → User)
* `message`
* `is_internal` (boolean)
* `created_at`

### 🔗 Relacionamentos

* Uma mensagem pertence a **um ticket**
* Uma mensagem pertence a **um usuário (remetente)**

---

## ⏱️ Entidade: SlaLog (Registro de SLA)

### 📌 Descrição

Registra o controle de tempo do SLA de um ticket, permitindo auditoria e métricas de desempenho.

### 🧱 Atributos

* `id` (PK)
* `ticket_id` (FK → Ticket)
* `started_at`
* `resolved_at`
* `breached` (boolean)

### 🔗 Relacionamentos

* Um registro de SLA pertence a **um ticket**

---

## 🔔 Entidade: Notification (Notificação)

### 📌 Descrição

Representa alertas enviados aos usuários sobre eventos importantes no sistema.

### 🧱 Atributos

* `id` (PK)
* `user_id` (FK → User)
* `type`
* `payload` (JSON)
* `read_at`
* `created_at`

### 🔗 Relacionamentos

* Uma notificação pertence a **um usuário**

---

## 🧠 Observações de Modelagem

* As entidades seguem princípios de **normalização**
* Regras de negócio não devem ser implementadas diretamente nas entidades
* A validação de permissões deve ocorrer na camada de serviço
* Todas as entidades devem possuir controle de data para auditoria

---

Este documento pode ser utilizado para:

* criação de **ERD (Diagrama Entidade-Relacionamento)**
* definição de **migrations**
* implementação de **models (Sequelize / Prisma)**
* apoio em **análise e design de sistemas**
