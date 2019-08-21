/*
    Model is responsible for metadata inputs
    initialize interface inputs: elements from <div id="hybris-panel-metdata">
    create metadata.txt
*/
window.Rigsarkiv = window.Rigsarkiv || {},
    function (n) {
        Rigsarkiv.Hybris = Rigsarkiv.Hybris || {},
        function (n) {
            const { ipcRenderer } = require('electron');
            const fs = require('fs');
            const path = require('path');
            const os = require('os');
            const chardet = require('chardet');

            const startNumberPattern = /^([0-9])([a-zA-ZæøåÆØÅ0-9_]*)$/;
            const validFileNamePattern = /^([a-zA-ZæøåÆØÅ])([a-zA-ZæøåÆØÅ0-9_]*)$/;
            const reservedWordPattern = /^(ABSOLUTE|ACTION|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|AND|ANY|ARE|ARRAY|AS|ASC|ASSERTION|AT|AUTHORIZATION|BEFORE|BEGIN|BINARY|BIT|BLOB|BOOLEAN|BOTH|BREADTH|BY|CALL|CASCADE|CASCADED|CASE|CAST|CATALOG|CHAR|CHARACTER|CHECK|CLASS|CLOB|CLOSE|COLLATE|COLLATION|COLUMN|COMMIT|COMPLETION|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS ||CONSTRUCTOR|CONTINUE|CORRESPONDING|CREATE|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|CYCLE|DATA|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DICTIONARY|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DOUBLE|DROP|DYNAMIC|EACH|ELSE|END|END-EXEC|EQUALS|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXTERNAL|FALSE|FETCH|FIRST|FLOAT|FOR|FOREIGN|FOUND|FROM|FREE|FULL|FUNCTION|GENERAL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|GROUPING|HAVING|HOST|HOUR|IDENTITY|IGNORE|IMMEDIATE|IN|INDICATOR|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ISOLATION|ITERATE|JOIN|KEY|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LEFT|LESS|LEVEL|LIKE|LIMIT|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATOR|MAP|MATCH|MINUTE|MODIFIES|MODIFY|MODULE|MONTH|NAMES|NATIONAL|NATURAL|NCHAR|NCLOB|NEW|NEXT|NO|NONE|NOT|NULL|NUMERIC|OBJECT|OF|OFF|OLD|ON|ONLY|OPEN|OPERATION|OPTION|OR|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|PAD|PARAMETER|PARAMETERS|PARTIAL|PATH|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|RELATIVE|RESTRICT|RESULT|RETURN|RETURNS|REVOKE|RIGHT|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROW|ROWS|SAVEPOINT|SCHEMA|SCROLL|SCOPE|SEARCH|SECOND|SECTION|SELECT|SEQUENCE|SESSION|SESSION_USER|SET|SETS|SIZE|SMALLINT|SOME|SPACE|SPECIFIC|SPECIFICTYPE|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATE|STATEMENT|STATIC|STRUCTURE|SYSTEM_USER|TABLE|TEMPORARY|TERMINATE|THAN|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSACTION|TRANSLATION|TREAT|TRIGGER|TRUE|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UPDATE|USAGE|USER|USING|VALUE|VALUES|VARCHAR|VARIABLE|VARYING|VIEW|WHEN|WHENEVER|WHERE|WITH|WITHOUT|WORK|WRITE|YEAR|ZONE)$/i;
            const enclosedReservedWordPattern = /^(")(ABSOLUTE|ACTION|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|AND|ANY|ARE|ARRAY|AS|ASC|ASSERTION|AT|AUTHORIZATION|BEFORE|BEGIN|BINARY|BIT|BLOB|BOOLEAN|BOTH|BREADTH|BY|CALL|CASCADE|CASCADED|CASE|CAST|CATALOG|CHAR|CHARACTER|CHECK|CLASS|CLOB|CLOSE|COLLATE|COLLATION|COLUMN|COMMIT|COMPLETION|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS ||CONSTRUCTOR|CONTINUE|CORRESPONDING|CREATE|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|CYCLE|DATA|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DICTIONARY|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DOUBLE|DROP|DYNAMIC|EACH|ELSE|END|END-EXEC|EQUALS|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXTERNAL|FALSE|FETCH|FIRST|FLOAT|FOR|FOREIGN|FOUND|FROM|FREE|FULL|FUNCTION|GENERAL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|GROUPING|HAVING|HOST|HOUR|IDENTITY|IGNORE|IMMEDIATE|IN|INDICATOR|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ISOLATION|ITERATE|JOIN|KEY|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LEFT|LESS|LEVEL|LIKE|LIMIT|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATOR|MAP|MATCH|MINUTE|MODIFIES|MODIFY|MODULE|MONTH|NAMES|NATIONAL|NATURAL|NCHAR|NCLOB|NEW|NEXT|NO|NONE|NOT|NULL|NUMERIC|OBJECT|OF|OFF|OLD|ON|ONLY|OPEN|OPERATION|OPTION|OR|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|PAD|PARAMETER|PARAMETERS|PARTIAL|PATH|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|RELATIVE|RESTRICT|RESULT|RETURN|RETURNS|REVOKE|RIGHT|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROW|ROWS|SAVEPOINT|SCHEMA|SCROLL|SCOPE|SEARCH|SECOND|SECTION|SELECT|SEQUENCE|SESSION|SESSION_USER|SET|SETS|SIZE|SMALLINT|SOME|SPACE|SPECIFIC|SPECIFICTYPE|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATE|STATEMENT|STATIC|STRUCTURE|SYSTEM_USER|TABLE|TEMPORARY|TERMINATE|THAN|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSACTION|TRANSLATION|TREAT|TRIGGER|TRUE|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UPDATE|USAGE|USER|USING|VALUE|VALUES|VARCHAR|VARIABLE|VARYING|VIEW|WHEN|WHENEVER|WHERE|WITH|WITHOUT|WORK|WRITE|YEAR|ZONE)(")$/i;
            const strLength = 128;

            //private data memebers
            var settings = {
                fileName: null,
                fileDescr: null,
                keyVar: null,
                okBtn: null,
                outputOkSpn: null,
                outputOkText: null,
                okDataPath: null,
                outputErrorSpn: null,
                outputErrorText: null,
                outputNewExtractionSpn: null,
                outputNewExtractionText: null,            
                newExtractionBtn: null,
                nextBtn: null,
                outputNextSpn: null,
                extractionTab: null,
                referencesTab: null,
                fileNameReqTitle: null,
                fileNameReqText: null,
                fileDescrReqTitle: null,
                fileDescrReqText: null,
                numberFirstTitle: null,
                numberFirstText: null,
                illegalCharTitle: null,
                illegalCharText: null,
                fileNameLengthTitle: null,
                fileNameLengthText: null,
                fileNameReservedWordTitle: null,
                fileNameReservedWordText: null,
                outputCloseApplicationErrorTitle: null,
                outputCloseApplicationErrorText: null,
                informationPanel1: null,
                informationPanel2: null,
                indexFilesDescriptionSpn: null,
                indexFilesDescriptionText: null,
                numberFirstKeyTitle: null,
                numberFirstKeyText: null,
                illegalCharKeyTitle: null,
                illegalCharKeyText: null,
                keyLengthTitle: null,
                keyLengthText: null,
                keyReservedWordTitle: null,
                keyReservedWordText: null,
                variablesDropdown: null,
                varKeyReqTitle: null,
                varKeyReqText: null,
                contents: ["","","",""],
                varKeys: [],
                references: [],
                data: [],
                metadataFileName: "{0}.txt",
                dataFileName: "{0}.csv",
                metadataTemplateFileName: "metadata.txt",
                scriptPath: "./assets/scripts/{0}",
                resourceWinPath: "resources\\{0}",
                styleBox: null
            }

            //reset status & input fields
            var Reset = function () {
                settings.informationPanel1.hidden = false;
                settings.informationPanel2.hidden = true;
                settings.outputErrorSpn.hidden = true;
                settings.nextBtn.hidden = true;
                settings.contents = ["","","",""];
                settings.styleBox.hidden = true;
            }        

            //get metadata file name
            var GetMetaDataFileName = function() {
                return settings.metadataFileName.format(GetDataFolderName());
            }

            // get selected data table folder name 
            var GetDataFolderName = function() {
                var dataFolderPath = settings.extractionCallback().dataFolderPath;
                var folders = dataFolderPath.getFolders();
                return folders[folders.length - 1];
            }

            var GetNewLine = function() {
                var result = "\r";
                if(os.platform() == "win32") { result = "\r\n"; }
                if(os.platform() == "darwin") { result = "\n"; }
                return result;
            }

            // Cleanup Files
            var CleanupFiles = function(files,fileName) {
                var result = false;
                var dataFolderPath = settings.extractionCallback().dataFolderPath;
                files.forEach(file => {
                    if(file != settings.dataFileName.format(fileName) && file != settings.metadataFileName.format(fileName)) {
                        console.logInfo("delete file : " + file,"Rigsarkiv.Hybris.MetaData.Cleanup");
                        try {
                            var srcFilePath = dataFolderPath;
                            srcFilePath += (srcFilePath.indexOf("\\") > -1) ? "\\{0}".format(file) : "/{0}".format(file);
                            fs.unlinkSync(srcFilePath);                                
                        }
                        catch(err) {
                            result = true;
                            err.Handle(settings.outputErrorSpn,settings.outputErrorText,"Rigsarkiv.Hybris.MetaData.CleanupFiles");
                        }                            
                    }
                });
                return result;
            }

            //delete other txt files from statistic program
            var Cleanup = function() {
                var dataFolderPath = settings.extractionCallback().dataFolderPath;
                fs.readdir(dataFolderPath, (err, files) => {
                    if (err) {
                        err.Handle(settings.outputErrorSpn,settings.outputErrorText,"Rigsarkiv.Hybris.MetaData.Cleanup");
                    }
                    else {
                        var fileName = GetDataFolderName();                        
                        var hasError = CleanupFiles(files,fileName);
                        var callback = settings.extractionCallback();
                        var dataFolderPath = callback.dataFolderPath;                        
                        if(hasError) {
                            ipcRenderer.send('open-error-dialog',settings.outputCloseApplicationErrorTitle.innerHTML,settings.outputCloseApplicationErrorText.innerHTML);
                        }
                        else {
                            var folders = callback.selectedStatisticsFilePath.getFolders();                            
                            settings.informationPanel1.hidden = true;
                            settings.informationPanel2.hidden = false;
                            settings.nextBtn.hidden = false;
                            settings.outputOkSpn.innerHTML = settings.outputOkText.format(settings.dataFileName.format(fileName),settings.metadataFileName.format(fileName),folders[folders.length - 1]);
                            settings.okDataPath.innerHTML = callback.localFolderPath;
                            folders = dataFolderPath.getFolders();
                            settings.outputNewExtractionSpn.innerHTML = settings.outputNewExtractionText.format(folders[folders.length - 3]);
                            settings.indexFilesDescriptionSpn.innerHTML = settings.indexFilesDescriptionText.format(folders[folders.length - 3]);
                            var variables = [];
                            for (var i = 0; i < settings.variablesDropdown.options.length; i++) {
                                variables.push(settings.variablesDropdown.options[i].value);
                            }
                            settings.data.push({ "fileName":fileName, "name":settings.fileName.value, "variables":variables, "keys":settings.varKeys, "references":[] });
                            console.log("{0} data output: ".format(settings.fileName));
                            console.log(settings.data);
                        }                                                          
                    }
                });
            }

            //rename Statistics file name 
            var RenameFile = function() {
                var folders = settings.extractionCallback().selectedStatisticsFilePath.getFolders();
                var srcFileName = folders[folders.length - 1];
                srcFileName = srcFileName.substring(0,srcFileName.indexOf("."));
                srcFileName = settings.dataFileName.format(srcFileName);
                var destFileName = GetDataFolderName();
                destFileName = settings.dataFileName.format(destFileName);
                var dataFolderPath = settings.extractionCallback().dataFolderPath;

                console.logInfo("rename {0} file to: {1}".format(srcFileName,destFileName),"Rigsarkiv.Hybris.MetaData.RenameFile");                
                var srcFilePath = dataFolderPath;
                srcFilePath += (srcFilePath.indexOf("\\") > -1) ? "\\{0}".format(srcFileName) : "/{0}".format(srcFileName);
                var destFilePath = dataFolderPath;
                destFilePath += (destFilePath.indexOf("\\") > -1) ? "\\{0}".format(destFileName) : "/{0}".format(destFileName);
                fs.rename(srcFilePath,destFilePath, (err) => {
                    if (err) {
                        err.Handle(settings.outputErrorSpn,settings.outputErrorText,"Rigsarkiv.Hybris.MetaData.RenameFile");
                    }
                    else {
                        console.logInfo("Rename complete!","Rigsarkiv.Hybris.MetaData.RenameFile");
                        Cleanup();
                    }
                }); 
            }

            //update metadata txt file
            var UpdateFile = function() {
                var metadataFileName = GetMetaDataFileName();
                var srcFilePath = settings.extractionCallback().dataFolderPath;
                srcFilePath += (srcFilePath.indexOf("\\") > -1) ? "\\{0}".format(metadataFileName) : "/{0}".format(metadataFileName);
                fs.readFile(srcFilePath, (err, data) => {
                    if (err) {
                        err.Handle(settings.outputErrorSpn,settings.outputErrorText,"Rigsarkiv.Hybris.MetaData.UpdateFile");
                    }
                    else {
                        var callback = settings.extractionCallback();
                        var metadataFileName = GetMetaDataFileName();
                        var scriptType = callback.scriptType;
                        var keyVar = (settings.varKeys.length > 0) ? "{0}{1}".format(settings.varKeys.join(" "),GetNewLine()) : "";
                        var updatedData = data.toString().format(scriptType,settings.fileName.value,settings.fileDescr.value,keyVar,"{0}",settings.contents[0],settings.contents[1],settings.contents[2],settings.contents[3]);
                        var srcFilePath = callback.dataFolderPath;
                        srcFilePath += (srcFilePath.indexOf("\\") > -1) ? "\\{0}".format(metadataFileName) : "/{0}".format(metadataFileName);
                        fs.writeFile(srcFilePath, updatedData, (err) => {
                            if (err) {
                                err.Handle(settings.outputErrorSpn,settings.outputErrorText,"Rigsarkiv.Hybris.MetaData.UpdateFile");
                            }
                            else {
                                RenameFile();
                            }
                        });
                    }
                });
            }

            //copy metadata txt file to data table
            var EnsureFile = function() {
                var dataFolderPath = settings.extractionCallback().dataFolderPath;
                var metadataFileName = GetMetaDataFileName();
                var metadataFilePath = settings.scriptPath.format(settings.metadataTemplateFileName);
                if(!fs.existsSync(metadataFilePath)) {
                    var rootPath = null;
                    if(os.platform() == "win32") {
                        rootPath = path.join('./');
                        metadataFilePath = path.join(rootPath,settings.resourceWinPath.format(settings.metadataTemplateFileName));
                    }
                    if(os.platform() == "darwin") {
                        var folders =  __dirname.split("/");
                        rootPath = folders.slice(0,folders.length - 4).join("/");
                        metadataFilePath = "{0}/{1}".format(rootPath,settings.metadataTemplateFileName);
                    }
                }

                console.logInfo(`copy ${settings.metadataTemplateFileName} file to: ${dataFolderPath}`,"Rigsarkiv.Hybris.MetaData.EnsureFile");
                var destFilePath = dataFolderPath;
                destFilePath += (destFilePath.indexOf("\\") > -1) ? "\\{0}".format(metadataFileName) : "/{0}".format(metadataFileName);
                fs.copyFile(metadataFilePath,destFilePath, (err) => {
                    if (err) {
                        err.Handle(settings.outputErrorSpn,settings.outputErrorText,"Rigsarkiv.Hybris.MetaData.EnsureFile");
                    }
                    else {
                        console.logInfo("{0} was copied to {1}".format(GetMetaDataFileName(),settings.extractionCallback().dataFolderPath),"Rigsarkiv.Hybris.MetaData.EnsureFile");
                        UpdateFile();
                    }
                });
            }

            //remove UTF8 boom charactors
            var GetFileContent = function(filePath) {
                var fileContent = fs.readFileSync(filePath);
                if(fileContent.byteLength >= 3 && (fileContent[0] & 0xff) == 0xef && (fileContent[1] & 0xff) == 0xbb && (fileContent[2] & 0xff) == 0xbf) {
                    return fileContent.toString("utf8",3);
                }
                else {
                    return fileContent.toString();
                }
            }

            //build metadata file content
            var EnsureData = function() {
                var dataFolderPath = settings.extractionCallback().dataFolderPath;
                fs.readdir(dataFolderPath, (err, files) => {
                    if (err) {
                        err.Handle(settings.outputErrorSpn,settings.outputErrorText,"Rigsarkiv.Hybris.MetaData.EnsureData");
                    }
                    else {
                        var dataFolderPath = settings.extractionCallback().dataFolderPath;
                        console.logInfo(`get texts contents: ${dataFolderPath}`,"Rigsarkiv.Hybris.MetaData.EnsureData");
                        files.forEach(file => {
                            var filePath = dataFolderPath;
                            filePath += (filePath.indexOf("\\") > -1) ? "\\{0}".format(file) : "/{0}".format(file);
                            if(file.lastIndexOf("_VARIABEL.txt") > -1) {
                                settings.contents[0] = GetFileContent(filePath);
                            }
                            if(file.lastIndexOf("_VARIABELBESKRIVELSE.txt") > -1) {
                                settings.contents[1] = GetFileContent(filePath);
                            }
                            if(file.lastIndexOf("_KODELISTE.txt") > -1) {
                                settings.contents[2] = GetFileContent(filePath);
                            }
                            if(file.lastIndexOf("_BRUGERKODE.txt") > -1) {
                                settings.contents[3] = GetFileContent(filePath);
                            }
                        });
                        EnsureFile();
                    }
                });
            }

            //validation of input fileds with dialog popups
            var ValidateFields = function() {
                var result = true;
                if (settings.fileName.value === "") {
                    ipcRenderer.send('open-error-dialog',settings.fileNameReqTitle.innerHTML,settings.fileNameReqText.innerHTML);
                    result = false;
                }
                if(result && settings.fileDescr.value === "") {
                    ipcRenderer.send('open-error-dialog',settings.fileDescrReqTitle.innerHTML,settings.fileDescrReqText.innerHTML);
                    result = false;
                }
                if (result && startNumberPattern.test(settings.fileName.value)) {
                    ipcRenderer.send('open-error-dialog',settings.numberFirstTitle.innerHTML,settings.numberFirstText.innerHTML);
                    result = false;
                }
                if (result && !validFileNamePattern.test(settings.fileName.value)) {
                    if(!enclosedReservedWordPattern.test(settings.fileName.value)) {
                        ipcRenderer.send('open-error-dialog',settings.illegalCharTitle.innerHTML,settings.illegalCharText.innerHTML);
                        result = false;
                    }
                }
                if (result && settings.fileName.value.length > strLength) {
                    ipcRenderer.send('open-error-dialog',settings.fileNameLengthTitle.innerHTML,settings.fileNameLengthText.innerHTML);
                    result = false;
                }
                if (result && reservedWordPattern.test(settings.fileName.value)) {
                    ipcRenderer.send('open-error-dialog',settings.fileNameReservedWordTitle.innerHTML,settings.fileNameReservedWordText.innerHTML);
                    result = false;
                }
                return result;
            }

            // validate keys
            var ValidateKey = function(keyValue) {
                var result = true;
                if (result && startNumberPattern.test(keyValue)) {
                    ipcRenderer.send('open-error-dialog',settings.numberFirstKeyTitle.innerHTML,settings.numberFirstKeyText.innerHTML);
                    result = false;
                }
                if (result && !validFileNamePattern.test(keyValue)) {
                    if(!enclosedReservedWordPattern.test(keyValue)) {
                        ipcRenderer.send('open-error-dialog',settings.illegalCharKeyTitle.innerHTML,settings.illegalCharKeyText.innerHTML);
                        result = false;
                    }
                }
                if (result && keyValue.length > strLength) {
                    ipcRenderer.send('open-error-dialog',settings.keyLengthTitle.innerHTML,settings.keyLengthText.innerHTML);
                    result = false;
                }
                if (result && reservedWordPattern.test(keyValue)) {
                    ipcRenderer.send('open-error-dialog',settings.keyReservedWordTitle.innerHTML,settings.keyReservedWordText.innerHTML);
                    result = false;
                }
                return result;
            }

            //implments new data table extraction
            var ResetExtraction = function() {
                settings.extractionCallback().reset();
                Reset();
                $("#{0} tr:not(:first-child)".format(settings.varKeysTbl.id)).remove();
                settings.varKeysTbl.hidden = true;
                settings.varKeys = [];
                settings.references = [];
                settings.fileName.value = "";
                settings.fileDescr.value = "";
                settings.keyVar.value = "";
            }

            //add Event Listener to HTML elmenets
            var AddEvents = function () {
                settings.nextBtn.addEventListener('click', (event) => {
                    settings.data.forEach(table => {
                        var el = document.createElement('option');
                        el.textContent = table.fileName;
                        el.value = table.name;
                        settings.tablesDropdown.appendChild(el);
                    });
                    settings.referencesTab.click();
                });
                settings.newExtractionBtn.addEventListener('click', (event) => {
                    ResetExtraction();
                    settings.extractionTab.click();
                });
                settings.okDataPath.addEventListener('click', (event) => {
                    ipcRenderer.send('open-item',settings.extractionCallback().localFolderPath);
                })
                settings.okBtn.addEventListener('click', function (event) {
                    Reset();
                    if(ValidateFields()) { EnsureData(); }
                })
                settings.addVarKeyBtn.addEventListener('click', function (event) {
                    var key = settings.keyVar.value;
                    if(key != null && key !== "") {
                        if(ValidateKey(key) && !settings.varKeys.includes(key)) {
                            settings.varKeys.push(key);
                            settings.varKeysTbl.hidden = false;
                            $(settings.varKeysTbl).append("<tr><td>{0}</td></tr>".format(key));
                            settings.keyVar.value = "";
                        }
                    }
                    else {
                        ipcRenderer.send('open-error-dialog',settings.varKeyReqTitle.innerHTML,settings.varKeyReqText.innerHTML);
                    }
                });
            }

            //Model interfaces functions
            Rigsarkiv.Hybris.MetaData = {
                initialize: function (extractionCallback,metadataFileName,metadataFileNameDescription,metadataKeyVariable,metdataOkBtn,inputFileNameRequired,inputNumberFirst,inputIllegalChar,outputOkId,okDataPathId,outputErrorId,outputNewExtractionId,newExtractionBtn,extractionTabId,outputNextId,nextBtn,referencesTabId,fileNameLengthId,fileNameReservedWordId,fileDescrReqId,informationPanel1Id,informationPanel2Id,indexFilesDescriptionId,outputCloseApplicationErrorPrefixId,resetHideBox,numberFirstKeyId,illegalCharKeyId,keyLengthId,keyReservedWordId,variablesId,addVarKeyId,varKeysId,varKeyReqId,tablesId) {
                    settings.extractionCallback = extractionCallback;
                    settings.fileName = document.getElementById(metadataFileName);
                    settings.fileDescr = document.getElementById(metadataFileNameDescription);
                    settings.keyVar = document.getElementById(metadataKeyVariable);
                    settings.okBtn = document.getElementById(metdataOkBtn);
                    settings.fileNameReqTitle = document.getElementById(inputFileNameRequired + "-Title");
                    settings.fileNameReqText = document.getElementById(inputFileNameRequired + "-Text");
                    settings.numberFirstTitle = document.getElementById(inputNumberFirst + "-Title");
                    settings.numberFirstText = document.getElementById(inputNumberFirst + "-Text");
                    settings.illegalCharTitle = document.getElementById(inputIllegalChar + "-Title");
                    settings.illegalCharText = document.getElementById(inputIllegalChar + "-Text");
                    settings.outputOkSpn = document.getElementById(outputOkId);
                    settings.outputOkText = settings.outputOkSpn.innerHTML;
                    settings.okDataPath = document.getElementById(okDataPathId);
                    settings.outputErrorSpn = document.getElementById(outputErrorId);
                    settings.outputErrorText = settings.outputErrorSpn.innerHTML; 
                    settings.outputNewExtractionSpn = document.getElementById(outputNewExtractionId);
                    settings.outputNewExtractionText = settings.outputNewExtractionSpn.innerHTML;
                    settings.newExtractionBtn = document.getElementById(newExtractionBtn);
                    settings.extractionTab = document.getElementById(extractionTabId);
                    settings.outputNextSpn = document.getElementById(outputNextId); 
                    settings.nextBtn = document.getElementById(nextBtn);
                    settings.referencesTab = document.getElementById(referencesTabId);
                    settings.fileNameLengthTitle = document.getElementById(fileNameLengthId + "-Title");
                    settings.fileNameLengthText = document.getElementById(fileNameLengthId + "-Text");
                    settings.fileNameReservedWordTitle = document.getElementById(fileNameReservedWordId + "-Title");
                    settings.fileNameReservedWordText = document.getElementById(fileNameReservedWordId + "-Text");
                    settings.fileDescrReqTitle = document.getElementById(fileDescrReqId + "-Title");
                    settings.fileDescrReqText = document.getElementById(fileDescrReqId + "-Text");
                    settings.informationPanel1 = document.getElementById(informationPanel1Id);
                    settings.informationPanel2 = document.getElementById(informationPanel2Id);
                    settings.indexFilesDescriptionSpn = document.getElementById(indexFilesDescriptionId);
                    settings.indexFilesDescriptionText = settings.indexFilesDescriptionSpn.innerHTML;
                    settings.outputCloseApplicationErrorTitle = document.getElementById(outputCloseApplicationErrorPrefixId + "-Title");
                    settings.outputCloseApplicationErrorText = document.getElementById(outputCloseApplicationErrorPrefixId + "-Text");
                    settings.styleBox = document.getElementById(resetHideBox);
                    settings.numberFirstKeyTitle = document.getElementById(numberFirstKeyId + "-Title");
                    settings.numberFirstKeyText = document.getElementById(numberFirstKeyId + "-Text");
                    settings.illegalCharKeyTitle = document.getElementById(illegalCharKeyId + "-Title");
                    settings.illegalCharKeyText = document.getElementById(illegalCharKeyId + "-Text");
                    settings.keyLengthTitle = document.getElementById(keyLengthId + "-Title");
                    settings.keyLengthText = document.getElementById(keyLengthId + "-Text");
                    settings.keyReservedWordTitle = document.getElementById(keyReservedWordId + "-Title");
                    settings.keyReservedWordText = document.getElementById(keyReservedWordId + "-Text");
                    settings.variablesDropdown = document.getElementById(variablesId);
                    settings.addVarKeyBtn = document.getElementById(addVarKeyId);
                    settings.varKeysTbl = document.getElementById(varKeysId);
                    settings.varKeyReqTitle = document.getElementById(varKeyReqId + "-Title");
                    settings.varKeyReqText = document.getElementById(varKeyReqId + "-Text");
                    settings.tablesDropdown = document.getElementById(tablesId);
                    AddEvents();
                },
                callback: function () {
                    return { 
                        structureCallback: settings.extractionCallback().structureCallback,
                        data: settings.data,
                        reset: function() 
                        { 
                            settings.data = [];
                            Reset();
                        } 
                    };
                }
            }
        }(jQuery);
    }(jQuery);