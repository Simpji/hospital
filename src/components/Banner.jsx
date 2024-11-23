import React from 'react';

function Banner() {
  return (
    <div>
      <div id="demo" className="carousel slide banner" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>

        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active banner relative">
              <img src="/img/hospital2.jpg" width="100%" alt="" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white">
                <h2 className="text-3xl md:text-5xl font-semibold text-center">Providing Quality Healthcare</h2>
              </div>
            </div>
            <div className="carousel-item banner relative">
              <img src="/img/hospital4.jpg" width="100%" alt="" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white">
                <h2 className="text-3xl md:text-5xl font-semibold text-center">Compassionate Care, Advanced Technology</h2>
              </div>
            </div>
            <div className="carousel-item banner relative">
              <img src="/img/hospital5.jpg" width="100%" alt="" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white">
                <h2 className="text-3xl md:text-5xl font-semibold text-center">Your Health, Our Priority</h2>
              </div>
            </div>
          </div>

          <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <button
          className="carousel-control-prev carousel-fade"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default Banner;
