import { FC, useState } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";

import { getImagesList, ImageInfo } from "@/utils/lib/images";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface ImagesPageProps {
  images: ImageInfo[];
}

const ImagesPage: FC<ImagesPageProps> = ({ images }) => {
  // 状態管理用の変数とセッター
  const [numCols, setNumCols] = useState(5); // 初期値は2
  const [menu, setMenu] = useState(false); // 初期値はfalse
  const [ascending, setAscending] = useState(true); // 初期値はtrue

  const sortedImages = [...images].sort((a, b) => {
    if (ascending) {
      return a.fileName.localeCompare(b.fileName);
    } else {
      return b.fileName.localeCompare(a.fileName);
    }
  });

  return (
    <div>
      {/* 列数を変更するためのボタン */}
      <div className="flex justify-between items-center sticky top-0 px-2 z-10">
        <button
          className="h-[8px] w-[8px] bg-[#ffe23c]"
          onClick={() => {
            setMenu(!menu);
          }} // クリック時にメニューを表示
        ></button>
        <div className="flex">
          <button
            onClick={() => setAscending(!ascending)}
            className="text-xs mr-4 hover:bg-slate-600 w-6 justify-center transition ease-in-out delay-350 duration-300"
          >
            ↓↑
          </button>
          {[...Array(20)].map((_, n) => (
            <button
              key={n}
              className="flex gap-3 text-[#fff] text-xs hover:bg-slate-600 w-4 justify-center transition ease-in-out delay-350 duration-300"
              onClick={() => {
                setNumCols(n + 1);
              }} // クリック時に列数を更新
            >
              {n + 1}
            </button>
          ))}
        </div>
      </div>
      {/* グリッドの列数を動的に変更 */}
      <div
        style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
        className="grid relative -mt-[16px]"
      >
        <PhotoProvider className="border-2" maskOpacity={0.5}>
          {sortedImages.map((image) => (
            <div key={image.fileName}>
              <PhotoView src={image.filePath}>
                <Image
                  className="lazy w-full h-full object-cover cursor-pointer"
                  src={image.filePath}
                  alt={image.fileName}
                  width={5000}
                  height={5000}
                />
              </PhotoView>
            </div>
          ))}
        </PhotoProvider>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const images = getImagesList();
  return {
    props: {
      images,
    },
  };
};

export default ImagesPage;
