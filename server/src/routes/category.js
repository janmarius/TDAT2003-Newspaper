// @flow

import { Category } from '../models.js';

type Request = express$Request;
type Response = express$Response;

module.exports = {
    getAllCategories: function (req : Request, res : Response) {
        return Category.findAll({
            order: [['priority', 'ASC']]
        }).then(categories => res.send(categories));
    }
}