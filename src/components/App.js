import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import bet from '../abis/bet.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  
  async loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = bet.networks[networkId]
    if (networkData) {
      const Bet = web3.eth.Contract(bet.abi, networkData.address)
      console.log(networkData.address)
      this.setState({ Bet })
      // const owner = await Bet.methods.owna().call()
      // const totalBets = await Bet.methods.totalBetMoney().call()
      // const team1Bets = await Bet.methods.getTotalBetAmount("0").call()
      // const team2Bets = await Bet.methods.getTotalBetAmount("1").call()
      // console.log(owner.toString())
      // console.log(totalBets.toString())
      // console.log(team1Bets.toString())
      // console.log(team2Bets.toString())

      this.setState({ loading: false })

    } else {
      window.alert("Bet contract not deployed to detected network")
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      totalBetMoney: 0,
      loading: true,
    }

    this.createBet = this.createBet.bind(this)
    this.teamWinDistribution = this.teamWinDistribution.bind(this)

  }

  async teamWinDistribution(teamId) {
    this.setState({ loading: true })
    var totalBets = await this.state.Bet.methods.totalBetMoney().call()
    totalBets = Number(totalBets)

    this.state.Bet.methods.teamWinDistribution(teamId).send( { from: this.state.account, value: window.web3.utils.toBN(totalBets)})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  createBet(name, teamId, betAmount) {
    this.setState({ loading: true })
    this.state.Bet.methods.createBet(name, teamId).send( { from: this.state.account, value: betAmount})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading 
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main createBet = {this.createBet} teamWinDistribution = {this.teamWinDistribution} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
