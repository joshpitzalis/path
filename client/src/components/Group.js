import React from 'react';
import domain from '../utils/domain';

class Group extends React.Component {
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
    const tuts = this.state.tutorials
    .filter(tut => tut.doing)
    .map((tut, index) =>
      <article key={index} className='center w5 br3 hidden ba b--black-10 mv4'>
        <div className={`br3 br--top ${tut.stuck ? 'bg-red' : 'bg-white'}`}>
          <a href={tut.link} target='_blank' className='dib link'>
            <h1 className='f4 br3 br--top black-60 mv0 pv2 ph3 truncate'>{tut.nickname}</h1>
          </a>
        </div>

        <div className='pa3 bt b--black-10'>
          <h2 className='f5 fw4 gray mt0 truncate bg--orange'> {tut.title}</h2>
        </div>
      </article>);

    return (
      <div>
        <h1 className='tc'>All Jaaga Students Current Projects</h1>
        <div className='flex flex-wrap justify-center'>
          {tuts}
        </div>
      </div>
    );
  }
}

export default Group;
