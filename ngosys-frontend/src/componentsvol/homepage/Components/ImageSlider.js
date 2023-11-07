import React from 'react';
import { Carousel } from 'antd';
import img1 from "../../../firstpage//images/3.jpg";
import img2 from "../../../firstpage//images/4.jpg";
import img3 from "../../../firstpage//images/5.jpg";


const ImageSlider = (props) => {
    return (
        <div>
            images
            {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style={{width:'500px'}} >
                <ol class="carousel-indicators" style={{color:'black'}}>
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block " style={{width:'500px'}} src={img1} alt="First slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block " style={{width:'500px'}}  src={img2} alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block"  style={{width:'500px'}}  src={img3} alt="Third slide"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only" style={{color:'black'}}>Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only" style={{color:'black'}}>Next</span>
                </a>
            </div> */}
            {/* <div id="myCarousel" class="carousel slide" data-ride="carousel">

                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>


                <div class="carousel-inner" >

                    <div class="item active">
                        <img src="images/la.jpg" alt="Los Angeles" style="width:100%;"/>
                        <div class="carousel-caption">
                            <h3>Los Angeles</h3>
                            <p>LA is always so much fun!</p>
                        </div>
                    </div>

                    <div class="item">
                        <img src="images/chicago.jpg" alt="Chicago" style="width:100%;"/>
                        <div class="carousel-caption">
                            <h3>Chicago</h3>
                            <p>Thank you, Chicago!</p>
                        </div>
                    </div>

                    <div class="item">
                        <img src="images/ny.jpg" alt="New York" style="width:100%;"/>
                        <div class="carousel-caption">
                            <h3>New York</h3>
                            <p>We love the Big Apple!</p>
                        </div>
                    </div>

                </div>


                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div> */}
            {/* <div className='coursel-manage'>
                <Swiper tag="section" wrapperTag="ul"
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    id="main"
                    thumbs={{ swiper: thumbsSwiper }}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay
                    spaceBetween={0}

                >{slides}</Swiper>

            </div>

            <Swiper id="thumbs"
                spaceBetween={0}
                slidesPerView={3}
                onSwiper={setThumbsSwiper}
            >
                {thumbs}
            </Swiper> */}


        </div >
    );
};

export default ImageSlider;