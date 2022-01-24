import { connect } from 'react-redux';
import Spinner from './Spinner';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  orderBookSelector,
  orderBookLoadedSelector,
  exchangeSelector,
  accountSelector,
  orderFillingSelector,
} from '../store/selectors';
import { fillOrder } from '../store/interactions';

const renderOrder = (order, props) => {
  const { dispatch, exchange, account } = props;

  return (
    <OverlayTrigger
      key={order.id}
      placement='top'
      overlay={
        <Tooltip id={order.id}>
          {`Click here to ${order.orderFillAction}`}
        </Tooltip>
      }
    >
      <tr
        key={order.id}
        className='order-book-order'
        onClick={(e) => fillOrder(dispatch, exchange, order, account)}
      >
        <td>{order.tokenAmount}</td>
        <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
        <td>{order.etherAmount}</td>
      </tr>
    </OverlayTrigger>
  );
};

const showOrderBook = (props) => {
  const { orderBook } = props;

  return (
    <tbody>
      {orderBook.sellOrders.map((order) => renderOrder(order, props))}
      <tr>
        <th>DAPP</th>
        <th>DAPP/ETH</th>
        <th>ETH</th>
      </tr>
      {orderBook.buyOrders.map((order) => renderOrder(order, props))}
    </tbody>
  );
};

const OrderBook = (props) => {
  return (
    <div className='vertical'>
      <div className='card bg-dark text-white'>
        <div className='card-header'>Order Book</div>
        <div className='card-body order-book'>
          <table className='table table-dark table-sm small'>
            {props.showOrderBook ? (
              showOrderBook(props)
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
  const orderBookLoaded = orderBookLoadedSelector(state);
  const orderFilling = orderFillingSelector(state);

  return {
    orderBook: orderBookSelector(state),
    showOrderBook: orderBookLoaded && !orderFilling,
    exchange: exchangeSelector(state),
    account: accountSelector(state),
  };
};

export default connect(mapStateToProps)(OrderBook);