/*var mail = (function(){
    
    var respond = function (type, lang) {
        
        var message = "",
            title = "",
            $modal = $("#modal-dialog");
        
        if (lang != "pl") {

            if (type)
                message = "Message sent correctly!";
            else
                message = "Message didn't send correctly! Something went wrong!";
            
            title = "Message status";

        } else {

            if (type)
                message = "Wiadomość została wysłana poprawnie!";
            else
                message = "Wiadomość nie została wysłana poprawnie! Coś poszło nie tak!";
            
            title = "Status wiadomości";

        }
        
        $modal.find(".modal-title").text(title);
        $modal.find(".modal-body").text(message);
        
        $modal.modal({show: true});
        
        console.log("Message status: " + message);
        
    };
    
    var sendRequest = function (name, email, subject, message, quiet) {
        
        $.post("mail.php?lang=" + lang + "&quiet=" + quiet, { 

            name: name,
            email: email,
            subject: subject,
            message: message

        }, function (data) {

            if (data == "true") {

                $(".contact").trigger('reset');
                respond(true, lang);

            } else {

                respond(false, lang);

            }

        });

    };
    
    var validateEmail = function (email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };
    
    var validation = function () {
        
        var name = $('#name').val(),
            email = $('#email').val(),
            subject = $('#subject').val(),
            message = $('#message').val();

        if (name.length > 3 && subject.length > 3 && validateEmail(email) && message.length > 10) {

            console.log(name + " " + email + " " + subject + " " + message);

            sendRequest(name, email, subject, message, false);
            
        } else {

            respond(false, lang);

        }

        event.preventDefault();
        
    };
    
    $('#send').on('click', validation);
    
    return {
        sendRequest: sendRequest
    }
    
})();*/

'use strict';

class Mail {
    
    constructor(mail, modal) {
        
        this.lang = lang;
        this.$contact = $(`#${contactFormIdt}`);
        this.$name = $(`#${name}`);
        this.$email = $(`#${email}`);
        this.$subject = $(`#${subject}`);
        this.$message = $(`#${message}`);
        
    }
    
    _validate() {
        
        const name = this.$name.val();
        const email = this.$email.val();
        const subject = this.$subject.val();
        const message = this.$message.val();

        if (name.length > 3 && subject.length > 3 && validateEmail(email) && message.length > 10) {

            console.log(name + " " + email + " " + subject + " " + message);

            this.request(name, email, subject, message, false);
            
        } else {

            this._respond(false);

        }
        
    }
    
    _validateEmail(email) {
        
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
        
    }
    
    request (name, email, subject, message, quiet = false) {
        
        $.post(`mail.php?lang=${lang}&quiet=${quiet}`, { 

            name: name,
            email: email,
            subject: subject,
            message: message

        }, function (data) {

            if (data == "true") {

                $(".contact").trigger('reset');
                this._respond(true);

            } else {

                this._respond(false);

            }

        });

    }
    
    _respond(type) {
        
        var message = "",
            title = "",
            $modal = $("#modal-dialog");
        
        if (this.lang != "pl") {

            if (type)
                message = "Message sent correctly!";
            else
                message = "Message didn't send correctly! Something went wrong!";
            
            title = "Message status";

        } else {

            if (type)
                message = "Wiadomość została wysłana poprawnie!";
            else
                message = "Wiadomość nie została wysłana poprawnie! Coś poszło nie tak!";
            
            title = "Status wiadomości";

        }
        
        $modal.find(".modal-title").text(title);
        $modal.find(".modal-body").text(message);
        
        $modal.modal({show: true});
        
        console.log("Message status: " + message);
        
    }
    
    send(event) {
        
        this._validate();
        
        event.preventDefault();
        
    }
    
}

const mail = new Mail({
    contactFormSelector: '#contact', 
    nameInputSelector: '#name', 
    emialInputSelector: '#email',
    subjectInputSelector: '#subject',
    messageInputSelector: '#message'
}, {
    modalFormSelector: '#modal-dialog',
    modalTitleSelector: '.modal-title',
    modalBodySelector: '.modal-body'
});

$('#send').on('click', mail.send);