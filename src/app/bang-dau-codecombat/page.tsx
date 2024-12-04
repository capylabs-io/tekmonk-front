"use client";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
const DialogAccept = ({isOpen, onOpenChange}: { isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent
            className="sm:max-w-[480px] bg-white p-0"
            style={{ borderRadius: "16px" }}
          >
            <DialogHeader className="pt-6">
              <DialogTitle className="text-center text-SubheadLg text-primary-900 m-0 p-0">
                Xác nhận làm bài
              </DialogTitle>
            </DialogHeader>
            <div className="w-full border-t border-gray-300 "></div>

            <div className="flex flex-col items-center justify-center h-[120px]">
              <div className="w-full px-3 text-center">Thí sinh chỉ được phép làm bài và nộp bài một lần duy nhất. Một khi đã nhấn nút "Làm bài", thời gian sẽ tự động đếm ngược trong vòng 75 phút.</div>
            </div>
            <div className="w-full border-t border-gray-300 "></div>
            <DialogFooter className="p-0 m-0 pb-3">
              <div className="flex items-center justify-center gap-4 w-full">
                <Button
                  outlined={true}
                  className="w-[156px] h-[48px] !rounded-[3rem] border"
                  onClick={() => onOpenChange(false)}
                >
                  Quay lại
                </Button>
                  <Button
                    className="w-[156px] h-[48px] !rounded-[3rem]"
                    onClick={() => router.push("/bang-dau-codecombat/lam-bai-thi")}
                  >
                    Vào thi
                  </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
};

export default function GroupStageCodeCombatInfo() {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }
  
  return (
    <div className="max-w-[720px] mx-auto mb-2">
      <div className="text-[35px] text-center mb-12 mt-3 text-primary-700 font-dela 
      max-md:text-[30px] max-sm:text-[25px]
      ">Quy chế thi Vòng Loại - Bảng A, B, C</div>
      <div className="mx-auto  bg-white border border-gray-300 rounded-2xl ">
      <div className="">
        <div className=" text-lg font-bold items-center text-primary-800 w-full h-[60px] py-3 px-8">
          <p>Vui lòng đọc thật kỹ Quy chế thi</p>
        </div>

        <div className={`border border-gray-300 w-full `}></div>
        <div className={`p-6 px-8`}>
          <div className="space-y-4 text-base font-normal">
            <p>
              1. Thí sinh tự chuẩn bị máy tính (laptop, PC, máy tính bảng, điện
              thoại...) có kết nối Internet ổn định và hoạt động bình thường.
            </p>

            <p>
              2. Trang làm bài thi sẽ được mở trong vòng 24 giờ: từ 00:00 đến
              23:59 ngày 08/12/2024.
            </p>

            <p>
              3. Thời gian làm bài là 75 phút. Thí sinh có thể vào làm bài nhiều
              lần nhưng chỉ được nộp bài 1 lần trong ngày.
            </p>

            <p>
              4. Thí sinh chỉ được phép làm bài và nộp bài 1 lần duy nhất. Mỗi
              thí đã nhấn nút "Làm bài", thời gian sẽ tự động đếm ngược trong
              vòng 75 phút.
            </p>

            <p>
              5. Thí sinh sẽ được làm bài thông qua website
              olympiad.tekmonk.edu.vn. Những thí ý đăng nhập trực tiếp vào
              CodeCombat trong suốt quá trình thi.
            </p>

            <p>
              6. Có tổng số 30 thử thách cần hoàn thiện. Thí sinh hoàn thành các
              thử thách đã trình trên nền tảng CodeCombat theo yêu cầu của đề
              thi, và đồ thời gian.
            </p>

            <p>
              7. Tiến độ làm bài sẽ được chấm điểm. Nếu thí sinh đã hoàn thành
              trong thời gian làm bài thi. Nếu thí sinh đã hoàn thành thử thách
              sau 5 phút mà thí đã đủ làm bài chưa được cập nhập, vui lòng liên
              hệ với Ban tổ chức thi.
            </p>

            <p>
              8. Tiêu chí xếp hạng Vòng Loại là thí sinh hoàn thiện nhiều thử
              thách nhất trong thời gian ngắn nhất.
            </p>

            <p>
              9. Nếu thí sinh vô tình đóng cửa sổ hay thoát trang làm bài thì,
              vui lòng truy cập lại vào trang làm bài thi, tiến độ làm bài sẽ
              không bị ảnh hưởng. Tuy nhiên, thời gian vẫn bị tính. Vì thế vui
              lòng chuẩn bị thiết bị và đường truyền Internet thật ổn định.
            </p>

            <p>
              10. Thí sinh không được quay, chụp, sao chép, in, chia sẻ hình ảnh
              về nội dung trong làm bài, đề thi trên website
              olympiad.tekmonk.edu.vn và thử thách trên CodeCombat.
            </p>

            <p className="">
              11. Khi gặp vấn đề kỹ thuật hoặc có thắc mắc, vui lòng liên hệ với
              Ban tổ chức Giải về địch Tekmonk Coding Olympics thông qua một
              trong các cách sau:
            </p>

            <div className="ml-4 space-y-2">
              <p>a. Email: tekmonk.academy@gmail.com</p>
              <p>b. Hotline: 0985-051-4498</p>
              <p>c. Facebook: Học viện Coding Nghệ Tekmonk</p>
              <p>d. Website: tekmonk.edu.vn</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center space-x-2">
              <div
                className="text-sm font-bold"
              >
                Quý phụ huynh và thí sinh xác nhận đã đọc kỹ thông tin về giải đấu <span className={`text-red-500`}>*</span>
              </div>
            </div>
            <RadioGroup className="pt-2">
        <div
          className="flex items-center space-x-3 hover:cursor-pointer group"
          onClick={handleCheckboxChange}
        >
          <RadioGroupItem
            value="1"
            id="category-A"
            checked={isChecked}
            className="group-hover:border-primary-600"
          />
          <div className="text-base font-medium text-gray-900 cursor-pointer">
            Tôi đã đọc, nắm bắt thông tin về giải đấu
          </div>
        </div>
      </RadioGroup>
            
          </div>
        </div>
        <div className={`border border-gray-300 w-full `}></div>
        <div className="flex items-center justify-between h-[60px] py-3 px-8">
              <Button
                outlined={true}
                className=" w-[120px] h-[44px] !rounded-[3rem] border border-gray-300"
              >
                Quay lại
              </Button>
              <Button
                className=" bg-primary-600 h-[44px] w-[120px] !rounded-[3rem]"
                onClick={() => setIsOpen(true)}
                disabled={!isChecked}
              >
                Làm bài
              </Button>
              <DialogAccept isOpen={isOpen} onOpenChange={setIsOpen}/>
            </div>
      </div>
    </div>
    </div>
  );
}
