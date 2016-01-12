contract Venture {
    
    string public name;
    address[] public directors;
    bytes32 public industry;
    
    function Venture(string _name, bytes32 _industry){
        name = _name;
        industry = _industry;
        directors.push(msg.sender);
    }
    
}