//var vCardsJS = require('vcards-js');
// function displayPaymentInfo() {
//   //displays payment info including wallet link and qr code to user based off their input and the cointext api
//   var phoneNumber = document.getElementById("phoneNumber").value;
//   var errorField = document.getElementById("error");
//   var amount = document.getElementById("amount").value;
//   var QRCodeImage = document.getElementById("QRCode");
//   var scanMessage = document.getElementById("scanMessage");
//   var openWallet = document.getElementById("openInWallet");
//
//
//   if (phoneNumber.toString()[0] == "+") {
//     phoneNumber = phoneNumber.slice(1);
//   }
//
//   //Check that both fields are populated.
//   if (!(amount && phoneNumber)) {
//     errorField.innerHTML = "Please fill in both fields.";
//     setTimeout(function() {
//       document.getElementById("error").innerHTML = "";
//     }, 5000);
//   } else if (isNaN(phoneNumber)) {
//     errorField.innerHTML = "Please only enter numbers with no spaces into telephone number field.";
//     setTimeout(function() {
//       document.getElementById("error").innerHTML = "";
//     }, 5000);
//   } else if (isNaN(amount)) {
//     errorField.innerHTML = "Please only enter number into the amount field.";
//     setTimeout(function() {
//       document.getElementById("error").innerHTML = "";
//     }, 5000);
//   } else {
//     var errorFree = true; //to remove need to code rest of the function indented under this else {}
//   }
//
//   if (!errorFree) {
//     return; //the following code will only run if no errors above were detected
//
//   }
var phoneNumber = 0;
var bchAddress = "bitcoincash:qpamktwakukx236jsynwg7df4c53wrhlssqm7sragn";
var currencyUnit = "USD";
var decimalPlaces = 2;
var runningTotal = 0;

// document.onload="tBCHStartFunction()";

function tBCHStartFunction() {
  console.log("Start Function");
  getUrlData(location.href);
}

function getUrlData(str) {
  //var str=location.href;
  str = str.split("?");
  if (str[1]) {
    str = str[1].split("&");
    var obj = {};
    for (var i = 0; i < str.length; i++) {
      var p = str[i].split("=");
      var q = p[0];
      var r = p[1];
      obj[q] = r;
    }
    //console.log(obj);
    if ((obj.phone) || (obj.address)) {
      phoneNumber = obj.phone;
      bchAddress = obj.address;

      if (obj.currency) {
        currencyUnit = obj.currency;
        document.getElementById('pay-button').setAttribute("amount-type", currencyUnit);

        if (!(currencyUnit == "USD" || currencyUnit == "BCH")) {
          var opt = document.createElement('option');
          opt.value = currencyUnit;
          opt.innerHTML = currencyUnit;
          document.getElementById('currency').appendChild(opt);
        }
        document.getElementById('currency').value = currencyUnit;
      }
      //if true, then
      if (obj.decimal) {
        decimalPlaces = obj.decimal;
      }
      openKeypad();
      //console.log(phoneNumber);
    }
    //return obj;
  } else {
    console.log("No opening URL parameters found");
  }

  //console.log(obj);
  //getUrlData("https://bzerb.com/?one=uno&two=dos&three=tres");

}
//var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks on the button, open the modal
// function openMyModal() {
//   document.getElementById("myModal").style.display = "block";
//   console.log("button clicked");
// }
//
// // When the user clicks on <span> (x), close the modal
// function closeMyModal() {
//   document.getElementById("myModal").style.display = "none";
// }

function changeCountryCode() {
  //console.log("changeCountryCode()");
  var cCode = prompt("Please Enter Country Code:", "+");
  document.getElementById('customCode').innerHTML = cCode;
  document.getElementById('customCode').value = cCode;

}

function submitTel() {
  var num = document.getElementById("countryCode").value + document.getElementById("phoneInput").value;
  num = num.split('');
  var num2 = [];
  for (var i = 0; i < num.length; i++) {
    num[i] = parseInt(num[i]);
    if (!(isNaN(num[i]))) {
      num2.push(num[i]);
    }
  }
  var num3 = 0;
  for (var i = 0; i < num2.length; i++) {
    num3 *= 10;
    num3 += num2[i];
  }
  //console.log(num3);
  //phoneInput=num3;
  window.open(location.href + "?phone=" + num3, "_self")
}

