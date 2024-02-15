//import { adminsModel } from '../../server/api/Admins';

export default function login() {
    return `
    <div id="login-page-container">
        <h1>Admin login page</h1>
        <p>Enter your info to login as admin</p>
        <section id="login-container">
            <h2>Admin Login</h2>
            <form id="loginForm" onsubmit="submitLogin(); return false">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter admin username">
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name="password" placeholder="Enter password">
                </div>
                <button type="submit">Login</button>
            </form>
        </section>
    </div>
    `;
}

/* Handle login with database
-- post username and password
-- check if it coincides with data in database
-- if false, feedback 
-- if true, go to page for admin as logged in
 */
async function submitLogin() {
    let form = $('#loginForm');

    let username = form.find('[name="username"]').val();
    let password = form.find('[name="password"]').val();

    if (!username || !password) {
        console.error('Username or Password is empty');
        return;
    }

    let formData = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log('1');

        if (response.ok) {
            console.log(data.message);
            window.location.href = '/#';

        } else {
            console.log('login failed');
        }
    } catch (error) {
        console.error('Error submitting login:', error);
    }
}

window.submitLogin = submitLogin;
