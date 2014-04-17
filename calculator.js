// 'use strict;'

var calculatorState = {
	currentValue: '',
	previousValue: '',
	pendingOperation: ''
};

var decimalOn = false;
var newOperation = false;


window.calculatorApp = {

	clickDigit: function(digit){
		if(digit !== 0 || calculatorState.currentValue) {
			calculatorState.currentValue += digit;
		}
			display.value = calculatorState.currentValue;
	},

	clickOperator: function(op){
		if(!calculatorState.pendingOperation){
			calculatorState.pendingOperation = op;
			calculatorState.previousValue = calculatorState.currentValue;
			calculatorState.currentValue = '';
		}
		else{
			this.clickEquals();
		}
	},

	clickEquals: function(){
		if(calculatorState.pendingOperation === '+'){
			var result = parseInt(calculatorState.previousValue) + parseInt(calculatorState.currentValue);
			display.value = result;
			calculatorState.currentValue = '';
			calculatorState.pendingOperation = '';


		}
	},

	clickDecimal: function(digit){
		if(!decimalOn){
			if(calculatorState.currentValue.substr(-1) !== '.'){
				calculatorState.currentValue += digit;
			}
			display.value = calculatorState.currentValue;
			decimalOn = true;			
		}

	},

	clickClear: function(){
		display.value = '0';
		calculatorState.currentValue = '';
		calculatorState.pendingOperation = '';
	},

	clickClearEntry: function(){
		calculatorState.currentValue = '';
		display.value = '0';

	}
}