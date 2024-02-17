import axios from "axios";

export const postsLoader = async () => {
  const results = axios.get("http://localhost:5000/posts/")
  // .then((response) => {
  //   return response.data.result;
  // });

  return { results };
};
