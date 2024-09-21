export default {
  success(message, data) {
    return {
      message,
      data,
    };
  },
  error(message) {
    return { error: message };
  },
};
