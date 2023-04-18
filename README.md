
# FutScore

Este é um projeto que desenvolvi, onde fiz tanto o front-end quanto o back-end. Neste projeto, é possível simular um campeonato de futebol, criar times e partidas, alterar o placar, finalizar partidas e, por fim, visualizar a tabela de classificação. Para acessar o site, é necessário fazer login ou registrar um perfil.


## Stack utilizada

**Front-end:** React, HTML, CSS, Axios.

**Back-end:** Node, Express, ApiRest, Typescript, Jest.

**Banco de dados:** MongoDB, Mongoose


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/LucasGFT/ProjectTest.git
```

Entre no diretório do projeto

```bash
  cd FutScore
```

Instale as dependências

```bash
  cd frontend
  npm install
  cd ..
  cd backend
  npm install
```

Inicie com o Docker

```bash
  docker-compose up -d
```


## Testes

Por enquanto foi feito testes somento da camada service no backend

```bash
  cd backend
  npm run test:coverage
```


## Permissões de usuário

Para ter acesso à criação de times e partidas, bem como a alteração do placar, é necessário que o usuário possua um cargo. Foi criado um seeder para o usuário com o cargo que permite a alteração:

```bash
  Email: teste@teste.com
  Password: 123456
```
Espero que goste do projeto! Qualquer dúvida ou sugestão, não hesite em entrar em contato.
