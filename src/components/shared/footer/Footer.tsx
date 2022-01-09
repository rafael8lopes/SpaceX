import BottomNavigation from "@mui/material/BottomNavigation";
import { Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import "./footer.scss";

export function Footer() {
  return (
    <div className={"Footer"}>
      <p className="AuthorCredits">Created by: Rafael Lopes</p>

      <Link
        className="LinkedinLink"
        href="https://google.com"
        rel="noreferrer"
        target="_blank"
      >
        <LinkedInIcon />
      </Link>
    </div>
  );
}
