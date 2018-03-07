import Ember from 'ember';


export default Ember.Controller.extend({
    firebaseApp: Ember.inject.service(),
    error: null,
    actions: {
        signUp() {
          console.log('bla');
            var email = document.getElementById("email").value;
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var password2 = document.getElementById("password2").value;

            let validLogin = this.passIsValid(password, password2) && this.usernameIsValid(username) && this.emailIsValid(email);

            console.log(validLogin);
            if (validLogin) {
               var self = this;
               this.get('firebaseApp').auth().createUserWithEmailAndPassword(email, password).then(result => {
                    var newUser = self.store.createRecord('user', {
                        id: result.uid,
                        email: email,
                        username: username,
                    });
                    newUser.save();

                    var fireUser = this.get('firebaseApp').auth().currentUser;
                  fireUser.updateProfile({
                        displayName: username,
                    }).then(function() {
                      Ember.Logger.log('ok update');
                    }).catch(function(error) {
                      Ember.Logger.log('ok update');
                    });

                    self.get('session').open('firebase', {
                        provider: 'password',
                        email: email,
                        password: password
                    }).then(() => {
                        self.transitionToRoute('application');
                    }, () => {
                        alert("Failure");
                    });
               }).catch(error => {
                   console.log('Chyba');
               })
            } else {
              this.set('error', 'Vyplňte všechna pole formuláře. Heslo musí obsahovat minimálně 6 znaků.')
            }
        }
    },
    passIsValid(password, password2) {
        return (password == password2 && password != "");
    },
    usernameIsValid(username) {
        return !this.usernameTaken(username);
    },
    usernameTaken(username) {
        if(username == "") {
            this.set('error', 'Zadejte uživatelské jméno.');
            return true;
        }
        this.store.query('user', {
                orderBy: 'username',
                equalTo: username
        }).then((records) => {
           if(records.get('length') > 0){
               this.set('error', 'Toto uživatelské jméno se již používá.');
               return true;
           }
           return false;
        });
    },
    emailIsValid(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email) == false) {
            this.set('error', 'Zadejte platný tvar e-mailové adresy. Např.: email@domena.cz');
            return false;
        }
        return !this.emailTaken(email);
    },
    emailTaken(email) {
        if (email == "") { return true; }

        this.store.query('user', {
                orderBy: 'email',
                equalTo: email
        }).then((records) => {
            if(records.get('length') > 0) {
                this.set('error', 'Tento e-mail se již používá.');
                return true;
            }
            return false;
        });
    }
});
