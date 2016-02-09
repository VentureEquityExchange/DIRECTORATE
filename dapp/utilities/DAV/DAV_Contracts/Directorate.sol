import "Bylaws.sol";
import "Shareholders.sol";
import "Directors.sol";
import "Voting.sol";

contract Directorate {
    struct DAVContracts {
        address BylawsContract;
        address ShareholdersContract;
        address DirectorsContract;
        address ExchangeContract;
        address VotingContract;
    }

    struct Venture {
        string Name;
        address DAV;
    }

    Venture public venture;
    DAVContracts public contracts;

    function Directorate(string _name, address[] _directors, string _directorName){
        venture.Name = _name;
        venture.DAV = address(this);

        contracts.BylawsContract = new Bylaws();

        contracts.ShareholdersContract = new Shareholders();

        contracts.DirectorsContract = new Directors(
            _directorName,
            msg.sender,
            Bylaws(contracts.BylawsContract),
            Shareholders(contracts.ShareholdersContract),
            _directors);

        contracts.VotingContract = new Voting(
          Bylaws(contracts.BylawsContract),
          Shareholders(contracts.ShareholdersContract),
          Directors(contracts.DirectorsContract));

    }

    function callVote(string proposal, bool EOR, bytes32 voteItem, bytes32 proposedValue, bytes32 currentValue) {
      Voting(contracts.VotingContract).NewResolution(msg.sender, proposal, EOR, voteItem, proposedValue, currentValue);
      /*if(!Directors(contracts.DirectorsContract).isDirector(msg.sender)){
          throw;
      } else {

      }*/
    }

}
