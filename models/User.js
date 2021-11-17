const pool = require("../config/db")
const bcrypt = require("bcryptjs")

let User = function ({
    matriculation,
    password_hash,
    first_name,
    last_name,
    email,
    cpf,
    phone,
    birthdate,
    complementary_activity,
    extension_acitivity,
    points_total_amount,
    curso
}
) {
    this.matriculation = matriculation,
        this.password_hash = password_hash,
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.cpf = cpf,
        this.phone = phone,
        this.birthdate = birthdate,
        this.complementary_activity = complementary_activity,
        this.extension_acitivity = extension_acitivity,
        this.points_total_amount = points_total_amount,
        this.curso = curso,
        this.errors = []
}

User.prototype.create = function () {
    let salt = bcrypt.genSaltSync(10)
    this.password_hash = bcrypt.hashSync(this.password_hash, salt)
    const consulta = "INSERT INTO users(first_name, last_name, email, cpf, phone, password_hash, birthdate, id_course, matriculation)" +
        " values($1, $2, $3, $4, $5, $6, $7, $8,lower($9))"
    const values = [this.first_name, this.last_name, this.email, this.cpf, this.phone, this.password_hash, this.birthdate, this.curso, this.matriculation]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                console.log(values)
                reject("error: " + error)
            } else {
                resolve(results.rows[0])
            }
        });
    });

};

User.prototype.login = function (email) {
    return new Promise((resolve, reject) => {
        this.readByEmail(email).then((usuarioRecuperado) => {
            if (usuarioRecuperado && bcrypt.compareSync(this.password_hash, usuarioRecuperado.password_hash)) {
                resolve(usuarioRecuperado)
            } else {
                reject('Dados de login não conferem')
            }
        }).catch(() => { });
    });
};

User.prototype.readByEmail = function (email) {
    const select = "SELECT * FROM users u WHERE u.email= $1";
    const values = [this.email || email];

    return new Promise((resolve, reject) => {
        pool.query(select, values, (error, results) => {
            if (error) {
                reject("E-mail não encontrado");
            } else {
                resolve(results.rows[0]);

            }
        });
    });
};

User.prototype.alterarDados = function () {

    let salt = bcrypt.genSaltSync(10)
    this.data.senha = bcrypt.hashSync(this.data.senha, salt)
    const consulta = "UPDATE users set first_name=$1, last_name=$2, email=$3, cpf=$4, phone=$5, password_hash=$6 WHERE email=$3";
    const values = [this.first_name, this.last_name, this.email, this.cpf, this.phone, this.password_hash];
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

User.prototype.getTotalHours = function (email) {
    /**
     * Fazer um select e retornar somente as
     * -> Horas Complementares
     * -> Horas de extensão
     */
    const select = "SELECT complementary_activity, extension_activity FROM users WHERE email = $1"
    const values = [email];

    return new Promise((resolve, reject) => {
        pool.query(select, values, (error, results) => {
            if (error) {
                reject("E-mail não encontrado");
            } else {
                // hours_recovered = results.rows[0]
                // console.log(hours_recovered)
                // console.log(results.rows[0])
                resolve(results.rows[0])

            }
        });
    });
};


User.prototype.countComplementaryHours = function () { }

User.prototype.countExtensionHours = function () { }

User.prototype.countAmountPoints = function (current_total_amount, rewards, id_user) {
    const update = "UPDATE users SET points_total_amount = points_total_amount + $1  WHERE id_user = $2";

    const values = [rewards, id_user];

    return new Promise((resolve, reject) => {
        pool.query(update, values, (err, results) => {
            if (err) {
                reject("countAmountPoints:" + err)
            } else {
                resolve(results)
            }
        })
    })

}

module.exports = User