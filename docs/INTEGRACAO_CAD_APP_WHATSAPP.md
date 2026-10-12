# Integração do Braço Direito com o CAD — decisão de arquitetura

## Decisão do usuário (11/10/2026)
- Canal prioritário: aplicativo próprio, **dentro do sistema Manutenção Campo do Gado V2 (repositório ang elogds/CAD, sem espaço: angelogds/CAD)**.
- Canal futuro: WhatsApp, depois do módulo interno estar estável.
- Dois contextos: profissional e pessoal, com separação de acesso/dados.

## Evidência do CAD
- Fonte: https://github.com/angelogds/CAD
- Node.js + Express + EJS + SQLite; execução em Railway.
- Layout compartilhado: `views/layout.ejs`, menu lateral: `views/partials/sidebar.ejs`.
- Sessões/autenticação já existentes.
- PWA e base Capacitor para Android; iOS ainda depende de ferramentas/credenciais e processo de publicação.
- Reutilizar o backend existente; não criar outro servidor por padrão.

## Arquitetura proposta
1. Incorporar rota e tela `/braco-direito` no CAD, com entrada no menu, respeitando o padrão EJS e mobile.
2. API interna autenticada para conversar com orquestrador e especialistas; chave de provedor de IA somente no backend via variável de ambiente.
3. Alternância explícita `Trabalho`/`Pessoal`; escopo e armazenamento separados, inclusive logs e busca.
4. Perfil e permissões do CAD continuam prevalecendo sobre qualquer ação solicitada ao assistente.
5. Conectar progressivamente OS, demandas, estoque, compras e relatórios por serviços existentes do CAD; primeiro leitura, depois operações confirmadas e auditáveis.
6. Agenda e tarefas pessoais privadas, sem disponibilizar dados para perfis empresariais nem misturar com `Meu Portal` de RH.
7. WhatsApp como adaptador posterior, com identidade, opt-in, confirmação e restrição de informações sensíveis.
8. Catálogo Agency Agents incorporado de modo seletivo no repositório Braço Direito, preservando licença e atribuição; não confundir arquivos de prompts com agentes executáveis.

## Sequência de entrega
- **Etapa A:** auditar rotas, proteção de acesso, serviços de IA e menu do CAD; criar PR para módulo visual inicial.
- **Etapa B:** endpoint de chat seguro, histórico por usuário/contexto e testes de permissão.
- **Etapa C:** ferramentas de leitura, depois ações autorizadas nos módulos de trabalho.
- **Etapa D:** tarefas e agenda pessoal, isolamento comprovado por testes.
- **Etapa E:** conexão WhatsApp, notificações e expansão mobile.

## Critérios de aceite
- Acesso dentro do CAD sem interromper módulos existentes.
- Permissões verificadas no servidor, nunca só na interface.
- Ninguém visualiza conversas pessoais de outros usuários ou pelo perfil da empresa.
- Nenhuma compra, movimento de estoque, alteração de OS ou comando industrial sem autorização.
- Compatibilidade web/PWA e validação mobile.

## Situação
A decisão arquitetural foi documentada no Braço Direito; nenhuma alteração no CAD foi aplicada ainda.
