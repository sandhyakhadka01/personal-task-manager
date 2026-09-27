import logo from "../assets/logo.png";

function Header() {
  const today = new Date().toLocaleDateString();

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />

        <div>
          <h1>Personal Task Manager</h1>
          <p>Manage your daily tasks easily</p>
        </div>
      </div>

      <div className="header-right">
        <div className="focus-card">
          <h3>📅 Today</h3>
          <p>{today}</p>

          <h3>✨ Focus</h3>
          <p>Plan • Do • Done</p>
        </div>
      </div>
    </header>
  );
}

export default Header;

