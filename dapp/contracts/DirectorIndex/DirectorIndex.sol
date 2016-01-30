contract DirectorIndex {
    struct Director {
        address director;
        address[] ventures;

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

    function NewDirector() public returns(bool){
        if(Directors[msg.sender].director != 0x0){
            throw;
        } else {
            Directors[msg.sender].director = msg.sender;
            return true;
        }
    }

    function AddVenture(address venture) public returns(bool){
        if(Directors[msg.sender].director == 0x0){
            return false;
        } else {
            for(uint i = 0; i < Directors[msg.sender].ventures.length; i++){
                if(Directors[msg.sender].ventures[i] == venture){
                    throw;
                }
            }
        }

        Directors[msg.sender].ventures.push(venture);
        return true;
    }

    function GetVentures() public returns(address[]){
        return Directors[msg.sender].ventures;
    }
}
