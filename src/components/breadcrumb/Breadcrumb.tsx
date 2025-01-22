import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{
        fontWeight: "500",
        color: "#000"
        
    }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.path ? (
            <Link to={item.path} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;