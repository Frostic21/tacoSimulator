const { Taco, User } = require('../models');

module.exports.showTacoPage = async (req, res) => {
    let taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (!taco) {
        taco = await Taco.create({ user_id: req.user.id, score: 0, mult1: 1, bonus: 1, workers: 0, restaurants: 0 });
    }
    res.render('taco/taco', { 
        score: taco.score, 
        mult1: taco.mult1, 
        bonus: taco.bonus,
        workers: taco.workers,
        restaurants: taco.restaurants
    });
};

module.exports.updateScore = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (taco) {
        // Impact: (Tacos per Click * Quality) * Restaurant Multiplier
        // If restaurants = 1, total is unchanged. If restaurants = 2, total doubles.
        const multiplier = (taco.mult1 * taco.bonus) * taco.restaurants;
        
        await taco.increment('score', { by: multiplier });
        await taco.reload(); 

        return res.json({ 
            newScore: taco.score,
            currentClickValue: multiplier // Useful for the frontend
        });
    }
    res.status(404).json({ error: "Taco record not found" });
};
module.exports.buyUpgrade = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    const upgradeCost = 20;
    if (taco.score >= upgradeCost) {
        taco.score -= upgradeCost;
        taco.mult1 += 1;
        await taco.save();
        return res.json({ newScore: taco.score, newMult: taco.mult1 });
    }
    res.status(400).json({ error: "Not enough money" });
};

module.exports.buyUpgrade2 = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    const upgradeCost2 = 2000;
    if (taco.score >= upgradeCost2) {
        taco.score -= upgradeCost2;
        taco.bonus += 1;
        await taco.save();
        return res.json({ newScore: taco.score, newBonus: taco.bonus });
    }
    res.status(400).json({ error: "Not enough money" });
};

module.exports.buyRestaurant = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    const cost = 50000;
    if (taco.score >= cost) {
        taco.score -= cost;
        taco.restaurants += 1; // Increases the multiplier by 1
        await taco.save();
        return res.json({ 
            newScore: taco.score, 
            newRestaurants: taco.restaurants 
        });
    }
    res.status(400).json({ error: "Not enough money" });
};
// Route to handle Worker passive income (called by the frontend periodically)
module.exports.applyPassiveIncome = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (taco && taco.workers > 0) {
        // 75% of current click income per worker
        const clickValue = (taco.mult1 * taco.bonus) * taco.restaurants;
        const passiveIncome = Math.floor((clickValue * 0.75) * taco.workers);
        
        await taco.increment('score', { by: passiveIncome });
        await taco.reload();
        return res.json({ newScore: taco.score });
    }
    res.json({ newScore: taco ? taco.score : 0 });
};
module.exports.saveProgress = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (taco) await taco.save();
    res.json({ success: true });
};

module.exports.resetProgress = async (req, res) => {
    const taco = await Taco.findOne({where:{user_id:req.user.id}});
    if (taco) {
        taco.score = 0;
        taco.mult1 = 1;
        taco.bonus = 1;
        await taco.save();
        res.json({ newScore: 0, newMult: 1, newBonus: 1 });
    }
};

exports.showLeaderboard = async (req, res) => {
    const leaderboard = await Taco.findAll({
        include: [{ model: User, attributes: ['name'] }],
        order: [['score', 'DESC']],
        limit: 18
    });

    res.render('taco/leaderboard', { leaderboard });
};
