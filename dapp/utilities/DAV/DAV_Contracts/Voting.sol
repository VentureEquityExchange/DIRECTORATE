import "Bylaws.sol";
import "Shareholders.sol";
import "Directors.sol";

contract Voting {
    struct DAVContracts {
        address DAV;
        address Bylaws;
        address Directors;
        address Shareholders;
        address Exchange;
    }

    DAVContracts public contracts;

    function Voting(address bylaws, address shareholders,  address directors){
        contracts.DAV = msg.sender;
        contracts.Bylaws = bylaws;
        contracts.Shareholders = shareholders;
        contracts.Directors = directors;
    }


}
