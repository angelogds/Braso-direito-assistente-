# Assistente pessoal e profissional — arquitetura

## Proposta
O Braço Direito terá dois contextos independentes, acessíveis por uma interface única:

### Pessoal
- Agenda, compromissos, lembretes e tarefas.
- Planejamento pessoal, viagens, listas e organização de documentos.
- Consultas e resumos de mensagens somente mediante conexão e autorização explícita.
- Preferências configuráveis e histórico privado.

### Profissional
- Manutenção/PCM, equipamentos, ordens de serviço, preventivas e demandas.
- Compras e almoxarifado, recebimento, endereçamento, saídas por OS e relatórios.
- Projetos industriais, indicadores e apoio à gestão.
- Integração com o Manutenção Campo do Gado V2 apenas com APIs e permissões autorizadas.

## Separação e segurança
- Dados pessoais e empresariais segregados por escopo e controle de acesso; proibido compartilhar automaticamente entre contextos.
- Indicador claro de modo (Pessoal ou Trabalho) na interface.
- Ações de escrita, mensagens, compras e eventos exigem confirmação do usuário quando aplicável.
- Segredos e tokens em armazenamento seguro, nunca em repositório.
- Excluir/exportar dados pessoais mediante função específica.
- Registro de auditoria para ações profissionais, sem expor informações pessoais à empresa.
- Nunca controlar equipamentos industriais sem proteções e autorização.

## Orquestrador
Classifica pedidos por modo, solicita esclarecimento quando o destino for ambíguo e encaminha para agentes específicos. O usuário pode alternar manualmente o modo.

## Prioridades de implementação
1. Interface com seleção Pessoal/Trabalho e identidade única.
2. Agenda e tarefas pessoais locais (sem integrações externas inicialmente).
3. Agentes e rotinas profissionais essenciais.
4. Conectores opcionais para calendário, e-mail e outros serviços mediante consentimento.
5. Testes de isolamento, autenticação, permissões e rastreabilidade.

## Estado
Documento de arquitetura; funcionalidades ainda não implementadas.
