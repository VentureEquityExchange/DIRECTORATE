contract Venture {
    
    string public name;
    address[] public directors;
    
    function Venture(string _name){
        name = _name;
        directors.push(msg.sender);
    }
    
}