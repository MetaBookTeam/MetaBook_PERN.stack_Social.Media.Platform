import React, { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Post/Post";

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
      <p>What's on your mind</p>
      
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
                        <Post post={post} />;
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
