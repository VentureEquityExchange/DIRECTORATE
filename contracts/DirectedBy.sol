/*
Establish control of the Venture via a derived 'DirectedBy' contract;
The constructor function provides the ability for a director to be set 
at time of deployment; However, none may need to be set.

The DirectedBy contract is included in the Venture bytecode, address(this) is inherited
by Venture;

address(this) == Decentralized Autonomous Venture's address;
the Venture has the self-autonomy to engage with `isDirector` modified functions;


*/
contract DirectedBy {
    struct Director {
        string name;
        address account;
        bytes32 role;
        uint ownership;
    }
    
    mapping(address => Director) public directors;
    address public DAV;
    address public Founder;
    
    event directorsAmended(string _n, address _a, bytes32 _r);
    
    function DirectedBy() {
        
        /* Founder is partner in DAV */
        Founder = msg.sender;
        directors[Founder].name = "Founder";
        directors[Founder].account = Founder;
        directors[Founder].role = "founder";
        
        
        /* DAV is initial owner */
        DAV = address(this);
        directors[DAV].name = "DAV";
        directors[DAV].account = DAV;
        directors[DAV].role = "DAV";
        directors[DAV].ownership = 100;
    }
    
    function amendDirector(string _name, address _account, bytes32 _role) isDirector returns (bool){
        if(_account == 0x0)
            return false;
        directors[_account].name = _name;
        directors[_account].account = _account;
        directors[_account].role = _role;
        directorsAmended(_name, _account, _role);
        return true;
    }
    
    
    modifier isDirector { if (directors[msg.sender].account != 0x0) _ }
    modifier isComptroller { if (directors[msg.sender].role == "comptroller") _ }
    modifier isFounder { if (directors[msg.sender].account == Founder) _ }
    modifier isDirectorate { if (directors[msg.sender].role == "directorate") _ }
}

//

contract Venture is DirectedBy {
    address public founder = msg.sender;
    function Venture(){}
    
    function addDirector(string _n, address _a, bytes32 _r) returns (bool){
        return amendDirector(_n, _a, _r);
    }
    
}