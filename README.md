# Braço Direito Assistente

Assistente modular voltado à gestão da manutenção industrial, compras, almoxarifado, estoque e automação da Campo do Gado.

## Objetivo
Centralizar consultas e ações com agentes especializados, preservando aprovações humanas para mudanças críticas, compras e operações industriais.

## Plano de integração
1. **Base e governança:** organizar documentação, configuração e permissões.
2. **Catálogo Agency Agents:** avaliar agentes do projeto [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents), selecionar os relevantes e importar/adaptar seus arquivos, mantendo licença e atribuição.
3. **Agentes próprios:** manutenção/PCM, compras, almoxarifado, engenharia industrial e acompanhamento gerencial.
4. **Integrações:** GitHub, sistema Manutenção Campo do Gado V2, banco de dados e APIs autorizadas.
5. **Validação:** testes, registros de auditoria, controles de acesso e implantação gradual.

## Regras essenciais
- Nenhum agente pode autorizar compras ou alterar equipamentos industriais autonomamente.
- Segredos ficam em variáveis de ambiente, nunca em commits.
- Toda movimentação de estoque deve ter identificação do usuário, item, quantidade, setor e referência a OS quando aplicável.
- Priorizar regras determinísticas para estoque e compras; IA atua na consulta, análise e sugestões.
- Copiar/adaptar material externo somente com os avisos de licença e créditos exigidos.

## Fonte de referência
Agency Agents — https://github.com/msitarzewski/agency-agents — licença MIT. A importação do catálogo ainda não foi realizada.

## Estado
Planejamento inicial criado. Ainda não há agentes executáveis, API ou integração com produção.
