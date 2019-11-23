// @flow

import { Comment } from '../models.js';

type Request = express$Request;
type Response = express$Response;

module.exports = {
    getAllComments: function (req : Request, res : Response) {
        return Comment.findAll({
            where: {
                article_id: req.params.article_id
            },
            order: [['createdAt', 'DESC']]
        }).then(comments => res.send(comments));
    },
    addComment: function (req : Request, res : Response) {
        if (
            !req.body ||
            typeof req.body.nickname != 'string' ||
            typeof req.body.comment != 'string' ||
            typeof req.body.article_id != 'number'
        )
            return res.sendStatus(400);

        return Comment.create({
            nickname: req.body.nickname,
            comment: req.body.comment,
            article_id: req.body.article_id
        }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
        
    }
}