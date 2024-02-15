import { adminsModel } from './Admins.js';

export default async function () {
    /*
    server.post('api/login', async (req, res) => {
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
*/
    server.post('/api/login', async (req, res) => {
        if (req.session.login) {
            res.json({ message: `Denna användare verkar redan vara inloggad.` });
        } else {
            const admin = await adminsModel.findOne({
                username: req.body.username,
                password: req.body.password
            })

            if (admin) {
                req.session.login = user._id;
                res.json({ mysession: req.session, message: `Välkommen ${user.username }. Du är nu inloggad` })
                //res.json(user)
            } else {
                res.json({ message: 'kan inte hitta användare' });
            }
        }
    })
}
