import { WindownNavBarItem } from "./NavBarItem";

export const WindownNavBar = () => {
  return (
    <div className="hidden flex-row items-center gap-4 lg:flex">
      <WindownNavBarItem label="Home" />
      <WindownNavBarItem label="Series" />
      <WindownNavBarItem label="Films" />
      <WindownNavBarItem label="New & Popular" />
      <WindownNavBarItem label="My Favorites" url="/favorites" />
    </div>
  );
};
