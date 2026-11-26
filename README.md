# API Champions League

API REST desenvolvida em **Node.js, TypeScript e Express** para consultar e administrar informações de jogadores e clubes de futebol.

O projeto está organizado em camadas:
- **Routes:** definem os endpoints HTTP.
- **Controllers:** recebem as requisições e enviam as respostas.
- **Services:** concentram as regras de negócio.
- **Repository:** acessa e manipula os dados.
- **Models:** definem os tipos/estruturas dos dados.
- **Utils:** contém funções auxiliares para padronizar respostas HTTP.

> **Atenção sobre os dados:** no código atual, os jogadores ficam em um array em memória no `players-repo.ts`. Portanto, alterações feitas por POST, PATCH e DELETE são perdidas quando o servidor é reiniciado. O repositório de clubes lê `./src/data/clubs.json`; esse arquivo precisa existir no caminho indicado para a rota de clubes funcionar.

## 1. Pré-requisitos

Instale:
- [Node.js (versão LTS)](https://nodejs.org/) — inclui o NPM.
- [Postman](https://www.postman.com/downloads/) ou outra ferramenta para enviar requisições HTTP.
- [Visual Studio Code](https://code.visualstudio.com/) (opcional, recomendado).

Verifique as instalações:

```bash
node -v
npm -v
```

### Dependências

| Pacote | Finalidade |
|---|---|
| `express` | Criação do servidor HTTP e definição das rotas |
| `typescript` | Compilação e verificação de tipos TypeScript |
| `tsx` | Execução de arquivos TypeScript e modo de desenvolvimento |
| `@types/node` | Tipagens do Node.js |
| `@types/express` | Tipagens do Express |

O `npm install` registra as dependências no `package.json` e cria a pasta `node_modules`. Essa pasta não deve ser enviada ao Git; ela pode ser recriada com `npm install`.

## 2. Como executar

Na raiz do projeto, instale as dependências (inclusive depois de clonar o repositório):

```bash
npm install
```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

Se tudo estiver configurado, o terminal deverá exibir:

```text
Servidor executando em http://localhost:3333
```

Mantenha esse terminal aberto enquanto testa a API.

Para verificar os erros de TypeScript e gerar os arquivos JavaScript:

```bash
npm run start:dist
```
Após isso será gerado uma pasta "dist/" e ja será executado o arquivo JavaScript

## 3. Endpoints

Considerando as rotas definidas no arquivo `routes.ts`:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/players` | Lista todos os jogadores |
| GET | `/players/:id` | Busca um jogador pelo ID |
| POST | `/players` | Cadastra um jogador |
| PATCH | `/players/:id` | Atualiza as estatísticas de um jogador |
| DELETE | `/players/:id` | Exclui um jogador pelo ID |
| GET | `/clubs` | Lista os clubes |

URL local base: `http://localhost:3333`

### Exemplos de requisição

#### Listar jogadores

```http
GET http://localhost:3333/players
```

#### Buscar jogador por ID

```http
GET http://localhost:3333/players/1
```

#### Cadastrar jogador

```http
POST http://localhost:3333/players
Content-Type: application/json
```

Body (selecione **Body > raw > JSON** no Postman):

```json
{
  "id": 20,
  "name": "Vinicius Junior",
  "club": "Real Madrid",
  "nationality": "Brazil",
  "position": "Forward",
  "statistics": {
    "Overall": 90,
    "Pace": 95,
    "Shooting": 85,
    "Passing": 80,
    "Dribbling": 92,
    "Defending": 35,
    "Physical": 75
  }
}
```

#### Atualizar estatísticas

```http
PATCH http://localhost:3333/players/1
Content-Type: application/json
```

Body:

```json
{
  "Overall": 95,
  "Pace": 90,
  "Shooting": 96,
  "Passing": 92,
  "Dribbling": 97,
  "Defending": 40,
  "Physical": 70
}
```

No código atual, o PATCH substitui o objeto `statistics` do jogador pelo objeto enviado.

#### Excluir jogador

```http
DELETE http://localhost:3333/players/1
```

#### Listar clubes

```http
GET http://localhost:3333/clubs
```

O endpoint de clubes depende da existência do arquivo `src/data/clubs.json`, pois o repositório usa `fs.readFile("./src/data/clubs.json", "utf-8")`.

## 4. Testes manuais no Postman

Com o servidor em execução, crie uma requisição no Postman para cada cenário:

| Teste | Método e URL | Resultado esperado conforme a implementação |
|---|---|---|
| Listar jogadores | `GET /players` | `200 OK` e array de jogadores |
| Buscar ID existente | `GET /players/1` | `200 OK` e objeto do jogador |
| Buscar ID inexistente | `GET /players/999` | `204 No Content` pelo service atual |
| Cadastrar jogador válido | `POST /players` | `201 Created` |
| Atualizar jogador existente | `PATCH /players/1` | `200 OK` e jogador atualizado |
| Excluir jogador existente | `DELETE /players/1` | `200 OK` e mensagem `deleted` |
| Excluir ID inexistente | `DELETE /players/999` | `400 Bad Request` pelo service atual |
| Listar clubes | `GET /clubs` | `200 OK`, se o JSON de clubes existir |

> Os códigos de status acima refletem a lógica dos arquivos enviados. Uma resposta `404 Not Found` também pode ser gerada pelo Express quando nenhuma rota corresponde ao endereço solicitado. Se isso acontecer, confira a URL, o registro do router no servidor e o método HTTP.

### Sugestão de sequência de testes

1. Faça `GET /players` e confirme que a lista aparece.
2. Faça `GET /players/1` e confira os dados do jogador de ID 1.
3. Faça `POST /players` para cadastrar o jogador de ID 20.
4. Faça `PATCH /players/1` para alterar as estatísticas.
5. Faça `DELETE /players/20` para excluir o jogador cadastrado.
6. Faça novamente `GET /players/20` e confirme que ele não aparece mais.
7. Teste um ID inexistente, como `999`, para verificar o tratamento de erro.

**Importante:** como os jogadores ficam em memória, reiniciar o servidor restaura a lista inicial definida no repositório. Execute o POST novamente se quiser repetir o teste de cadastro.

## 5. Estrutura de pastas sugerida

Ajuste os nomes conforme os diretórios reais do seu projeto:

```text
projeto-api/
├── src/
│   ├── controllers/
│   │   ├── player-controller.ts
│   │   └── clubs-controllers.ts
│   ├── services/
│   │   ├── player-service.ts
│   │   └── clubs-service.ts
│   ├── repository/
│   │   ├── players-repo.ts
│   │   └── clubs-repo.ts
│   ├── routes/
│   │   └── routes.ts
│   ├── models/
│   │   ├── player-model.ts
│   │   ├── club-model.ts
│   │   └── statistic-model.ts
│   ├── utils/
│   │   └── helper.ts
│   ├── data/
│   │   └── clubs.json
│   └── server.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## 6. Limitações atuais e melhorias futuras

- Os jogadores são armazenados em memória; uma evolução seria utilizar MySQL, PostgreSQL ou MongoDB.
- O cadastro deve validar campos obrigatórios e impedir IDs duplicados.
- As rotas podem padronizar o tratamento de IDs inválidos e recursos inexistentes com `400` e `404`, respectivamente.
- O projeto pode ganhar testes automatizados com Vitest ou Jest e Supertest.
- O caminho do JSON de clubes pode ser resolvido de forma independente do diretório em que o processo foi iniciado.

---

**Resumo:** instale as dependências com `npm install`, inicie o servidor com `npm run dev` e teste os endpoints usando o Postman em `http://localhost:3333`.
