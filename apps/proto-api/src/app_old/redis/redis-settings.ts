export const REDIS_SUB_CLIENT = 'REDIS_SUBSCRIBER_CLIENT';
export const REDIS_PUB_CLIENT = 'REDIS_PUBLISHER_CLIENT';

// REDIS EVENTS
export const REDIS_SOCKET_EVENT_SEND_NAME = 'REDIS_SOCKET_EVENT_SEND_NAME';
export const REDIS_SOCKET_EVENT_EMIT_ALL_NAME =
  'REDIS_SOCKET_EVENT_EMIT_ALL_NAME';
export const REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED_NAME =
  'REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED_NAME';

export const redis = {
  key(userId, action) {
    const options = {
      action: `base-project::action:${action}`,
      id: `::userId:${userId}`,
      pattern: ''
    };

    return userId
      ? `${options.action}${options.id}`
      : `${options.action}${options.pattern}`;
  },
  expireIn: {
    twentyFourHours: 86400
  },
  action: {
    users: {
      list: 'listUsers'
    }
  }
};
