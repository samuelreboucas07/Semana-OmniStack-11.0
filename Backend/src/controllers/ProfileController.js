const connection = require('./../database/connection');

module.exports = {

    async getIncidentOng(req, res, next){

        const ond_id = req.headers.authorization;
        const incidents = await connection('incidents')
        .where('ong_id', ond_id)
        .join('ongs', 'ongs.id', '=', 'ong_id')
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        return res.json({incidents})
    },

}
