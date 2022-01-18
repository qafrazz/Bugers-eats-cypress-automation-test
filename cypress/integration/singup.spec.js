import singup from '../pages/SingupPage';
import singupfactory from '../factories/SingupFactory';
describe('Singup', () => {

  // beforeEach(function () {
  //   cy.fixture("deliver").then((d) => {
  //     this.deliver = d
  //   })
  // })  usando a massa de dados fixa do deliver.json

  it('user should be deliver', function () {
    var deliver = singupfactory.deliver()

    singup.go()
    singup.fillForm(deliver)
    // singup.fillForm(this.deliver.singup) usando a massa de dados fixa do deliver.json
    singup.submit()
    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
    singup.modalContentShouldBe(expectedMessage)
  });

  it('invalid document', function () {
    var deliver = singupfactory.deliver()
    deliver.cpf = '22694515023347'
    singup.go()
    singup.fillForm(deliver)
    // singup.fillForm(this.deliver.cpf_inv) usando a massa de dados fixa do deliver.json
    singup.submit()
    const expectedMessage = 'Oops! CPF inválido';
    singup.alertMessageShoudBe(expectedMessage)
  });

  it('invalid email', function () {
    var deliver = singupfactory.deliver()
    deliver.email = 'papitohotmail.com.br'
    singup.go()
    singup.fillForm(deliver)
    // singup.fillForm(this.deliver.email_inv) usando a massa de dados fixa do deliver.json
    singup.submit()
    const expectedMessage = 'Oops! Email com formato inválido.';
    singup.alertMessageShoudBe(expectedMessage)
  });

  //Validação das mensagens obrigatórias por mensagem individualmente
  context('required fields', function () {

    const messages = [
      { field: 'name', output: 'É necessário informar o nome' },
      { field: 'cpf', output: 'É necessário informar o CPF' },
      { field: 'email', output: 'É necessário informar o email' },
      { field: 'postalcode', output: 'É necessário informar o CEP' },
      { field: 'number', output: 'É necessário informar o número do endereço' },
      { field: 'deliver-method', output: 'Selecione o método de entrega' },
      { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
    ]

    before(function () {
      singup.go()
      singup.submit()
    })

    messages.forEach(function (msg) {
      it(`${msg.field} is required`, function () {
        singup.alertMessageShoudBe(msg.output)
      })
    })
  })


});