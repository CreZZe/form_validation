var total = 0;

$paypal = $("#credit-card").next();
$bitcoin = $("#credit-card").next().next();
$paypal.hide();
$bitcoin.hide();

$(document).ready( () => {
	$('input[name="user_name"]').focus();
});
	
function createInput(text, ID) {
	var input = document.createElement(text);
	input.id = ID;
	return input;
}

$("#title").change( () => {
	$jobRole = $("#title").val();
	if ($jobRole == 'other') {
		var input = createInput('input', 'other-title');
		input.type = 'text';
		input.placeholder = 'Your Job Role';
		$("#title").after(input);
	} else {
		$("#other-title").remove();
	}
});

$("#design").change( () => {
	$designTheme = $("#design").val();
	$("#color option").each( function() {
		$(this).show();
		$(this).attr("selected", false);
	});
	$("#color").find("option:contains('Cornflower')").attr("selected", true);

	function setColorOptions(text, selectedOption) {
		$("#color option").each( function() {
			var str = $(this).text();
			if (str.indexOf(text) >= 0) {
				$(this).hide();
				$(this).attr("selected", false);
			}
		});
		$("#color").find("option:contains(" + selectedOption + ")").attr("selected", true);
	}
	
	if ($designTheme == 'heart js') {
		setColorOptions("JS Puns shirt only", "Tomato");
	} else if ($designTheme == 'js puns') {
		setColorOptions("JS shirt only", "Cornflower");
	}
});

$(".activities input").click( (e) => {
	function dateForToggle(date) {
		if ( str.indexOf(date) >= 0 ) {
			if ( e.target.checked ) {
				toggleCheckboxes(date, true);
			}
			else {
				toggleCheckboxes(date, false);
			}
		}
	}
	function toggleCheckboxes(date, mode) {
		$(".activities input").each( function() {
			var str = $(this).parent().text();
			if ( str.indexOf(date) >= 0 ) {
				if ( !$(this).is(":checked") ) {
					$(this).prop('disabled', mode);
				}
			}
			
			if ( $(this).is(":disabled") ) {
				$(this).parent().css('color', 'grey');
			}
			else {
				$(this).parent().css('color', 'black');
			}
		});
	}
	
	
	if ( $("#total").length <= 0 ) {
		var span = createInput('span', 'total');
		$(".activities").append(span);
	}
	
	var str = e.target.parentNode.innerHTML;
	if ( str.indexOf("$100") >= 0) {
		if ( e.target.checked ) {
			total += 100;
		} else {
			total -= 100;
		}
	} else {
		if ( e.target.checked ) {
			total += 200;
		} else {
			total -= 200;
		}
	}
	$("#total").html("Total: $" + total);
	
	dateForToggle("Tuesday 9am-12pm");
	dateForToggle("Tuesday 1pm-4pm");
	
	
});

$("#payment").change( () => {
	$option = $("#payment").val();
	if ($option == 'credit card') {
		$("#credit-card").show();
		$paypal.hide();
		$bitcoin.hide();
	} else if ($option == 'paypal') {
		$("#credit-card").hide();
		$paypal.show();
		$bitcoin.hide();
	} else if ($option == 'bitcoin') {
		$("#credit-card").hide();
		$paypal.hide();
		$bitcoin.show();
	} else {
		$("#credit-card").hide();
		$paypal.hide();
		$bitcoin.hide();
	}
});

$("form").submit( (e) => {
	$checked = 0;
	
	function changeColor(label, input) {
		e.preventDefault();
		labelColor(label, 'red');
		inputColor(input, 'red');
	}
	
	function labelColor(object, color) {
		$("label[for=" + object + "]").css({"color": color});
	}
	function inputColor(object, color) {
		$("input[name=" + object + "]").css({"border-color": color});
	}
	
	if ( $("#name").val().length < 1 ) {
		e.preventDefault();
		labelColor('name', 'red');
		inputColor('user_name', 'red');
	} else { 
		labelColor('name', 'black');
		inputColor('user_name', 'red');
	}
	
	
	$mail = $("#mail").val();
	
	if ( $mail.indexOf('@') >= 0 && $mail.indexOf('.') >= 0 ) {
		labelColor('mail', 'black');
		inputColor('user_email', 'black');
	} else {
		e.preventDefault();
		labelColor('mail', 'red');
		inputColor('user_email', 'red');
	}
	
	$(".activities input").each( function() {
		if ( $(this).is(":checked") ) {
			$checked++;
		}
		if ($checked == 0) {
			e.preventDefault();
			$(".activities legend").css({"color": "red"});
		} else { 
			$(".activities legend").css({"color": "black"});
		}
	});
	
	if ( $("#payment").val() == 'credit card' || $("#payment").val() == undefined ) {
		$cc = $('input[name="user_cc-num"]').val();
		$zip = $('input[name="user_zip"]').val();
		$cvv = $('input[name="user_cvv"]').val();
		
		
		if ( $cc.length < 13 || $cc.length > 16 ) {
			changeColor('cc-num', 'user_cc-num');
		} else {
			if ( isNaN($cc) ) {
				changeColor('cc-num', 'user_cc-num');
			} else {
				labelColor('cc-num', 'black');
				inputColor('user_cc-num', 'black');
			}
		}
		
		if (  $zip.length == 5 ) {
			if ( isNaN($zip) ) {
				changeColor('zip', 'user_zip');
			} else {
				labelColor('zip', 'black');
				inputColor('user_zip', 'black');
			}
		} else {
			changeColor('zip', 'user_zip');
		}
		
		if (  $cvv.length == 3 ) {
			if ( isNaN($cvv) ) {
				changeColor('cvv', 'user_cvv');
			} else {
				labelColor('cvv', 'black');
				inputColor('user_cvv', 'black');
			}
		} else {
			changeColor('cvv', 'user_cvv');
		}
	}
});