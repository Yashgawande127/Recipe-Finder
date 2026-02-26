import React, { useState, useEffect } from 'react';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { MessageCircle, Heart, Reply, Edit, Trash2, Send, X } from 'lucide-react';

const CommentSection = ({ recipeId }) => {
  const { 
    getCommentsForRecipe, 
    loadCommentsForRecipe,
    addComment,
    editComment,
    deleteComment,
    likeComment,
    addReply
  } = useRecipe();
  
  const { user } = useAuth();
  
  const [newComment, setNewComment] = useState('');
  const [comments, setLocalComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Load comments when component mounts or recipeId changes
  useEffect(() => {
    const loadComments = () => {
      loadCommentsForRecipe(recipeId);
      const recipeComments = getCommentsForRecipe(recipeId);
      setLocalComments(recipeComments);
    };
    
    loadComments();
  }, [recipeId, getCommentsForRecipe, loadCommentsForRecipe]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      addComment(recipeId, newComment.trim());
      const updatedComments = getCommentsForRecipe(recipeId);
      setLocalComments(updatedComments);
      setNewComment('');
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditText(comment.content);
  };

  const handleSaveEdit = () => {
    if (editText.trim() && user) {
      editComment(recipeId, editingComment, editText.trim());
      const updatedComments = getCommentsForRecipe(recipeId);
      setLocalComments(updatedComments);
      setEditingComment(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditText('');
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?') && user) {
      deleteComment(recipeId, commentId);
      const updatedComments = getCommentsForRecipe(recipeId);
      setLocalComments(updatedComments);
    }
  };

  const handleLikeComment = (commentId) => {
    if (user) {
      likeComment(recipeId, commentId);
      const updatedComments = getCommentsForRecipe(recipeId);
      setLocalComments(updatedComments);
    }
  };

  const handleReply = (comment) => {
    setReplyingTo(comment.id);
    setReplyText('');
  };

  const handleSubmitReply = () => {
    if (replyText.trim() && user) {
      addReply(recipeId, replyingTo, replyText.trim());
      const updatedComments = getCommentsForRecipe(recipeId);
      setLocalComments(updatedComments);
      setReplyingTo(null);
      setReplyText('');
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText('');
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const CommentItem = ({ comment, isReply = false }) => {
    const isUserComment = user && comment.author?.id === user.id;
    const isLikedByUser = user && comment.likedBy?.includes(user.id);
    
    return (
      <div className={`${isReply ? 'ml-8 mt-3' : 'mb-4'}`}>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {comment.author?.name ? comment.author.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="font-semibold text-sm">{comment.author?.name || 'Unknown User'}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                  {comment.edited && <span className="ml-2">(edited)</span>}
                </p>
              </div>
            </div>
          </div>
          
          {editingComment === comment.id ? (
            <div className="mb-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 mb-3">{comment.content}</p>
          )}

          <div className="flex items-center space-x-4 text-sm">
            {user && (
              <button
                onClick={() => handleLikeComment(comment.id)}
                className={`flex items-center space-x-1 transition-colors ${
                  isLikedByUser 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLikedByUser ? 'fill-current' : ''}`} />
                <span>{comment.likes || 0}</span>
              </button>
            )}
            
            {!isReply && user && (
              <button
                onClick={() => handleReply(comment)}
                className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}
            
            {isUserComment && !isReply && (
              <>
                <button
                  onClick={() => handleEditComment(comment)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3 p-3 bg-white rounded-md border">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="2"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleSubmitReply}
                  className="px-3 py-1 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600"
                >
                  Reply
                </button>
                <button
                  onClick={handleCancelReply}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-5 h-5 text-primary-500" />
        <h3 className="text-xl font-semibold text-secondary-900">
          Comments & Tips ({comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your cooking tips, ask questions, or leave a comment..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows="3"
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-500">
                Share your experience with this recipe!
              </p>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Post Comment</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">Please log in to post comments and interact with others.</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection; 