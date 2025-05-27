const { Taco, User } = require('../models');

module.exports.showTacoPage = async (req, res) => {
    let taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (!taco) {
        taco = await Taco.create({ user_id: req.user.id, score: 0, mult1: 1, bonus: 1 });
    }

    res.render('taco/taco', { score: taco.score, mult1: taco.mult1, bonus: taco.bonus });
};

module.exports.updateScore = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (taco) {
        const multiplier = (taco.mult1*taco.bonus);
        await taco.increment('score', { by: multiplier });
    }
    res.redirect('/taco');
};
module.exports.buyUpgrade = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});

    const upgradeCost = 20;
    if (taco.score >= upgradeCost) {
        taco.score -= upgradeCost;
        taco.mult1 += 1;
        await taco.save();
    }

    res.redirect('/taco');
};
module.exports.saveProgress = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (taco) await taco.save();
    res.redirect('/taco');
};
module.exports.resetProgress = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (taco) {
        taco.score = 0;
        taco.mult1 = 1;
        taco.bonus = 1;
        await taco.save();
    }

    res.redirect('/taco');
};

exports.showLeaderboard = async (req, res) => {
    const leaderboard = await Taco.findAll({
        include: [{ model: User, attributes: ['name'] }],
        order: [['score', 'DESC']],
        limit: 18
    });

    res.render('taco/leaderboard', { leaderboard });
};
