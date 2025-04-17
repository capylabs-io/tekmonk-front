"use client";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton
} from "react-share";
import { Button } from "./button/Button";
import {
  Facebook,
  Link,
  Mail,
  Twitter,
  Linkedin,
  Share2,
  MessageSquare,
  Send,
  X
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ShareProps = {
  url: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
};

export default function Share({
  url,
  title = "",
  description = "",
  hashtags = [],
  className = ""
}: ShareProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const shareButtons = [
    {
      name: "Facebook",
      icon: Facebook,
      component: FacebookShareButton,
      props: { url, hashtag: hashtags.join(',') }
    },
    {
      name: "Twitter",
      icon: Twitter,
      component: TwitterShareButton,
      props: { url, title, hashtags }
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      component: LinkedinShareButton,
      props: { url, title, summary: description }
    },
    {
      name: "WhatsApp",
      icon: MessageSquare,
      component: WhatsappShareButton,
      props: { url, title }
    },
    {
      name: "Telegram",
      icon: Send,
      component: TelegramShareButton,
      props: { url, title }
    },
    {
      name: "Email",
      icon: Mail,
      component: EmailShareButton,
      props: { url, subject: title, body: description }
    }
  ];

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1 !text-gray-500 hover:!text-primary-70 ${className}`}
      >
        <Share2 className="h-4 w-4" />
        <span className="text-sm">Chia sẻ</span>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">Chia sẻ bài viết</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            {shareButtons.map(({ name, icon: Icon, component: ShareButton, props }) => (
              <ShareButton key={name} {...props} className="flex flex-col items-center gap-2 h-auto p-4 transition-colors">
                <Icon className="h-6 w-6 text-primary-70" />
                <span className="text-xs text-gray-600">{name}</span>
              </ShareButton>
            ))}

            {typeof navigator.share === 'function' && (
              <div
                className="flex flex-col items-center gap-2 h-auto p-4 cursor-pointer"
                onClick={handleWebShare}
              >
                <Share2 className="h-6 w-6 text-primary-70" />
                <span className="text-xs text-gray-600">Khác</span>
              </div>
            )}

            <div
              className="flex flex-col items-center gap-2 h-auto p-4 cursor-pointer"
              onClick={handleCopyLink}
            >
              <Link className="h-6 w-6 text-primary-70" />
              <span className="text-xs text-gray-600">{isCopied ? 'Đã sao chép' : 'Sao chép link'}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
