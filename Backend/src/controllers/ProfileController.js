const connection = require('./../database/connection');

module.exports = {

    async getIncidentOng(req, res, next){

        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();
        res.header('X-Total-Count', count['count(*)']);

        const ond_id = req.headers.authorization;
        const incidents = await connection('incidents')
        .where('ong_id', ond_id)
        .join('ongs', 'ongs.id', '=', 'ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        return res.json({incidents})
    },

}