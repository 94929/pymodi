
import 'src/components/Module/Module';

export default function Usage() {

  // const network = Module({moduleName: 'network'});

  return (
    <section className="page-section mb-0" id="usage">
      <div className="container">
        {/* About Section Heading */}
        <h2 className="page-section-heading text-center text-uppercase text-secondary">Usage</h2>
        {/* Icon Divider */}
        <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
            <div className="divider-custom-line"></div>
        </div>
        {/* Usage Manual Content */}
        <dl>
          <dt className = "btn btn-primary"><h2>MODI 1</h2></dt>
          <dd>
            <div style={{alignItems: 'center'}}>
              <div className="tabCon wrapper">
                {/* TODO: Currently Network Module, Use Dynamic Module */}
                <div className="module network" data-toggle="modal" data-target="#networkmodulee">
                  <img src="assets/img/modules/network.png" alt="network" width="100" height="100" />
                </div>
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </section>
  );
}
