**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regra de negócio


# Cadastro de carro
**RF:**
[x] Deve ser possível cadastrar um novo carro;
**RN:**
[x] Não deve ser possível cadastrar um carro com uma placa já existente;
[x] O carro deve ser, por padrão, disponível, ao ser cadastrado;
[x] O responsável pelo cadastro deve ser um usuário administrador;

 
# Listagem de carros
**RF:**
[x] Deve ser possível listar os carros disponíveis;
[x] Deve ser possível listar os carros disponíveis pelo nome do carro;
[x] Deve ser possível listar os carros disponíveis pelo nome da marca;
[x] Deve ser possível listar os carros disponíveis pelo nome da categoria;
**RN:**
[x] O usuário não precisa estar logado no sistema;


# Cadastro de especificação no carro
**RF:**
[x] Deve ser possível cadastrar uma especificação para um carro;

**RN:**
[x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
[x] Não deve ser possível cadastrar uma especificação já cadastrada no mesmo carro;
[x] O responsável pelo cadastro deve ser um usuário administrador;


# Cadastro de imagens do carro
**RF:**
[x] Deve ser possível cadastrar a imagem do carro;
**RNF:**
[x] Utilizar o multer para upload dos arquivos;
**RN:**
[x] Deve ser possível cadastrar mais de uma imagem para o mesmo carro carro;
[x] O responsável pelo cadastro deve ser um usuário administrador;


# Aluguel de carro
**RF:**
[x] Deve ser possível cadastrar um aluguel;
**RN:**
[x] O aluguel deve ter duração mínima de 24 horas;
[x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
[x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;
[x] O usuário deve estar logado na aplicação;
[x] Ao realizar um aluguel, o status do carro deve ser alterado para indisponível;
[x] Ao realizar um aluguel, o status do usuário deve ser alterado para indisponível;

# Devolução de carro
**RF:**
[x] Deve ser possível realizar a devolução de um carro;
**RN:**
[x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
[x] Ao realizar devolução, o carro deverá ser liberado para outro aluguel;
[x] Ao realizar devolução, o usuário deverá ser liberado para outro aluguel;
[x] Ao realizar devolução, deverá ser calculado o total do aluguel;
[x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso;
[x] Caso haja multa, deverá ser somado ao total do aluguel;
[x] O usuário deve estar logado na aplicação;

# Listagem de Alugueis para o usuário

**RF**
[ ] Deve ser possível realizar a busca de todos os alugueis para o usuário;

**RN**
[ ] O usuário deve estar logado na aplicação;