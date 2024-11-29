import {useProfileStore} from "@/store/ProfileStore";
import {X} from "lucide-react";
import React from "react";
import {Input} from "../common/Input";
import {TextArea} from "../common/TextArea";
import {Button} from "../common/Button";
import {InputFileUpload} from "../common/InputFileUpload";
import {z} from "zod";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePostStore} from "@/store/PostStore";
import {TPostUpload} from "@/types";
import {InputMulImgUploadContest} from "@/components/contest/InputMulImgUploadContest";
import {useUserStore} from "@/store/UserStore";
import {useRouter} from "next/navigation";

const postSchema = z.object({
  name: z.string({required_error: "Tên dự án không được để trống"}).min(1, "Tên dự án it nhất 1 ký tự"),
  url: z.string().optional(),
  tags: z.string().optional(),
  description: z.string().optional(),
})

export const CreateProfileModal = () => {
  const router = useRouter();
  //use state
  const [fileMedia, setFileMedia] = React.useState<File[]>([]);

  //use store
  const [isShowing, hide] = useProfileStore((state) => [
    state.isShowing,
    state.hide,
  ]);
  const [createPost, uploadMedia] = usePostStore((state) => [state.createPost, state.uploadMedia]);
  const user_id = useUserStore((state) => state.userInfo?.id);

  //define form
  const formPostState = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      name: "",
      url: "",
      tags: "",
      description: "",
    }
  });

  //onClick function
  const onSubmit = async (dataSubmit: any) => {
    if(!user_id) {
      router.push("/login");
      return;
    }
    const data:TPostUpload = {
        name: dataSubmit.name,
        url: dataSubmit.url,
        tags: dataSubmit.tags,
        description: dataSubmit.description,
    }
    const res = await createPost(user_id.toString(), data);
    if(res.status && res.value) {
      const formData = new FormData();
      formData.append("ref", "api::post.post");
      formData.append("refId", res.value.id);
      formData.append("field", "media");
      fileMedia.forEach((file) => formData.append("files", file));
      const uploadRes = await uploadMedia(formData);
      if(uploadRes.status) {
        alert("Upload post successfully");
        hide();
        return;
      }
      alert("Upload post failed");
      hide();
    }
  }

  //onChange function
  const handleFileChange = (files: File[]) => {
    setFileMedia(files);
  }
  return isShowing ? (
      <FormProvider {...formPostState}>
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
      <div className="relative mx-auto flex w-[688px] flex-col justify-center gap-y-5 rounded-3xl bg-white py-6">
        <button
          type="button"
          onClick={hide}
          className="absolute right-4 top-4 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <X size={16} className="" />
        </button>

        <div className="w-full text-center px-6">
          <div className="text-2xl font-bold text-primary-900">Đăng mới</div>
          <div className="text-sm text-gray-600">
            Khoe ngay dự án mới của mình cho các đồng môn nhé!{" "}
          </div>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="px-6">
          <div className="flex justify-between text-sm">
            <span className="text-primary-900">Tên dự án</span>
            <Controller name={`name`} control={formPostState.control}
                render={({field: {value, onChange}, fieldState}) => (
                    <Input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="VD: Chatbot Miracle"
                        customClassNames="max-w-[424px]"
                        customInputClassNames="text-sm"
                        error={fieldState.error?.message}
                    />
                )}
            />
          </div>
          <div className="flex justify-between text-sm mt-5">
            <span className="text-primary-900">Website URL</span>
            <Controller
              name={`url`}
              control={formPostState.control}
              render={({field: {value, onChange}, fieldState}) => (
                  <Input
                      type="text"
                      value={value}
                      onChange={onChange}
                      placeholder="www.MiracleChat.com"
                      customClassNames="max-w-[424px]"
                      customInputClassNames="text-sm"
                      error={fieldState.error?.message}
                  />
                )}
            />
          </div>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="px-6">
          <div className="flex justify-between text-sm">
            {/*<span className="text-primary-900">Thumbnail dự án</span>*/}
            <InputMulImgUploadContest title={"Media"} imgArr={fileMedia} onChange={handleFileChange}/>
          </div>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="px-6">
          <div className="flex justify-between text-sm">
            <span className="text-primary-900">Tags</span>
            <Controller
            name={`tags`}
            control = {formPostState.control}
            render = {({field: {value, onChange}, fieldState}) => (
                <Input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="VD: B2C, AI, design,...."
                    customClassNames="max-w-[424px]"
                    customInputClassNames="text-sm"
                    error={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="flex justify-between text-sm mt-5">
            <span className="text-primary-900">Mô tả</span>
            <Controller
            name={`description`}
            control = {formPostState.control}
            render={({field: {value, onChange}, fieldState}) => (
                <TextArea
                    value={value}
                    onChange={onChange}
                    placeholder="Viết vài dòng giới thiệu tổng quan dự án"
                    customClassName="max-w-[424px]"
                    customInputClassName="w-full !text-sm"
                    error={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>

        <hr className="border-t border-gray-200" />
        <div className="flex gap-x-3 w-ful px-6">
          <Button outlined className="w-full !rounded-3xl" onClick={hide}>
            Huỷ
          </Button>
          <Button className="w-full !rounded-3xl" onClick={formPostState.handleSubmit(onSubmit)}>Đăng tải</Button>
        </div>
      </div>
    </div>
      </FormProvider>
  ) : (
    <></>
  );
};
