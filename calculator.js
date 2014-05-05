// 'use strict;'

/*$(document).ready(function(){
	$('.numButton').fadeOut('slow');
});*/

var calculatorState = {
	currentValue: '',
	previousValue: '',
	pendingOperation: ''
};

var decimalOn = false;

window.calculatorApp = {

	clickDigit: function(digit){
		if(digit !== 0 || calculatorState.currentValue) {
			calculatorState.currentValue += digit;
		}
			display.value = calculatorState.currentValue;
	},

	clickOperator: function(op){
		if(!calculatorState.pendingOperation && calculatorState.previousValue === ''){
			calculatorState.pendingOperation = op;
			calculatorState.previousValue = calculatorState.currentValue;
			calculatorState.currentValue = '';
			decimalOn = false;
		}
		else{
			calculatorState.pendingOperation = op;
			this.executeOp();
			calculatorState.currentValue = '';
			decimalOn = false;
		}
	},

	executeOp: function(){
		var previous = parseFloat(calculatorState.previousValue);
		var current = parseFloat(calculatorState.currentValue);
		if(calculatorState.previousValue === '' || calculatorState.currentValue === ''){
			display.value = 'ERROR';
		}
		else{
			switch(calculatorState.pendingOperation){
				case '+':
					calculatorState.previousValue = previous + current;
					break;
				case '-':
					calculatorState.previousValue = previous - current;
					break;
				case '*':
					calculatorState.previousValue = previous * current;
					break;
				case '/':
					calculatorState.previousValue = previous / current;
					break;
			}
		display.value = calculatorState.previousValue;
		}
	},

	clickEquals: function(){
		this.executeOp();
//		calculatorState.previousValue = '';
//		this.resetall();
		calculatorState.currentValue = calculatorState.previousValue;
		calculatorState.previousValue= '';
		calculatorState.pendingOperation = '';
	},

//	resetall: function(){
//		calculatorState.currentValue = '';
//		calculatorState.previousValue = '';
//		calculatorState.pendingOperation = '';
//		decimalOn = false;
//	},

	clickDecimal: function(digit){
		if(!decimalOn){
			if( (calculatorState.currentValue.substr(-1) !== '.') && (calculatorState.currentValue !== '') ){
				calculatorState.currentValue += digit;
			}
			else{
				calculatorState.currentValue = '0' + digit;
			}
			display.value = calculatorState.currentValue;
			decimalOn = true;			
		}
	},

	clickClear: function(){
		calculatorState.pendingOperation = '';
		this.clickClearEntry();
	},

	clickClearEntry: function(){
		calculatorState.currentValue = '';
		display.value = '0';
		decimalOn = false;
	}
}