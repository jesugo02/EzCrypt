// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library

Neutralino.init();

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


// localStorage.setItem("lastname", "Smith");
// console.log(localStorage.getItem("lastname"));
// Neutralino.filesystem.writeFile('./myFile.txt', 'Sample content');

// Neutralino.os.execCommand('xdg-open ./myFile.txt', {background : true});



var body  = $('body'),
	stage = $('#stage'),
	back  = $('#left-arrows'),
    next  = $('#right-arrows');

var emailUser;

var cpt = 0;
var fileCmp = 0;      
var timeOut = 120000;   
var global_step  = 0; 
var if_connect = 0
var stats_table;
var total_chiffre = 0;
var total_dechiffre = 0;
var total_ouvert = 0;

var stats_header = ["Fichier", "Taille(kB)", "Date", "Algorithme", "Opération"];
let User;
let UserListe = [];
let FileListe = [];
let datas = [];     

$('#decryption-path').val('zerta');

if(if_connect == 0){
    $('#right-arrows').fadeOut();
    $('#left-arrows').fadeOut();
}

// myDynamic table creation
$(function(){
    stats_table = $('<table>');
    var stats_tr = $('<tr>');

    for(var j = 0; j < stats_header.length; j++){
        stats_tr.append($('<th>').text(stats_header[j]));
    }
    stats_table.append(stats_tr);

    $('#step6 .content').append(stats_table);

});

function step(i){

    if(i === 0){
        
        back.fadeOut();
        $('#login-sidebar').fadeIn(2000);
        $('#signup-sidebar').fadeIn(2000);
        stage.css('top', 0+'%');
        
        
    }
    else{

        back.fadeIn();
        $('#login-sidebar').fadeOut(1000);
        $('#signup-sidebar').fadeOut(1000);
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
        else if(i==6){
            stage.css('top', (-600 + '%'));
        }
        else if(i==7){
            stage.css('top', (-700 + '%'));
        }

    }
}


function next_step(){
    step(global_step+1);
    global_step=global_step+1;
}

