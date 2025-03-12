import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { CommentCard } from './CommentCard';
import { Button } from '../common/button/Button';

type Props = {
  imageUrl?: string;
};

const mockMessages = [
  {
    name: 'Long',
    username: 'Bá Vưong Học Đưòng',
    time: Date.now(),
    content: 'quá hay!!!',
    interact: {
      numberOflike: 23,
      numberOfMessage: 10,
      numberOfShare: 124,
      numberOfView: 123,
    },
  },
  {
    name: 'Hải',
    username: 'Bá Vưong Học Đưòng',
    time: Date.now(),
    content: 'Hay!!!!',
    interact: {
      numberOflike: 23,
      numberOfMessage: 10,
      numberOfShare: 124,
      numberOfView: 123,
    },
  },
];

export const PostCommentContent = ({ imageUrl }: Props) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    mockMessages.push({
      name: 'Tôi',
      username: 'Bá Vưong Học Đưòng',
      time: Date.now(),
      content: text,
      interact: {
        numberOflike: 0,
        numberOfMessage: 0,
        numberOfShare: 0,
        numberOfView: 0,
      },
    });
    setText('');
  };

  return (
    <div className="space-y-5 h-full overflow-y-auto">
      <div className="flex w-full cursor-pointer items-center gap-2">
        <div
          className={`size-10 rounded-full border bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: `url(/image/home/profile-pic.png)`,
            height: 40,
            width: 40,
          }}
        ></div>
        <div className="flex h-14 w-full items-center justify-center gap-1 rounded-lg border border-gray-300 px-3">
          <textarea
            value={text}
            placeholder="Viết bình luận"
            className="text-black h-10 min-w-0 flex-1 resize-none rounded-md bg-transparent px-3 py-2 outline-none"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            className="!rounded-lg"
            onClick={handleSend}
            disabled={text.length === 0}
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
      <div className="space-y-5">
        {mockMessages.map((item, index) => (
          <CommentCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
