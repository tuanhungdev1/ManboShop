import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { actionIcons } from "@constants/menus/actionIcons";

const ActionIcons = () => {
  return (
    <div className="flex items-center gap-3">
      {actionIcons.map((iconItem) => {
        const IconComponent = iconItem.icon;
        return (
          <Tooltip title={iconItem.title} key={iconItem.id} placement="bottom">
            <IconButton
              sx={{
                fontSize: "20px",
                color: "#000",
                position: "relative",
              }}
              component={Link}
              to={iconItem.path}
              aria-label={iconItem.title}
            >
              <IconComponent />
            </IconButton>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default ActionIcons;
