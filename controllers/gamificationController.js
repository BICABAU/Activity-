const RankingPosition = require("../models/RankingPosition")

exports.ranking = function (req, res) {
    let ranking = new RankingPosition()
    ranking.listAll(req.session.user.curso)
        .then(function (usuarios_recuperados_ranking) {
            res.render('pages/ranking', { ranking_recuperado: usuarios_recuperados_ranking })
        }).catch(function (err) {
            res.send(err);
        })
};
