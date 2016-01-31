contract Directorate {
    struct Venture {
        string Name;
        address DAV;

        // The following keeps record of the individual component
        // addresses on the ethereum network for the DAV itself.
        address BylawsContract;
        address ShareholdersContract;
        address DirectorsContract;
        address ExchangeContract;
        address VotingContract;
    }

    Venture public venture;

    function Directorate(string _name){
        venture.Name = _name;
        venture.DAV = address(this);
        // Directorate creates DAV address => use DAV Address to instantiate other
        // contracts as the owner of the contract
    }

    function AddDAVContracts(
        address _bylaws,
        address _shareholders,
        address _directors,
        address _exchange,
        address _voting
    ) {
        venture.BylawsContract = _bylaws;
        venture.ShareholdersContract = _shareholders;
        venture.DirectorsContract = _directors;
        venture.ExchangeContract = _exchange;
        venture.VotingContract = _voting;
    }

    // will have more functions in addition to this. but for now let's start architecting our contract
    // layout...

}
