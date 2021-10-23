const Gamification = require('../models/Gamification');

exports.rankingHighlight = function (req, res) {
    let ranking_tier = new Gamification()
    ranking_tier.selectUsers()
        .then(function (user) {
            res.render('pages/ranking', { user: user, layout: 'layout-bootstrap' })
        }).catch(function (err) {
            res.send(err);
        })
};

