/**
 * Created by JetBrains WebStorm.
 * User: Ramirez
 * Date: 6/30/12
 * Time: 2:57 PM
 */

$(document).ready(

    function(){

        var HelloWorldFactory = function() {

            var builder = {
                buildDateAnnouncement: function() {
                    var today = Date.today();
                    return "Today is " + today;
                },
                buildMessageSender: function() {
                    function send(message){
                        document.writeln(message)
                    }
                    return {
                        send: send
                    };
                }
            };

            var parts = {
                greeting: "Hello World!",
                dateAnnouncement: builder.buildDateAnnouncement(),
                messageSender: builder.buildMessageSender()
            };

            var packaging = {
                makeInterface: function makeInterface (){
                    return {
                        sayHello: this.sayHello
                    };
                }
            };

            var assemblyLine = {
                begin: function() {
                    this.product = {};
                    return this;
                },
                addGreeting: function () {
                    var product = this.product;
                    product.greeting = parts.greeting;
                    return this;
                },
                addDateAnnouncement: function () {
                    var product = this.product;
                    product.dateAnnouncement = parts.dateAnnouncement;
                    return this;
                },
                addMessageSender: function () {
                    var product = this.product;
                    product.messageSender = parts.messageSender;
                    return this;
                },
                configureHelloWorldMessage: function(){
                    var product = this.product;
                    var sender = product.messageSender;
                    function sayHello(){
                        sender.send(product.greeting);
                    }
                    product.sayHello = sayHello;
                    return this;
                },
                configureFancyHelloWorldMessage: function(){
                    var product = this.product;
                    var sender = product.messageSender;
                    function sayHello(){
                        sender.send(product.greeting);
                        sender.send(product.dateAnnouncement);
                    }
                    product.sayHello = sayHello;
                    return this;
                },
                finish: function () {
                    var product = this.product;
                    product = packaging.makeInterface.call(product);
                    this.product = null;
                    return product;
                }
            };

            var produceHelloWorld = function () {
                return assemblyLine
                        .begin()
                        .addGreeting()
                        .addMessageSender()
                        .configureHelloWorldMessage()
                        .finish();
            };

            var produceFancyHelloWorld = function () {
                return assemblyLine
                        .begin()
                        .addGreeting()
                        .addDateAnnouncement()
                        .addMessageSender()
                        .configureFancyHelloWorldMessage()
                        .finish();
            };

            return {
                produceHelloWorld: produceHelloWorld,
                produceFancyHelloWorld: produceFancyHelloWorld
            };

        };

        var factory = HelloWorldFactory();
        var helloWorld = factory.produceFancyHelloWorld();
        helloWorld.sayHello();
    }

);

