class Fichier{
    
    constructor(IdFichier, nom, taille, chemin, contenue){
    
        this.IdFichier      = IdFichier;
        this.nom            = nom;
        this.chemin         = chemin;
        this.taille         = taille;
        this.contenue  = contenue;

    }

}

class Utilisateur{

    constructor(IdUser, email, password){

        this.IdUser     = IdUser;
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

class Chiffrement{

    constructor(IdFichier, IdUser, IdAlgo, dateChiffrement, cleChiffrement){

        this.IdFichier          = IdFichier;
        this.IdUser             = IdUser;
        this.IdAlgo             = IdAlgo;
        this.dateChiffrement    = dateChiffrement;
        this.cleChiffrement     = cleChiffrement;

    }

}

class Dechiffrement{

    constructor(IdFichier, IdUser, IdAlgo, dateChiffrement, cleDechiffrement){

        this.IdFichier          = IdFichier;
        this.IdUser             = IdUser;
        this.IdAlgo             = IdAlgo;
        this.dateChiffrement    = dateChiffrement;
        this.cleDechiffrement   = cleDechiffrement;

    }

}

class Algorithme{

    constructor(IdAlgo, libelle){

        this.IdAlgo     = IdAlgo;
        this.libelle    = libelle;

    }

}



