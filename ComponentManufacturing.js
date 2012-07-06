/**
 * Created by JetBrains WebStorm.
 * User: Ramirez
 * Date: 6/30/12
 * Time: 2:57 PM
 */

$(document).ready(

    function () {

        var helloWorldFactory = function () {

            var builders = {
                buildDateAnnouncement:function () {
                    var today = Date.today();
                    return "Today is " + today;
                },
                buildMessageSender:function () {
                    var send = function (message) {
                        document.writeln(message);
                    };
                    return {
                        send:send
                    };
                }
            };

            var parts = {
                greeting:"Hello World!",
                dateAnnouncement:builders.buildDateAnnouncement(),
                messageSender:builders.buildMessageSender()
            };

            var packaging = {
                makeInterface:function () {
                    return {
                        sayHello:this.sayHello
                    };
                }
            };

            var assemblyLine = {
                begin:function () {
                    this.product = {};
                    return this;
                },
                addGreeting:function () {
                    var product = this.product;
                    product.greeting = parts.greeting;
                    return this;
                },
                addDateAnnouncement:function () {
                    var product = this.product;
                    product.dateAnnouncement = parts.dateAnnouncement;
                    return this;
                },
                addMessageSender:function () {
                    var product = this.product;
                    product.messageSender = parts.messageSender;
                    return this;
                },
                configureHelloWorldMessage:function () {
                    var product = this.product;
                    var sender = product.messageSender;
                    this.sayHello = function () {
                        sender.send(product.greeting);
                    };
                    return this;
                },
                configureFancyHelloWorldMessage:function () {
                    var product = this.product;
                    var sender = product.messageSender;
                    this.sayHello = function () {
                        sender.send(product.greeting);
                        sender.send(product.dateAnnouncement);
                    };
                    return this;
                },
                finish:function () {
                    var product = this.product;
                    product = packaging.makeInterface.call(product);
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
                produceHelloWorld:produceHelloWorld,
                produceFancyHelloWorld:produceFancyHelloWorld
            };

        };

        var factory = helloWorldFactory();
        var helloWorld = factory.produceFancyHelloWorld();
        helloWorld.sayHello();
    }

);

