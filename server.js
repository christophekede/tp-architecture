if (process.env.NODE_ENV !== 'production') {//Paramétrer nos variables d'environnement dans un fichier .env
  require('dotenv').config()
}
// inclure les dépendances
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash') //va etre utiliser par passport pour renvoyer les messages d'erreur comme faux password etc
const session = require('express-session')
const methodOverride = require('method-override')

//importer un objet passport avec la méthode initializePassport (initialize)qui est définie dans fichier passport-config.js:
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),//le parametre email va etre associer au retour de méthode find() qui retourne le email ou null s'il n'existe pas 
  id => users.find(user => user.id === id)
)
// tableau des utilisateurs en mémoire (pour raisons de tests) j'ai pas encore appris le sqlite
const users = []

app.set('view-engine', 'ejs') //Utiliser ejs comme view engine (Pas obligatoire mais plus simple )

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({ //
  secret: process.env.SESSION_SECRET,// Le clé de session qui est une variable d'environnement dans le fichier .env(la variable est une chaine aléatoire et secrete avec la quelle on génére une clé)
  resave: false,
  saveUninitialized: false //On permet pas d'enregistrer les objets utilisateurs vides(null) dans notre session  
}))
//Déclaration des fonctionnalités à utiliser
app.use(passport.initialize()) //importer le module passport situé dans passport-config.js
app.use(passport.session())
app.use(methodOverride('_method')) //Utiliser le methodOverride 
// redériger l'utilisateur au acceuil s'il est déja connecté(On teste ça avec la fonction checkAuthenticated)en utilisant les sesions
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name, email: req.user.email,id: req.user.id })
})
//Redériger l'utilisateur au page de login s'il n'est pas connecté (authenticated)
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {// Passport.authenticate est une méthode fournie par l'API ou middleware passport qui nous donne si un id est authentiqué 
  successRedirect: '/', //succées de passport donc réderiction vers la page d'acceuil
  failureRedirect: '/login', //échec de passport donc réderiction vers la page de connexion
  failureFlash: true //Permettre le module flash de renvoyer les message(situé dans passport-config.js) en cas de échec
}))
//Redériger(render) le client vers la page register si on a /register dans l'URl
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})
// on utilise la méthode post si le client ecrit des données et clique le boutton submit on envoie ces données:
app.post('/register', checkNotAuthenticated, async (req, res) => {//ces procédures sont faite en mode asynchrone car on doit attendre le hachage avent de créer l'objet user :
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) //La méthode hash() fourni par bcrypt pour assurer la sécurité de l'envoie du mot de passe 
    users.push({ //on ajoute un utilisateur dan le tableau(On va remplacer ça par faire des requétes au BDD)
      id: Date.now().toString(),  //on serve à chaque user un id qui se génére automatiquement et qui est plus sécurisé que des simples numéro 
      name: req.body.name, //On insère les données de l'objet user au BDD
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login') //Si l'inscription est bien effectué on redérige l'utilisateur au page login pour qu'il fasse un sign in
  } 
  //si l'inscription n'a pas marché comme attendu on redérige l'utilisateur au page d'inscription :
  catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => { //Cette méthode sera applée lors d'un click sur le boutton logout avec le method-override module 
  req.logOut() //logOut() est une méthode fournie par Passport pour déconnecter un utilisateur en toute sécurité
  res.redirect('/login')//après la déconnexion on effectue une rederiction vers la page de login 
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {//si l'utilisateur est authenticated,isAuthenticated() est une méthode fourni par le middleware passport
    return next() // On passe au suivant donc on sort de la méthode
  }

  res.redirect('/login')//si l'utilisateur est authenticated alors on le redirectionner au page de login comme ça on bloque l'accés au page d'acceuil pour ceux qui sont pas bien authentiqué 
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {//si l'utilisateur est bien authentiqué
    return res.redirect('/') //on le redérige vers la page d'acceuil(meme s'il entre la requete ou l'URL de la page de login)comme ça on garde sa session ouverte jusqu'il déconnecte
  }
  next()
}

app.listen(3000) // Port du serveur