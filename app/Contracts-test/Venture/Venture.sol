contract Venture {
    address[] public directors;
    
    function Venture(){
        directors.push(msg.sender);
    }
    
}