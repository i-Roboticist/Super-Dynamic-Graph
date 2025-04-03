import { Link } from 'react-router-dom';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';
import './StaticSidebar.css';

const StaticSidebar = () => {
    return (
        <div className="static-sidebar">
            <SideBarLink icon={<FaFire size="28" />} text="Home" to="/" />
            <SideBarLink icon={<BsPlus size="32" />} text="Learn" to="/learn" />
            <SideBarLink icon={<BsFillLightningFill size="20" />} text="Progress" to="/progress" />
            <SideBarLink icon={<FaPoo size="20" />} text="Settings" to="/settings" />
        </div>
    );
};

const SideBarLink = ({ icon, text = 'tooltip 💡', to }) => (
    <Link to={to} className="sidebar-link">
        <div className="sidebar-icon">
            {icon}
            <span className="sidebar-tooltip">{text}</span>
        </div>
    </Link>
);

export default StaticSidebar;