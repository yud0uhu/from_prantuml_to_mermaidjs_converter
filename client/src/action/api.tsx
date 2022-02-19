import axios from "axios";

export async function fetchConverter(text: string) {
  try {
    const result = await axios.get(`http://localhost:8080/write/${text}`);
    console.log(result);
    return result.data;
  } catch (error) {
    console.log("error!!");
  }
}
