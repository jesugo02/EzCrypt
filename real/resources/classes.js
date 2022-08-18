class Fichier{
    
    constructor(nom, taille, contenue){

        this.nom            = nom;
        this.taille         = taille;
        this.contenue  = contenue;

    }

}

class Utilisateur{

    constructor(email, password){

        this.email     = email;
        this.password   = password;

    }

    signup(){

        let email = '';//

        var salt = CryptoJS.lib.WordArray.random(128/8);

        var key128Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 128/32 });
        var key256Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 256/32 });
        var key512Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 512/32 });

        var key512Bits1000Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 512/32, iterations: 1000 });


    }

}

class Operation{

    constructor(nomFichier, tailleFichier, nomAlgo, nomOperation, dateChiffrement, cleChiffrement){

        this.nomFichier         = nomFichier;
        this.tailleFichier      = tailleFichier;
        this.nomAlgo            = nomAlgo;
        this.nomOperation       = nomOperation
        this.dateChiffrement    = dateChiffrement;
        this.cleChiffrement     = cleChiffrement;

    }

}



class Algorithme{

    constructor(nomAlgo){

        this.nomAlgo     = nomAlgo;

    }

}



