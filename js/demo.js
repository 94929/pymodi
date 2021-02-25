/* img drag & drop part */
window.console = window.console || function(t) {};

if (document.location.search.match(/type=embed/gi)) {
	window.parent.postMessage("resize", "*");
}

//bring module's id
let id = [];

function allowDrop(event) {
	event.preventDefault();
}
	
function drag(event) {
	event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
	event.preventDefault();
	var data = event.dataTransfer.getData("text");
	var nodeCopy = document.getElementById(data).cloneNode(true);
	
	if (nodeCopy.id.match("[0]")) {
		//null
	} else {
		nodeCopy.id += "[0]";
	}

	if (nodeCopy.id == "network[0]" || nodeCopy.id == "button[0]" || nodeCopy.id == "led[0]") {
		id.push(nodeCopy.id);
	}

	event.target.appendChild(nodeCopy);
	
	if (event.target == document.getElementById("dropBox1")) {
		var trs = document.getElementById(data);
		trs.parentNode.removeChild(trs);
	}
}

/* js console part */
var con = new SimpleConsole({
	placeholder: "Enter Command",
	handleCommand: handle_command,
	autofocus: true, // if the console is to be the primary interface of the page
	storageID: "app-console", // or e.g. "simple-console-#1" or "workspace-1:javascript-console"	
});

var lesson_ = 0; // key value of enter
var input_code = 0; // code input key in lesson 4 
var error_count = 0; // try count
var is_module_all = 0; // 0:modules are not ready / 1:modulese are ready
var button_toggle = 0; // 0:noclick / 1:click
var key_page = 0; // to send page information
var command_lesson = 0; //copy command keyword by lesson

intro_page();

//time sleep function
function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms))
}
// Tutorial page
function intro_page() {
	key_page = 0;
	con.logHTML("<center>=====================================</center>");
	con.logHTML("<center>=&emsp;&emsp;&emsp;&emsp;Welcome to PyMODI Tutorial&emsp;&emsp;&emsp;&emsp;=</center>");
	con.logHTML("<center>=====================================</center>");
	con.logHTML("PyMODI is a very powerful tool that can control the MODI modules using python scripts. As long as you learn how to use built-in functions of PyMODI, you can easily control MODI modules. This interactive GUI tutorial will guide you through the world of PyMODI.");
	con.logHTML("<br>")
	con.logHTML("Please drag Network, Button, LED module and drop at the center area First!");
	con.logHTML("<br>");
	con.logHTML("If you've succeeded in dragging and dropping all the modules, please press ENTER.");
	con.logHTML("<br>");
	con.logHTML("Press ENTER.");
}

function play_page() {
	key_page = 1;
	con.logHTML("");
	con.logHTML("Tutorial includes :");
	con.logHTML("1. Making MODI");
	con.logHTML("2. Accessing Modules");
	con.logHTML("3. Controlling Modules");
	con.logHTML("4. PyMODI Project");
	con.logHTML("<br>");
	con.logHTML("Enter command the lesson number and press ENTER");
}

function makingMODI_page() {
	key_page = 2;
	Lesson1_cover();
	con.logHTML("First, you should import modi.");
	con.logHTML("<br>");
	con.logHTML("Enter Command : import modi");
}

function importMODI_reaction() {
	key_page = 3;
	lesson_ = 1;
	con.logHTML("<br>");
	con.logHTML("Great! Now you can use all the features of MODI!");
	con.logHTML("<br>");
	con.logHTML("To control the modules, make a MODI object that contains all the connected modules. Once you create it, it will automatically find all the modules connected to the network module.");
	con.logHTML("<br>");
	con.logHTML("Press ENTER");
}

function importMODI_reaction2() {
	key_page = 4;
	Lesson1_cover();
	con.logHTML("");
	if (id.indexOf("network[0]") != -1 && id.indexOf("button[0]") != -1 && id.indexOf("led[0]") != -1) {
		con.log("modules are connected!");
		con.logHTML("<br>");
		is_module_all = 1;
		importMODI_reaction3();
	} else { 
		let need_id = [];
		if (id.indexOf("network[0]") == -1) {
			need_id.push("network");
		} 
		if (id.indexOf("button[0]") == -1) {
			need_id.push("button");
		}
		if (id.indexOf("led[0]") == -1) {
			need_id.push("led");
		}
		if (need_id != null) {
			con.log("[" + need_id + "]");
			con.log("Modules are not connected!");
			con.logHTML("<br>");
		}

		con.logHTML("If you haven't moved the module yet, Please drag Network, Button, LED module and drop at the center area.");
		con.logHTML("<br>");
		con.logHTML("If the modules are ready, press ENTER to continue.");
		key_page = 3;
	}
}

