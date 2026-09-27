
function Header() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="header">
      <div className="header-brand">

        <div className="header-title">
          <h1>Personal Task Manager</h1>
          <p> 

🌸Manage your daily tasks easily</p>
        </div>
      </div>

      <div className="header-info">
        <span>📅 {today}</span>
        <span>✨ Stay focused</span>
      </div>
    </header>
  );
}

export default Header;