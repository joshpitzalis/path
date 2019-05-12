// eslint-disable-next-line
import PropTypes from 'prop-types';
import React from 'react';
import { calculateMoneyWasted } from '../listHelpers';

const Stats = ({ total, completed, uid }) => {
  const [moneyWasted, setWaste] = React.useState(0);
  React.useEffect(() => {
    async function getMoneyWasted(uid) {
      const response = await calculateMoneyWasted(uid);
      console.log('moneySpentOnUnfinishedCourses', response);
      setWaste(response);
    }

    getMoneyWasted(uid);
  }, []);


  return (
    <div className="bb bw1 b--black-10">
      <article className="pa3 pa5-ns" data-name="slab-stat-large">
        {/* <h3 className="f6 ttu tracked">
        { Math.floor((completed/total) * 100)
          || 0}% completed
      </h3> */}
        <h3 className="f6 ttu tracked">
        $
          {' '}
          {moneyWasted}
          {' '}
wasted
                </h3>
        <div className="cf">
          <dl className="db dib-l w-auto-l lh-title mr6-l">
            <dd className="f6 fw4 ml0">Bought</dd>
            <dd className="f2 f-subheadline-l fw6 ml0">
              {total}
            </dd>
          </dl>
          <dl className="db dib-l w-auto-l lh-title mr6-l">
            <dd className="f6 fw4 ml0">Completed</dd>
            <dd className="f2 f-subheadline-l fw6 ml0">
              {completed}
            </dd>
          </dl>
          {/* <dl className="db dib-l w-auto-l lh-title mr6-l">
          <dd className="f6 fw4 ml0">Wasted</dd>
          <dd className="f2 f-subheadline-l fw6 ml0">
            $ 1200
          </dd>
        </dl> */}
        </div>
      </article>
    </div>
  );
};

export default Stats;

Stats.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
};
