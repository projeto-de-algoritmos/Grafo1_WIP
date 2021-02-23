# InstaLink

**Número da Lista**: X<br>
**Conteúdo da Disciplina**: Grafos 1<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 15/0120702  |  [Calebe Rios de Sousa Mendes](https://github.com/CalebeRios) |
| 16/0144485  |  [Saleh Nazih Abdel Kader](https://github.com/devsalula) |

## Sobre 
O InstaLink é um WebScraping que mapeia usuários famosos do Instagram com outros usuários famosos.
A ideia é que você possa ver quais são os perfis ligados diretamente com o seu perfil favorito.
## Screenshots

![Captura de tela de 2021-02-22 21-56-12](https://user-images.githubusercontent.com/35435199/108790330-3107ca80-755b-11eb-88d4-b60e0f29b37d.png)

![Captura de tela de 2021-02-22 22-05-01](https://user-images.githubusercontent.com/35435199/108790315-251c0880-755b-11eb-8983-af168767db01.png)

![Captura de tela de 2021-02-22 22-05-28](https://user-images.githubusercontent.com/35435199/108790297-1a617380-755b-11eb-9ec0-6e0e3e767fd6.png)

## Instalação 
**Linguagem**: Javascript<br>
**Framework**: NodeJs para o Back e Angular para o Front<br>

Para ambos (back e front), vai ser necessário ter o node instalado. Para isso, recomendamos seguir a documentação oficial: https://nodejs.org/pt-br/download/package-manager/

### Front

Para rodar o front, é necessário entrar na pasta `front`.

Caso não tenha o angular instalado, rode o seguinte comando:

`npm install -g @angular/cli`

Se quiser, pode verificar a instalação com o comando: `ng — version`.

Agora tudo o que precisa fazer é instalar as depêndencias (`npm install`) e rodar o projeto:

`ng serve`

### Back

Para rodar o front, é necessário entrar na pasta `back`.

Para instalar as dependências do projeto, é necessário utilizar o seguinte comando: 

`npm install`

E para conseguir rodar o projeto:

`npm start`

## Uso 

O back vai estar disponível na rota `http://localhost:3000`, já o front na rota `http://localhost:4200`.

Para fazer uso do projeto, entre somente na rota no front. Lá você irá encontrar as instruções para adicionar o link do instagram que deseja ver as conexões. 

Após seguir as instruções presente na página, você poderá visualizar o grafo com as informações obtidas e ainda ver mais informações clicando em cada nó.

## Outros 
O Projeto tem um range máximo de busca de 25 nós devido o custo de processamento.
Além disso, por questão de arquitetura do Instagram e privacidade, só são permitidos a utilização de
perfis com pelo menos mais de 5000 seguidores.
