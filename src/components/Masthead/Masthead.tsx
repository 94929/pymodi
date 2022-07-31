
export default function Masthead() {

  return (
    <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
            {/* <!-- Masthead Avatar Image--> */}
            <img className="masthead-avatar" src="assets/img/logo.png" alt="" />
            {/* <!-- Icon Divider--> */}
            <div className="divider-custom divider-light">
                <div className="divider-custom-line"></div>
                <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                <div className="divider-custom-line"></div>
            </div>
            {/* <!-- Masthead Subheading--> */}
            <p className="masthead-subheading font-weight-light mb-0">
                Python API for controlling modular electronics, MODI.
            </p>
            {/* <!-- Transfer to KOR--> */}
            <div className="text-center mt-4">
                <a className="btn btn-xl btn-outline-light" href="index_kr.html">
                    페이지를 한글로 보기
                </a>
            </div>
        </div>
    </header>
  );
}
