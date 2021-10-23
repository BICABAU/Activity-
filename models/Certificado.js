const pool = require("../config/db")
const aws = require('aws-sdk')
const s3 = new aws.S3()

let Certificado = function (file, certificado, email) {
    this.file = file
    this.certificado = certificado
    this.email = email
    this.errors = []
}

Certificado.prototype.create = function () {
    const consulta = 'INSERT INTO certificados (tipo_de_atividade,categoria_atividade,subcategoria_atividade,qtd_horas,nome,tamanho,chave,url, email_fk, descricao_atividade, periodo_realizado) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
    const values = [this.certificado.tipo_de_atividade, this.certificado.categoria_atividade, this.certificado.subcategoria_atividade, this.certificado.qtd_horas, this.file.key, this.file.size, this.file.originalname, this.file.location, this.email, this.certificado.descricao, this.certificado.periodo]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao inserir certificado!" + error)
            } else {
                resolve("Certificado inserido com sucesso!")
            }
        });
    });
}

Certificado.prototype.readCatAcsSubCategoria = function (acs) {

    const consulta = 'SELECT * from acs_subcategorias inner join acs' +
        ' ON (acs_subcategorias.id_tipo_atividade_acs_fk = acs.id_tipo_atividade_acs)' +
        `WHERE acs.id_tipo_atividade_acs = ${acs}`
    console.log(consulta)
    const values = []
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao retornar cursos de um determinado tipo!")
            } else {
                subcategoria_recuperada = results.rows
                console.log(subcategoria_recuperada)
                resolve(subcategoria_recuperada)
            }
        });
    });
};

Certificado.prototype.readAllACs = function () {
    const consulta = "SELECT * FROM certificados u where u.email_fk=$1 and u.tipo_de_atividade='Atividades Complementares'";
    const values = [this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows

                resolve(resultado);
            }
        });
    });
}

Certificado.prototype.readCatAes = function () {
    const consulta = "SELECT * from aes"
    return new Promise((resolve, reject) => {
        pool.query(consulta, (error, results) => {
            if (error) {
                reject("Não foi possivel ler as categorias" + error)
            } else {
                resultado_categoria = results.rows
                resolve(resultado_categoria)
            }
        })
    })
}

Certificado.prototype.readCatAcs = function () {
    const consulta = "SELECT * from acs"
    return new Promise((resolve, reject) => {
        pool.query(consulta, (error, results) => {
            if (error) {
                reject("Não foi possivel ler as categorias" + error)
            } else {
                resultado_categoria = results.rows
                resolve(resultado_categoria)
            }
        })
    })
}

Certificado.prototype.readAllAEs = function () {
    const consulta = "SELECT * FROM certificados u where u.email_fk=$1 and u.tipo_de_atividade='Atividades De Extensão'";
    const values = [this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                resolve(resultado);
            }
        });
    });
}

Certificado.prototype.readAll = function () {
    const consulta = "SELECT * FROM certificados u where u.email_fk=$1";
    const values = [this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                resolve(resultado);
            }
        });
    });
}

Certificado.prototype.readOneById = function (id_certificado) {
    const consulta = "SELECT * FROM certificados u where u.id_certificado=$1";
    const values = [id_certificado]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                console.log(resultado)
                resolve(resultado);
            }
        });
    });
}

Certificado.prototype.apagar = function (nome) {
    const consulta = "DELETE FROM certificados u where u.nome=$1 and u.email_fk=$2";
    const values = [nome, this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel apagar o certificado!" + error)
            } else {
                resolve("Certificados apagados com sucesso")
            }
        });
    });
}

Certificado.prototype.apagarAws = function (nome) {
    s3.deleteObject({
        Bucket: 'upload-server-ifpi',
        Key: nome,
    }).promise()
}

Certificado.prototype.contabilizarHorasACs = function () {
    const consulta = "UPDATE users SET horas_acs = horas_acs + qtd_horas FROM certificados u where u.nome = $1 AND email = $2"
    const values = [this.file.key, this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel contabilizar as horas!" + error)
            } else {
                resolve("Horas contabilizadas com sucesso")
            }
        });
    });
}

Certificado.prototype.contabilizarHorasAEs = function () {
    const consulta = "UPDATE users SET horas_aes = horas_aes + qtd_horas FROM certificados u where u.nome = $1 AND email = $2"
    const values = [this.file.key, this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel contabilizar as horas!" + error)
            } else {
                resolve("Horas contabilizadas com sucesso")
            }
        });
    });
}

Certificado.prototype.removerHorasACs = function (nome) {
    const consulta = "UPDATE users SET horas_acs = horas_acs - qtd_horas FROM certificados u where u.nome = $1 AND email = $2"
    const values = [nome, this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel contabilizar as horas!" + error)
            } else {
                resolve("Horas removidas com sucesso")
            }
        });
    });
}

Certificado.prototype.removerHorasAEs = function (nome) {
    const consulta = "UPDATE users SET horas_aes = horas_aes - qtd_horas FROM certificados u where u.nome = $1 AND email = $2"
    const values = [nome, this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel contabilizar as horas!" + error)
            } else {
                resolve("Horas removidas com sucesso")
            }
        });
    });
}

module.exports = Certificado