function importMODI_reaction3() {
	key_page = 5;
	con.logHTML("Next, Make a MODI bundle object by typing bundle = modi.MODI()");
	con.logHTML("<br>");
	con.logHTML("Enter Command : bundle = modi.MODI()");
}

function bundle_modi() {
	key_page = 6;
	sleep(300)
	.then(() => con.logHTML("Start initializing connected MODI modules"))
	.then(() => sleep(500))
	.then(() => con.logHTML("Network (1761) has been connected!"))
	.then(() => sleep(300))
	.then(() => con.logHTML("Button (3718) has been connected!"))
	.then(() => con.logHTML("Led (2931) has been connected!"))
	.then(() => sleep(500))
	.then(() => con.logHTML("MODI modules are initialized!"))
	.then(() => sleep(300))
	.then(() => con.logHTML("<br>"))
	.then(() => con.logHTML('Great! The "bundle" is your MODI object. With it, you can control all the modules connected to your device.'))
	.then(() => con.logHTML("<br>"))
	.then(() => con.logHTML("You have completed this lesson."))
	.then(() => con.logHTML("Press ENTER to continue."));
	lesson_ = 2;
}

function Accessing_module() {
	key_page = 7;
	Lesson2_cover();
	con.logHTML("In the previous lesson, you created a MODI object. Let's figure out how we can access modules connected to it.");
	con.logHTML("");
	con.logHTML('"bundle.modules" is a method to get all the modules connected to the device.');
	con.logHTML("<br>");
	con.logHTML("Enter Command : bundle.modules");
}

function Accessing_module2() {
	key_page = 8;
	sleep(100)
	.then(() => con.logHTML("[＜modi.module.setup_module.network.Network object at 0x0000012B42B6E288＞, ＜modi.module.output_module.led.Led object at 0x0000012B425DE8C8＞, ＜modi.module.input_module.button.Button object at 0x0000012B42B6E308＞]"))
	.then(() => con.logHTML("<br>"))
	.then(() => sleep(300))
	.then(() => con.logHTML("you can see two modules connected (excluding the network module) to the machine. You can access each module by the same method we use with an array."))
	.then(() => con.logHTML("You can also access modules by types."))
	.then(() => con.logHTML("<br>"))
	.then(() => con.logHTML("Enter Command : bundle.leds"))
}

function Accessing_module3() {
	key_page = 9;
	sleep(300)
	.then(() => con.logHTML("[＜modi.module.output_module.led.Led object at 0x0000012B425DE8C8＞]"))
	.then(() => sleep(300))
	.then(() => con.logHTML("<br>"))
	.then(() => con.logHTML("If you have followed previous instructions correctly, there must be one LED module connected to the network module. Now, make an LED variable by accessing the first LED module."))
	.then(() => con.logHTML("<br>"))
	.then(() => con.logHTML("Enter Command : "))
	.then(() => con.logHTML("led = bundle.leds[0]"))
}

function Accessing_module4() {
	key_page = 10;
	con.logHTML("<br>");
	con.logHTML('Super! You can now do whatever you want with these modules. If you have different modules connected, you can access the modules in a same way, just typing "bundle"');
	con.logHTML("<br>");
	con.logHTML("You have completed this lesson.");
	con.logHTML("Press ENTER to continue.");
	lesson_ = 3;
}

function Controlling_modules() {
	key_page = 11;
	Lesson3_cover();
	con.logHTML("Now you know how to access individual modules. Let's make an object named 'button' as well for your button module. You know how to do it (You have the modi object, 'bundle').");
}

function Controlling_modules2() {
	key_page = 12;
	con.logHTML("<br>");
	con.logHTML("Perfect. With your button module and LED module, we can either get data from the module or send command to the module.");
	con.logHTML("<br>");
	con.logHTML('"pressed" is a property method of a button module which returns whether the button is pressed or not (i.e. press state).');
	con.logHTML("<br>");
	con.logHTML("Check the press state of the button by typing <br>button.pressed");
}

function Controlling_modules3() {
	key_page = 13;
	con.logHTML("<br>");
	con.logHTML("Now, see if the same command returns True when pressing the button.");
	con.logHTML("You can press the button by clicking on the button where in the center area.");
	con.logHTML("<br>");
	con.logHTML('Type "button.pressed", after press the button.');
	Button_press();
}

