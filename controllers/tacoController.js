const { Taco } = require('../models');

exports.updateScore = async (req, res) => {
    try {
        const taco = await Taco.findByPk(1);

        if (taco) {
            await taco.increment('score', { by: 1});
            await taco.save();
        }

        res.redirect('/taco'); // Redirect back to main page
    } catch (err) {
        console.error('Error updating score:', err);
        res.status(500).send('Server Error');
    }
};