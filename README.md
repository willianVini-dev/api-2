# Cadastro de carro
  **requisitos funcionais  RF**

    - Deve ser possivel cadastrar um novo carro
    - Deve ser possivel listar todas as categorias 

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


# Alguel
  **requisitos funcionais  RF**

    - Deve ser possivel cadastrar um alugel 

  **regra de negocio RN**

    - O aluguel deve ter duração minima de 24 horas
    - Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o usuário
    - Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o carro
