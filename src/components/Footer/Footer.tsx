
export default function Footer() {

  return (
    <footer className="footer text-center">
        <div className="container">
            <div className="row">
                {/* <!-- Footer Location--> */}
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <h4 className="text-uppercase mb-4">Location</h4>
                    <p className="lead mb-0">
                        13F, 311 Gangnam-daero, Seocho-gu, Seoul, Republic of Korea
                    </p>
                </div>
                {/* <!-- Footer Social Icons--> */}
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <h4 className="text-uppercase mb-4">Around the Web</h4>
                    <a className="btn btn-outline-light btn-social mx-1" href="https://www.facebook.com/luxrobo/"><i className="fab fa-fw fa-facebook-f"></i></a>
                    <a className="btn btn-outline-light btn-social mx-1" href="https://twitter.com/luxrobo"><i className="fab fa-fw fa-twitter"></i></a>
                    <a className="btn btn-outline-light btn-social mx-1" href="https://www.linkedin.com/company/luxrobo/"><i className="fab fa-fw fa-linkedin-in"></i></a>
                    <a className="btn btn-outline-light btn-social mx-1" href="https://github.com/LUXROBO/pymodi"><i className="fab fa-fw fa-github"></i></a>
                </div>
                {/* <!-- Footer About Text--> */}
                <div className="col-lg-4">
                    <h4 className="text-uppercase mb-4">About Us</h4>
                    <p className="lead mb-0">
                        LUXROBO is a platform-based startup that develops interactive learning platforms which makes it easy for anyone to make robots and IoT devices.
                    </p>
                </div>
            </div>
        </div>
    </footer>
  );
}
