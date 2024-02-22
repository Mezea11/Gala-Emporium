
export default function login() {
    return `
    <div id="login-page-container">
        <section id="login-container">
        <div id = "inner-container-login">
            <h1>Admin Login</h1>
            <form id="loginForm" onsubmit="submitLogin(); return false">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter admin username">
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter password">
                </div>
                <button id="log-in" type="submit">Login</button>
            </form>
            </div>
        </section>
    </div>
    `;
}

export let adminId;
export let formData;
async function submitLogin() {
    let form = $('#loginForm');

    let username = form.find('[name="username"]').val();
    let password = form.find('[name="password"]').val();

    if (!username || !password) {
        console.error('Username or Password is empty');
        return;
    }

    formData = {
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
        
        if (response.ok) {
            console.log(data.message);
            adminId = data.mysession.login;
            window.location.href = '/#admin';

        } else {
            console.log('login failed');
        }
    } catch (error) {
        console.error('Error submitting login');
    }
}

window.submitLogin = submitLogin;
