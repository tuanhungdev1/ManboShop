import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiYoutubeFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
interface SocialMediaItem {
  id: number;
  title: string;
  icon: React.ElementType;
}

export const socialMediaList: SocialMediaItem[] = [
  {
    id: 1,
    title: "Facebook",
    icon: FaFacebook,
  },
  {
    id: 2,
    title: "Instagram",
    icon: AiFillInstagram,
  },
  {
    id: 3,
    title: "YouTube",
    icon: RiYoutubeFill,
  },
  {
    id: 4,
    title: "TikTok",
    icon: RiTiktokFill,
  },
];
