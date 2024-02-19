import axios from "axios";

import { useSelector } from "react-redux";

export default async function postsLoader() {
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  const results = axios.get("http://localhost:5000/posts", {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  return { results };
}

// export const postsLoader = async () => {
//   const auth = useSelector((state) => state.auth);
//   console.log(auth);
//   // handling the promise async/await will be inside the <Suspense><Await> see above.
//   //! don't put await here or the useLoaderData will block the return until the promise response received.

//   const results = axios.get("http://localhost:5000/posts/", {
//     headers: {
//       Authorization: `Bearer ${auth.token}`,
//     },
//   });
//   //* if I don't want to return the whole results I'll use .then()
//   //   .then((response) => {
//   //     return response.data.result; //! this return an array not object ==> change from results.data.result.map() to results.map()
//   //   });

//   // return an object with results
//   return { results };
// };
