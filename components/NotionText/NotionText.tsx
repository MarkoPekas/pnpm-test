import { useEffect, useState } from "react";
import { BeakerIcon, PencilIcon } from '@heroicons/react/solid'
import Image from "next/image";
import { Reorder, useDragControls } from "framer-motion"
import Block from "./Block";

interface Data extends Array<Blocks>{}

interface Blocks {
    id: string;
    type: string;
    content: string;
}


const NotionText = ({ sendData }: { sendData: (data: Data) => void }) => {
    const [data, setData] = useState<Data>([]);
    const [focusedDiv, setFocusedDiv] = useState(0);
    useEffect(() => {
        if(data.length === 0) {
            setData([{
                id: Math.random().toString(),
                type: 'text',
                content: ''
            }])
        }
        sendData(data);
    }, [data])

    useEffect(() => {
        let el = document.getElementById(data[focusedDiv]?.id)
        if(el){
            el.focus();
            if (typeof window.getSelection != "undefined"
                    && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
            } else if (typeof (document.body as any).createTextRange != "undefined") {
                var textRange = (document.body as any).createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }
    }, [focusedDiv])

    return (
        <div className="w-full flex flex-col">
            <Reorder.Group axis="y" values={data} onReorder={setData}>
                {data.map((block: Blocks, i: number) => {
                    return (
                            <Block 
                                i={i}
                                key={block.id}
                                block={block}
                                setContent={(e) => {
                                    setData(data.map((b: Blocks) => {
                                        if(block.id === b.id){
                                            b.content = e;
                                        }
                                        return b;
                                    }))
                                }}
                                setFocus={(e) => {
                                    if(e !== undefined)
                                    if(e>=0 && e<data.length)
                                    setFocusedDiv(e)
                                }}
                                setType={(e) => {
                                    setData(data.map((b: Blocks, i: number) => {
                                        if(b.id === block.id) {
                                            b.type = e
                                            b.content = ''
                                        }
                                        return b
                                    }))
                                }}
                                deleteBlock={() => {
                                    setData(data.filter((b: Blocks, i: number) => {
                                        return b.id !== block.id
                                    }))
                                    focusedDiv>0&&setFocusedDiv(focusedDiv-1)
                                }}
                                newBlock={() => {
                                    let newData = [...data];
                                    newData.splice(i+1, 0, {
                                        id: Math.random().toString(),
                                        type: 'text',
                                        content: ''
                                    });
                                    setData(newData);
                                    setFocusedDiv(focusedDiv+1)
                                }}
                            />
                    )
                })}
            </Reorder.Group>
        </div>
    )
}



export default NotionText