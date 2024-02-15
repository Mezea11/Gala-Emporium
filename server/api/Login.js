import { adminsModel } from './Admins.js';

export default async function () {
    server.post('/login', async (req, res) => {
        try {
            const check = await adminsModel.findOne({
                username: req.body.username,
                password: req.body.password,
            });

            if (check.password === req.body.password) {
                res.render('#club-2');
            } else {
                res.send('Wrong password. Please try again.');
            }
        } catch {
            res.send('Wrong input. Please enter your username and password.');
        }
    });
}
