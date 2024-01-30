# API WorkLabWeb simplificado

Uma API REST feita em Node.js e MySQL para simular um fluxo de atendimentos onde pacientes podem realizar exames médicos.

## Pré-requisitos
- **Node.js**
- **MySQL**


# Instalação/Configuração

## Configurando banco de dados

Utilize do arquivo `src/database/schema.sql` de referencia para criar o banco de dados e as tabelas no MySQL.

Atualize o arquivo `src/database/index.js` de acordo com as credencias do seu banco de dados local.

```
var connection = mysql.createConnection({
  host: 'localhost',
  user:'SEU_USUARIO',
  password: 'SUA_SENHA',
  database: 'worklabweb',
});

```

## Clone o repositório

```
git clone https://github.com/aleolvfer/worklabweb.git
cd worklabweb

```

## Instale os pacotes e rode o projeto

```
npm install
npm run dev

//ou

yarn
yarn dev

```

# Como testar a API


Utilize o POSTMAN ou ferramenta similar para fazer as chamadas, conforme exemplo:

## Rota de exames


**GET**: http://localhost:3000/exams retorna todos os exames cadastrados.

**GET**: http://localhost:3000/exams/gli retorna o exame com o código (code) informado com a seguinte estrutura:

```
{
 "code": "GLI",
 "description": "GLICOSE",
 "price": 29.9
}

```

**POST**: http://localhost:3000/exams cadastra um exame no banco de dados conforme estrutura de dados:

```
{
 "code": "GLI",
 "description": "GLICOSE",
 "price": 29.9
}

```

**PUT**: http://localhost:3000/exams/gli atualiza o exame do código (code) informado conforme estrutura de dados:

```
{
 "code": "GLICO",
 "description": "GLICOSE",
 "price": 59.9
}

```
**DELETE**: http://localhost:3000/exams/gli remove do banco de dados o exame do código (code) informado, *exames vinculados a serviços/atendimentos não podem ser deletados*.


## Rota de Pacientes

**GET**: http://localhost:3000/patients retorna todos os pacientes cadastrados.

**GET**: http://localhost:3000/patients/59803947-bcb6-11ee-878d-00216bfcff1c retorna o paciente com o id informado com a seguinte estrutura de dados:

```
{
 "patient_id": "db07c925-be1a-11ee-878d-00216bfcff1c",
 "patient_name": "Patient",
 "patient_email": "Patient@gmail.com",
 "patient_sex": "Masc",
 "phone": "0099",
 "services": [
   {
    "service_id": "a9ef3610-1273-4a92-b0c5-ab31813194fd",
    "exams": [
      {
        "exam_code": "HEMO",
        "exam_description": "HEMOGRAMA",
        "exam_price": 123.12
      },
      {
        "exam_code": "GLI",
        "exam_description": "GLICOSE",
        "exam_price": 123.12
      }
    ]
   }
  ]
}

```

**POST**: http://localhost:3000/patients cadastra um paciente conforme estrutura de dados:

```
{
 "patient_name": "Patient",
 "patient_email": "Patient@gmail.com",
 "patient_sex": "Masc",
 "phone": "0099",
}

```

**PUT**: http://localhost:3000/patients/59803947-bcb6-11ee-878d-00216bfcff1c atualiza o cadastro do paciente com o id informado com a seguinte estrutura de dados:

```
{
 "patient_name": "Patient",
 "patient_email": "Patient@gmail.com",
 "patient_sex": "Masc",
 "phone": "0099",
}

```

**DELETE**: http://localhost:3000/patients/59803947-bcb6-11ee-878d-00216bfcff1c remove do banco de dados o paciente do id informado, *pacientes vinculados a serviços/atendimentos não podem ser deletados*.


## Rota de Serviços/Atendimentos

**GET**: http://localhost:3000/services retorna todos os serviços cadastrados.

**GET**: http://localhost:3000/services/99903947-bcb6-11ee-878d-00216bfcff1c retorna o serviço com o id informado com a seguinte estrutura de dados:

```
{
 "service_id": "a9ef3610-1273-4a92-b0c5-ab31813194fd",
 "patient_id": "db07c925-be1a-11ee-878d-00216bfcff1c",
 "patient_name": "Patient",
 "patient_email": "Patient@gmail.com",
 "patient_sex": "Masc",
 "phone": "0099",
 "exams": [
    {
     "exam_code": "HEMO",
     "exam_description": "HEMOGRAMA",
     "exam_price": 123.12
    },
    {
     "exam_code": "GLI",
     "exam_description": "GLICOSE",
     "exam_price": 123.12
    }
  ]
}

```

**POST**: http://localhost:3000/services cadastra um serviço conforme estrutura de dados:

```
{
 "exam_code": ["GLI", "hemo"],
 "patient_id": "763d4229-bcb6-11ee-878d-00216bfcff1c"
}

```
ou

```
{
 "exam_code": "GLI",
 "patient_id": "763d4229-bcb6-11ee-878d-00216bfcff1c"
}

```

*Serviços não podem ser deletados ou atualizados*.