import { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange,
} from '../store/interactions';
import { contractsLoadedSelector } from '../store/selectors';
import Navbar from './Navbar';
import Content from './Content';

function App(props) {
  useEffect(() => {
    const loadBlockchainData = async (dispatch) => {
      const web3 = await loadWeb3(dispatch);
      const networkId = await web3.eth.net.getId();
      await loadAccount(web3, dispatch);
      const token = await loadToken(web3, networkId, dispatch)
      if (!token) {
        window.alert(
          'Token smart contract not detected on the current network. Please select another network with Metamask.'
        );
        return;
      }
      const exchange = await loadExchange(web3, networkId, dispatch);
      if (!exchange) {
        window.alert(
          'Exchange smart contract not detected on the current network. Please select another network with Metamask.'
        );
        return;
      }
    };
    loadBlockchainData(props.dispatch);
  }, [props.dispatch]);

  return (
    <div>
      <Navbar />
      {props.contractsLoaded ? (
        <Content />
      ) : (
        <div className='content'></div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contractsLoaded: contractsLoadedSelector(state),
  };
};

export default connect(mapStateToProps)(App);
