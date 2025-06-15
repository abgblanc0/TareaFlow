import { CommentT } from '@/types';
export default function Comment(comment: CommentT) {
  return (
    <div className='flex flex-col'>
      <div><h2>{comment.user.name}</h2><h2>{comment.created_at}</h2></div>
      <div><p>{comment.content}</p></div>
    </div>
  );
}