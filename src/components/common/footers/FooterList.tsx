import { FooterSection } from "@constants/footers/footerList";
import { Link } from "react-router-dom";

interface FooterListProps {
  footerSections: FooterSection[];
}

const FooterList: React.FC<FooterListProps> = ({ footerSections }) => {
  return (
    footerSections &&
    footerSections.map((footerItem) => (
      <div key={footerItem.id}>
        <div>
          <span className="uppercase text-[14px] font-medium cursor-pointer">
            {footerItem.sectionTitle}
          </span>
          <ul className="text-[12px] mt-4 flex flex-col gap-4 opacity-70">
            {footerItem.links.map((item) => {
              return (
                <Link to={item.url} key={item.id} target="_blank">
                  <li>{item.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    ))
  );
};

export default FooterList;
