contract Bylaws {

    struct ByLawsConfig {
        uint ORT;
        uint EORT;
        uint ORL;
        bool equalWeighted; // default is true; false == shareWeighted;
        uint resolutionPeriod;
        address DAV;
    }

    ByLawsConfig public bylaws;

    function Bylaws(){
        bylaws.ORT = (100 * 67/100); // 67%
        bylaws.EORT = (100 * 90/100); // 90%
        bylaws.ORL = 5;
        bylaws.equalWeighted = true;
        bylaws.resolutionPeriod = 2 weeks;
        bylaws.DAV = msg.sender;
    }

    function setORT(uint percentage) internal returns (bool){
        bylaws.ORT = (100 * percentage / 100);
        return true;
    }

    function setEORT(uint percentage) internal returns (bool){
        bylaws.EORT = (100 * percentage / 100);
        return true;
    }

    function setWeighting(bool equalWeighted) internal returns (bool){
        bylaws.equalWeighted = equalWeighted;
        return true;
    }

    function setORL(uint limit) internal returns (bool){
        bylaws.ORL = limit;
        return true;
    }

    function setRP(uint period) internal returns (bool){
        bylaws.resolutionPeriod = period;
        return true;
    }

    function DAV() public returns (address){
        return bylaws.DAV;
    }

}
