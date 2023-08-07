import { Link } from "react-router-dom";
import { AiFillDashboard } from 'react-icons/ai';
import { BiSolidBusiness, BiSolidTShirt } from 'react-icons/bi';
import { FaUserAlt, FaPowerOff } from 'react-icons/fa';
import { TiGroup } from 'react-icons/ti';
import "./menu.scss";

const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: <AiFillDashboard/>,
      },
      {
        id: 2,
        title: "Company",
        url: "/admin-dashboard/company",
        icon: <BiSolidBusiness/>,
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 2,
        title: "Collections",
        url: "/admin-dashboard/collections",
        icon: <BiSolidTShirt/>,
      },
      {
        id: 1,
        title: "Employees",
        url: "/admin-dashboard/users",
        icon: <FaUserAlt/>,
      },
      {
        id: 1,
        title: "Subscribers",
        url: "/admin-dashboard/subscribers",
        icon: <TiGroup/>,
      },
      
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      /* {
        id: 1,
        title: "Elements",
        url: "/",
        icon: "element.svg",
      }, */
      /* {
        id: 2,
        title: "Notes",
        url: "/",
        icon: "/images/note.svg",
      },
      {
        id: 3,
        title: "Calendar",
        url: "/",
        icon: "/images/calendar.svg",
      }, */
      {
        id: 4,
        title: "Logout",
        url: "/logout",
        icon: <FaPowerOff/>,
      },
    ],
  }
];

const Menu = () => { // Receive updateActivePage as a prop
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              to={listItem.url}
              className="listItem"
              key={listItem.id}
              /* onClick={() => updateActivePage(listItem.title)} */ // Call updateActivePage on link click
            >
              <div className="menu-icons">{listItem.icon}</div>
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;