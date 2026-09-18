import { useEffect, useState } from "react";
import api from "../services/api";
import FollowButton from "../Components/FollowButton";
import { useParams, useNavigate } from "react-router-dom";
import FollowersList from "../Components/FollowersList";
import FollowingList from "../Components/FollowingList";

function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeList, setActiveList] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            // Check login
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login", {
                    state: {
                        message:
                            "You have to login first to access profile.",
                    },
                });

                return;
            }

            try {
                const response = await api.get(
                    id
                        ? `/accounts/profile/${id}/`
                        : "/accounts/profile/"
                );

                setProfile(response.data);

            } catch (error) {
                console.error(
                    "Profile load nahi ho saka:",
                    error.response?.data
                );

                // Profile not found
                if (error.response?.status === 404) {
                    setProfile(null);
                    return;
                }

                // Session expired
                if (error.response?.status === 401) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");

                    navigate("/login", {
                        state: {
                            message:
                                "Your session has expired. Please login again.",
                        },
                    });

                    return;
                }

            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, [id, navigate]);

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <div className="flex flex-col items-center gap-3">

                    <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>

                    <p className="text-gray-500">
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }

    // Profile not found
    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">

                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl">
                            👤
                        </span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Profile not found
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                        The profile you're looking for doesn't exist.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="
                            mt-5
                            bg-gray-900
                            text-white
                            px-5 py-2.5
                            rounded-xl
                            text-sm
                            font-medium
                            hover:bg-gray-800
                            active:scale-95
                            transition
                        "
                    >
                        Back to Home
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-28 pb-10">

            <div className="max-w-2xl mx-auto px-4">

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                    {/* Profile Avatar */}
                    <div className="flex justify-center mb-4">

                        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-md">

                            <span className="text-white text-3xl font-bold">
                                {profile.username
                                    .charAt(0)
                                    .toUpperCase()}
                            </span>

                        </div>

                    </div>

                    {/* Username + Follow */}
                    <div className="flex items-center justify-center gap-4 flex-wrap">

                        <h1 className="text-2xl font-bold text-gray-900">
                            @{profile.username}
                        </h1>

                        {!profile.is_own_profile && (
                            <FollowButton
                                userId={profile.user_id}
                                initialFollowing={
                                    profile.is_following
                                }
                            />
                        )}

                    </div>

                    {/* Email */}
                    <p className="text-gray-500 text-center mt-1 break-words">
                        {profile.email}
                    </p>

                    {/* Bio */}
                    <p className="text-gray-700 mt-4 text-center break-words">
                        {profile.bio || "No bio available."}
                    </p>

                    {/* Followers / Following */}
                    <div className="flex justify-center gap-12 mt-6 border-t border-gray-100 pt-5">

                        <button
                            onClick={() =>
                                setActiveList(
                                    activeList === "followers"
                                        ? null
                                        : "followers"
                                )
                            }
                            className="text-center hover:text-blue-600 cursor-pointer transition"
                        >
                            <p className="font-bold text-lg text-gray-900">
                                {profile.followers_count}
                            </p>

                            <p className="text-sm text-gray-500">
                                Followers
                            </p>
                        </button>

                        <button
                            onClick={() =>
                                setActiveList(
                                    activeList === "following"
                                        ? null
                                        : "following"
                                )
                            }
                            className="text-center hover:text-blue-600 cursor-pointer transition"
                        >
                            <p className="font-bold text-lg text-gray-900">
                                {profile.following_count}
                            </p>

                            <p className="text-sm text-gray-500">
                                Following
                            </p>
                        </button>

                    </div>

                    {/* Followers List */}
                    {activeList === "followers" && (
                        <FollowersList
                            userId={profile.user_id}
                        />
                    )}

                    {/* Following List */}
                    {activeList === "following" && (
                        <FollowingList
                            userId={profile.user_id}
                        />
                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;