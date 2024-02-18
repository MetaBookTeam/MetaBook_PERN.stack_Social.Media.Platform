import axios from "axios";

// data loader

export const postsLoader = async () => {
  // handling the promise async/await will be inside the <Suspense><Await> see above.
  //! don't put await here or the useLoaderData will block the return until the promise response received.

  const results = axios.get("http://localhost:5000/posts/");
  //* if I don't want to return the whole results I'll use .then()
  //   .then((response) => {
  //     return response.data.result; //! this return an array not object ==> change from results.data.result.map() to results.map()
  //   });

  // return an object with results
  return { results };
};