function Controlling_modules4() {
	key_page = 14;
	con.logHTML("<br>");
	con.logHTML("Good. if you click the button one more, the button's state return 'not pressed'.");
	con.logHTML("Now let's send a command to the LED module. LED's rgb is a property or setter method of an led module.");
	con.logHTML("Let there be light by typing led.rgb = 0, 0, 100");
	con.logHTML("<br>");
	con.logHTML("Enter Command : led.rgb = 0, 0, 100");
}

function Controlling_modules5() {
	key_page = 15;
	con.logHTML("<br>");
	con.logHTML("Perfect! You will see the blue light from the LED module.");
	con.logHTML("if you want to turn off the LED, this code let you what you want.")
	con.logHTML("<br>");
	con.logHTML("Enter Command : led.rgb = 0, 0, 0");
}

function Controlling_modules6() {
	key_page = 16;
	con.logHTML("<br>");
	con.logHTML("You have completed this lesson.");
	con.logHTML("Press ENTER to continue.");
	lesson_ = 4;
}

function Pymodi_project() {
	key_page = 17;
	Lesson4_cover();
	con.logHTML("Let's make a project that blinks LED when button 'is pressed'.");
	con.logHTML("In an infinite loop, we want our LED to light up");
	con.logHTML("when button is pressed, and turn off when not pressed. Complete the following code based on the description.");
	con.logHTML("<br>");
	con.logHTML("Press ENTER when you're ready!");
	lesson_ = 6;
}

function Pymodi_project2() {
	key_page = 18;
	con.logHTML("while True:");
	con.logHTML(". . .&emsp;&emsp;# Check if button is pressed");
	con.input.value = ". . .   if ";
}

function Pymodi_project3() {
	key_page = 19;
	con.logHTML("Congrats!! Now let's see if the code works as we want. Press the button to light up the led. Double click the button to break out of the loop.");
	con.logHTML("<center>Try it ===================================></center>");
	Play_project();
}

function Pymodi_project4() {
	con.logHTML("");
	con.logHTML("It looks great!");
	con.logHTML("Now you know how to use PyMODI to control modules.");
	con.logHTML("You can look up more functions at this site!");
	con.logHTML("<br>");
	con.logHTML("You have completed the tutorial.");
	con.logHTML('If you want to try again, please enter command "tutorial".');

}

function Lesson1_cover() {
	con.logHTML("<center>------------------------------------------------------</center>");
	con.logHTML("<center>Lesson 1: Making MODI</center>");
	con.logHTML("<center>------------------------------------------------------</center>");
}

function Lesson2_cover() {
	con.logHTML("<center>------------------------------------------------------</center>");
	con.logHTML("<center>Lesson 2: Accessing modules</center>");
	con.logHTML("<center>------------------------------------------------------</center>");
}

function Lesson3_cover() {
	con.logHTML("<center>------------------------------------------------------</center>");
	con.logHTML("<center>Lesson 3: Controlling modules</center>");
	con.logHTML("<center>------------------------------------------------------</center>");
}

function Lesson4_cover() {
	con.logHTML("<center>------------------------------------------------------</center>");
	con.logHTML("<center>Lesson 4: Your First PyMODI Project</center>");
	con.logHTML("<center>------------------------------------------------------</center>");
}

function Try_again(answer) {
	con.log('Try again! the answer is "' + answer + '". Type it below.');
}

function Pymodi_project_writeCode() {
	input_code ++;
	con.logHTML(". . .&emsp;&emsp;elif button.double_clicked:");
	con.logHTML(". . .&emsp;&emsp;&emsp;&emsp;break");
	con.logHTML(". . .&emsp;&emsp;else:");
	con.logHTML(". . .&emsp;&emsp;&emsp;&emsp;# Turn off the LED. (i.e. set color to (0, 0, 0))");
	con.input.value = ". . .       ";
}

function Play_project() {
	var img = document.getElementById("button[0]");

	img.onclick = function() {
		if (button_toggle == 1 ) {
			img.src = "assets/img/demo-modules/button.png";
			document.getElementById("led[0]").src = "assets/img/demo-modules/led.png";	
			button_toggle = 0;
		} else if (button_toggle == 0) {
			img.src = "assets/img/demo-modules/button_click.png";
			document.getElementById("led[0]").src = "assets/img/demo-modules/led_green.png";
			button_toggle = 1;
		}
	};

	img.ondblclick = function() {
		key_page = 20;
		con.logHTML("loop is end.");
		con.logHTML("Press ENTER");
		img.onclick = function(){};
		img.ondblclick = function(){};
	};
}

