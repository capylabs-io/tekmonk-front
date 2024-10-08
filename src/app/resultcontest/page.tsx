'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MagicCard } from '@/components/ui/magic-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Contestant {
  rank: number
  name: string
  id: string
  project: string
  score: number
}

const contestants: Contestant[] = [
  { rank: 1, name: "Lê Công Minh", id: "#5903483", project: "Dự án Chơi cờ tướng AI", score: 9500 },
  { rank: 2, name: "Phan Trọng Nghĩa", id: "#123594", project: "Dự án Giấc mơ VR", score: 9000 },
  { rank: 3, name: "Phạm Hoài Ngân", id: "#0703483", project: "Dự án Pikachu du đấy", score: 8500 },
  { rank: 4, name: "Lê Minh Châu", id: "#123594", project: "Dự án OpenAI", score: 7000 },
  { rank: 0, name: "Hoà Nhân", id: "#123594", project: "Dự án Tesla cho trẻ em vùng cao", score: 8120 },
  { rank: 0, name: "Hoà Nhân", id: "#123594", project: "Triển khai mô hình thuật toán đám mây", score: 8120 },
  { rank: 0, name: "Hoà Nhân", id: "#123594", project: "Cyber security for W3", score: 8120 },
]

export default function CompetitionResults() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredContestants = useMemo(() => {
    return contestants.filter(contestant =>
      contestant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contestant.project.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const totalPages = Math.ceil(filteredContestants.length / itemsPerPage)
  const pageContestants = filteredContestants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-purple-800">
            KẾT QUẢ
          </CardTitle>
        </CardHeader>
        <CardContent>
          
            <MagicCard className="w-full h-48 sm:h-64 mb-6 bg-purple-800 text-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center h-full">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h2 className="text-2xl sm:text-4xl font-bold mb-2">TỔNG HỢP BÀI THI CỦA CÁC THÍ SINH</h2>
                  <p className="text-sm sm:text-base">Tùy chỉnh profile cá nhân cùng với các vật phẩm trong cửa hàng</p>
                </div>
                <img src="/placeholder.svg?height=150&width=150" alt="Astronaut" className="h-24 sm:h-32 w-auto" />
              </div>
            </MagicCard>
          

          <div className="mb-4">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700">Tìm kiếm</Label>
            <Input
              id="search"
              type="text"
              placeholder="Tìm kiếm theo tên hoặc dự án..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">THỨ HẠNG</TableHead>
                  <TableHead>THÍ SINH</TableHead>
                  <TableHead className="text-right">ĐIỂM SỐ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageContestants.map((contestant, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {contestant.rank === 0 ? 'Khuyến khích' : contestant.rank}
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="font-semibold">{contestant.name}</span> <span className="text-gray-500">{contestant.id}</span>
                      </div>
                      <div className="text-sm text-gray-500">{contestant.project}</div>
                    </TableCell>
                    <TableCell className="text-right">{contestant.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Trang {currentPage} / {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Sau
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}