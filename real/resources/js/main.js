// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library

function showInfo() {
    document.getElementById('info').innerHTML = `
        ${NL_APPID} is running on port ${NL_PORT}  inside ${NL_OS}
        <br/><br/>
        <span>server: v${NL_VERSION} . client: v${NL_CVERSION}</span>
        `;
}

function openDocs() {
    Neutralino.os.open("https://neutralino.js.org/docs");
}

function openTutorial() {
    Neutralino.os.open("https://www.youtube.com/watch?v=txDlNNsgSh8&list=PLvTbqpiPhQRb2xNQlwMs0uVV0IN8N-pKj");
}

function setTray() {
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }
    let tray = {
        icon: "/resources/icons/trayIcon.png",
        menuItems: [
            {id: "VERSION", text: "Get version"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };
    Neutralino.os.setTray(tray);
}

function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "VERSION":
            Neutralino.os.showMessageBox("Version information",
                `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
            break;
        case "QUIT":
            Neutralino.app.exit();
            break;
    }
}

function onWindowClose() {
    Neutralino.app.exit();
}


// My Functions Go Here

// let  emailUser = document.forms["signup"]["email"].value;
// let  psw1 = document.forms["signup"]["psw"].value;
// let  psw2 = document.forms["signup"]["psw-repeat"].value;

var body  = $('body'),
	stage = $('#stage'),
	back  = $('#left-arrows'),
    next  = $('#right-arrows');

var fileCmp = 0;            

let User;
let FileListe = [];

function step(i){

    if(i === 0){
        
        back.fadeOut();
        stage.css('top', 0+'%');
        
    }
    else{

        back.fadeIn();

        if(i==1){
            stage.css('top',(-100 + '%'));
        }
        else if(i==2){
            stage.css('top', (-200 + '%'));
        }
        else if(i==3){
            stage.css('top', (-300 + '%'));
        }
        
        else if(i==4){
            stage.css('top', (-400 + '%'));
        }
        else if(i==5){
            stage.css('top', (-500 + '%'));
        }
    }
}

function next_step(){
    step(global_step+1);
    global_step=global_step+1;
}




function validateForm(){

    // alert("You kidding me!!");
    let  emailUser = document.forms["signup"]["email"].value;
    let  psw1 = document.forms["signup"]["psw"].value;
    let  psw2 = document.forms["signup"]["psw-repeat"].value;

    if (emailUser != "" && psw1 != "" && psw2 != "") {
        if(psw1 === psw2){
            if(psw1.length >= 5 && psw2.length >= 5){
                User = new Utilisateur(1, emailUser, psw1);
                console.log(User);
                step(1);
                return true;
            }
            else{
                console.log('il faut un mot de passe plus long');
            }
            
        }
        else{
            console.log('psw1 != psw2');
        }
    }
    else{
        console.log('un champ est invalide');
        return false;
    }

}



// alert(emailUser);

$(function(){

    var global_step = 0

    $(function(){
        $('#home').css('backgroundColor', '#12caab');
        step(0);
    });

    var body  = $('body'),
		stage = $('#stage'),
		back  = $('#left-arrows'),
        next  = $('#right-arrows');

    $('#commencer').click(function(){
        step(1);
        global_step = 1;
    });

    $('#home').click(function(){
        step(0);
        global_step = 0;
    });

    $('#signup-span').click(function(){
        step(2);
        global_step = 2;
    });

    $('#signup').click(function(){
        // alert("Hi The Goat");
    });

    $('.side-navbar a').click(function(){
        var all_a = $('a.side-a');
        var i;
        for(i=0; i < all_a.length; i++){
            $('#'.concat(all_a[i].id)).css('backgroundColor', '#edece8');
        }
        $('#'.concat(this.id)).css('backgroundColor', '#12caab');
    });

    $('#chiffrer').click(function(){
        body.attr('class', 'encrypt');

		step(3);
        global_step = 3;
    });

    $('#dechiffrer').click(function(){
        body.attr('class', 'decrypt');

		step(3);
        global_step = 3;
    });

    $('#aide').click(function(){
        body.attr('class', 'help');

		step(3);
        global_step = 3;
    });


    $('#ouvrir').click(function(){
        body.attr('class', 'open');

		step(3);
        global_step = 3;
    });
    
    $('#dashboard').click(function(){
        body.attr('class', 'dashboard');

		step(3);
        global_step = 3;
    });


    $('#step3 .button').click(function(){
		
		$(this).parent().find('input').click();
	});
    

    var file = null;

	$('#step3').on('change', '#encrypt-input', function(e){

		// Has a file been selected?

		if(e.target.files.length!=1){
			alert('Please select a file to encrypt!');
			return false;
		}

        file = e.target.files[0];

        if ('name' in file) {
            console.log(file.name);
        }
        else {
            console.log(file.fileName);
        }
        if ('size' in file) {
            console.log(file.size);
        }
        else {
            console.log(file.fileSize);
        }
        console.log(file.mozFullPath);



        // console.log(file.name);
        // console.log(file.);
        // fileCmp = fileCmp + 1;
        // FileListe.concat(new Fichier(fileCmp, ));

		step(4);
        global_step = 4;
	});


	$('#step3').on('change', '#decrypt-input', function(e){

		if(e.target.files.length!=1){
			alert('Please select a file to decrypt!');
			return false;
		}

		file = e.target.files[0];
		step(4);
        global_step = 4;
	});


	$('a.button.process').click(function(){

		var input = $(this).parent().find('input[type=password]'),
			a = $('#step5 a.download'),
			password = input.val();

		input.val('');

		if(password.length<5){
			alert('Please choose a longer password!');
			return;
		}

        var reader = new FileReader();

		if(body.hasClass('encrypt')){

			// Encrypt the file!
            alert("ya Body has class encrypt");

			reader.onload = function(e){
                alert("ya reader onload");

				// Use the CryptoJS library and the AES cypher to encrypt the 
				// contents of the file, held in e.target.result, with the password

				var encrypted = CryptoJS.AES.encrypt(e.target.result, password);

				// The download attribute will cause the contents of the href
				// attribute to be downloaded when clicked. The download attribute
				// also holds the name of the file that is offered for download.

				a.attr('href', 'data:application/octet-stream,' + encrypted);
				a.attr('download', file.name + '.ezcrypt');

				step(5);
                global_step = 5;
			};

			// This will encode the contents of the file into a data-uri.
			// It will trigger the onload handler above, with the result

			reader.readAsDataURL(file);
		}
		else {

			// Decrypt it!

			reader.onload = function(e){

				var decrypted = CryptoJS.AES.decrypt(e.target.result, password)
										.toString(CryptoJS.enc.Latin1);

				if(!/^data:/.test(decrypted)){
					alert("Invalid pass phrase or file! Please try again.");
					return false;
				}

				a.attr('href', decrypted);
				a.attr('download', file.name.replace('.ezcrypt',''));

				step(5);
                global_step = 5;
			};

			reader.readAsText(file);
		}
	});

    back.click(function(){

		// Reinitialize the hidden file inputs,
		// so that they don't hold the selection 
		// from last time

		$('#step3 input[type=file]').replaceWith(function(){
			return $(this).clone();
		});

		step(0);
        global_step = 0;
        $('#home').click();
	});



    // $('#dashboard').click(function(){
    //     body.attr('class', 'encrypt');

	// 	step(3);
    // });

    next.click(function(){
        next_step();
    });

});
// END OF MY FUNCITONS

Neutralino.init();

Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}