function openKeypad() {
  document.getElementById("keypadWindow").style.display = "block";
  updateKeypad();
}

function keyPress(keyInput) {
  switch (keyInput) {
    case -2: {
      runningTotal = 0;
      updateKeypad();
    }
    break;
  case -1: {
    runningTotal /= 10;
    runningTotal = (Math.trunc(runningTotal * Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces);
    // runningTotal-=(keyInput*=0.01);
    updateKeypad();
  }
  break;
  default: {
    runningTotal *= 10;
    runningTotal += (keyInput *= Math.pow(10, -decimalPlaces));
    updateKeypad();
  }

  }
}

function updateKeypad() {
  document.getElementById("numberAreaParagraph").innerHTML = runningTotal.toFixed(decimalPlaces);
  document.getElementById("pay-button").setAttribute("amount", runningTotal.toFixed(decimalPlaces));
}

function changeCurrency() {
  var currency = document.getElementById("currency").value;
  if (currency == "custom") {
    currency = prompt("Enter a custom currency ticker:");
    currency = currency.toUpperCase();
  }
  var url = location.href;
  if (url.indexOf("&currency=") >= 0) {
    var myURL = url.replace("&currency=" + currencyUnit,"");
    url=myURL;
  }
  window.open(url + "&currency=" + currency);
}

function goToHomePage() {
  //replace this with standard link when site is live.
  window.open(location.origin);
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     document.getElementById("myModal").style.display = "none";
//   }
// }
//var saveNumberToContacts = document.getElementById('saveNumberToContacts').checked;
//if (saveNumberToContacts) {
//$(".enterName").css("display", "block");
//}

//   bchAmount = getBCHAmount();
//   var url = "https://pay.cointext.io/p/" + phoneNumber + "/" + (bchAmount * 100000000).toString();
//   console.log(url);
//
//   QRCodeImage.src = url;
//   openWallet.href = "bitcoincash:?r=" + url;
//   QRCodeImage.style.display = "block";
//   scanMessage.style.display = "block";
//   openWallet.style.display = "block";
//
// }
//
// function saveContact() {
//   console.log("SaveContact function started. . .");
//   number = phoneNumber.value;
//
//   window.open("tel:"+number);
//   // var firstName = document.getElementById('firstName').value;
//   //
//   // console.log(firstName + " + " + phoneNumber);
//
//   // var coinTextAvatar = "PHOTO;ENCODING=BASE64;PNG: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
//   // ";
//
//   // var blob = new Blob(
//   //     ["BEGIN:VCARD\n"+
//   //       "VERSION: 3.0\n"+
//   //       "N: Cointext;"+firstName+";;;\n"+
//   //       "FN:"+firstName+" Cointext\n"+
//   //       "TEL;TYPE=CELL:"+phoneNumber+"\n"+
//   //       /*coinTextAvatar+*/
//   //       "END:VCARD"
//   //     ], {type: "text/directory; charset = iso-8859-1 profile = vcard"});
//
//   //       var vCardsJS = require('vcards-js');
//
//   //create a new vCard
//   // var contact = vCard();
//   //
//   // // //set properties
//   // contact.firstName = firstName;
//   // contact.lastName = 'Cointext';
//   // contact.cellPhone = phoneNumber;
//   // contact.saveToFile('./contact.vcf');
//   //saveAs(blob, 'contact.vcf');
// }
//
// function getBCHAmount() {
//   //Returns BCH value of amount of currency specified in amount field based off exchange rate between selected currencyMenu currency and BCH
//   var currencyMeny = document.getElementById("currencyMenu");
//   var amount = document.getElementById("amount").value;
//   var selectedCurrency = currencyMeny.options[currencyMeny.selectedIndex].value
//
//   if (selectedCurrency == "bch") {
//     var exchangeRate = 1;
//   } else if (selectedCurrency == "usd") {
//     var req = new XMLHttpRequest();
//     const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=USD';
//     req.open('GET', url, false);
//     req.send(null);
//     var jsonResponse = JSON.parse(req.responseText);
//     var exchangeRate = 1 / jsonResponse["bitcoin-cash"]["usd"];
//   }
//
//   return exchangeRate * amount; //returns BCH value of the currency speified by user
// }
