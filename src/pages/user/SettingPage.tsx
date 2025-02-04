// src/components/Settings.tsx
import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import DropdownButton, {
  Option,
} from "@components/dropdownButton/DropdownButton";
import { useAppDispatch } from "@redux/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "@redux/slices/authSlice";
import { authStorage } from "@utils/authStorage";

const themeOptions: Option[] = [
  { id: "light", label: "Light Mode" },
  { id: "dark", label: "Dark Mode" },
];

const languageOptions = [
  { id: "en", label: "English" },
  { id: "vi", label: "Tiếng Việt" },
  { id: "fr", label: "Français" },
];

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const handleLogout = () => {
    dispatch(logout());
    authStorage.clearAuthData();
    navigate("/account/login");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b py-6">
        <div>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "700",
            }}
          >
            Appearance
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              opacity: "70%",
            }}
            color="text.secondary"
            gutterBottom
          >
            Customize how your theme looks on your device
          </Typography>
        </div>
        <div>
          <DropdownButton
            options={themeOptions}
            currentOption={theme}
            onOptionSelect={(option) => setTheme(option.id)}
            defaultOption={themeOptions[0]}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-b py-6">
        <div>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "700",
            }}
            gutterBottom
          >
            Language
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              opacity: "70%",
            }}
            color="text.secondary"
            gutterBottom
          >
            Select your language
          </Typography>
        </div>
        <div>
          <DropdownButton
            options={languageOptions}
            currentOption={language}
            onOptionSelect={(option) => setLanguage(option.id)}
            defaultOption={languageOptions[0]}
          />
        </div>
      </div>

      <div className="py-6">
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width: "300px",
            textTransform: "capitalize",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Settings;
