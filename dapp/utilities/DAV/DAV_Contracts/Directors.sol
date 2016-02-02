import "Shareholders.sol";
import "Bylaws.sol";

contract Directors {
    struct DAVContracts {
        address DAV;
        address Bylaws;
        address Shareholders;
    }

    DAVContracts public contracts;

    function Directors(address bylaws, address shareholders){
        contracts.DAV = msg.sender;
        contracts.Bylaws = bylaws;
        contracts.Shareholders = shareholders;
    }

}
