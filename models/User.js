const pool = require("../config/db")
const bcrypt = require("bcryptjs")
// const moment = require("moment")


let User = function (data) {
    this.data = data;
    this.errors = []
}

User.prototype.login = function () {
    return new Promise((resolve, reject) => {
        this.readByEmail().then((usuarioRecuperado) => {
            if (usuarioRecuperado && bcrypt.compareSync(this.data.senha, usuarioRecuperado.senha)) {
                resolve('Login confere')
            } else {

                reject('Dados de login não conferem')
            }
        }).catch(() => { });
    });
};

User.prototype.readByEmail = function () {
    const consulta = "SELECT * FROM users u WHERE u.email= $1";
    const values = [this.data.email];

    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("E-mail não encontrado");
            } else {
                usuarioRecuperado = results.rows[0];
                console.log(usuarioRecuperado)
                resolve(usuarioRecuperado);

            }
        });
    });
};

User.prototype.create = function () {
    let salt = bcrypt.genSaltSync(10)
    this.data.senha = bcrypt.hashSync(this.data.senha, salt)
    const consulta = 'INSERT INTO users(nome, sobrenome, email, cpf, telefone, instituicao, cidade, senha, nascimento, tipo_curso, curso, matricula) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ,lower($12))'
    const values = [this.data.nome, this.data.sobrenome, this.data.email, this.data.cpf, this.data.telefone, this.data.instituicao, this.data.cidade, this.data.senha, this.data.nascimento, this.data.tipo_curso, this.data.curso, this.data.matricula]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao cadastrar o aluno!")
            } else {
                console.log(results)
                resolve("Usuário inserido com sucesso!")
            }
        });
    });

};

User.prototype.alterarDados = function () {

    let salt = bcrypt.genSaltSync(10)
    this.data.senha = bcrypt.hashSync(this.data.senha, salt)
    const consulta = "UPDATE users set nome=$1, nascimento=$2, senha=$3 WHERE email=$4";
    const values = [this.data.nome, this.data.nascimento, this.data.senha, this.data.email];
    console.log(consulta)

    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel alterar os Dados");
            } else {
                resolve("Informações alteradas com sucesso");
            }
        });
    });
};

module.exports = User