function Button_press() {
	var imgs = document.getElementById("button[0]");

	imgs.onclick = function() {
		if (button_toggle == 1) {
			imgs.src = "assets/img/demo-modules/button.png";	
			button_toggle = 0;
		} else if (button_toggle == 0) {
 			imgs.src = "assets/img/demo-modules/button_click.png";	
			button_toggle = 1;
		}
	};
}

function Prepare_modi() {
	key_page = 21;
	con.logHTML("<center>=====================================</center>");
	con.logHTML("<center>=&nbsp;&emsp;&emsp;&emsp;&emsp;Preparing the modi object...&emsp;&emsp;&emsp;&emsp;=</center>");
	con.logHTML("<center>=====================================</center>");
	con.logHTML("In order to skip the first lesson, we need to set-up the prerequisites.");
	con.logHTML("Thus, connect button and LED module to your device.");
	con.logHTML("<br>");


	if (id.indexOf("network[0]") != -1 && id.indexOf("button[0]") != -1 && id.indexOf("led[0]") != -1) {
		con.log("modules are connected!");
		con.logHTML("<br>");
		is_module_all = 1;
		con.logHTML("Press ENTER to continue.");
	} else {
		let need_id = [];
		if (id.indexOf("network[0]") == -1) {
			need_id.push("network");
		} 

		if (id.indexOf("button[0]") == -1) {
			need_id.push("button");
		}

		if (id.indexOf("led[0]") == -1) {
			need_id.push("led");
		} 
		
		if (need_id != null) {
			con.log("[" + need_id + "]");
			con.log("Modules are not connected!");
			con.logHTML("<br>");
		}

		con.logHTML("If you haven't moved the module yet, Please drag Network, Button, LED module and drop at the cener area.");
		con.logHTML("If the modules are ready, press ENTER to continue.");
	}
}

// add the console to the page
document.body.appendChild(con.element);

// show any uncaught errors (errors may be unrelated to the console usage)
con.handleUncaughtErrors();

