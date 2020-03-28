const connection = require('./../database/connection');

module.exports = {

    async create(req, res, next){
        const { id } = req.body;
        const ong = await connection('ongs').where('id', id).select('name').first();
        if(!ong){
            return res.status(400).json({ error: 'NO ong found with this ID.' });
        }
        return res.json({ong});
    }

}