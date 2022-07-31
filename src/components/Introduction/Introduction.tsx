
export default function Introduction() {

  return (
    <section className="page-section mb-0" id="introduction">
      <div className="container">
        {/* About Section Heading */}
        <h2 className="page-section-heading text-center text-uppercase text-secondary">Introduction</h2>
        {/* Icon Divider */}
        <div className="divider-custom">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
          <div className="divider-custom-line"></div>
        </div>
        {/* Embedded Video Link Content */}
        <div style={{alignItems: 'center'}}>
          <img src="https://github.com/LUXROBO/pymodi/blob/master/docs/_static/video/pymodi-intro.gif?raw=true" alt="pymodi-introduction"/>
        </div>
      </div>
    </section>
  );
}
