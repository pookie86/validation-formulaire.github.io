   // Fonction de désactivation de l'affichage des "tooltips"
        
        function deactivateTooltips() {
        
            var spans = document.getElementsByTagName('span'),
            spansLength = spans.length;
            
            for (var i = 0 ; i < spansLength ; i++) {
                if (spans[i].className == 'tooltip') {
                    spans[i].style.display = 'none';
                }
            }
        
        }


        // La fonction ci-dessous permet de récupérer la "tooltip" qui correspond à notre input

        function getTooltip(elements) {
        
            while (elements = elements.nextSibling) {
                if (elements.className === 'tooltip') {
                    return elements;
                }
            }
            
            return false;
        
        }


        // Fonctions de vérification du formulaire, elles renvoient "true" si tout est ok

        var check = {}; // On met toutes nos fonctions dans un objet littéral

        check['sexe'] = function() {
        
            var sexe = document.getElementsByName('sexe'),
                tooltipStyle = getTooltip(sexe[1].parentNode).style;
            
            if (sexe[0].checked || sexe[1].checked) {
                tooltipStyle.display = 'none';
                return true;
            } else {
                tooltipStyle.display = 'inline-block';
                return false;
            }
        
        };

        check['lastName'] = function(id) {

            var name = document.getElementById(id),
                tooltipStyle = getTooltip(name).style;

            if (name.value.length >= 2) {
                name.className = 'correct';
                tooltipStyle.display = 'none';
                return true;
            } else {
                name.className = 'incorrect';
                tooltipStyle.display = 'inline-block';
                return false;
            }

        };

        check['firstName'] = check['lastName']; // La fonction pour le prénom est la même que celle du nom

        check['age'] = function() {

            var age = document.getElementById('age'),
                tooltipStyle = getTooltip(age).style,
                ageValue = parseInt(age.value);
            
            if (!isNaN(ageValue) && ageValue >= 5 && ageValue <= 140) {
                age.className = 'correct';
                tooltipStyle.display = 'none';
                return true;
            } else {
                age.className = 'incorrect';
                tooltipStyle.display = 'inline-block';
                return false;
            }

        };

        check['login'] = function() {
        
            var login = document.getElementById('login'),
                tooltipStyle = getTooltip(login).style;
            
            if (login.value.length >= 4) {
                login.className = 'correct';
                tooltipStyle.display = 'none';
                return true;
            } else {
                login.className = 'incorrect';
                tooltipStyle.display = 'inline-block';
                return false;
            }

        };

        check['pwd1'] = function() {
        
            var pwd1 = document.getElementById('pwd1'),
                tooltipStyle = getTooltip(pwd1).style;
            
            if (pwd1.value.length >= 6) {
                pwd1.className = 'correct';
                tooltipStyle.display = 'none';
                return true;
            } else {
                pwd1.className = 'incorrect';
                tooltipStyle.display = 'inline-block';
                return false;
            }
        
        };

        check['pwd2'] = function() {
        
            var pwd1 = document.getElementById('pwd1'),
                pwd2 = document.getElementById('pwd2'),
                tooltipStyle = getTooltip(pwd2).style;
            
            if (pwd1.value == pwd2.value && pwd2.value != '') {
                pwd2.className = 'correct';
                tooltipStyle.display = 'none';
                return true;
            } else {
                pwd2.className = 'incorrect';
                tooltipStyle.display = 'inline-block';
                return false;
            }
        
        };

        check['country'] = function() {
        
            var country = document.getElementById('country'),
                tooltipStyle = getTooltip(country).style;
            
            if (country.options[country.selectedIndex].value != 'none') {
                tooltipStyle.display = 'none';
                return true;
            } else {
                tooltipStyle.display = 'inline-block';
                return false;
            }
        
        };


        // Mise en place des événements
        
        (function() { // Utilisation d'une fonction anonyme pour éviter les variables globales.
        
            var myForm = document.getElementById('myForm'),
                inputs = document.getElementsByTagName('input'),
                inputsLength = inputs.length;
        
            for (var i = 0 ; i < inputsLength ; i++) {
                if (inputs[i].type == 'text' || inputs[i].type == 'password') {
        
                    inputs[i].onkeyup = function() {
                        check[this.id](this.id); // "this" représente l'input actuellement modifié
                    };
        
                }
            }
        
            myForm.onsubmit = function() {
        
                var result = true;
        
                for (var i in check) {
                    result = check[i](i) && result;
                }
        
                if (result) {
                    alert('Le formulaire est bien rempli.');
                }
        
                return false;
        
            };
        
            myForm.onreset = function() {
        
                for (var i = 0 ; i < inputsLength ; i++) {
                    if (inputs[i].type == 'text' || inputs[i].type == 'password') {
                        inputs[i].className = '';
                    }
                }
        
                deactivateTooltips();
        
            };
        
        })();


        // Maintenant que tout est initialisé, on peut désactiver les "tooltips"
        
        deactivateTooltips();
