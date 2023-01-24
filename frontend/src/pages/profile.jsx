import React from "react";
import FourBar from "../components/FourBar";
import ProfileCard from "../components/ProfileCard";

export default function ProfilePage(props) {
    return (
        <React.Fragment>
            <FourBar
                barItems={["Home", "4reddit chat", "Something"]}
                dropdownItems={["My Profile", "Saved posts", "Logout"]}
            />
            <ProfileCard />
        </React.Fragment>
    );
}
