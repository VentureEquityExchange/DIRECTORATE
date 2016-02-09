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

    struct Vote {
        address voter;
        bool decision;
        uint dateVoted;
    }

    struct Resolution {
        address proposedBy;
        uint dateProposed;
        uint dateClosed;
        string proposal;
        Vote[] votes;
        bool EOR;
        bool result;
        bool closed;
        bytes32 voteItem; // "ORT"
        bytes32 proposedValue;
        bytes32 currentValue;
    }

    mapping(uint => Resolution) public resolutions;
    uint[] public openResolutions;
    uint[] public allResolutions;

    uint internal yes;
    uint internal no;

    DAVContracts public contracts;

    function Voting(address bylaws, address shareholders,  address directors){
        contracts.DAV = msg.sender;
        contracts.Bylaws = bylaws;
        contracts.Shareholders = shareholders;
        contracts.Directors = directors;
    }

    function NewResolution(address proposedBy, string proposal, bool EOR, bytes32 voteItem, bytes32 proposedValue, bytes32 currentValue) public returns(bool){
        uint dateProposed = now;
        allResolutions.push(dateProposed);

        resolutions[dateProposed].dateProposed = dateProposed;
        resolutions[dateProposed].proposedBy = proposedBy;
        resolutions[dateProposed].proposal = proposal;
        resolutions[dateProposed].EOR = EOR;
        resolutions[dateProposed].closed = false;
        resolutions[dateProposed].voteItem = voteItem;
        resolutions[dateProposed].proposedValue = proposedValue;
        resolutions[dateProposed].currentValue = currentValue;

        return true;

        /*if(msg.sender != contracts.DAV){
            throw;
        } else if(openResolutions.length == Bylaws(contracts.Bylaws).returnValue(bytes32("ORL"))){
            // If ORL is reached; throw the NewResolution and return funds.
            throw;
        } else {

        }*/

    }

    function GetResolution(uint R) public returns(address, uint, uint, string, bool, bool, bool, bytes32, bytes32, bytes32){
      Resolution r = resolutions[R];
      return (r.proposedBy, r.dateProposed, r.dateClosed, r.proposal, r.EOR, r.result, r.closed, r.voteItem, r.proposedValue, r.currentValue);

    }

    function GetAllResolutions() public returns(uint[]){
      return allResolutions;
    }


}
