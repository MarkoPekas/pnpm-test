import { useEffect, useRef, useState } from "react"
import NotionText from "../components/NotionText/NotionText"
import ReactToPrint from "react-to-print";

interface Data extends Array<Blocks>{}

interface Blocks {
    id: string;
    type: string;
    content: string;
}

const Home = () => {
  const [data, setData] = useState<Data>([])
  let componentRef = useRef();
  
  const [svgData, setSvgData] = useState([])
  const [metrics, setMetrics] = useState<{
    strokeWidth: number
  }>({strokeWidth: 2})
  useEffect(() => {
    const tmp = data.map((block) => {
      return HandType(block.content).then((res: any) => res.json()).then((res: any) => {
        return res
      })
    })
    Promise.all(tmp).then((res: any) => {
      setSvgData(res)
    })
  }, [data])
  return (
    <div className="">
      <div>
        
      </div>
      <div className="flex h-screen flex-col lg:flex-row">
        <div className="flex-1 py-4">
          <div className="flex px-2 items-center pb-4">
          <ReactToPrint
            trigger={() => <button className="px-4 py-2 ml-2 rounded bg-blue-500 text-white font-medium">Export</button>}
            content={() => componentRef.current}
          />
          <p className="pl-4 text-gray-300">{(data.length===0 || (data.length === 1 && data[0]?.content === ''))&&'Start typing below'}</p>
          </div>
          <NotionText sendData={(e: Data) => setData(e)} />
        </div>
        <div className={`flex-1 border-t lg:border-t-0 lg:border-l h-min flex flex-wrap p-4 justify-start items-start`} ref={(el) =>  ((componentRef.current as any) = el)}>
            {/* {svgPaths?.map((path: any, index: number) => {
              return (
                <svg className="w-3 h-4 overflow-visible" key={index}>
                  <path d={path} fill="transparent" stroke="black" strokeLinecap="round" strokeWidth={metrics.strokeWidth} />
                </svg>
              )
            })} */}
            {
              svgData?.map((svg: any, index: number) => {
                if(svgData.length === 0 || data.length === 0) return null
                const strokeWidth = data[index]?.type === 'text' ? 1 : data[index]?.type === 'Heading 3' ? 2 : data[index]?.type === 'Heading 2' ? 3 : data[index]?.type === 'Heading 1' ? 4: 2;
                const w = data[index]?.type === 'text' ? 16 : data[index]?.type === 'Heading 3' ? 20 : data[index]?.type === 'Heading 2' ? 28 : data[index]?.type === 'Heading 1' ? 36 : 16;
                const h = data[index]?.type === 'text' ? 16 : data[index]?.type === 'Heading 3' ? 20 : data[index]?.type === 'Heading 2' ? 28 : data[index]?.type === 'Heading 1' ? 36 : 16;
                const color = data[index]?.type === 'text' ? '#858585' : data[index]?.type === 'Heading 3' ? '#1a1a1a' : data[index]?.type === 'Heading 2' ? '#3c1dab' : data[index]?.type === 'Heading 1' ? '#1a1a1a' : 'black';
                if(svg.length > 0)
                return(
                  <>
                  <div 
                  key={index}
                  className="basis-full" style={{height: h/2}}></div>
                  {svg?.map((path: any, index: number) => {
                    return (
                      <div 
                      key={index}
                      style={{
                        width: w,
                        height: h,
                        margin: '3px 0',
                      }}>
                        <svg width={'100%'} height={'100%'} className='overflow-visible' viewBox="0 0 16 16" preserveAspectRatio="xMinYMin slice">
                          <path d={path} fill="transparent" style={{scale: 5}} stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
                        </svg>
                      </div>
                    )
                  })}
                    <div className="basis-full"></div>
                    <div className="basis-full" style={{height: h/2}}></div>
                  </>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

const HandType = async (data: string) => {
  return (await fetch('/api/type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
  }))
}

export default Home