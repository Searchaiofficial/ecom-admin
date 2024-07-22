import { BASE_URL } from "../../../config";

const baseUrl = BASE_URL;

export function checkAdmin(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/admin/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
