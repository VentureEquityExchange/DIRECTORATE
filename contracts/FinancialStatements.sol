contract FinancialStatements {
    

    // General data object for financial statement entries

    struct Entry {
        bytes32 item; // used to map entries to statements; e.g. revenue, costs
        uint value;
        string note;
        string denomination;
        uint dated;
        address account;
        // more entries to map;
    }
    
    struct IS { 
        uint created;
        uint published;
        Entry [] Revenue;
        Entry [] CostOfSales;
        // Entry [] GrossProfit; => Calculate
        Entry [] OtherIncome;
        Entry [] DistributionCosts;
        Entry [] AdministrativeExpenses;
        Entry [] OtherExpense;
        Entry [] FinanceCosts;
        // Entry [] ProfitBeforeTax; => Calculate
        Entry [] IncomeTaxExpense;
        // Entry [] ProfitForTheYear; => Calculate
        Entry [] BeginningRetainedEarnings;
        Entry [] DividendsPaids;
        Entry [] EndingRetainedEarnings;
        
    }
    
    struct CF {
        uint created;
        uint published;
        Entry [] Operating;
        Entry [] Investing;
        Entry [] Financing;
    }

    struct FP {
        uint created;
        uint published;
        Entry [] CurrentAssets;
        Entry [] NonCurrentAssets;
        Entry [] CurrentLiabilities;
        Entry [] NonCurrentLiabilities;
        Entry [] RetainedEarnings;
    }

    mapping(uint => IS) public IncomeStatements;
    mapping(uint => CF) public CashFlowStatements;
    mapping(uint => FP) public FinancialPositionStatements;
    uint [] public Reports;
    uint public currentReport;
    
    event NewEntry(bytes32 _i, uint _v, string _n, string _denom, uint _date, address _a);
    
    
    function FinancialStatements() {
        currentReport = now;
        Reports.push(currentReport);
        
        // constructor function creates respective financial statements;
        
        IncomeStatements[currentReport].created = currentReport;
        CashFlowStatements[currentReport].created = currentReport;
        FinancialPositionStatements[currentReport].created = currentReport;
    }

    function PublishReports() returns (bool){
        // Date period of current statement;
        // Create new statement;

        uint published = now;
        IncomeStatements[currentReport].published = published;
        CashFlowStatements[currentReport].published = published;
        FinancialPositionStatements[currentReport].published = published;

        // Create new report on publish;
        // Maybe a call to this; this.call.FinancialStatements(); 
        // Repeat the constructor function;
        
        currentReport = now;
        Reports.push(currentReport);
        IncomeStatements[currentReport].created = currentReport;
        CashFlowStatements[currentReport].created = currentReport;
        FinancialPositionStatements[currentReport].created = currentReport;
        return true;
    }

    function GetEntry(uint _index) returns (bytes32 _i, uint _v, string _n, string _denom, uint _date, address _account){
        Entry e = IncomeStatements[currentReport].Revenue[_index];
        return (e.item, e.value, e.note, e.denomination, e.dated, e.account);
    }


    function SubmitEntry(bytes32 _item, uint _value, string _note, string _denomination) returns(bool) {
        uint _dated = now;
        NewEntry(_item, _value, _note, _denomination, _dated, msg.sender);
        // Example if entry is revenue;

        /*

        if(_item == "revenue" || _item == "asset")

        if(_item == "cost" || _item = "")

        if(_item == "asset")

        if(_item == "liability")
                
        
        */

        // Income Entries

        IncomeStatements[currentReport].Revenue.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        IncomeStatements[currentReport].CostOfSales.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        
        // Calculate this;
        // IncomeStatements[currentReport].GrossProfit.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));

        IncomeStatements[currentReport].OtherIncome.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));        
        IncomeStatements[currentReport].DistributionCosts.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));    
        IncomeStatements[currentReport].AdministrativeExpenses.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));        
        IncomeStatements[currentReport].OtherExpense.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        IncomeStatements[currentReport].FinanceCosts.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        
        
        // Calculate this;
        // IncomeStatements[currentReport].ProfitBeforeTax.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        
        IncomeStatements[currentReport].IncomeTaxExpense.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        
        // Calculate this;
        // IncomeStatements[currentReport].ProfitForTheYear.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        IncomeStatements[currentReport].BeginningRetainedEarnings.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        IncomeStatements[currentReport].DividendsPaids.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        IncomeStatements[currentReport].EndingRetainedEarnings.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));

        // Cash Flow Entries


        CashFlowStatements[currentReport].Operating.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        CashFlowStatements[currentReport].Investing.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        CashFlowStatements[currentReport].Financing.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));


        // Financial Position Entries;

        FinancialPositionStatements[currentReport].CurrentAssets.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        FinancialPositionStatements[currentReport].NonCurrentAssets.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        FinancialPositionStatements[currentReport].CurrentLiabilities.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        FinancialPositionStatements[currentReport].NonCurrentLiabilities.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        FinancialPositionStatements[currentReport].RetainedEarnings.push(Entry({item : _item, value: _value, note: _note, denomination: _denomination, dated : _dated, account : msg.sender}));
        return true;
    } 
      
}
