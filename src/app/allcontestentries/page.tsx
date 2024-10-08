import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"

export default function SearchInterface() {
    const cards = Array(12).fill({
        id: "09324",
        title: "TÊN DỰ ÁN HIỂN THỊ Ở ĐÂY VỚI TỐI ĐA LÀ 2 DÒNG. NẾU NHIỀU HƠN T...",
        author: "Henry Nguyen",
        imageUrl: "/image/new/new-pic.png"
    })

    return (
      <div className="container mx-auto space-y-6">
        <div
          className="w-full h-[400px]  black"
          style={{
            backgroundImage: "url('/image/contestentries/Banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
        </div>
        <div className="w-[394px] h-12 relative mx-auto">
          <Input
            type="text"
            placeholder="Tìm kiếm theo ID"
            className="w-full h-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-bodyLg"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="hover:cursor-pointer">
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={card.imageUrl}
                    alt="Into the Breach"
                    width={400}
                    height={200}
                    className="w-full h-72 object-cover"
                  />
                </CardHeader>
                
              </Card>
              <CardContent className="p-4">
                  <div className="text-bodySm text-gray-800">
                    #{card.id}
                  </div>
                  <div className="text-SubheadXs text-gray-800">
                    {card.title}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="text-bodySm text-gray-800">{card.author}</div>
                </CardFooter>
            </div>
          ))}
        </div>
      </div>
    );
}