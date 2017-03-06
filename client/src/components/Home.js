import React from 'react';
import domain from '../utils/domain';

class Home extends React.Component {
  constructor () {
    super();
    this.state = {
      tutorials: []
    };
  }

  componentWillMount () {
    // public http request
    fetch(domain.server)
      .then(response => response.json())
      .then(response =>
        this.setState({tutorials: response})
      );
  }

  render () {
    // const tutorials = this.state.tutorials.map((tut, index) =>
    //   <article key={index} classNameName='w5 bg-white br3 pa3 pa4-ns ma1 ba b--black-10'>
    //     <div classNameName='tc'>
    //       <img src={tut.image} classNameName='h4 w4 dib ba b--black-05 pa2' title={tut.title} alt={tut.title} />
    //       <a href={tut.link} target='_blank'><h1 classNameName='f3 mb2 truncate'>{tut.title}</h1></a>
    //       <h2 classNameName='f5 fw4 gray mt0 truncate'>{tut.author}</h2>
    //     </div>
    //   </article>);
    return (
      <header className='sans-serif'>
        <div className='cover bg-left bg-center-l hero'>
          <div className='bg-black-80 pb5 pb6-m pb7-l'>
            <nav className='dt w-100 mw8 center'>
              <div className='dtc w2 v-mid pa3'>
                <a href='/' className='dib w2 h2 pa1 grow-large border-box'>
                  <svg
                    className='dib h1 w1'
                    data-icon='grid'
                    viewBox='0 0 32 32'
                    >
                    <title>Super Normal Icon Mark</title>
                    <path d='M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z' />
                  </svg>
                </a>
              </div>
              <div className='dtc v-mid tr pa3'>
                <a className='f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3' href='/' >How it Works</a>
                <a className='f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3' href='/' >Pricing</a>
                <a className='f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3' href='/' >About</a>
                <a className='f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3' href='/' >Careers</a>
                <a className='f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba' href='/' >Sign Up</a>
              </div>
            </nav>
            <div className='tc-l mt4 mt5-m mt6-l ph3'>
              <h1 className='f2 f1-l fw2 white-90 mb0 lh-title'>This is your super impressive headline</h1>
              <h2 className='fw1 f3 white-80 mt3 mb4'>Now a subheadline where explain your wonderful new startup even more</h2>
              <a className='f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3' href='/'>Call to Action</a>
              <span className='dib v-mid ph3 white-70 mb3'>or</span>
              <a className='f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3' href=''>Secondary call to action</a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Home;
