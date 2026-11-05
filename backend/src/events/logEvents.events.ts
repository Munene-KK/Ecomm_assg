import { v4 as uuidv4 } from "uuid";
const radomUUID = uuidv4();
import { format } from "date-fns";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";

export const logEvents = async (message: string, filename: string) => {
  const dateTime: string = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logMsg: string = `${dateTime}\t${radomUUID}\t${message}\n`;
  console.log(logMsg);
  try {
    if (!fs.existsSync(path.join(import.meta.dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(import.meta.dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(import.meta.dirname, "..", "logs", filename),
      logMsg,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.stack : error);
  }
};
