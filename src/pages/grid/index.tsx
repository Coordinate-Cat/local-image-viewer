import { FC, useState } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";

import { getImagesList, ImageInfo } from "@/utils/lib/images";

interface ImagesPageProps {
  images: ImageInfo[];
}

const ImagesPage: FC<ImagesPageProps> = ({ images }) => {
  // 状態管理用の変数とセッター
  const [numCols, setNumCols] = useState(5); // 初期値は2
  const [menu, setMenu] = useState(false); // 初期値はfalse

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
        <div className="flex gap-3">
          {[...Array(6)].map((_, n) => (
            <button
              key={n}
              className="text-[#fff] text-xs"
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
        {images.map((image) => (
          <div key={image.fileName}>
            <Image
              className="lazy w-full object-cover"
              src={image.filePath}
              alt={image.fileName}
              width={100}
              height={100}
            />
          </div>
        ))}
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
