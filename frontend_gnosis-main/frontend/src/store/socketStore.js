import { create } from 'zustand';
import { io } from 'socket.io-client';

const BATTLE_URL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL.replace('/api', '')
  : 'http://localhost:3000';

const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,

  notifications: [],
  unreadCount: 0,

  connect: (userId, username) => {
    if (get().socket) return;

    // Connect to battle service through API gateway
    const newSocket = io(BATTLE_URL, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      set({
        isConnected: true,
        socket: newSocket,
      });

      console.log('Socket connected', newSocket.id);

      // Identify user for presence
      newSocket.emit('user:identify', {
        userId,
        username,
      });
    });

    newSocket.on('disconnect', () => {
      set({ isConnected: false });

      console.log('Socket disconnected');
    });

    // Listen for real-time notifications
    newSocket.on('notification:new', (notification) => {
      set((state) => {
        const newNotifications = [
          notification,
          ...state.notifications,
        ].slice(0, 6);

        return {
          notifications: newNotifications,

          unreadCount: newNotifications.filter(
            (n) => !n.read
          ).length,
        };
      });
    });

    set({ socket: newSocket });
  },

  disconnect: () => {
    const { socket } = get();

    if (socket) {
      socket.disconnect();

      set({
        socket: null,
        isConnected: false,
      });
    }
  },

  setNotifications: (notifs) => {
    set({
      notifications: notifs,
      unreadCount: notifs.filter(
        (n) => !n.read
      ).length,
    });
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id
          ? { ...n, read: true }
          : n
      ),

      unreadCount: Math.max(
        0,
        state.unreadCount - 1
      ),
    }));
  },

  removeNotification: (id) => {
    set((state) => {
      const removed = state.notifications.find(
        (n) => n.id === id
      );

      return {
        notifications: state.notifications.filter(
          (n) => n.id !== id
        ),

        unreadCount:
          removed && !removed.read
            ? Math.max(
                0,
                state.unreadCount - 1
              )
            : state.unreadCount,
      };
    });
  },
}));

export default useSocketStore;