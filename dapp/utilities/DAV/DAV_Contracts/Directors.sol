import "Shareholders.sol";
import "Bylaws.sol";

contract Directors {
    struct DAVContracts {
        address DAV;
        address Bylaws;
        address Shareholders;
    }

    struct Director {
      address director;
      string name;
    }

    mapping(address => Director) public directors;
    DAVContracts public contracts;

    function Directors(address bylaws, address shareholders, address[] _directors){
        contracts.DAV = msg.sender;
        contracts.Bylaws = bylaws;
        contracts.Shareholders = shareholders;

        for(uint i = 0; i < _directors.length; i++){
          directors[_directors[i]].director;
        }
    }

}
