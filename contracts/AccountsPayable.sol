import "FinancialStatements.sol";

contract AccountsPayable is FinancialStatements {
    struct Payee {
        address account;
        bytes32 role; // owner, employee, vendor, etc...
        
    }
    
    mapping(address => Payee) public payables;
    
    function AccountsPayable() {
        
    }
}