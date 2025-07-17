# Documento de Requisitos – Sistema de Finanças Pessoais (Método dos Potes)

---

## Nome do Projeto

**Sistema de Finanças Pessoais – Método dos Potes**

---

## Descrição Geral

API para gerenciamento de finanças pessoais baseada no método dos potes, permitindo ao usuário organizar suas receitas e despesas em categorias pré-definidas com percentuais associados. O sistema possibilita também o compartilhamento de despesas entre usuários associados a uma casa.

---

## Funcionalidades

- Cadastro de usuários vinculados a casas
- Cadastro de casas para organização de despesas compartilhadas
- Cadastro de categorias (potes) com percentuais
- Cadastro de receitas
- Cadastro de despesas
- Dashboard com:
  - Filtro por período
  - Total de receitas no período
  - Total de despesas no período
  - Saldo (receitas - despesas)
  - Listagem de categorias:
    - Nome
    - Percentual
    - Total de despesas naquela categoria
    - Lista de despesas associadas com valor individual

---

## Regras de Negócio

- Cada usuário está vinculado a uma casa
- Cada casa pode ter múltiplos usuários, receitas e despesas
- Receitas são distribuídas virtualmente nos potes conforme percentual de cada categoria
- Despesas podem ser pessoais ou associadas a uma casa (visíveis a todos os usuários daquela casa)
- Cada categoria possui um percentual único definido pelo usuário
- Somente usuários podem acessar rotas protegidas

---

## Formas de Pagamento

- Boleto bancário
- Cartão de crédito
- Cartão de débito
- Cheque
- Dinheiro
- Transferência bancária
- Cortesia
- Voucher
- Via Convênio
