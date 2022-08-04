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




function validateForm(){

    // alert("You kidding me!!");
    let  name = document.forms["signup"]["email"].value;
    let  psw1 = document.forms["signup"]["pwd"].value;
    let  psw2 = document.forms["signup"]["pwd-repeat"].value;

    alert(name);
    alert(psw1);
    alert(psw2);
    if (name != "" && psw1 != "" && psw2 != "") {
        alert(name);
        step(1);
        return true;     
    }
    return false;

}

$(function(){
    $('#home').css('backgroundColor', '#12caab');
});

$(function(){
    var body  = $('body'),
		stage = $('#stage'),
		back  = $('#back');

    $('#commencer').click(function(){
        step(1);
    });

    $('#home').click(function(){
        step(0);
    });

    $('#signup-span').click(function(){
        step(2);
    });

    $('#signup').click(function(){
        alert("Hi The Goat");
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
    });

    $('#dechiffrer').click(function(){
        body.attr('class', 'decrypt');

		step(3);
    });

    $('#aide').click(function(){
        body.attr('class', 'help');

		step(3);
    });


    $('#ouvrir').click(function(){
        body.attr('class', 'open');

		step(3);
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

		step(4);
	});


	$('#step3').on('change', '#decrypt-input', function(e){

		if(e.target.files.length!=1){
			alert('Please select a file to decrypt!');
			return false;
		}

		file = e.target.files[0];
		step(4);
	});


	$('a.button.process').click(function(){

		var input = $(this).parent().find('input[type=password]'),
			a = $('#step4 a.download'),
			password = input.val();

		input.val('');

		if(password.length<5){
			alert('Please choose a longer password!');
			return;
		}
        
    });



    // $('#dashboard').click(function(){
    //     body.attr('class', 'encrypt');

	// 	step(3);
    // });

    


    function step(i){

		if(i === 0){
			
            // back.fadeOut();
            stage.css('top', 0+'%');
            
		}
		else{

            // back.fadeIn();

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
         
        }
	}

});
// END OF MY FUNCITONS

Neutralino.init();

Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}