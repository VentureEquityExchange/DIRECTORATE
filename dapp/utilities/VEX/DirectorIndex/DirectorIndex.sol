contract DirectorIndex {

    struct Director {
        address director;
        address[] DAVs;

    }

    mapping(address => Director) public Directors;

    function DirectorIndex(){}

    function IsDirector() public returns(bool){
        if(Directors[msg.sender].director == 0x0){
            return false;
        } else {
            return true;
        }
    }

    function NewDirector(address _director, address DAV) public {
        if(Directors[_director].director != 0x0){
            throw;
        } else {
            Directors[_director].director = _director;
            Directors[_director].DAVs.push(DAV);
        }
    }

    function AddVenture(address DAV) public returns(bool){
        if(Directors[msg.sender].director == 0x0){
            Directors[msg.sender].director = msg.sender;
        } else {
            for(uint i = 0; i < Directors[msg.sender].DAVs.length; i++){
                if(Directors[msg.sender].DAVs[i] == DAV){
                    throw;
                }
            }
        }

        Directors[msg.sender].DAVs.push(DAV);
        return true;
    }

    function GetVentures(address _director) public returns(address[]){
        return Directors[_director].DAVs;
    }
}
