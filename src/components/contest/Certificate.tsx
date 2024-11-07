'use client';

export const Certificate = ({name, progress}: {name: string, progress: number}) => {
    return (
        <>
            <div
                      className={`bg-[url('/image/contest/Certificate.png?height=400&width=600')] 
                                bg-no-repeat !bg-center bg-contain
                                w-[97%] min-w-[200px] mx-auto pt-4 sm:px-8 relative
                                px-6 
                                `}
                                style={{
                                  aspectRatio: '16 / 9'
                                }}
                    >
                        {/* absolute top-[10%] -translate-x-1/2 left-1/2 */}
                      <div className="absolute top-[10%] -translate-x-1/2 left-1/2 text-primary-950 flex flex-col items-center
                       justify-center gap-y-2 w-full 
                       
                       max-[500px]:gap-y-0
                       max-[400px]:h-[60px]
                       ">
                        <div className="text-SubheadMd max-[500px]:text-[12px]">CHÚC MỪNG</div>
                        <div className="text-Subhead3Xl uppercase max-[500px]:text-[28px] max-[420px]:text-[24px]">{name}</div>
                        <div className="text-bodyLg max-[500px]:text-[12px]">Đã hoàn thành cuộc thi</div>
                      </div>
                      <div className="w-full text-Subhead4Xl text-primary-950 text-center mt-[32%] 
                      
                        max-[615px]:text-[30px]
                        max-[560px]:mt-[30%]
                        max-[500px]:text-[24px]
                        max-[500px]:mt-[28%]
                      ">{progress}</div>
                
                    </div>
        </>
    )
};