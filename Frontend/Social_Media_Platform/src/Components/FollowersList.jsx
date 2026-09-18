import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function FollowersList({ userId }) {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await api.get(
                    `/accounts/${userId}/followers/`
                );

                setFollowers(response.data);
            } catch (error) {
                console.error("Followers error:", error.response?.data);
            }
        };

        if (userId) {
            fetchFollowers();
        }
    }, [userId]);

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-3">
                Followers
            </h2>

            {followers.length === 0 ? (
                <p className="text-gray-500">
                    No followers yet.
                </p>
            ) : (
                <div className="space-y-2">
                    {followers.map((user) => (
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

export default FollowersList;