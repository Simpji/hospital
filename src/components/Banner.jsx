

function Banner() {
  return (
    <div>
          
        <div id="demo" className="carousel slide banner" data-bs-ride="carousel">

        
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>

        <div id="carouselExampleFade banner" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner">
            <div className="carousel-item active banner">
                <img src="/img/hospital2.jpg" width="100%" alt="" />
            </div>
            <div className="carousel-item banner">
                <img src="/img/hospital4.jpg" width="100%" alt="" />
            </div>
            <div className="carousel-item banner">
                <img src="/img/hospital5.jpg" width="100%" alt="" />
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

        
        <button className="carousel-control- carousel-fade" type="button" data-bs-target="#demo" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
        </button>
        </div>
        {/* <div className="date">
            <input type="time" />
        </div> */}

        
    </div>
  )
}

export default Banner