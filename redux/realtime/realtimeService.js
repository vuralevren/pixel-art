import { realtime } from "../../configs/altogic";

const realtimeService = {
  join: (channel) => realtime.join(channel),
  leave: (channel) => realtime.leave(channel),
  removeListen: (eventType) => realtime.off(eventType),
  listen: (eventType, callback) => realtime.on(eventType, callback),
  sendMessage: (channel, event, message) =>
    realtime.send(channel, event, message),

  isConnected: () => realtime.isConnected(),
  updateProfile: (user) => realtime.updateProfile(user),
  getMembers: (channel) => realtime.getMembers(channel),
  open: () => realtime.open(),
};

export default realtimeService;
