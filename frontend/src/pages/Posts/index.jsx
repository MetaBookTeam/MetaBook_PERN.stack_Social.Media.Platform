import React, { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Post";

export default function Posts() {
  // destructuring the results object
  const { results } = useLoaderData();
  /* Render the data when it is available in loader 
 From Routers/index.jsx...
  {
    path: "/posts",
    element: <Posts />,
    // loader is a function to retrieve a data
    loader: postsLoader,
  }, */

  return (
    <div className="posts">
      <h2>POSTS</h2>
      <h1>aa</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis,
        adipisci.
      </p>
      <Suspense fallback={<p>Loading data...</p>}>
        <Await resolve={results} errorElement={<p>Error loading data</p>}>
          {(results) => {
            console.log(results.data.result);
            //! Still not working even though I receive the results here
            return (
              <div className="post">
                {results.data.result &&
                  results.data.result.map((post) => {
                    return (
                      <div key={post.id}>
                        <h3>post {post.id}</h3>
                        
                        {/* <Post post={post} />; */}
                      </div>
                    );
                  })}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

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