function handle_command(command){
	// Conversational trivialities
	var log_emoticon = function(face, rotate_direction){
		// top notch emotional mirroring (*basically* artificial general intelligence :P)
		var span = document.createElement("span");
		span.style.display = "inline-block";
		span.style.transform = "rotate(" + (rotate_direction / 4) + "turn)";
		span.style.cursor = "vertical-text";
		span.style.fontSize = "1.3em";
		span.innerText = face.replace(">", "〉").replace("<", "〈");
		con.log(span);
	};


	// press enter to the next action
	if (command == "") { 
		if (key_page == 0) {
			con.clear();
			play_page();
		} else if (lesson_ == 1 && key_page == 3) {
			con.clear();
			importMODI_reaction2();
		} else if (lesson_ == 2 && key_page == 6) {
			con.clear();
			Accessing_module();
			lesson_ = 0;
		} else if (lesson_ == 3 && key_page == 10) {
			con.clear();
			Controlling_modules();
			lesson_ = 0;
		} else if (lesson_ ==4 && key_page == 16) {
			con.clear();
			Pymodi_project();
		} else if (lesson_ == 6 && key_page == 17) {
			con.clear();
			Pymodi_project2();
			lesson_ = 5;
		} else if (key_page == 20) {
			con.clear();
			Pymodi_project4();
		} else if (key_page == 21) {
			con.clear();
			if (command_lesson == 2 && is_module_all == 1) {
				Accessing_module();
			} else if (command_lesson == 3 && is_module_all == 1) {
				Controlling_modules();
			} else if (command_lesson == 4 && is_module_all == 1) {
				Pymodi_project();
			} else {
				Prepare_modi();
			}
		} else {
			con.logHTML("<br>");
		}
	} else { //command process
		if (command == "import modi" && key_page == 2) {
			sleep(200)
			.then(() => con.log((command.match(/^[A-Z]/) ? "MODI" : "Running PyMODI (v1.1.0)") + (command.match(/\.|!/) ? "." : "")))
			.then(() => importMODI_reaction())

		} else if (command.match(/^(reset)/i)) {
			con.clear();
			lesson_ = 0;
			input_code = 0;
			key_page = 0;

		} else if (command == "tutorial") {
			lesson_ = 0;
			input_code = 0;
			con.clear();
			intro_page();

		} else if (command == "1" && key_page == 1) {
			con.clear();
			makingMODI_page();

		} else if (command == "2" && key_page == 1) { 
			command_lesson = 2;
			con.clear();
			if (is_module_all == 0) {
				Prepare_modi();
			} else {
				con.clear();
				Accessing_module();
			}

		} else if (command == "3" && key_page == 1) { 
			command_lesson =3;
			con.clear();
			if (is_module_all == 0) {
				Prepare_modi();
			} else {
				Controlling_modules();
			}

		} else if (command == "4" && key_page == 1) { 
			command_lesson =4;
			con.clear();
			if (is_module_all == 0) {
				Prepare_modi();
			} else {
				Pymodi_project();
			}

		} else if (command == "bundle = modi.MODI()" && key_page == 5) {
			bundle_modi();

		} else if (!command.match(". . .       led.rgb = 0, 100, 0") && input_code == 1 && key_page == 18) {
			Try_again("led.rgb = 0, 100, 0");
			con.input.value = ". . .       ";

		} else if (command.match(". . .       led.rgb = 0, 100, 0") && input_code == 1 && key_page == 18) {
			con.logHTML(". . .&emsp;&emsp;&emsp;&emsp;led.rgb = 0, 100, 0");
			Pymodi_project_writeCode();

		} else if (!command.match(". . .       led.rgb = 0, 0, 0") && input_code == 2 && key_page == 18) {
			Try_again("led.rgb = 0, 0, 0");
			con.input.value = ". . .       ";

		} else if (command.match(". . .       led.rgb = 0, 0, 0") && input_code == 2 && key_page == 18) {
			con.logHTML(". . .&emsp;&emsp;&emsp;&emsp;led.rgb = 0, 0, 0");
			Pymodi_project3();

		} else if (lesson_ == 5 && key_page == 18) {
			if (!command.match(". . .   if button.pressed:") && input_code == 0) {
				Try_again("button.pressed:");
				con.input.value = ". . .   if ";
			} else {
				input_code ++;
				con.logHTML(". . .&emsp;&emsp;if button.pressed:");
				con.logHTML(". . .&emsp;&emsp;&emsp;&emsp;# Set LED color to green");
				con.input.value = ". . .       ";
			}

		} else if (command == "bundle.modules" && key_page == 7) {
			Accessing_module2();

		} else if (command == "bundle.leds" && key_page == 8) {
			Accessing_module3();

		} else if (command == "led = bundle.leds[0]" && key_page == 9) {
			Accessing_module4();

		} else if (command != "button = bundle.buttons[0]" && key_page == 11) {
			if (error_count <= 1) {
				con.log("Try again!");
				error_count++;
			}
			else if (error_count > 1) {
				Try_again("button = bundle.buttons[0]");
				error_count++;
			}
		} else if (command == "button = bundle.buttons[0]" && key_page == 11) {
			error_count = 0;
			Controlling_modules2();

		} else if ((command == "button.pressed" && key_page == 12) || (command == "button.pressed" && key_page == 13)) {
			if (button_toggle == 0) {
				sleep(300)
				.then(() => con.log("False"))
				.then(() => sleep(300))
				.then(() => Controlling_modules3())
			} else if (button_toggle == 1 && key_page == 13) {
				sleep(300)
				.then(() => con.log("True"))
				.then(() => sleep(300))
				.then(() => Controlling_modules4())
			}
			
		} else if (command == "led.rgb = 0, 0, 100" && key_page == 14) {
			sleep(300)
			.then(() => document.getElementById("led[0]").src = "assets/img/demo-modules/led_blue.png")
			.then(() => Controlling_modules5())

		} else if (command == "led.rgb = 0, 0, 0" && key_page == 15) {
			sleep(300)
			.then(() => document.getElementById("led[0]").src = "assets/img/demo-modules/led.png")
			.then(() => Controlling_modules6())

		} else if (command.match("0") || command.match("1") || command.match("2") || command.match("3") || command.match("4") || command.match("5") || command.match("6") || command.match("7") || command.match("8") || command.match("9")) {
			con.log("Try again!");

		} else {
			var err;
			try {
				var result = eval(command);
			} catch(error) {
				err = error;
			}
			if (err) {
				con.error(err);
			} else {
				con.log(result).classList.add("result");
			}
		}
	}
};
