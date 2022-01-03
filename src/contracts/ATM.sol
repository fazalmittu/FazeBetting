pragma solidity 0.8.11;

contract ATM {

    mapping(address => uint) public balances;

    event Deposit(address sender, uint amount);
    event Withdrawal(address receiver, uint amount);
    event Transfer(address sender, address receiver, uint amount);

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value);
        balances[msg.sender] += msg.value;
    }

    function depositBro(uint val) public payable {
        emit Deposit(msg.sender, val*1000000000000000000);
        balances[msg.sender] += val*1000000000000000000;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit Withdrawal(msg.sender, amount);
        balances[msg.sender] -= amount;
    }

    function transfer(address receiver, uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit Transfer(msg.sender, receiver, amount);
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }

    // In a Batch

    function transfer(address[] memory receivers, uint amount) public {
        require(balances[msg.sender] >= receivers.length * amount, "Insufficient funds");
        for (uint i=0; i<receivers.length; i++) {
            emit Transfer(msg.sender, receivers[i], amount);
            balances[msg.sender] -= amount;
            balances[receivers[i]] += amount;
        }
    }
}