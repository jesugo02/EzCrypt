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
    // showSnackbar("Fermeture en cours...");
    // Neutralino.app.exit();
}


// My Functions Go Here

// let  emailUser = document.forms["signup"]["email"].value;
// let  psw1 = document.forms["signup"]["psw"].value;
// let  psw2 = document.forms["signup"]["psw-repeat"].value;


localStorage.setItem("lastname", "Smith");
console.log(localStorage.getItem("lastname"));
// alert(NL_CWD);
Neutralino.filesystem.writeFile('./myFile.txt', 'Sample content');

Neutralino.os.execCommand('xdg-open ./myFile.txt', {background : true});


var body  = $('body'),
	stage = $('#stage'),
	back  = $('#left-arrows'),
    next  = $('#right-arrows');

var fileCmp = 0;            

let User;
let UserListe = [];
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
    // alert(UserListe.length);
    // alert("You kidding me!!");
    let  emailUser = document.forms["signup"]["email"].value;
    let  psw1 = document.forms["signup"]["psw"].value;
    let  psw2 = document.forms["signup"]["psw-repeat"].value;

    if (emailUser != "" && psw1 != "" && psw2 != "") {
        if(psw1 === psw2){
            if(psw1.length >= 5 && psw2.length >= 5){
                console.log("yaya");
                User = new Utilisateur(1, emailUser, psw1);
                console.log("yaya");
                UserListe = UserListe.concat(User.IdUser);
                // console.log(UserListe.length);
                showSnackbar("Inscription effectuée avec succès");
                step(1);
            }
            else{
                showSnackbar('Utilisez un mot de passe plus long');
            }
            
        }
        else{
            showSnackbar('Entrez le même mot de passe');
        }
    }
    else{

        showSnackbar('un champ est invalide');
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
        
        document.forms["signup"]["email"].value  = "";
        document.forms["signup"]["psw"].value  = "";
        document.forms["signup"]["psw-repeat"].value = "";
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
    
    $('#repere').click(function(){
        alert("Enteredzzzz!");

        $(this).parent().find('#first-input').click();

        alert($('#first-input').val());

        $('#send-path').val($('#first-input').val());

    });

    var file = null;

	$('#step3').on('change', '#encrypt-input', function(e){

		// Has a file been selected?

		if(e.target.files.length!=1){
			showSnackbar('sélectionnez un fichier à chiffrer!');
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



        // console.log(file.name);
        // console.log(file.);
        // fileCmp = fileCmp + 1;
        // FileListe.concat(new Fichier(fileCmp, ));

		step(4);
        global_step = 4;
	});


	$('#step3').on('change', '#decrypt-input', function(e){

		if(e.target.files.length!=1){
			showSnackbar('Choisissez un fichier à déchiffrer!');
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
			showSnackbar('Choisissez une plus longue clé!');
			return;
		}

        var reader = new FileReader();

		if(body.hasClass('encrypt')){

			// Encrypt the file!

			reader.onload = function(e){

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
            $('#step5 a').click(function(){
                showSnackbar("En cours... Consulter votre dossier et téléchargement")
            });
		}
		else {

			// Decrypt it!

			reader.onload = function(e){

				var decrypted = CryptoJS.AES.decrypt(e.target.result, password)
										.toString(CryptoJS.enc.Latin1);

				if(!/^data:/.test(decrypted)){
					showSnackbar("Mot de passe incorrect. Réessayez... ");
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

function  showSnackbar(message) {

    // alert("Entered function");
    
    var x = document.getElementById("snackbar");
    
    x.innerHTML = message;

    x.className = "show";
  
    setTimeout(function(){
        x.className = x.className.replace("show", ""); 
    }, 2300);

} 



// END OF MY FUNCITONS

Neutralino.init();

Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}