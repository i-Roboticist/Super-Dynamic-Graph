import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';
import './StaticSidebar.css';

const StaticSidebar = () => {
    return (
        <div className="static-sidebar">
            <SideBarIcon icon={<FaFire size="28" />} text="Home" />
            <SideBarIcon icon={<BsPlus size="32" />} text="Learn" />
            <SideBarIcon icon={<BsFillLightningFill size="20" />} text="Progress" />
            <SideBarIcon icon={<FaPoo size="20" />} text="Settings" />
        </div>
    );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
    <div className="sidebar-icon">
        {icon}
        <span className="sidebar-tooltip">{text}</span>
    </div>
);

export default StaticSidebar;