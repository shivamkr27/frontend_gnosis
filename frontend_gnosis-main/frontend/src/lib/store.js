import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  setUser: (user) => set({ user }),
}));

export const useAppStore = create((set) => ({
  imageMap: {},
  setImageMap: (map) => set({ imageMap: map }),
}));

export const useSocketStore = create((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifs) => set({ notifications: notifs, unreadCount: notifs.filter(n => !n.read).length }),
  addNotification: (notification) => set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1
  })),
  removeNotification: (id) => set((state) => {
      const removed = state.notifications.find(n => n.id === id);
      return {
          notifications: state.notifications.filter(n => n.id !== id),
          unreadCount: removed && !removed.read ? Math.max(0, state.unreadCount - 1) : state.unreadCount
      };
  }),
  markAsRead: (id) => set((state) => ({
      notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
      unreadCount: Math.max(0, state.unreadCount - 1)
  }))
}));
