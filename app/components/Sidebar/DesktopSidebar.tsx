import { HiChat } from "react-icons/hi"
import { HiUsers } from "react-icons/hi2"

const DesktopSidebar = ({ currentUser }) => {
  const routes = [
    { label: "Feed", href: "/feed", icon: "🌐" }, // ADDED FEED LINK
    { label: "Chat", href: "/conversations", icon: HiChat },
    { label: "Users", href: "/users", icon: HiUsers },
    // ...others as before
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <nav>
        <ul>
          {routes.map(route => (
            <li key={route.href}>
              <a href={route.href} className="flex items-center gap-2 p-3 hover:bg-gray-100 hover:dark:bg-gray-800 rounded">
                {typeof route.icon === "string" ? <span>{route.icon}</span> : <route.icon className="w-6 h-6" />}
                {route.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-3">
        <span className="text-xs text-gray-400">{currentUser?.name}</span>
      </div>
    </div>
  );
};

export default DesktopSidebar;
