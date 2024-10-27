"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const CompetitionContest = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-12">
      <div>
        <div className="text-2xl font-bold mb-4">Bảng đấu</div>
        <p className="mb-4">
          Thí sinh đăng ký theo đúng lớp học hiện tại theo năm học 2024 - 2025
        </p>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-[100px] font-bold text-black border-r whitespace-nowrap">
                  Bảng
                </TableHead>
                <TableHead className="font-bold text-black border-r whitespace-nowrap">
                  Lớp
                </TableHead>
                <TableHead className="font-bold text-black border-r whitespace-nowrap">
                  Hình thức thi
                </TableHead>
                <TableHead className="font-bold text-black whitespace-nowrap">
                  Ngôn ngữ lập trình thi đấu
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b">
                <TableCell className="font-medium border-r whitespace-nowrap">
                  Bảng A
                </TableCell>
                <TableCell className="border-r">
                  Tiểu học: Lớp 3 - lớp 5
                </TableCell>
                <TableCell className="border-r whitespace-nowrap">
                  Thi cá nhân
                </TableCell>
                <TableCell rowSpan={3} className=" text-center my-auto">
                  <div>
                  <div className="sm:hidden">
                    Thí sinh vận dụng kiến thức và kỹ năng lập trình để thực
                    hiện các thử thách trên nền tảng CodeCombat
                  </div>
                  <div className="hidden sm:block">
                    Thí sinh vận dụng kiến thức và kỹ năng lập trình để thực
                    hiện các thử thách trên nền tảng CodeCombat
                    (https://codecombat.com/)
                  </div>
                  </div>
                  
                </TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell className="font-medium border-r whitespace-nowrap">
                  Bảng B
                </TableCell>
                <TableCell className="border-r">THCS: Lớp 6 - lớp 9</TableCell>
                <TableCell className="border-r whitespace-nowrap">
                  Thi cá nhân
                </TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell className="font-medium border-r whitespace-nowrap">
                  Bảng C
                </TableCell>
                <TableCell className="border-r">
                  THPT: Lớp 10 - lớp 12
                </TableCell>
                <TableCell className="border-r whitespace-nowrap">
                  Thi cá nhân
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium border-r whitespace-nowrap">
                  Bảng D
                </TableCell>
                <TableCell className="border-r">
                  <div className="sm:hidden">
                    Tiểu học, THCS, THPT (Lớp 3 - 12): Bảng sáng tạo
                  </div>
                  <div className="hidden sm:block">
                    Tiểu học, THCS, THPT (Lớp 3 - lớp 12): Bảng sáng tạo
                  </div>
                </TableCell>
                <TableCell className="border-r">
                  Thi cá nhân hoặc thi theo đội, tối đa 03 thành viên
                </TableCell>
                <TableCell>
                  <div className="sm:hidden">
                    Thí sản phẩm phần mềm sáng tạo (Scratch/Python). Chưa từng
                    đạt giải cấp Quốc gia, quốc tế.
                  </div>
                  <div className="hidden sm:block">
                    Thí sản phẩm phần mềm sáng tạo phù hợp với chủ đề của giải
                    đấu (sử dụng Scratch hoặc Python). Sản phẩm sáng tạo dự thi
                    chưa từng đạt giải các cuộc thi, hội thi cấp Quốc gia, quốc
                    tế.
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Các thời điểm quan trọng của giải đấu
        </h2>
        <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold text-black border-r whitespace-nowrap">Vòng thi</TableHead>
              <TableHead className="font-bold text-black border-r whitespace-nowrap">Vòng Loại</TableHead>
              <TableHead className="font-bold text-black whitespace-nowrap">Vòng Quốc gia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b">
              <TableCell className="font-medium border-r whitespace-nowrap">Hạn đăng kí</TableCell>
              <TableCell className="border-r">25/11/2024</TableCell>
              <TableCell>Theo thông báo của Ban Tổ chức sau khi có kết quả Vòng Loại</TableCell>
            </TableRow>
            <TableRow className="border-b">
              <TableCell className="font-medium border-r whitespace-nowrap">Thời gian thi</TableCell>
              <TableCell className="border-r">08/12/2024</TableCell>
              <TableCell>21/12/2024</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium border-r whitespace-nowrap">Địa điểm, hình thức thi</TableCell>
              <TableCell className="border-r">
                <p>Bảng A, B, C: Tham gia thi tập trung tại các điểm thi do Ban Tổ chức lựa chọn.</p>
                <p className="mt-2">Bảng D: Nộp bài trực tuyến theo hướng dẫn của Ban Tổ chức.</p>
              </TableCell>
              <TableCell>Thi trực tiếp (tại Cung Thiếu Nhi Hà Nội)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      </div>
    </div>
  );
};
