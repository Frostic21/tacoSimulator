const {Taco} = require('../models');

module.exports.newOldGame = async function(req, res) {
    if (req.user){
        const tacos = await Taco.findAll({
            where: {
                user_id: req.params.id
            }
        })
    } else{
        const tacos = await Taco.create({
            score: req.body.score,
        })
    }
}