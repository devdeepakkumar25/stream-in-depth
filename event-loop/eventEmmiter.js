class MyEventEmitter {
  constructor() {
    this.__event_listeners = {};
  }

  // Add an event listener
  on(event, listener) {
    if (!this.__event_listeners[event]) {
      this.__event_listeners[event] = [];
    }

    this.__event_listeners[event].push(listener);
    return true;
  }

  // Emit an event
  emit(event, ...args) {
    if (!this.__event_listeners[event]) {
      return false;
    }

    const listeners = this.__event_listeners[event];
    listeners.forEach((listener) => listener(...args));
    return true;
  }

  // Remove a specific listener
  off(event, listener) {
    if (!this.__event_listeners[event]) {
      return false;
    }

    const index = this.__event_listeners[event].findIndex(
      (fn) => fn === listener
    );

    if (index < 0) {
      return false;
    }

    this.__event_listeners[event].splice(index, 1);
    return true;
  }

  // Listener that runs only once
  once(event, listener) {
    const wrapperFn = (...args) => {
      listener(...args);
      this.off(event, wrapperFn); // remove the wrapper, NOT the original
    };

    this.on(event, wrapperFn);
    return true;
  }
}

const e = new MyEventEmitter();

const sendWhatsapp = (username) => console.log("WhatsApp to", username);

// Listeners
e.on("user:signup", (username) => console.log("User Signup:", username));
e.on("user:signup", (username) => console.log("Sending Email to", username));
e.on("user:signup", sendWhatsapp);
e.on("user:signup", (username) => console.log("Notify Admin:", username));

// Emit event
e.emit("user:signup", "Deepak");
