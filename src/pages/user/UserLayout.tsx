import { Typography, TextField, Grid, Paper, Avatar } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

import { menuItems } from "@constants/menus/profileMenu";

const UserLayout = () => {
  const location = useLocation();
  return (
    <div>
      <h1 className="text-4xl font-medium pt-6">My Profile</h1>
      <Grid container spacing={4} marginTop={6}>
        <Grid item xs={12} md={3}>
          <div className="border-gray-100 border-[2px] pb-6">
            <div className="flex items-center py-4 px-4 border-b-[2px] border-gray-100">
              <Avatar
                alt="Robert Fox"
                src="/path/to/image.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <div className="flex flex-col ml-4">
                <span className="text-sm font-semibold">Hello 👋</span>
                <span className="text-lg font-bold">Robert Fox</span>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    to={item.path}
                    key={item.id}
                    className={`transition-all duration-200 ${
                      isActive ? "bg-black text-white" : "hover:bg-slate-50 "
                    }`}
                  >
                    <div className="flex items-center gap-3 px-4 py-5">
                      <div className="text-2xl">
                        <IconComponent />
                      </div>
                      <span className="text-[15px] font-medium">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserLayout;
