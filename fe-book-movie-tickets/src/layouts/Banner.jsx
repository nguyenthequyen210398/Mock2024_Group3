import '../main.scss'

function Banner() {


    return (
        <>

            {/* <!-- Carousel --> */}
            <div id="demo" className="carousel slide" data-bs-ride="carousel">

                {/* <!-- Indicators/dots --> */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>

                </div>

                {/* <!-- The slideshow/carousel --> */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="../../src/assets/img1.jpg" alt="Los Angeles" className="d-block" style={{ width: "100%" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="../../src/assets/img2.jpg" alt="Chicago" className="d-block" style={{ width: "100%" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="../../src/assets/img3.jpg" alt="New York" className="d-block" style={{ width: "100%" }} />
                    </div>

                </div>

                {/* <!-- Left and right controls/icons --> */}
                <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>



        </>
    )
}

export default Banner;