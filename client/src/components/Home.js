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
    //   <article key={index} className='w5 bg-white br3 pa3 pa4-ns ma1 ba b--black-10'>
    //     <div className='tc'>
    //       <img src={tut.image} className='h4 w4 dib ba b--black-05 pa2' title={tut.title} alt={tut.title} />
    //       <a href={tut.link} target='_blank'><h1 className='f3 mb2 truncate'>{tut.title}</h1></a>
    //       <h2 className='f5 fw4 gray mt0 truncate'>{tut.author}</h2>
    //     </div>
    //   </article>);
    return (
      <div className='flex flex-wrap justify-center'>
        <h1>Welcome to the Learning Path Creator</h1>
      </div>
    );
  }
}

export default Home;
