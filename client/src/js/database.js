import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const textDB = await openDB("jate", 1);
  const trans = textDB.transaction("jate", "readwrite");
  const store = trans.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data saved to the database", result.value);
};

export const getDb = async () => {
  const textDB = await openDB("jate", 1);
  const trans = textDB.transaction("jate", "readonly");
  const store = trans.objectStore("jate");
  const request = store.getAll();
  const result = await request;

  result
    ? console.log("Data retrieved from the database", result.value)
    : console.log("Data not found in the database");
};
initdb();
