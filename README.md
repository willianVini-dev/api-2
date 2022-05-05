# Cadastro de carro

  **requisitos funcionais  RF**

   - Deve ser possivel cadastrar um novo carro

  **regra de negocio RN**

   - Não deve ser possivel cadastrar carro com uma placa já existente
   - Não deve ser possivel alterar a placa de um carro já cadastrado 
   - O carro deve ser cadastrado, por padrão como disponivel
   - O usuário responsavel pelo cadastro deve ser um administrador 



# Listagem de carro

  **requisitos funcionais  RF**

  - Deve ser possivel listar todos os carros disponiveis 
  - Deve ser possivel listar todos os carros disponiveis pelo nome da categoria 
  - Deve ser possivel listar todos os carros disponiveis pelo nome do carro 
  - Deve ser possivel listar todos os carros disponiveis pelo nome da marca 

  **regra de negocio RN**

  - O usuário não precisa estar logado no sistema para fazer a listagem de carros 



# Cadastro de Especificação no carro 

  **requisitos funcionais  RF**

  - Deve ser possivel cadastrar uma especificação para um carro
  - Deve ser possivel listar todas especificações 
  - Deve ser possivel listar todos os carros 
  - O usuário responsavel pelo cadastro deve ser um administrador 

  **regra de negocio RN**

  - Não deve ser possivel cadastrar uma especificação para um carro não cadastrado  
  - Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro 
  - O usuário responsavel pelo cadastro deve ser um administrador 


# Cadastro de imagens do carro

  **requisitos funcionais  RF**

  - Deve ser possivel cadastrar a imagem do carro
  - Deve ser possivel listar todos os carros

  **requisitos não funcionais RNF**

  - Utilizar o multer para upload dos arquivos

  **regra de negocio RN**

  - O Usuario deve poder cadastrar mais de uma imagem para o mesmo carro
  - O usuário responsavel pelo cadastro deve ser um administrador 


# Aluguel

  **requisitos funcionais  RF**

   - Deve ser possivel cadastrar um alugel 

  **regra de negocio RN**

   - O aluguel deve ter duração minima de 24 horas
   - Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o usuário
   - Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o carro


# Devolução de carro

  **requisitos funcionais RF**
   - deve ser possivel realizar a devolução de um carro

  **regra de negocio RN**
   - Se o carro for devolvido com menos de 24 horas devera ser cobrado diaria completa
   - Ao realizar a devolução o carro dedvera ser liberado para outro aluguel 
   - A realizar a devolução o usuario devera ser liberado para outro aluguel
   - Ao realizar a devolução devera ser calculado o total do aluguel
   - Caso o horario de devolução seja superior a previsto na entrega devera ser cobrado multa proporcional aos dias de atraso 
   - Caso haja multa devera ser somado ao total do aluguel
   - O usuario deve estar logado na aplicação
   
# Listagem de alugueis para usuario
  
  **requisitos funcionais RF**
   - Deve ser possivel realizar a busca de todos os alugueis para o usuario

  **regra de negocio RN**
   - O usuario deve estar logado na aplicação

# Recuperar Senha

  **requisitos funcionais RF**
   - Deve ser possivel o ususario recupera senha informando email
   - O Usúario deve receber um email com o passo a passo a recuperação da senha
   - O Usúario deve conseguir inserir nova senha

  **regra de negocio RF**
   - O usúario precisa informar uma nova senha
   - o link enviado para a recuperação deve expirar em 3 horas


