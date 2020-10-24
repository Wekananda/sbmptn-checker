import Carousel, {
  Dots,
  autoplayPlugin,
  asu,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import React, { useState } from "react";

const MyCarouselWithDots = () => {
  const [value, setValue] = useState(0);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      <Carousel plugins={["arrows"]}>
        <img src="https://olle-tryout.s3.ap-southeast-1.amazonaws.com/file_banner/VIPOlle-2png.png" />
      </Carousel>
      <Dots value={value} onChange={onChange} />
    </div>
  );
};

export default MyCarouselWithDots;
