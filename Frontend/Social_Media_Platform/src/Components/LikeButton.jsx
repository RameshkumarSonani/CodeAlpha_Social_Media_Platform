import { useState } from "react";
import api from "../services/api";

function LikeButton({ postId, initialLikes, initialLiked }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    try {
      setLoading(true);

      if (!liked) {
        await api.post(`/posts/${postId}/like/`);

        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
      } else {
        await api.delete(`/posts/${postId}/like/delete/`);

        setLiked(false);
        setLikes((prevLikes) => Math.max(0, prevLikes - 1));
      }
    } catch (error) {
      console.error("Like error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={loading}
      aria-label={liked ? "Unlike post" : "Like post"}
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-2
        rounded-xl
        text-sm
        font-medium
        transition
        active:scale-95
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${
          liked
            ? "bg-red-50 text-red-600 hover:bg-red-100"
            : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600"
        }
      `}
    >
      <span className="text-lg leading-none">
        {liked ? "❤️" : "🤍"}
      </span>

      <span>
        {liked ? "Liked" : "Like"}
      </span>

      <span className="text-xs font-semibold bg-white/70 px-2 py-0.5 rounded-full">
        {likes}
      </span>
    </button>
  );
}

export default LikeButton;