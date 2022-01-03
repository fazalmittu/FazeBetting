// import React, { Component } from 'react';
// import gsw from '../gsw.png';
// import bkn from '../bkn.png';

// class Main extends Component {

//   render() {
//     return (
        
//       <div id="content">

//         <div className="container-fluid mt-5">
//           <div className="row">
//             <main role="main">
//                 <h1>Place Bet</h1>
//             </main>
//           </div>
//         </div>
        

//         <form onSubmit={(event) => {
//           event.preventDefault()
//           const name = this.productName.value
//           const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
//           this.props.createProduct(name, price)
//         }}>
//           <div className="form-group mr-sm-2">
//             <input
//               id="productName"
//               type="text"
//               ref={(input) => { this.productName = input }}
//               className="form-control"
//               placeholder="Name"
//               required />
//           </div>
//           <div className="form-group mr-sm-2">
//             <input
//               id="productPrice"
//               type="text"
//               ref={(input) => { this.productPrice = input }}
//               className="form-control"
//               placeholder="Team [0/1]"
//               required />
//           </div>
//           <button type="submit" className="btn btn-primary">Add Product</button>
//         </form>
        
//         <h1>Current Bets</h1>
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">Team</th>
//               <th scope="col">Total Bets</th>
//               <th scope="col"></th>
//             </tr>
//           </thead>
//           <tbody id="productList">
//             <tr>
//               <th scope="row"> Warriors </th>
//               <td>1 ETH</td>
//             </tr>
//             <tr>
//               <th scope="row"> Nets </th>
//               <td>3 ETH</td>
//             </tr>
//           </tbody>
//         </table>


//       </div>
        
      
//     );
//   }
// }

import React, { Component } from 'react';
import bet from '../abis/bet.json'
import Web3 from 'web3'


import gsw from '../gsw.png';
import bkn from '../bkn.png';


class Main extends Component {

    // async componentWillMount() {
    //     await this.loadBlockchainData();
    // }

    // async loadBlockchainData() {
    //     const web3 = window.web3

    //     const accounts = await web3.eth.getAccounts()
    //     this.setState({ account: accounts[0] })

    //     const networkId = await web3.eth.net.getId()
    //     const networkData = bet.networks[networkId]
    //     if (networkData) {
    //         const Bet = web3.eth.Contract(bet.abi, networkData.address)
    //         this.setState({ Bet })
    //         this.setState({ loading: false })
    //     } else {
    //         window.alert("Bet contract not deployed to detected network")
    //     }

    // }

    render() {

        // let team0amt = this.getTotalBetAmount(0);
        // let team1amt = this.getTotalBetAmount(1);

        return (
        <div id="content">

            <h1>Place Bet</h1>
            
            <br></br>

            <form onSubmit={(event) => {
            event.preventDefault()

            // document.getElementById("betamt").innerHTML = this.getTotalBetAmount("0")

            const name = this.userName.value
            const team1 = this.team1.value.toString()
            // const team = window.web3.utils.toWei(this.team.value.toString(), 'Ether')
            const betAmount = window.web3.utils.toWei(this.betAmount.value.toString(), 'Ether')
            this.props.createBet(name, team1, betAmount)
            console.log(name)
            console.log(team1)
            console.log(betAmount)
            }}>
            <div className="form-group mr-sm-2">
                <input
                id="userName"
                type="text"
                ref={(input) => { this.userName = input }}
                className="form-control"
                placeholder="Your Name"
                required />
            </div>
            <div className="form-group mr-sm-2">
                <input
                id="team1"
                type="text"
                min="0"
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                }}
                ref={(input) => { this.team1 = input }}
                className="form-control"
                placeholder="Team ID [ 0/1 ]"
                required />
            </div>
            <div className="form-group mr-sm-2">
                <input
                id="team1"
                type="text"
                min="0"
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                }}
                ref={(input1) => { this.betAmount = input1 }}
                className="form-control"
                placeholder="Bet Amount in Ether"
                required />
            </div>
            <button type="submit" className="btn btn-primary">Place Bet</button>
            
            </form>
            <br></br>
            <br></br>

            <h1>Make Team Win</h1>

            <br></br>

            <form onSubmit={(event) => {
            event.preventDefault()
            const team = this.team.value
            console.log(team)
            this.props.teamWinDistribution(team)
            
            }}>
            <div className="form-group mr-sm-2">
                <input
                id="team"
                type="number"
                min="0"
                max="1"
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                }}
                ref={(input) => { this.team = input }}
                className="form-control"
                placeholder="Team ID [ 0/1 ]"
                required />
            </div>
            <button type="submit" className="btn btn-primary">Make Team Win [Only Owner]</button>
            </form>

            <br></br>
            <br></br>

            <h1>Current Teams</h1>
            <br></br>

            <table className="table">
                
            <thead>
                <tr>
                <th scope="col">Team ID</th>
                <th scope="col"></th>
                <th scope="col">Team</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                {/* <th scope="col">Total Bets</th> */}
                </tr>
            </thead>
            <tbody id="currentBets" >
                <tr>
                <th scope="row">0</th>
                <td></td>
                <td><img src={gsw} height="100px" /></td>
                <td></td>
                <td></td>
                <td></td>
                {/* <td id="betamt"> ETH</td> */}
                {/* <td><button className="buyButton">Buy</button></td> */}
                </tr>

                <tr>
                <th scope="row">1</th>
                <td></td>
                <td><img src={bkn} height="110px" /></td>
                <td></td>
                <td></td>
                <td></td>
                {/* <td>3 ETH</td> */}
                {/* <td><button className="buyButton">Buy</button></td> */}
                </tr>
            </tbody>
            </table>
        </div>
        );
    }
}

export default Main;