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
var equalClicked = false;
var onState = false;

window.calculatorApp = {

	clickDigit: function(digit){
		if(!equalClicked && (digit !== 0 || calculatorState.currentValue) ) {
			calculatorState.currentValue += digit;
		}
		else {
			display.value = 0;
			equalClicked = false;
			calculatorState.currentValue = digit;
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
			this.executeOp();
			calculatorState.pendingOperation = op;
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
		calculatorState.currentValue = calculatorState.previousValue;
		calculatorState.previousValue= '';
		calculatorState.pendingOperation = '';
		equalClicked = true;
	},

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
		calculatorState.previousValue = '';
		equalClicked = false;
		this.clickClearEntry();
	},

	clickClearEntry: function(){
		calculatorState.currentValue = '';
		display.value = '0';
		decimalOn = false;
	},

	clickOnOff: function(value) {
		if(onState != value) {
			$(".OnButton").css({'background':'red'});
			onState = true;
			display.value = '0.';
		} else {
			$(".OnButton").css({'background':'black'});
			onState = false;
			display.value = '';
		}
	}
}