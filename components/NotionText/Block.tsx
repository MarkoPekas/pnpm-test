import { ViewGridAddIcon, ViewGridIcon } from "@heroicons/react/solid";
import { motion, Reorder, useDragControls } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Data extends Array<Block>{}

interface Block {
    id: string;
    type: string;
    content: string;
}

const Block = (
    {setContent, newBlock, setType, deleteBlock, setFocus, i, block}: 
    {setContent: (e: string) => void, newBlock: () => void, setType: (e: string) => void, deleteBlock: () => void, setFocus: (e?: number) => void, i: number, block: Block}
    ) => {
    const { id, content, type } = block;
    const controls = useDragControls()
    const [blockContent, setBlockContent] = useState(content);
    const [activeDropdown, setActiveDropdown] = useState(0);
    const dropdown = [
        {
            label: 'Text',
            description: 'Just start writing with plain text',
            image: '/text.png'
        },{
            label: 'Heading 1',
            description: 'A big heading',
            image: '/header1.png'
        },{
            label: 'Heading 2',
            description: 'A medium heading',
            image: '/header2.png'
        },{
            label: 'Heading 3',
            description: 'A small heading',
            image: '/header3.png'
        },{
            label: 'Image',
            description: 'Slap an image onto the page',
            image: '/image.png'
        }
    ]
    useEffect(() => {
        if(blockContent.startsWith('/')){
            let str = blockContent.split('/')[1];
            for(let i = 0; i < dropdown.length; i++){
                if(ContainsLettersInOrder(dropdown[i].label.toLowerCase(), str.toLowerCase())){
                    setActiveDropdown(i);
                    break;
                }
            }
        }
    }, [blockContent])

    useEffect(() => {
        document.getElementById('Style'+activeDropdown.toString())?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, [activeDropdown])
    
    return (
        <>
            <Reorder.Item
                key={block.toString()}
                value={block}
                dragListener={false}
                dragControls={controls}
            >
                <motion.div whileHover='hovering' initial='default' className="flex items-center">
                    <motion.div variants={{
                        default: {
                            opacity: 0,
                            scale: 0.9
                        },
                        hovering: {
                            opacity: 1,
                            scale: 1
                        }
                    }} className=" px-2 cursor-pointer" onPointerDown={(e) => controls.start(e)}>
                        <ViewGridIcon className="h-4 w-4 text-gray-300" /> 
                    </motion.div>
                    <div contentEditable id={id}
                    suppressContentEditableWarning
                    onInput={(e: any) => {
                        setBlockContent(e.target.innerText);
                        setContent(e.target.innerText);
                    }}
                    onFocus={(e) => {
                        setFocus(i);
                    }}
                    onKeyDown={(e: any) => {
                        if(e.key === 'Enter') {
                            e.preventDefault();
                            if (blockContent.startsWith('/') && ContainsLettersInOrder(dropdown[activeDropdown].label.toLowerCase(), blockContent.split('/')[1].toLowerCase())) {
                                setType(dropdown[activeDropdown].label)
                                setBlockContent('')
                                setContent('');
                                (document.getElementById(id) as any).innerText = '';
                            }else {
                                newBlock();
                            }
                        }
                        if(e.key === 'ArrowUp') {
                            e.preventDefault();
                            if (blockContent.startsWith('/') && ContainsLettersInOrder(dropdown[activeDropdown].label.toLowerCase(), blockContent.split('/')[1].toLowerCase())) {
                                let move = 1;
                                while (!ContainsLettersInOrder(dropdown[activeDropdown-move]?.label.toLowerCase(), blockContent.split('/')[1]?.toLowerCase()) && activeDropdown-move>=0){
                                    move ++;
                                }
                                if(activeDropdown-move >= 0) {
                                    setActiveDropdown(activeDropdown - move);
                                }
                            }else{
                                setFocus(i-1);
                            }
                        }
                        if(e.key === 'ArrowDown') {
                            e.preventDefault();
                            if (blockContent.startsWith('/') && ContainsLettersInOrder(dropdown[activeDropdown].label.toLowerCase(), blockContent.split('/')[1].toLowerCase())) {
                                let move = 1;
                                while (!ContainsLettersInOrder(dropdown[activeDropdown+move]?.label.toLowerCase(), blockContent.split('/')[1]?.toLowerCase()) && activeDropdown+move<dropdown.length){
                                    move ++;
                                }
                                if(activeDropdown+move < dropdown.length) {
                                    setActiveDropdown(activeDropdown + move);
                                }
                            }else {
                                setFocus(i+1);
                            }
                        }
                        if(e.key === 'Backspace') {
                            if(blockContent.length === 0) {
                                e.preventDefault()
                                deleteBlock();
                            }
                        }
                        // console.log(e.key)
                    }}
                    style={{minHeight: '20px'}}
                    className={`w-full py-0.5 flex focus:outline-none after:text-gray-200 ${blockContent.length===0 && `after:focus:content-['_Type_/_for_a_command']`}
                    ${type==='Heading 1' && `text-3xl font-semibold text-gray-900`}
                    ${type==='Heading 2' && `text-2xl font-medium text-gray-900`}
                    ${type==='Heading 3' && `text-lg font-medium text-gray-900`}
                    ${type==='Image' && `font-size: 1rem`}
                    ${type==='text' && `font-size: 1rem text-gray-800 leading-5`}
                    `}>
                        
                    </div>
                </motion.div>
            <div className={`${blockContent.startsWith('/')?'flex':'hidden'} rounded-md bg-white shadow-xl w-72 flex-col absolute max-h-64 overflow-auto scrollbar`}>
                {dropdown.map((item: any, index: number) => {
                    if(ContainsLettersInOrder(item.label?.toLowerCase(), blockContent.split('/')[1]?.toLowerCase())){

                        return (
                            <div onMouseUp={(e) => {
                                setType(item.label);
                                setBlockContent('')
                                setContent('');
                                (document.getElementById(id) as any).innerText = '';
                                e.preventDefault();
                                document.getElementById(i.toString())?.focus();
                            }} key={index} id={'Style'+index.toString()} onMouseEnter={() => setActiveDropdown(index)} className={`flex items-center px-2 py-2 ${activeDropdown===index&&'bg-gray-200'}`}>
                                <div className="w-14 h-14 rounded border overflow-hidden relative">
                                    <Image src={item.image} className="object-cover" layout="fill" />
                                </div>
                                <div className="pl-2">
                                    <p className="text-gray-800">{item.label}</p>
                                    <p className="text-gray-400 text-sm">{item.description}</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            </Reorder.Item>
        </>
        
    )
}

const ContainsLettersInOrder = (str1: string, str2: string) => {
    let workingString = str1;
    if (str2 && str2 && str1!==undefined && str2!==undefined){
        for(let i = 0; i < str2.length; i++) {
            if(workingString.includes(str2[i])) {
                workingString = workingString.split(str2[i])[1];
            } else {
                return false;
            }
        }
        return true;
    }else return true;
}

export default Block;