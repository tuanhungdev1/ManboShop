import { socialMediaList } from "@constants/footers/socialMediaList";
import { Link } from "react-router-dom";

const SocialMediaList = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      {socialMediaList.map((socialMediaItem) => {
        const SocialMediaIcon = socialMediaItem.icon;
        return (
          <Link to={"/"} key={socialMediaItem.id}>
            <div className="w-[35px] bg-primary-800 h-[35px] flex items-center justify-center text-white text-[20px]">
              <SocialMediaIcon />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SocialMediaList;
