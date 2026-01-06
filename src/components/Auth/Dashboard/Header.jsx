import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="header">
      <h3>Employee Management</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Header;
