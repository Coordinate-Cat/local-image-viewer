import Image from "next/image";
import { Inter } from "next/font/google";
import { Slide } from "react-slideshow-image";
import { useRef } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home(this: any) {
  const slideRef = useRef<any>(null); // Update the type of slideRef

  const back = () => {
    slideRef.current?.goBack();
  };

  const next = () => {
    slideRef.current?.goNext();
  };

  const properties = {
    autoplay: false,
    transitionDuration: 1000,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    indicators: (i: number | undefined) => (
      <div className="indicator">{i !== undefined ? i + 1 : ""}</div>
    ),
  };
  const slideImages = [
    "/images/test1.png",
    "/images/test2.png",
    "/images/test3.png",
  ];

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Slide ref={slideRef} {...properties}>
        {" "}
        {/* 追加 */}
        {slideImages.map((imageURL, index) => (
          <div key={index} className="each-slide">
            <Image
              className="lazy"
              width={100}
              height={100}
              src={imageURL}
              alt="sample"
              priority={true}
            />
          </div>
        ))}
      </Slide>

      {/* back button */}
      <button onClick={back.bind(this)} className="text-[#000]">
        Back
      </button>
      {/* next button */}
      <button onClick={next.bind(this)} className="text-[#000]">
        Next
      </button>
    </main>
  );
}
