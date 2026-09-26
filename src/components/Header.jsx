import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Personal Task Manager Logo"
        className="logo"
      />

      <div className="header-text">
        <h1>Personal Task Manager</h1>
        <p>Manage your daily tasks easily</p>
      </div>
    </header>
  );
}

export default Header;