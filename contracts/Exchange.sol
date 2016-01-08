contract VEX {
    struct Listing {
        address venture;
        string name;
        uint sharesOutstanding;
        address[] shareholders;
        uint listedDate;
        uint index;
    }
    
    mapping(address => Listing) public listed;
    address[] public index;
    uint public length;
    
    function List(address _venture, string _name, uint _shares, address[] _shareholders) returns (bool){
        listed[_venture].venture = _venture;
        listed[_venture].name = _name;
        listed[_venture].sharesOutstanding = _shares;
        listed[_venture].shareholders = _shareholders;
        listed[_venture].listedDate = now;
        listed[_venture].index = index.length;
        index.push(_venture);
        length = index.length;
        return true;
    }
    
    
    function getVenture(address _venture) returns (string, uint, uint){
        if(listed[_venture].venture == 0x0)
            throw;
        string name = listed[_venture].name;
        uint shares = listed[_venture].sharesOutstanding;
        uint index = listed[_venture].index;
        return (name, shares, index);
    }
    
    function UpdateListing(address[] shareholders){}
    
}

contract Exchange is VEX {
    struct Bid {
        address bidder;
        uint shares;
        uint price;
        bytes32 denomination;
    }
    
    function Exchange(){}
    
    
}

contract Equity is Exchange {
    function Equity(){}
    
    struct Shareholder {
        address account;
        uint shares;
    }
    
    mapping(address => Shareholder) public shareholder;
    address[] public shareholders;
}

contract Venture is Equity {
    function Venture(){}
    
    address public venture = address(this);
    function list() returns (bool){
        uint initialShares = 112358132134;
        shareholders.push(venture);
        shareholder[venture].account = venture;
        shareholder[venture].shares = initialShares;
        return List(venture, "TEST", initialShares, shareholders);
    }
}