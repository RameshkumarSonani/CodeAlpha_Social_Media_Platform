import { useEffect, useState } from "react";
import api from "../services/api";

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [currentUsername, setCurrentUsername] = useState("");

    // Current user
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await api.get("/accounts/profile/");
                setCurrentUsername(response.data.username);
            } catch (error) {
                console.error(
                    "Current user load nahi hua:",
                    error.response?.data
                );
            }
        };

        fetchCurrentUser();
    }, []);

    // Fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await api.get(
                    `/comments/?post=${postId}`
                );

                setComments(response.data);
            } catch (error) {
                console.error(
                    "Comments load nahi ho sake:",
                    error.response?.data
                );
            }
        };

        fetchComments();
    }, [postId]);

    // Create comment
    const handleComment = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/comments/", {
                post: postId,
                content: content.trim(),
            });

            setComments((prevComments) => [
                ...prevComments,
                response.data,
            ]);

            setContent("");

        } catch (error) {
            console.error(
                "Comment create nahi hua:",
                error.response?.data
            );
        } finally {
            setLoading(false);
        }
    };

    // Delete comment
    const handleDelete = async (commentId) => {
        try {
            setDeletingId(commentId);

            await api.delete(`/comments/${commentId}/`);

            setComments((prevComments) =>
                prevComments.filter(
                    (comment) => comment.id !== commentId
                )
            );

        } catch (error) {
            console.error(
                "Comment delete nahi hua:",
                error.response?.data
            );
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="border-t border-gray-100 pt-4">

            {/* Comments Header */}
            <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-900">
                    Comments
                </h3>

                {comments.length > 0 && (
                    <span className="text-xs text-gray-400">
                        {comments.length}{" "}
                        {comments.length === 1
                            ? "comment"
                            : "comments"}
                    </span>
                )}

            </div>

            {/* Comments */}
            {comments.length > 0 ? (
                <div className="space-y-3 mb-4">

                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="
                                bg-gray-50
                                border border-gray-100
                                rounded-xl
                                p-3
                                hover:bg-gray-100/70
                                transition
                            "
                        >

                            <div className="flex items-start gap-3">

                                {/* Avatar */}
                                <div className="
                                    w-9 h-9
                                    rounded-full
                                    bg-gray-900
                                    flex items-center justify-center
                                    shrink-0
                                ">

                                    <span className="text-white text-xs font-bold">
                                        {comment.username
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </span>

                                </div>

                                {/* Comment Content */}
                                <div className="flex-1 min-w-0">

                                    <div className="
                                        flex
                                        flex-wrap
                                        items-center
                                        justify-between
                                        gap-2
                                    ">

                                        <p className="font-semibold text-sm text-gray-900 break-all">
                                            @{comment.username}
                                        </p>

                                        {/* Delete only own comment */}
                                        {comment.username === currentUsername && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        comment.id
                                                    )
                                                }
                                                disabled={
                                                    deletingId ===
                                                    comment.id
                                                }
                                                className="
                                                    text-xs
                                                    font-medium
                                                    text-red-500
                                                    hover:text-red-700
                                                    disabled:opacity-50
                                                    disabled:cursor-not-allowed
                                                    shrink-0
                                                    transition
                                                "
                                            >
                                                {deletingId ===
                                                comment.id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>
                                        )}

                                    </div>

                                    <p className="
                                        text-sm
                                        text-gray-600
                                        mt-1
                                        break-words
                                    ">
                                        {comment.content}
                                    </p>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            ) : (
                <div className="
                    bg-gray-50
                    border border-gray-100
                    rounded-xl
                    px-4 py-4
                    mb-4
                    text-center
                ">

                    <p className="text-sm text-gray-400">
                        No comments yet.
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                        Be the first to comment.
                    </p>

                </div>
            )}

            {/* Comment Form */}
            <form
                onSubmit={handleComment}
                className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-2
                "
            >

                <input
                    type="text"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    placeholder="Write a comment..."
                    disabled={loading}
                    className="
                        flex-1
                        min-w-0
                        border border-gray-200
                        bg-gray-50
                        rounded-xl
                        px-4 py-3
                        text-sm
                        text-gray-800
                        placeholder-gray-400
                        focus:outline-none
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/10
                        disabled:opacity-60
                        transition
                    "
                />

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !content.trim()
                    }
                    className="
                        w-full
                        sm:w-auto
                        min-w-[100px]
                        bg-blue-600
                        text-white
                        px-5 py-3
                        rounded-xl
                        font-medium
                        text-sm
                        hover:bg-blue-700
                        active:scale-[0.98]
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition
                    "
                >
                    {loading ? (
                        <span className="
                            flex
                            items-center
                            justify-center
                            gap-2
                        ">
                            <span className="
                                w-4 h-4
                                border-2
                                border-white
                                border-t-transparent
                                rounded-full
                                animate-spin
                            "></span>

                            Posting...
                        </span>
                    ) : (
                        "Comment"
                    )}
                </button>

            </form>

        </div>
    );
}

export default CommentSection;