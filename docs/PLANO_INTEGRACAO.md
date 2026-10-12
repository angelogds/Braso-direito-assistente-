# Plano de implementação

## Fase 1 — Estrutura
- README e estrutura documental.
- Catálogo e escolha dos agentes externos, com licença original.
- Definição de stack, autenticação e ambiente.

## Fase 2 — Agentes
- **Orquestrador:** classifica pedidos e distribui aos especialistas.
- **Manutenção/PCM:** OS, preventivas, equipamentos e demandas.
- **Almoxarifado:** recebimento, categorias, endereçamento, entradas e saídas vinculadas às OS.
- **Compras:** solicitação, cotação, aprovação, recebimento e rastreabilidade.
- **Engenharia:** documentação técnica, sensores PT100 e projetos.
- **Gestão:** indicadores, atrasos, relatórios e resumos.

## Fase 3 — Integração com Manutenção Campo do Gado V2
- Ler endpoints e autenticação existentes.
- Não substituir fluxos existentes.
- Configurar perfis e autorização por operação.
- Validar em homologação antes de qualquer deploy.

## Critérios de aceite
- Uma entrada de material resulta em localização/categoria e saldo consistentes.
- Uma retirada referencia usuário, setor e OS e gera baixa e trilha de auditoria.
- Compras seguem as etapas e aprovações do sistema atual.
- IA nunca executa ações físicas ou aprova operações financeiras sem autorização.
- Logs e testes cobrem permissões e falhas.

## Pendências de decisão
- Seleção dos arquivos/agentes externos a incorporar.
- Arquitetura de execução e credenciais das integrações (não armazenar no repositório).
- Ambiente de implantação e estratégia de testes.
