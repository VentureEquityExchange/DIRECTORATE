contract Bylaws {

    struct ByLawsConfig {
        mapping(bytes32 => uint) value;
        bytes32[] items;
    }

    ByLawsConfig bylaws;
    address public DAV;

    function Bylaws(){
        DAV = msg.sender;

        bylaws.value["ORT"] = (100 * 67/100); // 67%
        bylaws.value["EORT"] = (100 * 90/100); // 90%
        bylaws.value["ORL"] = 5;
        bylaws.value["equalWeighted"] = 1;
        bylaws.value["resolutionPeriod"] = 2 weeks;

        bylaws.items.push("ORT");
        bylaws.items.push("EORT");
        bylaws.items.push("ORL");
        bylaws.items.push("equalWeighted");
        bylaws.items.push("resolutionPeriod");
    }

    function getValue(bytes32 item) public returns(uint){
        return bylaws.value[item];
    }

    function getBylaws() public returns(bytes32[]){
        return bylaws.items;
    }

    function returnValue(bytes32 item) public returns (uint){
        return bylaws.value[item];
    }

    function setValue(bytes32 item, uint value) public returns (bool){
        if(msg.sender != DAV){
            throw;
        } else {
            bylaws.value[item] = value;
            return true;
        }
    }



}
