import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className="flex w-40 h-10 items-center pl-5">
      <Link to="/workers">
        <img src="./logo.png" alt="Logo Polipack" />
      </Link>
    </div>
  );
};

export { Logo };
