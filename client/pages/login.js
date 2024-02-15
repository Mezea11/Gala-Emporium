export default function login() {
    return `
    <div id="login-page-container">
        <h1>Admin login page</h1>
        <p>Enter your info to login as admin</p>
        <section id="login-container">
            <h2>Admin Login</h2>
            <form>
                <div>
                    <label>Username</label>
                    <input type="text">
                </div>
                <div>
                    <label>Password</label>
                    <input type="text">
                </div>
                <button type="submit">Login</button>
            </form>
        </section>
    </div>
    `;
}
