class TaskScheduler {
  constructor(concurrency) {
    this.concurrency = Number(concurrency);
    this.runningTasks = 0;
    this.__waitingQueue = [];
  }

  // Run next task from the queue if possible
  _runNextTask() {
    if (
      this.runningTasks >= this.concurrency ||
      this.__waitingQueue.length === 0
    ) {
      return;
    }

    const nextTask = this.__waitingQueue.shift();
    nextTask(); // actually run it
  }

  addTask(task) {
    // task is a function that returns a Promise
    return new Promise((resolve, reject) => {
      const _taskRunner = async () => {
        this.runningTasks += 1;
        try {
          const result = await task();
          console.log(`Result: ${result}`);
          resolve(result);
        } catch (err) {
          console.log(`Task Failed`, err);
          reject(err);
        } finally {
          this.runningTasks -= 1;
          this._runNextTask(); // after finishing, try next
        }
      };

      // If we still have capacity, run immediately
      if (this.runningTasks < this.concurrency) {
        _taskRunner();
      } else {
        // Otherwise, enqueue it for later
        this.__waitingQueue.push(_taskRunner);
      }
    });
  }
}

// ------------------ USAGE EXAMPLE ------------------

const scheduler = new TaskScheduler(2);

function saveToDb(message) {
  return new Promise((res, rej) =>
    setTimeout(() => {
      console.log(`Message ${message} save to DB!`);
      res(message);
    }, 2 * 1000)
  );
}

async function chat() {
  const messages = new Array(100).fill(null);

  const promises = messages.map((_, index) => {
    const message = `Message:${index}`;
    return scheduler.addTask(() => saveToDb(message));
  });

  await Promise.all(promises);
  console.log("All chat messages saved!");
}

scheduler.addTask(
  () => new Promise((res) => setTimeout(() => res("Task 1"), 1000))
);

scheduler.addTask(
  () => new Promise((res) => setTimeout(() => res("Task 2"), 500))
);

scheduler.addTask(
  () => new Promise((res) => setTimeout(() => res("Task 3"), 300))
);

scheduler.addTask(
  () => new Promise((res) => setTimeout(() => res("Task 4"), 400))
);

scheduler.addTask(
  () => new Promise((res) => setTimeout(() => res("Task 5"), 500))
);

scheduler.addTask(() => saveToDb("Manual Task 1"));
scheduler.addTask(() => saveToDb("Manual Task 2"));

chat();
