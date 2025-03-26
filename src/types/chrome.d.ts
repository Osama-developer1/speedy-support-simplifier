
// Type definitions for Chrome extension API
interface Chrome {
  runtime: {
    sendMessage: (
      message: any,
      callback?: (response: any) => void
    ) => void;
    onMessage: {
      addListener: (
        callback: (
          message: any,
          sender: any,
          sendResponse: (response?: any) => void
        ) => void | boolean
      ) => void;
    };
  };
}

declare global {
  var chrome: Chrome;
}

export {};
