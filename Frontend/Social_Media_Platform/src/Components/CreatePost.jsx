import { useState } from "react";
import api from "../services/api";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/posts/", {
        content: content,
      });

      setContent("");

      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        
        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">
            +
          </span>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Create a post
          </h2>

          <p className="text-sm text-gray-500">
            Share something with your community
          </p>
        </div>

      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          className="
            w-full
            border border-gray-200
            bg-gray-50
            rounded-xl
            px-4 py-3
            text-gray-800
            placeholder-gray-400
            resize-none
            focus:outline-none
            focus:bg-white
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/10
            transition
          "
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          
          <p className="text-xs text-gray-400">
            Keep your post respectful and friendly.
          </p>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="
              w-full sm:w-auto
              bg-blue-600
              text-white
              px-6 py-2.5
              rounded-xl
              font-medium
              hover:bg-blue-700
              active:scale-[0.98]
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Posting...
              </span>
            ) : (
              "Post"
            )}
          </button>

        </div>

      </form>

    </div>
  );
}

export default CreatePost;