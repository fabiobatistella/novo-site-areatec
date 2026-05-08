# Guia de Contribuição - Areatec

Primeiramente, obrigado por dedicar seu tempo para contribuir com o novo site da Areatec! 🎉

Este documento fornece diretrizes para contribuir com o projeto. Ao participar, você concorda em manter um ambiente respeitoso e colaborativo.

## 🐛 Como Reportar Bugs

Bugs são rastreados como [Issues do GitHub](https://github.com/fabiobatistella/novo-site-areatec/issues). Ao reportar um bug, utilize o template `Bug Report` e forneça o máximo de informações possível:

1. **Use um título claro e descritivo** para a issue.
2. **Descreva os passos exatos para reproduzir o problema**, de forma que qualquer pessoa consiga replicá-lo.
3. **Descreva o comportamento atual** e explique por que ele é um bug.
4. **Descreva o comportamento esperado** (o que deveria acontecer).
5. **Inclua capturas de tela ou GIFs animados** se possível, especialmente para problemas visuais.
6. **Informe o ambiente:** navegador, sistema operacional e resolução da tela.

## 💡 Como Sugerir Features

Sugestões de novas funcionalidades também são rastreadas via [Issues do GitHub](https://github.com/fabiobatistella/novo-site-areatec/issues). Utilize o template `Feature Request` e inclua:

1. **Use um título claro e descritivo** para a sugestão.
2. **Descreva o problema** que esta feature resolve.
3. **Descreva a solução proposta** detalhadamente.
4. **Descreva alternativas** que você considerou.
5. **Contexto adicional**, como mockups, referências de outros sites ou documentação relacionada.

## 💻 Padrões de Código

Para manter a consistência do código, utilizamos ferramentas automatizadas:

- **ESLint:** Analisa o código em busca de problemas.
- **Prettier:** Formata o código automaticamente.

### Regras Gerais:
- O código deve ser escrito em **TypeScript**.
- Nomes de variáveis, funções e componentes devem ser em **inglês** (ex: `header`, `button`, `getUserData`), mas textos visíveis para o usuário e comentários devem ser em **português**.
- A inteligência artificial da empresa deve ser SEMPRE referenciada como **"Cortex Areatec"** (nunca "Manu IA").
- Utilize **Tailwind CSS** para estilização.
- Evite criar arquivos CSS customizados, a menos que estritamente necessário.
- Componentes reutilizáveis devem ser colocados em `client/src/components/ui/`.

Antes de enviar seu código, certifique-se de rodar:
```bash
pnpm run check   # Verifica erros de TypeScript
pnpm run format  # Formata o código com Prettier
```

## 🌿 Fluxo de Branches

Seguimos um fluxo de trabalho baseado no Git Flow simplificado. Nomeie suas branches de acordo com o tipo de trabalho:

- `main`: Código de produção estável. NUNCA comite diretamente na main.
- `feature/<nome-da-feature>`: Para novas funcionalidades (ex: `feature/dark-mode`).
- `fix/<nome-do-bug>`: Para correção de bugs (ex: `fix/header-mobile`).
- `docs/<nome-da-doc>`: Para alterações apenas em documentação.
- `chore/<nome-da-tarefa>`: Para tarefas de manutenção (ex: atualizar dependências).

## 🔄 Processo de Pull Request

1. Faça um Fork do repositório e crie sua branch a partir da `main`.
2. Se você adicionou ou modificou componentes, garanta que eles funcionam em diferentes tamanhos de tela (mobile e desktop).
3. Certifique-se de que o código passa nas verificações (`pnpm run check`).
4. Faça commits com mensagens claras em **português**, seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: adiciona seção de produtos`
   - `fix: corrige alinhamento do logo no mobile`
   - `docs: atualiza README com instruções de instalação`
5. Abra um Pull Request utilizando o template padrão.
6. Solicite revisão de pelo menos um membro da equipe (Fábio, Ronei, Marcelo ou Bruno).
7. Após aprovação, o PR será mergeado via "Squash and merge" para manter o histórico da main limpo.

Obrigado por ajudar a construir "Tecnologia que funciona"! 🚀
