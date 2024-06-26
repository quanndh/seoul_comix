"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { BsStars } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import "swiper/css";
import { useState } from "react";
import classNames from "classnames";
import FallbackImage from "@/app/components/FallbackImage";
import { Restaurant } from "@prisma/client";
import { getCategoryName } from "@/utils";

interface Props {
  data: Restaurant;
  onFavorite: (id: string) => void;
}

const RestaurantCard: React.FC<Props> = ({ data, onFavorite }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleAddFavorite = async () => {
    await onFavorite(data.id);
  };

  return (
    <div className="w-full space-y-1">
      <div className="relative">
        <Swiper
          className="w-full"
          spaceBetween={1}
          slidesPerView={1}
          initialSlide={0}
          onSlideChange={(swiper) => {
            setImageIndex(swiper.activeIndex);
          }}
        >
          {data.images.map((image, index) => (
            <SwiperSlide key={`image-${index}`} className="w-full">
              <FallbackImage
                alt=""
                src={image}
                width={358}
                height={240}
                className="w-full h-[240px] md:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[380px] 3xl:h-[440px] 4xl:h-[500px] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-5 left-0 h-5 z-50 w-full flex justify-center">
          <div className="flex items-center space-x-1.5 px-3 bg-black rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
            {data.images.map((_, index) => (
              <div
                key={index}
                className={classNames(
                  "h-2 w-2 rounded-full transition-colors duration-200",
                  {
                    "bg-white": imageIndex === index,
                    "bg-gray-800": imageIndex !== index,
                  }
                )}
              />
            ))}
          </div>
        </div>
        <div
          onClick={handleAddFavorite}
          className="h-10 w-10 bg-white rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 absolute top-2 right-2 z-50 flex justify-center items-center cursor-pointer"
        >
          {data.isFavorite ? (
            <IoIosHeart className="text-primary text-2xl" />
          ) : (
            <IoIosHeartEmpty className="text-white text-2xl" />
          )}
        </div>
      </div>
      {!!data.featured && (
        <div className="text-primary text-sm flex items-center">
          <BsStars className="text-md mr-0.5" />
          {(data.featured as Record<any, any>).text}
        </div>
      )}
      <div className="flex justify-between items-center space-x-2">
        <div className="line-clamp-1 w-9/12 font-semibold">{data.name}</div>
        <div className="flex items-center w-3/12 justify-end">
          <FaStar className="text-yellow-400 text-xl" />
          {data.rating ?? "-"}({data.rating_count ?? 0})
        </div>
      </div>
      {!!data.desc && <div className="line-clamp-1">{data.desc}</div>}
      <div className="flex">
        {getCategoryName(data.category)} · {data.price_range}만원
      </div>
    </div>
  );
};

export default RestaurantCard;
