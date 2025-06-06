import { Metadata } from "next";
import qs from "qs";
import { findPost } from "@/requests/post";
import { getTextFromHTML } from "@/lib/utils";
import {
  METADATA_SHARE_TEXT,
  METADATA_SHARE_TITLE,
} from "@/contants/metadata/config";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  try {
    const { id } = params;
    const queryString = qs.stringify({
      populate: ["postedBy", "tagged_users", "comments"],
    });
    const res = await findPost(id, queryString);

    if (res) {
      const images = [];
      if (res.thumbnail) {
        images.push(res.thumbnail);
      }

      if (res.images) {
        const imageUrls = (res.images as { url: string }[]).map(
          (img) => img.url
        );
        images.push(...imageUrls);
      }

      return {
        title: res.name,
        description: getTextFromHTML(res.content || "").substring(0, 200),
        openGraph: {
          title: res.name,
          description: getTextFromHTML(res.content || "").substring(0, 200),
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/bai-viet/${id}`,
          images: res.thumbnail
            ? [{ url: res.thumbnail, width: 800, height: 600 }]
            : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title: res.name,
          description: getTextFromHTML(res.content || "").substring(0, 200),
          images,
        },
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/bai-viet/${id}`,
        },
      };
    }

    return {
      title: METADATA_SHARE_TITLE,
      description: METADATA_SHARE_TEXT,
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: METADATA_SHARE_TITLE,
      description: METADATA_SHARE_TEXT,
    };
  }
}
