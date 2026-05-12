import sys

filename = '/app/frontend_gnosis-main/frontend/src/components/Layout.jsx'
with open(filename, 'r') as f:
    code = f.read()

# Add Bell icon import
code = code.replace(
    'import { BookOpen, Trophy, Swords, User } from "lucide-react";',
    'import { BookOpen, Trophy, Swords, User, Bell, X } from "lucide-react";\nimport api from "../lib/api";\nimport { useSocketStore } from "../lib/store";'
)

# Extract component body
import re
match = re.search(r'export default function Layout\({ children }\) \{(.*?)\s*return \(', code, re.DOTALL)

body = match.group(1)

# Add states inside component
new_states = """
  const { notifications, unreadCount, setNotifications, markAsRead, removeNotification } = useSocketStore();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user?.id) {
      api.get(`/notifications/${user.id}`).then(res => {
        setNotifications(res.data);
      }).catch(err => console.error("Failed to load notifications", err));
    }
  }, [user]);

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      // Could call backend to mark as read here if we added that endpoint, or just delete it
      markAsRead(notif.id);
    }

    // If it's a friend request, maybe navigate to profile or friends page
    if (notif.type === 'friend_request') {
      navigate('/friends'); // Assuming this route exists or they handle it there
    }
    setShowNotifications(false);
  };

  const handleDeleteNotification = async (e, id) => {
      e.stopPropagation();
      try {
          await api.delete(`/notifications/${id}`);
          removeNotification(id);
      } catch(err) {
          console.error("Failed to delete", err);
      }
  };
"""

new_body = new_states + body
code = code.replace(body, new_body)

# Add notification bell UI to top bar mobile
mobile_header_old = """
      <div className="md:hidden sticky top-0 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD1] z-40 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8B2500] rounded-lg flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-bold text-lg text-[#1a1a1a]">Gnosis</span>
        </div>
      </div>
"""

mobile_header_new = """
      <div className="md:hidden sticky top-0 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD1] z-40 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8B2500] rounded-lg flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-bold text-lg text-[#1a1a1a]">Gnosis</span>
        </div>
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 relative text-[#8a8a8a] hover:text-[#1a1a1a]">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#FAF7F2]"></span>
            )}
          </button>
        </div>
      </div>
"""
code = code.replace(mobile_header_old, mobile_header_new)

# Add notification bell UI to desktop sidebar
desktop_nav_old = """
        <div className="w-12 h-12 bg-[#8B2500] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-sm mb-12">
          G
        </div>
"""

desktop_nav_new = """
        <div className="w-12 h-12 bg-[#8B2500] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-sm mb-12">
          G
        </div>

        <div className="relative mb-8 w-full px-4 flex justify-center">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-3 rounded-2xl text-[#8a8a8a] hover:text-[#1a1a1a] hover:bg-white hover:shadow-sm transition-all w-full flex justify-center">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#FAF7F2]"></span>
                )}
            </button>
        </div>
"""
code = code.replace(desktop_nav_old, desktop_nav_new)

# Add Notification Dropdown
notification_dropdown = """
      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 md:top-4 right-4 md:left-28 z-50 w-80 bg-white rounded-2xl shadow-xl border border-[#E8DFD1] overflow-hidden flex flex-col max-h-[400px]">
          <div className="p-4 border-b border-[#E8DFD1] bg-[#FAF7F2] flex justify-between items-center">
            <h3 className="font-bold text-[#1a1a1a]">Notifications</h3>
            <button onClick={() => setShowNotifications(false)} className="text-[#8a8a8a] hover:text-[#1a1a1a]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            {notifications.length === 0 ? (
              <p className="text-center text-[#8a8a8a] p-4 text-sm">No new notifications</p>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3 rounded-xl mb-1 cursor-pointer transition-colors relative group flex items-start gap-3 ${notif.read ? 'bg-transparent hover:bg-[#FAF7F2]' : 'bg-[#FFF4E5] border border-[#f0dac2]'}`}
                >
                  <div className="flex-1">
                    <p className={`text-sm ${notif.read ? 'text-[#6b6b6b]' : 'text-[#1a1a1a] font-medium'}`}>
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-[#8a8a8a] mt-1 block">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteNotification(e, notif.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#8a8a8a] hover:text-red-500 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
"""

code = code.replace('      <main className="max-w-4xl mx-auto min-h-screen bg-[#FAF7F2]">{children}</main>', '      <main className="max-w-4xl mx-auto min-h-screen bg-[#FAF7F2]">{children}</main>\n' + notification_dropdown)

with open(filename, 'w') as f:
    f.write(code)

print("Updated Layout.jsx")
