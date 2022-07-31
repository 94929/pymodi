
export default function About() {

  return (
    <section className="page-section bg-primary text-white mb-0" id="about">
        <div className="container">
            {/* About Section Heading */}
            <h2 className="page-section-heading text-center text-uppercase text-white">About</h2>
            {/* Icon Divider--> */}
            <div className="divider-custom divider-light">
                <div className="divider-custom-line"></div>
                <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                <div className="divider-custom-line"></div>
            </div>
            {/* About Section Content */}
            <div className="text-center mt-4">
                <div className="text-center mt-4">
                    <p className="lead">
                        PyMODI is a python API for MODI controls.
                        MODI modules are electronic modules that operates using controller area network protocol.
                        You can easily control the electronic modules using PyMODI package.
                        Use PyMODI to make your own MODI creation or copy some of the creations listed above.
                        There are various adaptations of PyMODI in areas such as gaming, machine learning, and education!
                    </p>
                </div>
            </div>
            {/* About Section Button */}
            <div className="text-center mt-4">
                <a className="btn btn-xl btn-outline-light" href="https://pypi.org/project/pymodi/">
                    <i className="fas fa-download mr-2"></i>
                    Install Now
                </a>
            </div>
        </div>
    </section>
  );
}
