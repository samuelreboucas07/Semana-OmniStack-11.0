const connection = require('../database/connection');

module.exports = {

    async create(req, res, next){
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return res.json({ id });
    },

    async getAllIncidents(req, res, next){
        //query params send by ?.
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();
        res.header('X-Total-Count', count['count(*)']);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        return res.json({incidents})
    }, 

    async delete(req, res, next){
        const { id } = req.params; 
        const ong_id = req.headers.authorization;
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();
        
        if(incident.ong_id !== ong_id){
            return res.status(401).json({ error: 'Operation not permited.' });
        } 
        await connection('incidents').where('id', id).delete();
        return res.status(204).send();
    }


}
