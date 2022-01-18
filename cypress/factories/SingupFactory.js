
var faker = require('faker');
var cpf = require('gerador-validador-cpf')

export default {
  deliver: function () {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()

    var data = {
      name: `${firstName} ${lastName}`,
      cpf: cpf.generate(),
      email: faker.internet.email(firstName),
      whatsapp: '11999999999',
      adress: {
        postalcode: '14056630',
        street: 'Rua Sérgio Balduíno',
        number: '90',
        details: 'Casa',
        district: 'Jardim Arlindo Laguna',
        city_state: 'Ribeirão Preto/SP'
      },
      delivery_method: 'Moto',
      cnh: 'cnh-digital.jpg'
    }
    return data
  }
}