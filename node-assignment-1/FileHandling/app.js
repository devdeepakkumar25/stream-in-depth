const fs = require("node:fs/promises");

(async () => {
  console.log(" Program started...");
  console.log(" Watching command.txt for changes...\n");

  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const RENAME_FILE = "rename a file";
  const ADD_FILE = "add a file";

  // ---------------- CREATE FILE ----------------
  const createFile = async (filePath) => {
    try {
      const handle = await fs.open(filePath, "r");
      console.log(` File already exists: ${filePath}`);
      await handle.close();
    } catch {
      const handle = await fs.open(filePath, "w");
      console.log(` File created: ${filePath}`);
      await handle.close();
    }
  };

  // ---------------- DELETE FILE ----------------
  const deleteFile = async (filePath) => {
    try {
      await fs.unlink(filePath);
      console.log(` File deleted: ${filePath}`);
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log(` No file found to delete: ${filePath}`);
      } else {
        console.error(" Delete error:", e);
      }
    }
  };

  // ---------------- RENAME FILE ----------------
  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log(` Renamed: ${oldPath} → ${newPath}`);
    } catch (e) {
      console.error(" Rename error:", e.message);
    }
  };

  let addedContent;

  // ---------------- ADD TO FILE ----------------
  const addToFile = async (content, filePath) => {
    let handle;

    try {
      if (addedContent === content) return;
      addedContent = content;

      //   handle = await fs.open(filePath, "a");
      await fs.appendFile(filePath, content);

      await handle.write(content + "\n");
      console.log(` Content appended to ${filePath}`);
    } catch (e) {
      console.error(" Write error:", e);
    } finally {
      //   if (handle) await handle.close();
      console.log("Conted added");
    }
  };

  // ---------------- COMMAND HANDLER ----------------
  const handleCommandChange = async () => {
    try {
      const command = (await fs.readFile("./command.txt", "utf-8")).trim();

      if (!command) {
        console.log(" command.txt is empty");
        return;
      }

      console.log("\n Command received:", command);

      if (command.startsWith(CREATE_FILE)) {
        const filePath = command.slice(CREATE_FILE.length + 1).trim();
        await createFile(filePath);
      } else if (command.startsWith(DELETE_FILE)) {
        const filePath = command.slice(DELETE_FILE.length + 1);
        await deleteFile(filePath);
      } else if (command.startsWith(RENAME_FILE)) {
        const rest = command.slice(RENAME_FILE.length + 1);
        const [oldPath, newPath] = rest.split(" to ");
        await renameFile(oldPath.trim(), newPath.trim());
      } else if (command.startsWith(ADD_FILE)) {
        const rest = command.slice(ADD_FILE.length + 1);
        const [filePath, content] = rest.split(" with content: ");
        await addToFile(content, filePath.trim());
      } else {
        console.log(" Unknown command");
      }
    } catch (err) {
      console.error(" Command processing failed:", err);
    }
  };

  // ---------------- WATCH FILE ----------------
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log("Detected change in command.txt");
      await handleCommandChange();
    }
  }
})();
