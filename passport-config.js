const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) { // si on a pas trouver le user qui est identifié par le email
      return done(null, false, { message: 'No user with that email' })//La méthode done() va retourner false et renvoyer le message et sortir 
    }

    try {
      if (await bcrypt.compare(password, user.password)) {// comparer le mot de passe écrit par l'utilisateur avec celle dans notre BDD (array) après le dycriptage en mode asynchrone
        return done(null, user)// Si le password est correct done va retourner la valeur par défaut ce qui est true
      } else { //Si le password 
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))//Utiliser la stratégie de bibliothèque Passport
  passport.serializeUser((user, done) => done(null, user.id))//stocker notre utilisateur dans la session
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize //Pour permettre de exporter la méthode initialize() dans autres fichiers