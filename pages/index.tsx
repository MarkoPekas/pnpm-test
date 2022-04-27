import { ViewGridIcon } from "@heroicons/react/solid"
import { GlobeIcon } from "@heroicons/react/outline"
import Image from "next/image"

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center">
            
            
            {/* Nav Bar */}
            <div className="md:h-20 h-16 flex w-full p-4 max-w-7xl items-center">
                <ViewGridIcon className="h-6 w-6 text-gray-300" />
                <div className="flex-1"></div>
                <a className="px-4 py-2">
                    <p>Demo</p>
                </a>
                <a className="px-4 py-2">
                    <p>Pricing</p>
                </a>

            </div>



            <div className="max-w-7xl w-full p-4">
                <div className="py-16 md:py-32 w-full flex justify-center items-center flex-col">
                    <h1 className="text-3xl md:text-6xl text-gray-900 text-center font-bold">Transform text to<br/><span className="text-indigo-600">handwriting</span></h1>
                    <p className="pt-6 text-gray-400 md:text-xl text-center">Send millions of hand written mails in seconds with our AI powered generator!<br/>Completely personalize your customer experience</p>
                </div>
                <div className="relative rounded-md shadow-xl h-min">
                    <Image src="/tmp.png" width={1000} height={740} layout="responsive" objectFit="cover" />
                </div>
                <p className="pt-10 text-center text-gray-400 text-sm">TRUSTED BY OVER 300 INNOVATIVE FIRMS</p>
                <div className="flex flex-wrap justify-center items-center">
                    <div className="p-2 md:px-5"><img className="w-24 md:w-40" src='http://pigment.github.io/fake-logos/logos/vector/color/space-cube.svg' /></div>
                    <div className="p-2 md:px-5"><img className="w-24 md:w-40" src='http://pigment.github.io/fake-logos/logos/vector/color/auto-speed.svg' /></div>
                    <div className="p-2 md:px-5"><img className="w-24 md:w-40" src='http://pigment.github.io/fake-logos/logos/vector/color/crofts-accountants.svg' /></div>
                    <div className="p-2 md:px-5"><img className="w-24 md:w-40" src='http://pigment.github.io/fake-logos/logos/vector/color/cheshire-county-hygiene-services.svg' /></div>
                    <div className="p-2 md:px-5"><img className="w-24 md:w-40" src='http://pigment.github.io/fake-logos/logos/vector/color/fast-banana.svg' /></div>
                </div>
            </div>





            <div className="max-w-7xl w-full text-center md:py-32 py-16">
                <h2 className="font-bold md:text-3xl text-2xl">A better way to send mail</h2>
                <p className="text-gray-400 py-2 max-w-3xl mx-auto px-2 pb-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor ipsa adipisci quidem deserunt. Quo, omnis odio aliquid, obcaecati temporibus, beatae nihil repudiandae est minus ut maiores error ex corporis quos?</p>
                <div className="flex flex-wrap pt-4 px-2">
                    {[0, 1, 2, 3].map(() => <div className="w-full p-2 md:w-1/2 flex text-left">
                        <div className="rounded bg-indigo-600 w-12 h-12 flex-shrink-0 flex justify-center items-center">
                            <GlobeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="px-4">
                            <h3 className="text-gray-900 font-semibold text-lg">Send Anywhere</h3>
                            <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ipsa adipisci quidem deserunt. Quo, omnis odio aliquid, obcaecati temporibus.</p>
                        </div>
                    </div>)}
                    
                </div>
            </div>




        </div>
    )
}

export default Home