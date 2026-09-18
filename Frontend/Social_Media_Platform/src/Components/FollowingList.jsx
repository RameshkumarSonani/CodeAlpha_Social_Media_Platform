import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function FollowingList({ userId }) {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await api.get(
                    `/accounts/${userId}/following/`
                );

                setFollowing(response.data);
            } catch (error) {
                console.error("Following error:", error.response?.data);
            }
        };

        if (userId) {
            fetchFollowing();
        }
    }, [userId]);

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-3">
                Following
            </h2>

            {following.length === 0 ? (
                <p className="text-gray-500">
                    Not following anyone yet.
                </p>
            ) : (
                <div className="space-y-2">
                    {following.map((user) => (
                        <Link
                            key={user.id}
                            to={`/profile/${user.id}`}
                            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold">
                                    {user.username.charAt(0).toUpperCase()}
                                </span>
                            </div>

                            <span className="font-medium">
                                @{user.username}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FollowingList;