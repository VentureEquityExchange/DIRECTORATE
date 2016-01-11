contract VenturesIndex {
    address[] public index;
    
    function AddVenture(address venture) public returns (bool){
        index.push(venture);
        return true;
    }
}
