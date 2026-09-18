import { useEffect, useState } from "react";
import api from "../services/api";
import CreatePost from "../Components/CreatePost";
import CommentSection from "../Components/CommentSection";
import LikeButton from "../Components/LikeButton";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login", {
          state: {
            message: "You have to login first to access home page.",
          },
        });
        return;
      }

      try {
        const response = await api.get("posts/");
        setPosts(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          navigate("/login", {
            state: {
              message: "Your session has expired. Please login again.",
            },
          });

          return;
        }

        setError("Posts load nahi ho sake.");
        console.log(err.response?.data);
      }
    };

    fetchPosts();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-10">

      <div className="max-w-2xl mx-auto px-4">

        {/* Page Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Home
          </h1>

          <p className="text-gray-500 mt-1">
            See what's happening in your community.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Create Post */}
        <div className="mb-6">
          <CreatePost
            onPostCreated={(newPost) => {
              setPosts((prevPosts) => [
                newPost,
                ...prevPosts,
              ]);
            }}
          />
        </div>

        {/* Posts */}
        <div className="space-y-5">

          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">

              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>

              <h2 className="font-semibold text-gray-900">
                No posts yet
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Be the first one to create a post.
              </p>

            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-gray-200
                shadow-sm hover:shadow-md transition-shadow"
              >

                {/* Post Header */}
                <div className="flex items-center gap-3 p-5 pb-3">

                  <div className="w-11 h-11 rounded-full bg-blue-600
                  flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">
                      {post.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <Link
                      to={`/profile/${post.user_id}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 transition"
                    >
                      @{post.username}
                    </Link>

                    <p className="text-xs text-gray-400">
                      SocialConnect
                    </p>
                  </div>

                </div>

                {/* Post Content */}
                <div className="px-5 pb-4">

                  <p className="text-gray-700 leading-relaxed break-words">
                    {post.content}
                  </p>

                </div>

                {/* Like */}
                <div className="px-5 py-3 border-t border-gray-100">

                  <LikeButton
                    postId={post.id}
                    initialLikes={post.likes_count}
                    initialLiked={post.is_liked}
                  />

                </div>

                {/* Comments */}
                <div className="px-5 pb-5">

                  <CommentSection
                    postId={post.id}
                  />

                </div>

              </article>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Home;