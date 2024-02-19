import { adminsModel } from './Admins.js';

export default function login(server) {
    server.post('/api/login', async (req, res) => {
        if (req.session.login) {
            res.json({
                message: `Denna användare verkar redan vara inloggad.`,
            });
        } else {
            const admin = await adminsModel.findOne({
                username: req.body.username,
                password: req.body.password,
            });

            if (admin) {
                req.session.login = admin._id;
                res.json({
                    mysession: req.session,
                    message: `Välkommen ${admin.username}. Du är nu inloggad`,
                });
                //res.json(admin)
            } else {
                res.json({
                    message: 'användarnamn eller lösenord är felaktigt',
                });
            }
        }
    });

    server.get('/api/check-login', (req, res) => {
        if (req.session.login) {
            // Admin is logged in
            res.json({
                loggedIn: true,
                adminId: req.session.login
            });
        } else {
            // Admin is not logged in
            res.json({
                loggedIn: false
            });
        }
    });

      server.delete('/api/login', async(req, res) => {
        try{
            if (req.session.login) {
                delete req.session.login
                res.json( { message: 'du är nu utloggad' })
            } else {
            res.json({ message: 'Det verkar inte vara någon inloggad'})
            } 
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
    })
}
