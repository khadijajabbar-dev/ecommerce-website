import { Link } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";

const Navbar = ({ panel = "Dashboard", title, badge = "M", avatarUrl, actions, onLogout }) => {
  return (
    <Card
      as="header"
      className="flex flex-col gap-4 border-border-main/80 bg-card/90 p-5 backdrop-blur md:flex-row md:items-center md:justify-between"
    >
      <Link to="/" className="flex items-center gap-4" aria-label="Go to Easy Mart home">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            className="h-12 w-12 rounded-2xl object-cover shadow-md shadow-primary/20"
          />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-black text-white shadow-md shadow-primary/20">
            {badge}
          </span>
        )}
        <span>
          <span className="block text-sm font-semibold text-primary">{panel}</span>
          <span className="block text-2xl font-extrabold tracking-tight text-heading">
            {title}
          </span>
        </span>
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {actions}

        {onLogout && (
          <Button variant="danger" onClick={onLogout}>
            Log Out
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Navbar;
