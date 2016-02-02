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

    function Directorate(string _name){
        venture.Name = _name;
        venture.DAV = address(this);

        contracts.BylawsContract = new Bylaws();
        contracts.ShareholdersContract = new Shareholders();
        contracts.DirectorsContract = new Directors(Bylaws(contracts.BylawsContract), Shareholders(contracts.ShareholdersContract));
        contracts.VotingContract = new Voting(
          Bylaws(contracts.BylawsContract),
          Shareholders(contracts.ShareholdersContract),
          Directors(contracts.DirectorsContract));

    }



}
