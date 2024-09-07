import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; 
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import './selector.css'; 

const Banner = () => {
  const [users, setUsers] = useState([]);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="banner-container"> {/* Added centering class */}
    <div className="swiper-container "><div className="header-container">
        <h1 className="">CRYPTOFOLIO WATCH LIST</h1>
        <p>Get all the Info regarding your favorite Crypto Currency</p>
      </div>

      <Swiper
        dir="rtl"
        navigation={true}
        slidesPerView={4}
        loop={true} 
        autoplay={{
          delay: 2500, 
          disableOnInteraction: false, 
        }}
        modules={[Navigation, Pagination, Autoplay]} 
        className="mySwiper swep"
      >
        {users.map((user) => (
          <SwiperSlide className="swaper1" key={user.id}>
            <div className="datad">
              <img
                className="img_data"
                src={user.image}
                alt={user.name}
                style={{ width: "50px", height: "50px" }} 
              />
              <div className="price_symbol">
                <span>{user.ath_change_percentage.toFixed(2)}%</span>
                <p className="uppercase-text">{user.symbol}</p>
              </div>
              <p className="curent">
                {user.current_price}
                <span> {currency}</span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper></div>
      
      <h1>Cryptocurrency Prices by Market Cap</h1>
    </div>
  );
};

export default Banner;
