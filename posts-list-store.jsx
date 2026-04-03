import { createContext, useReducer } from "react";

export const PostListData = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListreducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter((post) => {
      return post.id !== action.payload.postId;
    });
  } else if (action.type === "ADD_POST") {
    newPostList = [...currPostList, action.payload];
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListreducer, []);

  const addPost = (newPost) => {
    // dispatch should always recieve object
    dispatchPostList({
      type: "ADD_POST",
      payload: newPost,
    });
  };

  const deletePost = (postId) => {
    // dispatch should always recieve object
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId: postId,
      },
    });
  };

  return (
    <PostListData.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostListData.Provider>
  );
};

export default PostListProvider;
