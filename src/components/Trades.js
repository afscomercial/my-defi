import { connect } from 'react-redux';
import Spinner from './Spinner';
import {
  filledOrdersLoadedSelector,
  filledOrdersSelector,
} from '../store/selectors';

const showFilledOrders = (filledOrders) => {
  return (
    <tbody>
      {filledOrders.map((order) => {
        return (
          <tr className={`order-${order.id}`} key={order.id}>
            <td className='text-muted'>{order.formattedTimestamp}</td>
            <td>{order.tokenAmount}</td>
            <td className={`text-${order.tokenPriceClass}`}>
              {order.tokenPrice}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const Trades = (props) => {
  return (
    <div className='vertical'>
      <div className='card bg-dark text-white'>
        <div className='card-header'>Trades</div>
        <div className='card-body'>
          <table className='table table-dark table-sm small'>
            <thead>
              <tr>
                <th>Time</th>
                <th>DAPP</th>
                <th>DAPP/ETH</th>
              </tr>
            </thead>
            {props.filledOrdersLoaded ? (
              showFilledOrders(props.filledOrders)
            ) : (
              <Spinner type='table' />
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filledOrdersLoaded: filledOrdersLoadedSelector(state),
    filledOrders: filledOrdersSelector(state),
  };
};

export default connect(mapStateToProps)(Trades);
