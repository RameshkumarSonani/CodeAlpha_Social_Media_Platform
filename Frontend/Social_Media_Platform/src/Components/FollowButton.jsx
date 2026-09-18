import { useState } from "react";
import api from "../services/api";

function FollowButton({ userId, initialFollowing }) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setLoading(true);

      if (!following) {
        await api.post(`/accounts/${userId}/follow/`);
        setFollowing(true);
      } else {
        await api.delete(`/accounts/${userId}/follow/delete/`);
        setFollowing(false);
      }
    } catch (error) {
      console.error(
        "Follow error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-5 py-2 rounded-lg font-medium ${
        following
          ? "bg-gray-200 text-gray-700"
          : "bg-blue-600 text-white hover:bg-blue-700 "
      } disabled:opacity-50`}
    >
      {loading
        ? "..."
        : following
        ? "Following"
        : "Follow"}
    </button>
  );
}

export default FollowButton;