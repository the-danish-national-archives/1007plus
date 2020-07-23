/*
 Model is responsible for left menu
 menu is based on sections HTML pages 
 each page start with <template> tag with class "section-template" and others subs classes where menu events is based on
*/
window.navigation = window.navigation || {},
    function (n) {
        const {app, getCurrentWindow, globalShortcut} = require('electron').remote;
        const fs = require('fs');
        const path = require('path');
        const os = require('os');
        const { spawn } = require('child_process');
        const { ipcRenderer} = require('electron');

        navigation.menu = {
            constants: {
                sectionTemplate: '.section-template',
                contentContainer: '#content',
                startSectionMenuItem: "#menu-welcome",
                startSection: "#welcome",
                scriptPath: "./assets/scripts/{0}",
                resourceWinPath: "resources\\{0}",
                converterFileName: "StyxForm.exe"
            },

            importSectionsToDOM: function () {
                const links = document.querySelectorAll('link[rel="import"]')
                Array.prototype.forEach.call(links, function (link) {
                    let template = link.import.querySelector(navigation.menu.constants.sectionTemplate)
                    let clone = document.importNode(template.content, true)
                    document.querySelector(navigation.menu.constants.contentContainer).appendChild(clone)
                })
            },

            setMenuOnClickEvent: function () {
                document.body.addEventListener('click', function (event) {
                    if (event.target.dataset.section) {
                        if(event.target.id === "menu-hybris-edit") {
                            Rigsarkiv.Hybris.Base.callback().setMode("Edit");
                            Rigsarkiv.Hybris.Structure.callback().reset();
                        }
                        if(event.target.id === "menu-hybris-new") {
                            Rigsarkiv.Hybris.Base.callback().setMode("New");
                            Rigsarkiv.Hybris.Structure.callback().reset();
                        }
                        $('#menu-side').find('.selected').removeClass('selected');
                        navigation.menu.hideAllSections();
                        navigation.menu.showSection(event);
                    }
                })
            },

            showSection: function (event) {
                const sectionId = event.target.dataset.section
                $('#' + sectionId).show()
                $('#' + sectionId + ' section').show()
                $('#' + event.target.id).addClass('selected');
            },

            showStartSection: function () {
                $(this.constants.startSectionMenuItem).click();
                $(this.constants.startSection).show();
                $(this.constants.startSection + ' section').show();
                $(this.constants.startSectionMenuItem).addClass('selected');
            },

            hideAllSections: function () {
                $(this.constants.contentContainer + ' section').hide()
            },

            init: function () {
                this.importSectionsToDOM()
                this.setMenuOnClickEvent()
                this.hideAllSections()
                this.showStartSection()
            }
        };

        n(function () {
            var outputErrorSpn = document.getElementById("menu-output-Error");
            var outputErrorText = outputErrorSpn.innerHTML;
            Rigsarkiv.Rights.initialize("menu-output-Error");
            navigation.menu.init();
            Rigsarkiv.Profile.initialize("menu-output-Error","menu-profile","profile-select-Languages","profile-save");
            Rigsarkiv.Language.initialize("menu-output-Error");
            var languageCallback = Rigsarkiv.Language.callback();
            languageCallback.setLanguage(Rigsarkiv.Profile.callback().data.lcid);
            Rigsarkiv.Links.callback().updateLinks(["instructions-link1","instructions-link2","instructions-link3","instructions-link4","instructions-link5","instructions-link6","instructions-link7","instructions-link8","instructions-link9","instructions-link10","instructions-link11","instructions-link12","instructions-link15","instructions-link16","instructions-link17","instructions-link18","instructions-link19","hypres-link1","about-link1"]);
            Rigsarkiv.Version.callback().updateLinks(["welcome-versionfooter"]);
            document.getElementById("menu-reload").addEventListener('click', function (event) {
                ipcRenderer.send('open-confirm-dialog','menu-reload',languageCallback.getValue("menu-reload-dialog-title"),languageCallback.getValue("menu-reload-dialog-text"),languageCallback.getValue("menu-reload-dialog-ok"),languageCallback.getValue("menu-reload-dialog-cancel"));
            });
            var styxLink = document.getElementById("menu-styx");
            styxLink.addEventListener('click', function (event) {
                var converterFilePath = navigation.menu.constants.scriptPath.format(navigation.menu.constants.converterFileName);    
                $('#side-menu').find('.selected').removeClass('selected');
                $(styxLink).addClass('selected');
                $('#' + event.target.dataset.section + ' section').show()
                if(!fs.existsSync(converterFilePath)) {
                    var rootPath = null;
                    if(os.platform() == "win32") {
                        rootPath = path.join('./');
                        converterFilePath = path.join(rootPath,navigation.menu.constants.resourceWinPath.format(navigation.menu.constants.converterFileName));
                    }
                    if(os.platform() == "darwin") {
                        var folders =  __dirname.split("/");
                        rootPath = folders.slice(0,folders.length - 3).join("/");
                        converterFilePath = "{0}/{1}".format(rootPath,navigation.menu.constants.converterFileName);
                    }
                }   
                var converter = spawn(converterFilePath);
                converter.stdout.on('data', (data) => console.logInfo(`stdout: ${data}`,"Rigsarkiv.Menu.AddEvents"));                  
                converter.stderr.on('data', (data) => (new Error(data).Handle(outputErrorSpn,outputErrorText,"Rigsarkiv.Menu.AddEvents")));
                converter.on('close', (code) => console.logInfo(`converter process exited with code ${code}`,"Rigsarkiv.Menu.AddEvents"));
            });
            $(styxLink).hide();
            if(Rigsarkiv.Rights.callback().isAdmin) {
                $(styxLink).show();
            }
            ipcRenderer.on('confirm-dialog-selection-menu-reload', (event, index) => {
                if(index === 0) {
                    getCurrentWindow().reload();
                } 
                if(index === 1) {  }            
            });
            ipcRenderer.on('app-close', (e) => {
                var languageCallback = Rigsarkiv.Language.callback();
                ipcRenderer.send('app-close',languageCallback.getValue("app-close-dialog-title"),
                languageCallback.getValue("app-close-dialog-text"),languageCallback.getValue("app-close-dialog-ok"),languageCallback.getValue("app-close-dialog-cancel")); 
            });
        })

    }(jQuery);