function validateForm(){
   
    emailUser = document.forms["signup"]["email"].value;
    let  psw1 = document.forms["signup"]["psw"].value;
    let  psw2 = document.forms["signup"]["psw-repeat"].value;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    if (emailUser != "" && psw1 != "" && psw2 != "") {
        if(psw1 === psw2){
            if(psw1.length >= 5 && psw2.length >= 5){
                
                if(! emailUser.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                   
                    showSnackbar("Email invalide. Réessayez ...");
                    $('#login-email').focus();
                    return false;
                }
                if(!emailUser.includes("gmail.com")){
                    showSnackbar("Utilisez un compte Gmail existant..");
                    return false;
                }
                if(format.test(psw1)){
                    showSnackbar("N'utlisez pas des caractès spéciaux!");
                    return false;
                }
                
                let User = new Utilisateur(emailUser, psw1);
                User.email = User.email.replace('@','');
                User.email = User.email.replace('.','');
               
                localStorage.setItem(User.email, psw1);
               
                showSnackbar("Inscription effectuée avec succès");                
                
                document.forms["signup"]["email"].value = "";
                document.forms["signup"]["psw"].value = "";
                document.forms["signup"]["psw-repeat"].value = "";

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

        showSnackbar('Un champ est invalide');
        return false; 

    }

}


// Modal Logout 
const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const mounth = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juiellet","Août","Septembre","Octobre","Novembre","Decembre"]
setInterval(myTimer, 1000);

function myTimer(){

    let d = new Date();
    let hour = (d.getHours().toString().length == 1 ) ? ('0' + d.getHours().toString()) : d.getHours().toString();
    let min = (d.getMinutes().toString().length == 1) ? ('0' + d.getMinutes().toString()) : d.getMinutes().toString();
  
    document.getElementById("hour").innerHTML = hour + ':' + min ;
    document.getElementById("date").innerHTML = days[d.getDay()-1] + ' ' + d.getDate()  + ' ' + mounth[d.getMonth()];

}


function myModalShower(){
    $('#logout-modal').css('visibility', 'visible');
}

let inactivityTime = function() {
    let time;

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    document.onclick = resetTimer;
    // document.onpointerlockchange = resetTimer;
    // document.onkeypress = resetTimer;

    function myModalShower(){
        $('#logout-modal').css('visibility', 'visible');
    }

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(myModalShower, timeOut);
    }

};

$('#logout-password').fadeOut();

inactivityTime();

let identifier = 1;

// function showLogin(){
//     if(identifier == 1){
//         $('#logout-modal h1').fadeOut();
//         $('#hour').fadeOut();
//         $('#date').fadeOut();
//         $('#info').fadeOut();
//         $('#logout-password').fadeIn();
//         i = 2;
//     }else if(i == 2){
//         $('#logout-password').fadeOut();
//         $('#info').fadeOut();
//         $('#logout-modal h1').fadeIn();
//         $('#hour').fadeIn();
//         $('#date').fadeIn();
//         i=1;
//     }   
// }


$('#logout-modal').dblclick(function(){
    
    if(identifier == 1){
        $(this).css("background-image", "url('./Secure\ data-pana.svg')");
        $('#logout-modal h1').fadeOut();
        $('#hour').fadeOut();
        $('#date').fadeOut();
        $('#info').fadeOut();
        $('#logout-password').fadeIn();
        identifier = 2;
     
    }
    else{
        $(this).css('background-image', 'none');
        $('#logout-password').fadeOut();
        $('#info').fadeIn();
        $('#logout-modal h1').fadeIn();
        $('#hour').fadeIn();
        $('#date').fadeIn();
        identifier=1;
           
    }  

});

$('#logout-a').click(function(){

    let  password  = $('#logout-input').val();
    let  matching_password = localStorage.getItem(emailUser.replace('@','').replace('.','')); 

    if(password.length == 0){
        showSnackbar("Veillez entrer un mot de passe !");
        return;
    }
    else{
       if(password == matching_password){
           $('#logout-modal').css('visibility', 'hidden');
           $('#logout-input').val('');
           showSnackbar("Bienvenu à nouveau");
       }
       else{
          
            showSnackbar("Mot de passe Incorrect. Réessayez svp...");
            $('#logout-input').val('');
       }
   }
});


// if( $('#logout-modal').css('visibility') == "visible"){
    
// }


let getUsername = async () => {

    const key = NL_OS == 'Windows' ? 'USERNAME' : 'USER';
    let value = '';
    try {
        value = await Neutralino.os.getEnv(key);
    }
    catch(err) {
        console.error(err);
    }
    return value;
}
  




$(function(){

    var global_step = 0;

    var operation;
    var fichier;
    $(function(){
        $('#home').css('backgroundColor', '#12caab');
        step(0);
    });

    var body  = $('body'),
		stage = $('#stage'),
		back  = $('#left-arrows'),
        next  = $('#right-arrows');

    $('#commencer').click(function(){
        if(if_connect == 0){
            step(1);
        }else{
            $('#chiffrer').click();
        }
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
        if(if_connect == 0){
            showSnackbar("Veillez vous connecter d'abord ...");
            $('#home').click();
            return false;
        }
        else{
            body.attr('class', 'encrypt');

            step(3);
            // global_step = 3;
        }
       
    });

    $('#dechiffrer').click(function(){
        
        if(if_connect == 0){
            showSnackbar("Veillez vous connecter d'abord ...");
            $('#home').click();
            return false;
        }
        else{
            body.attr('class', 'decrypt');

            step(3);
            //global_step = 3;
        }

    });

    $('#aide').click(function(){
        
        if(if_connect == 0){
            showSnackbar("Veillez vous connecter d'abord ...");
            $('#home').click();
            return false;
        }
        else{
            body.attr('class', 'help');

            step(3);
            // global_step = 3;
        }

       
    });

    // $('#loged-in').click(function(){
    //     this.fadeOut();
    //     step(0);
    //     showSnackbar("Vous êtes déconnectés");
    // });

    $('#ouvrir').click(function(){
        if(if_connect == 0){
            showSnackbar("Veillez vous connecter d'abord ...");
            $('#home').click();
            return false;
        }
        else{
            body.attr('class', 'open');

            step(3);
            // global_step = 3;
        }
      
        
        
    });
    
    $('#dashboard').click(function(){
        if(if_connect == 0){
            showSnackbar("Veillez vous connecter d'abord ...");
            $('#home').click();
            return false;
        }
        else{
            body.attr('class', 'dashboard');

            step(6);
            // global_step = 6;
        }
        
        
    });

    $('#parametre').click(function(){
        
        if(if_connect == 0){
            showSnackbar("Veillez vous connecter d'abord ...");
            $('#home').click();
            return false;
        }
        else{
            body.attr('class', 'parametre');

            step(7);
            // global_step = 7;
        
        }

    });
    // veille
    $('#en_savoir_plus').click(function(){
        $("#en_savoir_plus-modal").css('visibility', 'visible');
    });
    $('#guide').click(function(){
        $('#guide-modal').css('visibility', 'visible');
    });
    $('#faq').click(function(){
        $('#faq-modal').css('visibility', 'visible');
    });

    $('#veille').on('change', function(){
        
        timeOut = $("#veille option:selected" ).val();
        

    });

    $('#theme').on('change', function(){
        
        if($("#theme option:selected" ).val() == "sombre"){
            $('#sombre').click();
        }else{
            $('#clair').click();
        }
        

    });
    $('#sombre').click(function(){
        $('body').css('background-color', 'black');
        $('#mySidenav').css('background-color', 'black');
        $('#mySidenav').css('color', 'white');
    });

    $('#clair').click(function(){
        $('body').css('background-color', 'white');
        $('#mySidenav').css('background-color', '#edece8');
        $('#mySidenav').css('color', 'black');
    });

    $('#step3 .button').click(function(){
		
		$(this).parent().find('input').click();
	});

    // function hidden_decryption(hidden_file, password){
        
    //     var reader = new FileReader();
    //     let a = $('#hidden-a');

    //     reader.onload = function(e){

    //         var decrypted = CryptoJS.AES.decrypt(e.target.result, password)
    //                                 .toString(CryptoJS.enc.Latin1);

    //         if(!/^data:/.test(decrypted)){
    //             showSnackbar("Mot de passe incorrect. Réessayez... ");
    //             return false;
    //         }

    //         a.attr('href', decrypted);
    //         a.attr('download', file.name.replace('.ezcrypt',''));

    //         step(5);
    //         global_step = 5;
    //     };

    //     reader.readAsText(hidden_file);

    // }

    let command = '';
    let full_path = '';
    let hidden_path = '';
    let hidden_password = '';
    let name = '';


    $('#repere').click( async function(){

        let  input = $('#first-input');
        
        
        $('#first-input').click();

        $('#first-input').on('change', async function(e){
            
            let value = input.val().toString().replace('C:\\fakepath\\','/Downloads/');
            let file_name = input.val().toString().replace('C:\\fakepath\\','');;
            
            name =  await getUsername();
            
            hidden_password = $('#hidden_password').val();
            
            full_path = "/home/" + name + value;
            
            $('#send-path').val(full_path);
            
            hidden_path = '/home/'+ name + '/Downloads' + '/.ez';
            
            Neutralino.filesystem.createDirectory(hidden_path);
            
            command ='xdg-open ' + hidden_path + '/' + file_name;

            command = command.replace('.ezcrypt', '');

            Neutralino.filesystem.copyFile(full_path , hidden_path);
            
            //showSnackbar("File must be in Downloads folder ...");

            //////////////////////////////

          
            if(e.target.files.length!=1){
                
               
                showSnackbar('Choisissez un fichier à déchiffrer!');
                return false;
            
            }

            

            let hidden_file = e.target.files[0];            
            

            fichier   = new Fichier(null, null, null);
        
            if ('name' in hidden_file) {
                fichier.nom    = hidden_file.name;
            }
            else {
                fichier.nom    = hidden_file.fileName;
            }
            if ('size' in hidden_file) {
                fichier.taille  = hidden_file.size;
            }
            else {
                fichier.taille = hidden_file.fileSize;
            }

            var reader = new FileReader();
            
            
            reader.onload = async function(e){
                

                var element = document.createElement('a');
               

                
                var decrypted = CryptoJS.AES.decrypt(e.target.result, hidden_password).toString(CryptoJS.enc.Latin1);
                
           
                
                if(!/^data:/.test(decrypted)){

                    showSnackbar("Mot de passe incorrect. Réessayez..");
                    full_path = '';
                    hidden_path = '';
                    $('#hidden_password').val('');
                    $('#send-path').val('');
                    return false;
                
                }
                operation = new Operation(fichier.nom, fichier.taille, "AES-256", "Ouverture", new Date(), hidden_password);


                element.setAttribute('href', decrypted);
                element.setAttribute('download', hidden_file.name.replace('.ezcrypt',''));     
                let a_fix = document.getElementById('send-path');
                a_fix.appendChild(element);
                element.click();

                a_fix.removeChild(element);   

                localStorage.setItem(cpt+1, JSON.stringify(
                    {
                        nomFichier : operation.nomFichier,
                        tailleFichier : operation.tailleFichier,
                        nomAlgo : operation.nomAlgo,
                        nomOpe : operation.nomOperation,
                        dateOpe : operation.dateChiffrement
                    }
                ));
                cpt = cpt + 1;
                addInfoTable(JSON.stringify(
                    {
                        nomFichier : operation.nomFichier,
                        tailleFichier : operation.tailleFichier,
                        nomAlgo : operation.nomAlgo,
                        nomOpe : operation.nomOperation,
                        dateOpe : operation.dateChiffrement
                    })
                );
            };
            
            total_ouvert = total_ouvert + 1; 

            $('#step6 input').val(total_chiffre + " chiffré(s), " + total_dechiffre + " déchiffré(s), " + total_ouvert + " ouvert(s)");

            reader.readAsText(hidden_file);
        
        
        });
           
        //////////////////////////////
    });


    $('a.browse.red').click(function(){
        
        if(command == ''){
            showSnackbar("Veillez choisir un fichier ...");
            return false;
        }
        if($('#hidden_password').val() == ''){
            showSnackbar("Veillez entrer la clé de chiffrement...");
            return false;
        }
        
        Neutralino.filesystem.moveFile(full_path.replace('.ezcrypt', '') , hidden_path);
        Neutralino.os.execCommand(command, {background : true});
        
        step(1);
        $('#home').click();
        $('#hidden_password').val('');
        
        Neutralino.filesystem.removeDirectory(hidden_path);
    });
   
    function addInfoTable(element){

        let result = JSON.parse(element);

        stats_table.append(
            $('<tr>').append(
              $('<td>').text(result.nomFichier.toString()),
              $('<td>').text((parseFloat(result.tailleFichier)/1000).toString()),
            $('<td>').text(result.dateOpe.toString().replace('T', ' ').substr(0, 19)),
              $('<td>').text(result.nomAlgo),
              $('<td>').text(result.nomOpe),
        ));

    }
    

    $('#seconnecter').click(function(){
        emailUser = $('#login-email').val();
        
        let  psw = $('#login-password').val();
      
        if(emailUser == "" || psw == "") {
            showSnackbar("Veillez renseigner tous les champs");
        }else{
            
            if(! emailUser.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
              
                showSnackbar("Email invalide. Réessayez ...");
                $('#login-email').focus();
                return false;
            }
            if(!emailUser.includes("gmail.com")){
                showSnackbar("Utilisez un compte Gmail existant..");
                return false;
            }
            let matching_password = localStorage.getItem(emailUser.replace('@','').replace('.',''));
            if(matching_password != null){
            
                if(psw === matching_password){
                    showSnackbar('Vous êtes connectés');
                    $('#login-email').val('');
                    $('#login-password').val('');
                    if_connect = 1;
                    changeHomeContent();
                    step(0);
                }   
                else{
                    showSnackbar("Email ou Mot de passe incorrect. Réessayez");
                }

            }else{
                showSnackbar("Compte inexistant ...");
            }
        }
        
    });
    
    function changeHomeContent(){
        $('#h1-first-home').text("Choisissez une opération sur la barre à gauche ..");
        $('#h1-first-home').css('text-family','Ubuntu');
        $('#h1-first-home').css('font-size', '35px');
        $('#h1-first-home').css('font-weight', '700');
        $('#h1-first-home').css('color', 'rgb(4, 38, 38');
        $('#h1-second-home').text("");
        $('#step0 h3').text("");
        // $('#step0').css('background-image','url("Fireplace-bro.svg")');
        // $('#step0').css('background-repeat','no-repeat');
        // $('#step0').css('background-position','center');
        // $('#step0').css('background-size', '400px 518px');
    }
    var file = null;

	$('#step3').on('change', '#encrypt-input', async function(e){

		// Has a file been selected?
        

		if(e.target.files.length!=1){
			showSnackbar('sélectionnez un fichier à chiffrer!');
			return false;
		}

        file = e.target.files[0];

        fichier   = new Fichier(null, null, null);
        
        if ('name' in file) {
            fichier.nom    = file.name;
        }
        else {
            fichier.nom    = file.fileName;
        }
        if ('size' in file) {
            fichier.taille  = file.size;
        }
        else {
            fichier.taille = file.fileSize;
        }
     
        // $('#encrypt-input').val("/home" + name + "/" + fichier.nom.toString());

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

		file =  e.target.files[0];

        fichier   = new Fichier(null, null, null);
        
        if ('name' in file) {
            fichier.nom    = file.name;
        }
        else {
            fichier.nom    = file.fileName;
        }
        if ('size' in file) {
            fichier.taille  = file.size;
        }
        else {
            fichier.taille = file.fileSize;
        }

		step(4);
        global_step = 4;
	});


	$('a.button.process').click(function(){

		var input = $(this).parent().find('input[type=password]'),
			a = $('#step5 a.download'),
			password = input.val(),
            input1 = $(this).parent().find('input[type=text]');


		input.val('');
        // password.val('');
        // input1.val('');

		if(password.length<5){
            if(password.length==0){
                showSnackbar('Veillez renseigner une clé de chiffrement !');
                return;
            }
			showSnackbar('Choisissez une plus longue clé !');
			return;
		}
        else if(input1.val() != "zerta" && (input1.val() == undefined || input1.val().toString().length == 0)){
            showSnackbar('Renseigner le chemin entier du fichier pour finaliser');
            return;
        }
        
        
        var reader = new FileReader();

		if(body.hasClass('encrypt')){

			// Encrypt the file!

            operation = new Operation(fichier.nom, fichier.taille, "AES-256", "Chiffrement", new Date(), password);


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

            localStorage.setItem(cpt+1, JSON.stringify(
                {
                    nomFichier : operation.nomFichier,
                    tailleFichier : operation.tailleFichier,
                    nomAlgo : operation.nomAlgo,
                    nomOpe : operation.nomOperation,
                    dateOpe : operation.dateChiffrement
                }
            ));
            cpt = cpt + 1;
            addInfoTable(JSON.stringify(
                {
                    nomFichier : operation.nomFichier,
                    tailleFichier : operation.tailleFichier,
                    nomAlgo : operation.nomAlgo,
                    nomOpe : operation.nomOperation,
                    dateOpe : operation.dateChiffrement
                })
            );
			reader.readAsDataURL(file);
            $('#step5 a').click(function(){
                showSnackbar("En cours... Consulter votre dossier et téléchargement");
                step(0);
            });

            total_chiffre = total_chiffre + 1;

            $('#step6 input').val(total_chiffre + " chiffré(s), " + total_dechiffre + " déchiffré(s), " + total_ouvert + " ouvert(s)");

		}
		else {

			// Decrypt it!

            operation = new Operation(fichier.nom, fichier.taille, "AES-256", "Déchiffrement", new Date(), password);


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
            localStorage.setItem(cpt+1, JSON.stringify(
                {
                    nomFichier : operation.nomFichier,
                    tailleFichier : operation.tailleFichier,
                    nomAlgo : operation.nomAlgo,
                    nomOpe : operation.nomOperation,
                    dateOpe : operation.dateChiffrement
                }
            ));
            cpt = cpt + 1;
            addInfoTable(JSON.stringify(
                {
                    nomFichier : operation.nomFichier,
                    tailleFichier : operation.tailleFichier,
                    nomAlgo : operation.nomAlgo,
                    nomOpe : operation.nomOperation,
                    dateOpe : operation.dateChiffrement
                })
            );
			reader.readAsText(file);

            $('#step5 a').click(function(){
                showSnackbar("En cours... Consulter votre dossier et téléchargement");
                step(0);
            });

            total_dechiffre = total_dechiffre + 1;
            
            $('#step6 input').val(total_chiffre + " chiffré(s), " + total_dechiffre + " déchiffré(s), " + total_ouvert + " ouvert(s)");


            
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



    next.click(function(){
        next_step();
    });

});

function  showSnackbar(message) {

    
    var x = document.getElementById("snackbar");
    
    x.innerHTML = message;

    x.className = "show";
  
    setTimeout(function(){
        x.className = x.className.replace("show", ""); 
    }, 2300);

} 


// END OF MY FUNCITONS


// Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}