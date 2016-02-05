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
      bytes32 role;
      bool active;
    }

    mapping(address => Director) public directors;
    address[] public currentDirectors;
    DAVContracts public contracts;

    function Directors(string _directorName, address _directorAddress, address bylaws, address shareholders, address[] _directors){
        contracts.DAV = msg.sender;
        contracts.Bylaws = bylaws;
        contracts.Shareholders = shareholders;

        directors[_directorAddress].director = _directorAddress;
        directors[_directorAddress].name = _directorName;
        directors[_directorAddress].role = "Director";
        directors[_directorAddress].active = true;

        currentDirectors = _directors;
        currentDirectors.push(_directorAddress);

        for(uint i = 0; i < _directors.length; i++){
          directors[_directors[i]].director = _directors[i];
          directors[_directors[i]].role = "Director";
          directors[_directors[i]].active = true;
        }
    }

    function GetDirectors() public returns(address[]){
      return currentDirectors;
    }

    function GetDirector(address _director) public returns(address, string, bytes32, bool){
      return (directors[_director].director, directors[_director].name, directors[_director].role, directors[_director].active);
    }

    function SetDirector(address _director, string _name, bytes32 _role, bool _active){
      directors[_director].name = _name;
      directors[_director].role = _role;
      directors[_director].active = _active;
    }

}
