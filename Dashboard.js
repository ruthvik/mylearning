$(document).ready(function(){

    function randomRangeWithIncrements(min, max, inc) {
        min = min || 0;
        inc = inc || 1;
        if(!max) { return new Error('need to define a max');}
    
        return Math.floor(Math.random() * (max - min) / inc) * inc + min;
    }
    var oTileNumeric = document.getElementsByClassName('count');
    setInterval(function(){
   for(let i=0;i<oTileNumeric.length;i++)
   {
    var oCurrencyValue = randomRangeWithIncrements(50, 150, 2);
    oTileNumeric[i].innerText = oCurrencyValue;
   }

},1000);


$.ajax({url: "LiveTradeData.json", success: function(result){
   console.log(result);
//setInterval(function(){
    
    // for(let i=0;i<result.length;i++)
    // {
   $('#table').DataTable( {
    data: result,
    columns: [
        { "data": "Time" },
        { "data": "Currencies" },
        { "data": "Rate" },
        {"data": "Type"},
        {"data": "Fradulant"},
        {"data": "OrderValue"},
        {"data": "TotalAmount"}
      
    ]
} );

var OrderType = document.querySelectorAll("table tbody tr td:nth-child(4)");
var oFradulantCheck = document.querySelectorAll("table tbody tr td:nth-child(3)");
var oFradulantValue = document.querySelectorAll("table tbody tr td:nth-child(5)");
var oValue = document.querySelectorAll("table tbody tr td:nth-child(6)");
var oTotalAmount = document.querySelectorAll("table tbody tr td:nth-child(7)");
for(let i=0;i<OrderType.length;i++)
{
    var oColor = OrderType[i].innerText == "Sell"? "red": "green";
    OrderType[i].style.color = oColor;
}
for(let i=0;i<oFradulantCheck.length;i++)
{
    var oCheck = Number(oFradulantCheck[i].innerText)>100 ? "Yes": "No";
    oTotalAmount[i].innerText = oFradulantCheck[i].innerText * oValue[i].innerText;
    if(oCheck == "Yes")
    {
    oFradulantValue[i].innerText = oCheck;
    oFradulantValue[i].style.color = "red";
    oFradulantValue[i].addEventListener('click',function(e)
    {
        let otableId = document.getElementById('table');
        otableId.deleteRow(e.target.parentNode);
    });
    }
    else{
        oFradulantValue[i].innerText = oCheck;
    }
}
   // }
//},3000);
  }});


});

