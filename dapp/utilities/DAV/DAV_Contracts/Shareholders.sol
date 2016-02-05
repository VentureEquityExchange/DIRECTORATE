contract Shareholders {
    struct DAVContracts {
        address DAV;
    }

    struct PurchaseOrder {
        uint price;
        uint shares;
        uint date;
    }

    struct SaleOrder {
        uint price;
        uint shares;
        uint date;
    }

    struct Shareholder {
        address account;
        uint sharesHeld;
        PurchaseOrder[] buys;
        SaleOrder[] sells;
    }

    DAVContracts public contracts;
    mapping(address => Shareholder) public shareholders;
    address[] internal currentShareholders;
    address[] public allShareholders;

    // Initial Shares For DAV; Can be raised later, but at the effect of diluting shareholders;
    // More to come on this....
    // For now, lets hook up our components...

    uint public internalShares = 1000000;

    function Shareholders(){
        contracts.DAV = msg.sender;
        shareholders[msg.sender].account = msg.sender;
        shareholders[msg.sender].sharesHeld = internalShares;


        currentShareholders.push(msg.sender);
        allShareholders.push(msg.sender);
    }

    function getSharesHeld(address _a) returns (uint){
        return shareholders[_a].sharesHeld;
    }

    function getCurrentShareholders() public returns (address[]){
        currentShareholders.length = 0;
        uint len = allShareholders.length;
        for(uint i = 0; i < len; i++)
            if(shareholders[allShareholders[i]].sharesHeld > 0)
                currentShareholders.push(allShareholders[i]);
        return currentShareholders;
    }

    function transferOwnership(uint amount, address from, address to) public returns (bool){
        if(shareholders[from].sharesHeld < amount)
            throw;
        shareholders[from].sharesHeld -= amount;
        shareholders[to].sharesHeld += amount;
        if(shareholders[to].account == 0x0)
            shareholders[to].account = to;
            allShareholders.push(to);
        return true;
    }

    modifier isShareholder { if (shareholders[msg.sender].account != 0x0 && shareholders[msg.sender].sharesHeld == 0) throw; _ }
}
