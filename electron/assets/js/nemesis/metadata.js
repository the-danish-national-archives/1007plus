/*
    Model is responsible for Validate Metadata tables (Flow 2.0)
    initialize interface inputs: elements from <div class="formularContainer">
*/
window.Rigsarkiv = window.Rigsarkiv || {},
function (n) {
    Rigsarkiv.Nemesis = Rigsarkiv.Nemesis || {},
    function (n) {
        const {ipcRenderer} = require('electron');
        const fs = require('fs');
        const os = require('os');
        const chardet = require('chardet');

        const startNumberPattern = /^([0-9])([a-zA-ZæøåäöáðéíóúýþÆØÅÄÖÁÐÉÍÓÚÝÞ0-9_]*)$/;
        const validFileNamePattern = /^([a-zA-ZæøåäöáðéíóúýþÆØÅÄÖÁÐÉÍÓÚÝÞ])([a-zA-ZæøåäöáðéíóúýþÆØÅÄÖÁÐÉÍÓÚÝÞ0-9_]*)$/;
        const reservedWordPattern = /^(ABSOLUTE|ACTION|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|AND|ANY|ARE|ARRAY|AS|ASC|ASSERTION|AT|AUTHORIZATION|BEFORE|BEGIN|BINARY|BIT|BLOB|BOOLEAN|BOTH|BREADTH|BY|CALL|CASCADE|CASCADED|CASE|CAST|CATALOG|CHAR|CHARACTER|CHECK|CLASS|CLOB|CLOSE|COLLATE|COLLATION|COLUMN|COMMIT|COMPLETION|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS ||CONSTRUCTOR|CONTINUE|CORRESPONDING|CREATE|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|CYCLE|DATA|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DICTIONARY|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DOUBLE|DROP|DYNAMIC|EACH|ELSE|END|END-EXEC|EQUALS|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXTERNAL|FALSE|FETCH|FIRST|FLOAT|FOR|FOREIGN|FOUND|FROM|FREE|FULL|FUNCTION|GENERAL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|GROUPING|HAVING|HOST|HOUR|IDENTITY|IGNORE|IMMEDIATE|IN|INDICATOR|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ISOLATION|ITERATE|JOIN|KEY|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LEFT|LESS|LEVEL|LIKE|LIMIT|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATOR|MAP|MATCH|MINUTE|MODIFIES|MODIFY|MODULE|MONTH|NAMES|NATIONAL|NATURAL|NCHAR|NCLOB|NEW|NEXT|NO|NONE|NOT|NULL|NUMERIC|OBJECT|OF|OFF|OLD|ON|ONLY|OPEN|OPERATION|OPTION|OR|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|PAD|PARAMETER|PARAMETERS|PARTIAL|PATH|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|RELATIVE|RESTRICT|RESULT|RETURN|RETURNS|REVOKE|RIGHT|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROW|ROWS|SAVEPOINT|SCHEMA|SCROLL|SCOPE|SEARCH|SECOND|SECTION|SELECT|SEQUENCE|SESSION|SESSION_USER|SET|SETS|SIZE|SMALLINT|SOME|SPACE|SPECIFIC|SPECIFICTYPE|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATE|STATEMENT|STATIC|STRUCTURE|SYSTEM_USER|TABLE|TEMPORARY|TERMINATE|THAN|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSACTION|TRANSLATION|TREAT|TRIGGER|TRUE|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UPDATE|USAGE|USER|USING|VALUE|VALUES|VARCHAR|VARIABLE|VARYING|VIEW|WHEN|WHENEVER|WHERE|WITH|WITHOUT|WORK|WRITE|YEAR|ZONE)$/i;
        const enclosedReservedWordPattern = /^(")(ABSOLUTE|ACTION|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|AND|ANY|ARE|ARRAY|AS|ASC|ASSERTION|AT|AUTHORIZATION|BEFORE|BEGIN|BINARY|BIT|BLOB|BOOLEAN|BOTH|BREADTH|BY|CALL|CASCADE|CASCADED|CASE|CAST|CATALOG|CHAR|CHARACTER|CHECK|CLASS|CLOB|CLOSE|COLLATE|COLLATION|COLUMN|COMMIT|COMPLETION|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS ||CONSTRUCTOR|CONTINUE|CORRESPONDING|CREATE|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|CYCLE|DATA|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DICTIONARY|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DOUBLE|DROP|DYNAMIC|EACH|ELSE|END|END-EXEC|EQUALS|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXTERNAL|FALSE|FETCH|FIRST|FLOAT|FOR|FOREIGN|FOUND|FROM|FREE|FULL|FUNCTION|GENERAL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|GROUPING|HAVING|HOST|HOUR|IDENTITY|IGNORE|IMMEDIATE|IN|INDICATOR|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ISOLATION|ITERATE|JOIN|KEY|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LEFT|LESS|LEVEL|LIKE|LIMIT|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATOR|MAP|MATCH|MINUTE|MODIFIES|MODIFY|MODULE|MONTH|NAMES|NATIONAL|NATURAL|NCHAR|NCLOB|NEW|NEXT|NO|NONE|NOT|NULL|NUMERIC|OBJECT|OF|OFF|OLD|ON|ONLY|OPEN|OPERATION|OPTION|OR|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|PAD|PARAMETER|PARAMETERS|PARTIAL|PATH|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|RELATIVE|RESTRICT|RESULT|RETURN|RETURNS|REVOKE|RIGHT|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROW|ROWS|SAVEPOINT|SCHEMA|SCROLL|SCOPE|SEARCH|SECOND|SECTION|SELECT|SEQUENCE|SESSION|SESSION_USER|SET|SETS|SIZE|SMALLINT|SOME|SPACE|SPECIFIC|SPECIFICTYPE|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATE|STATEMENT|STATIC|STRUCTURE|SYSTEM_USER|TABLE|TEMPORARY|TERMINATE|THAN|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSACTION|TRANSLATION|TREAT|TRIGGER|TRUE|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UPDATE|USAGE|USER|USING|VALUE|VALUES|VARCHAR|VARIABLE|VARYING|VIEW|WHEN|WHENEVER|WHERE|WITH|WITHOUT|WORK|WRITE|YEAR|ZONE)(")$/i;
        const codePattern = /^('(((\+|\-){0,1}[0-9]+)|([\w\W\s]+)|((\+|\-){0,1}[0-9]*(\.|\,)[0-9]+))' '[\w\W\s]*')$/;
        const userCodePattern = /^('(((\+|\-){0,1}[0-9]+)|([\w\W\s]+)|((\+|\-){0,1}[0-9]+(\.|\,){0,1}[0-9]*))')$/;
        const codeListPattern = /^\${0,1}([\w\W\s^\.]*)\.$/;
        const descriptionMultiPattern = /'([^']*)'/g;
        const datatypeString = [/^(string)$/,/^(\%([0-9]+)s)$/,/^(\$([0-9]+)\.)$/,/^(a([0-9]+))$/];
        const datatypeInt = [/^(int)$/,/^(\%([0-9]+)\.0f)$/,/^(f([0-9]+)\.)$/,/^(f([0-9]+))$/];
        const datatypeDecimal = [/^(decimal)$/,/^(\%([0-9]+)\.([0-9]+)f)$/,/^(\%([0-9]+)\.([0-9]+)g)$/,/^(f([0-9]+)\.([0-9]+))$/,/^(f([0-9]+)\.([0-9]+))$/];
        const datatypeDate = [/^(date)$/,/^(\%tdCCYY-NN-DD)$/,/^((yymmdd\.)|(yymmdd10\.))$/,/^(sdate10)$/];
        const datatypeTime = [/^(time)$/,/^(\%tcHH:MM:SS)$/,/^((time\.)|(time8\.))$/,/^(time8)$/];
        const datatypeDateTime = [/^(datetime)$/,/^((\%tcCCYY-NN-DD\!THH:MM:SS)|(\%tcCCYY-NN-DD\!THH:MM:SS\.s)|(\%tcCCYY-NN-DD\!THH:MM:SS\.ss)|(\%tcCCYY-NN-DD\!THH:MM:SS\.sss)|(\%tcCCYY-NN-DD\!THH:MM:SS\.ssss)|(\%tcCCYY-NN-DD\!THH:MM:SS\.sssss)|(\%tcCCYY-NN-DD\!THH:MM:SS\.ssssss))$/,/^((e8601dt\.)|(e8601dt19\.)|(e8601dt20\.1)|(e8601dt21\.2)|(e8601dt22\.3)|(e8601dt23\.4)|(e8601dt24\.5)|(e8601dt25\.6))$/,/^((datetime20)|(ymdhms19)|(ymdhms21\.1)|(ymdhms22\.2)|(ymdhms23\.3)|(ymdhms24\.4)|(ymdhms25\.5)|(ymdhms26\.6))$/];
        const titleMaxLength = 128;
        const stringMaxLength = 2147483648;
        const errorsMax = 40;
        const intMaxLength = 10;
        const decimalPart1MaxLength = 29;
        const decimalPart2MaxLength = 29;

        //private data memebers
        var settings = { 
            outputErrorSpn: null,
            outputErrorText: null,
            output: null,
            extraInfo: null,
            logCallback: null,
            dataCallback: null,
            selectDirBtn: null,
            validateBtn: null,
            confirmationSpn: null,
            extraInfoTitleSpn: null,
            deliveryPackagePath: null,
            logType: "metadata",
            fileName: null,
            fileKeys: [],
            fileReferences: [],
            tableErrors: 0,
            errors: 0,
            totalErrors: 0,
            errorStop: false,
            convertStop: false,
            dataPathPostfix: "Data",
            metadataLabels: ["SYSTEMNAVN","DATAFILNAVN","DATAFILBESKRIVELSE","NØGLEVARIABEL","REFERENCE","VARIABEL","VARIABELBESKRIVELSE","KODELISTE","BRUGERKODE"],
            data: [],
            linkId: "nemesis-output-link-metadata-{0}",
            linkElement: "<a id=\"{0}\" href=\"#{1}\" class=\"nemesisLink\">{1}</a>",
            links: 0
        }

        // get selected folder name 
        var GetFolderName = function() {
            var folders = settings.deliveryPackagePath.getFolders();
            return folders[folders.length - 1];
        }

         // Render element's text
         var RenderElement = function(text) {
            var linkId = null;
                var element = document.createElement('span');
                $(element).html(text);
                if(element.firstChild != null && element.firstChild.firstChild != null) {
                    linkId = settings.linkId.format(settings.links);
                    settings.links += 1;
                    element.firstChild.insertAdjacentHTML("afterbegin", settings.linkElement.format(linkId,element.firstChild.firstChild.id));
                }
                settings.output.append($(element).html());
                if(linkId != null) {
                    document.getElementById(linkId).addEventListener('click', (event) => {
                        $("a[id^='nemesis-output-link-']").removeClass("nemesisLinkBold");
                        var contentId = event.srcElement.href.split("#")[1];
                        settings.extraInfoTitleSpn.innerHTML = Rigsarkiv.Language.callback().getValue("nemesis-extraInfo-SPAN").format(contentId);
                        var content =  document.getElementById(contentId);
                        $(event.srcElement).toggleClass("nemesisLinkBold");
                        settings.extraInfo.html($(content).html());
                    })
                }      
        }

        // View Element by id & return texts
        var ViewElement = function(id,formatText1,formatText2,formatText3,formatText4, formatText5, formatText6) {
            var result = Rigsarkiv.Language.callback().getValue(id);
            if(result == null) { return null; } 
            if(formatText1 != null) { 
                if(formatText2 != null) {
                    if(formatText3 != null) {
                        if(formatText4 != null){
                            if(formatText5 != null){
                                if(formatText6 != null){
                                    result = result.format(formatText1,formatText2,formatText3,formatText4,formatText5,formatText6);    
                                }
                                else {
                                    result = result.format(formatText1,formatText2,formatText3,formatText4,formatText5);
                                }
                            }
                            else {
                                result = result.format(formatText1,formatText2,formatText3,formatText4);
                            }
                        }
                        else {
                            result = result.format(formatText1,formatText2,formatText3);
                        }
                    }
                    else {
                        result = result.format(formatText1,formatText2);
                    }
                }
                else {
                    result = result.format(formatText1);
                } 
            }
            if(result != null) {
                RenderElement(result);
            }
            return result;
        }

        //handle error logging + HTML output
        var LogError = function(id) {
            if(settings.tableErrors < errorsMax) {
                var text = null;
                if (arguments.length > 1) {                
                    if(arguments.length === 2) { text = ViewElement(id,arguments[1],null,null); }
                    if(arguments.length === 3) { text = ViewElement(id,arguments[1],arguments[2],null); }
                    if(arguments.length === 4) { text = ViewElement(id,arguments[1],arguments[2],arguments[3]); }
                    if(arguments.length === 5) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4]); }
                    if(arguments.length === 6) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]); }
                    if(arguments.length === 7) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]); }
                }
                if(text != null) { settings.logCallback().error(settings.logType,GetFolderName(),text); }
            }            
            settings.errors += 1;
            settings.totalErrors += 1;
            settings.tableErrors += 1;
            return false;
        }

        //Handle warn logging
        var LogWarn = function(id) {
            var text = null;
            if (arguments.length > 1) {                
                if(arguments.length === 2) { text = ViewElement(id,arguments[1],null,null); }
                if(arguments.length === 3) { text = ViewElement(id,arguments[1],arguments[2],null); }
                if(arguments.length === 4) { text = ViewElement(id,arguments[1],arguments[2],arguments[3]); }
                if(arguments.length === 5) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4]); }
                if(arguments.length === 6) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]); }
                if(arguments.length === 7) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]); }
            }
            if(text != null) { settings.logCallback().warn(settings.logType,GetFolderName(),text); }
            return true;
        }
        
        //Handle info logging
        var LogInfo = function(id) {
            var text = null;
            if (arguments.length > 1) {                
                if(arguments.length === 2) { text = ViewElement(id,arguments[1],null,null); }
                if(arguments.length === 3) { text = ViewElement(id,arguments[1],arguments[2],null); }
                if(arguments.length === 4) { text = ViewElement(id,arguments[1],arguments[2],arguments[3]); }
                if(arguments.length === 5) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4]); }
                if(arguments.length === 6) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]); }
                if(arguments.length === 7) { text = ViewElement(id,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]); }
            }
            if(text != null) { settings.logCallback().info(settings.logType,GetFolderName(),text); }
            return true;
        }

        //get data JSON table object pointer by table file name
        var GetTableData = function (fileName) {
            var result = null;
            settings.data.forEach(table => {
                if(table.fileName === fileName) {
                    result = table;
                }
            });
            return result;
        }
        
        //Validate single user code name
        var ValidateUserCodeName = function (codeName) {
            var result = true;
            if(result && startNumberPattern.test(codeName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-NameNumber-Error",settings.fileName,codeName);
            }
            if(result && !validFileNamePattern.test(codeName) && !enclosedReservedWordPattern.test(codeName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-NameValidation-Error",settings.fileName,codeName);
            }
            if(result && codeName.length > titleMaxLength) {
                result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-NameLength-Error",settings.fileName,codeName);
            }
            if(result && reservedWordPattern.test(codeName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-NameReservedWord-Error",settings.fileName,codeName);
            }
            return result;
        }

        // get user code one line info as JSON
        var GetUserCode = function (line) {
            var name = null;
            var codes = null;
            var index = line.trim().reduceWhiteSpace().indexOf(" "); 
            if(index < 0) {
                name = line;
            } 
            else {
                name = line.trim().reduceWhiteSpace().substring(0,index);
                var codesTemp = line.trim().reduceWhiteSpace().substring(index + 1);
                codes = [];
                descriptionMultiPattern.lastIndex = 0;
                var matches = codesTemp.match(descriptionMultiPattern);
                if(matches != null) {
                    for(var i = 0;i < matches.length;i++) {
                        codes.push(matches[i]);
                    }
                }
            }
            return { "name":name, "codes":codes}
        }

        //Validate BRUGERKODE missing values
        var ValidateUserCodeValues = function(table,info) {
            var result = true;
            var options = [];
            var codeVariable = null;
            var missingValues = 0;
            table.variables.forEach(variable => {
                if(variable.name === info.name) {
                    codeVariable = variable;
                    options = variable.options;
                }
            });
            info.codes.forEach(code => {
                if(!userCodePattern.test(code)) {
                    result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-CodeValidation-Error",settings.fileName,info.name,code);
                } 
                else {
                    var codeValue = code.substring(1,code.length - 1);
                    var exist = false;                        
                    options.forEach(option => {
                       if(option.name === codeValue) { 
                           option.isMissing = true;
                           exist = true; 
                        }                        
                    });
                    if(!exist) { result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-CodeListRequired-Error",settings.fileName,info.name,codeValue); }
                    if(codeVariable.type === "Int" && isNaN(parseInt(codeValue))) { result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-CodeIntType-Error",settings.fileName,info.name,codeValue,codeVariable.format); }
                    if(codeVariable.type === "Decimal" && isNaN(parseFloat(codeValue.replace(",",".")))) { result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-CodeDecimalType-Error",settings.fileName,info.name,codeValue,codeVariable.format); }
                    missingValues = missingValues + 1;
                }                               
            });
            if(codeVariable != null) { codeVariable.missingValues = missingValues; }
            return result; 
        }

        //Validate BRUGERKODE
        var ValidateUserCodes = function (lines,startIndex) {
            var result = true;
            var table = GetTableData(settings.fileName);
            var variables = [];
            table.variables.forEach(variable => { variables.push(variable.name);  });
            var i = startIndex;                        
            do {
                var info = GetUserCode(lines[i]);
                if(info.codes != null && info.codes.length > 0) {
                    if(!ValidateUserCodeName(info.name)) {
                        result = false; 
                    }
                    else {
                        if(!variables.includes(info.name)) {
                            result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-KeyRequired-Error",settings.fileName,info.name);
                        }
                        else {
                            if(!ValidateUserCodeValues(table,info)) { result = false; }
                        }
                    }               
                }
                else {
                    result = LogError("nemesis-processing-CheckMetadata-FileUserCodes-CodeRequired-Error",settings.fileName,(i + 1));                    
                }
                if(!result) { settings.errorStop = true; }
                i++;
            }
            while (lines[i] !== undefined && lines[i].trim() !== ""); 
            return result;
        }

        //Validate single code name
        var ValidateCodeName = function (codeName) {
            var result = true;
            if(result && startNumberPattern.test(codeName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileCodeList-NameNumber-Error",settings.fileName,codeName);
            }
            if(result && !validFileNamePattern.test(codeName) && !enclosedReservedWordPattern.test(codeName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileCodeList-NameValidation-Error",settings.fileName,codeName);
            }
            if(result && codeName.length > titleMaxLength) {
                result = LogError("nemesis-processing-CheckMetadata-FileCodeList-NameLength-Error",settings.fileName,codeName);
            }
            if(result && reservedWordPattern.test(codeName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileCodeList-NameReservedWord-Error",settings.fileName,codeName);
            }
            return result;
        }

        //Validate KODELISTE values
        var ValidateCodeListOptions = function(lines,i,codeName,table) {
            var result = true;
            if(!codePattern.test(lines[i].trim().reduceWhiteSpace())) { 
                result = LogError("nemesis-processing-CheckMetadata-FileCodeList-CodeValidation-Error",settings.fileName,codeName,(i + 1));
                settings.errorStop = true;
            }
            else {
                var text = lines[i].trim().reduceWhiteSpace();
                var options = text.split("' '");
                var index = text.indexOf("' '");
                var description = text.substring(index + 3);
                description = description.substring(0,description.length - 1);
                if(description.reduceWhiteSpace() === "" || description === " ") {
                    result = LogError("nemesis-processing-CheckMetadata-FileCodeList-CodeValidationEmpty-Error",settings.fileName,codeName,options[0].substring(1));                      
                }
                table.variables.forEach(variable => {
                    if(variable.codeListKey === codeName) {
                        variable.options.push({ "name":options[0].substring(1), "description":description, "isMissing":false });
                    }
                });
           }
           return result;
        }

        //Validate Code
        var ValidateCode = function (line,index,codeListKeys,validKeys,codeName) {
            var result = true;
            if(line.indexOf("'") > -1)
            {
                result = LogError("nemesis-processing-CheckMetadata-FileCodeList-CodeValidation-Error",settings.fileName,codeName,(index + 1));
            }
            else 
            {
                var expressions = line.split(" ");
                if(expressions.length === 1) {
                    codeName = expressions[0];
                    validKeys.push(codeName);
                    if(!ValidateCodeName(codeName)) 
                    { 
                        result = false; 
                        codeName = null;
                    }
                    else {
                        if(!codeListKeys.includes(codeName)) {
                            result = LogError("nemesis-processing-CheckMetadata-FileCodeList-KeyRequired-Error",settings.fileName,codeName);
                            codeName = null;
                        }
                    }
                }
                else {
                    result = LogError("nemesis-processing-CheckMetadata-FileCodeList-Name-Error",settings.fileName,expressions[0],(index + 1));
                    codeName = expressions[0];
                }
            }
            if(!result) { settings.errorStop = true; }
            return { "result":result, "codeName":codeName}
        }

        //Validate Unique codelist Options
        var ValidateUniqueOptions = function (variable) {
            var result = true;
            var options = [];
            variable.options.forEach(option => {
                var optionName = option.name;
                if(!options.includes(optionName)) { 
                    options.push(optionName);
                }
                else {
                    result = LogError("nemesis-processing-CheckMetadata-FileVariable-CodeUnique-Error",settings.fileName,variable.codeListKey,optionName);
                }
            });
            return result;
        }

        //Validate KODELISTE
        var ValidateCodeList = function (lines,startIndex) {
            var result = true;
            var table = GetTableData(settings.fileName);
            var codeListKeys = [];
            var validKeys = [];
            table.variables.forEach(variable => {
                if(variable.codeListKey !== "") { codeListKeys.push(variable.codeListKey); }
            });
            var codeName = null;
            var i = startIndex;                        
            do { 
                if(!codePattern.test(lines[i].trim().reduceWhiteSpace())) {
                    var codeResult = ValidateCode(lines[i].trim().reduceWhiteSpace(),i,codeListKeys,validKeys,codeName);
                    codeName = codeResult.codeName;
                    if(!codeResult.result) { result = false; }
                }
                else {
                    if(codeName != null && !ValidateCodeListOptions(lines,i,codeName,table)) { result = false; }
                }
                i++;
            }
            while (lines[i] !== undefined && lines[i].trim() !== "");
            table.variables.forEach(variable => {
                if(variable.codeListKey !== "") {
                    if(!validKeys.includes(variable.codeListKey)) {
                        result = LogError("nemesis-processing-CheckMetadata-FileVariable-CodeListRequired-Error",settings.fileName,variable.name,variable.codeListKey);    
                        settings.errorStop = true;
                    }
                    else {
                        if(!ValidateUniqueOptions(variable)) { result = false; }
                    }
                }                
            });  
            return result;
        }

        //get Variable Description line as JSON
        var GetVariableDescription = function (line,startIndex) {
            var name = null;
            var description = null;
            var index = line.trim().reduceWhiteSpace().indexOf(" ");
            if(index < 0) {
                name = line;
            } 
            else {
                name = line.trim().reduceWhiteSpace().substring(0,index);
                var descriptionTemp = line.trim().reduceWhiteSpace().substring(index + 1);
                if(descriptionTemp[0] === "'" && descriptionTemp[descriptionTemp.length - 1] === "'") {
                    description = descriptionTemp.substring(1,descriptionTemp.length - 1);
                    if(description.reduceWhiteSpace() === "" || description === "<none>" || description === "n.a." || description === " ") {
                        LogError("nemesis-processing-CheckMetadata-FileVariable-DescriptionEmpty-Error",settings.fileName,name);
                    }
                }
                else {
                    LogError("nemesis-processing-CheckMetadata-FileVariable-DescriptionFormat-Error",settings.fileName,name);
                    description = "";
                    settings.errorStop = true;
                }
            }
            return { "name":name, "description":description}
        }

        //validate variables Description, update output data json
        var ValidateVariablesDescription = function (lines,startIndex) {
            var result = true;
            var table = GetTableData(settings.fileName);
            var variableDescriptions = [];
            table.variables.forEach(variable => variableDescriptions.push(variable.name));
            var i = startIndex;
            do {                          
                var info = GetVariableDescription(lines[i],i);                
                var exitsCounter = 0;
                if(variableDescriptions.includes(info.name)) {
                    variableDescriptions.splice(variableDescriptions.indexOf(info.name),1);
                    table.variables.forEach(variable => {
                        if(variable.name === info.name) {
                            exitsCounter++ 
                            if(info.description != null) {                                
                                variable.description = info.description;  
                            }
                            else {
                                result = LogError("nemesis-processing-CheckMetadata-FileVariable-DescriptionTextRequired-Error",settings.fileName,info.name);
                            }                         
                        }
                    });
                } 
                if(exitsCounter === 0) {
                    result = LogError("nemesis-processing-CheckMetadata-FileVariable-DescriptionRequired-Error",settings.fileName,info.name);
                }                             
                i++;
            }
            while (lines[i] !== undefined && lines[i].trim() !== "");
            if(variableDescriptions.length > 0) {
                variableDescriptions.forEach(variable => {
                    result = LogError("nemesis-processing-CheckMetadata-FileVariable-DescriptionExists-Error",settings.fileName,variable);
                });                
            }
            if(!result) { settings.errorStop = true; }  
            return result;
        }

        //Validate single variable name
        var ValidateVariableName = function (variableName) {
            var result = true;
            if(result && startNumberPattern.test(variableName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileVariable-NameNumber-Error",settings.fileName,variableName);
            }
            if(result && !validFileNamePattern.test(variableName) && !enclosedReservedWordPattern.test(variableName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileVariable-NameValidation-Error",settings.fileName,variableName);
            }
            if(result && variableName.length > titleMaxLength) {
                result = LogError("nemesis-processing-CheckMetadata-FileVariable-NameLength-Error",settings.fileName,variableName);
            }
            if(result && reservedWordPattern.test(variableName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileVariable-NameReservedWord-Error",settings.fileName,variableName);
            }
            if(result && settings.metadataLabels.includes(variableName.toUpperCase())) {
                result = LogError("nemesis-processing-CheckMetadata-FileVariable-LabelReservedWord-Error",settings.fileName,variableName.toUpperCase());
            }
            return result;
        }

        //Validate related Variables Keys & refernces
        var ValidateVariablesRelated = function(variables) {
            var result = true;
            var table = GetTableData(settings.fileName);
            settings.fileKeys.forEach(key => {
                if(!variables.includes(key)) {
                    result = LogError("nemesis-processing-CheckMetadata-FileVariables-KeyRequired-Error",settings.fileName,key);
                }
            });
            settings.fileReferences.forEach(ref => {
                var addRef = true;
                ref.refKeys.forEach(key => {
                    if(!variables.includes(key)) {
                        result = LogError("nemesis-processing-CheckMetadata-FileReferences-KeyRequired-Error",settings.fileName,key);
                        addRef = false;
                    }
                });                
                if(addRef) {
                    table.references.push({"refTable": ref.table, "refVariables":ref.keys, "refKeys":ref.refKeys});
                }
            });
            return result;
        }

        //Get CodeList reklated Key
        var GetCodeListKey = function (expressions) {
            var result = "";
            if(expressions.length >= 3 && expressions[2] !== "") {
                if(codeListPattern.test(expressions[2])) {
                    result = expressions[2].match(codeListPattern)[1];
                }
                else {
                    LogError("nemesis-processing-CheckMetadata-FileVariable-CodeList-Error",settings.fileName,expressions[0]);
                    result = null;
                    settings.errorStop = true; 
                }
            }
            return result;
        }

        //validate variables, update output data json
        var ValidateVariables = function (lines,startIndex) {
            var result = true;
            var table = GetTableData(settings.fileName);
            var variables = [];
            var i = startIndex;
            do {
                var expressions = lines[i].trim().reduceWhiteSpace().split(" ");
                if(expressions.length >= 2 && expressions[0] !== "" && expressions[1] !== "") {
                    var variableName = expressions[0];
                    if(!variables.includes(variableName)) {
                        variables.push(variableName);
                        if(ValidateVariableName(variableName)) {
                            var codeListKey = GetCodeListKey(expressions);
                            if(codeListKey == null) { result = false; }                            
                            var isKey = (settings.fileKeys.includes(variableName)) ? true : false;
                            var variable = { "name":variableName, "format":expressions[1], "isKey":isKey, "type":"", "nullable":false, "description":"", "codeListKey":(codeListKey == null ? "" : codeListKey), "options":[], "regExps":[], "appliedRegExp":-1, missingValues:0 }
                            table.variables.push(variable);
                            if(!ValidateDataFormats(variable)) { result = false; } 
                        } 
                        else { 
                            result = false;
                        }                       
                    }
                    else {
                        result = LogError("nemesis-processing-CheckMetadata-FileVariables-RowDouble-Error",settings.fileName,variableName,(i + 1));
                    }
                    if(expressions.length > 3) {
                        result = LogError("nemesis-processing-CheckMetadata-FileVariables-RowMax-Error",settings.fileName,(i + 1));
                    }
                }
                else {
                    result = LogError("nemesis-processing-CheckMetadata-FileVariables-RowRequiredInfo-Error",settings.fileName,(i + 1));                    
                }
                i++;
            }
            while (lines[i] !== undefined && lines[i].trim() !== ""); 
            if(!ValidateVariablesRelated(variables)) { result = false; }  
            return result;
        }

        //validate key
        var ValidateKey  = function (key) {
            var result = true;
            if(startNumberPattern.test(key)) {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-KeyNumber-Error",settings.fileName,key);
            }
            if(result && !validFileNamePattern.test(key) && !enclosedReservedWordPattern.test(key)) {                   
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-KeyValidation-Error",settings.fileName,key); 
            }
            if(result && key.length > titleMaxLength) {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-KeyLength-Error",settings.fileName,key);
            }
            if(result && reservedWordPattern.test(key)) {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-KeyReservedWord-Error",settings.fileName,key);
            }
            if(result) {
                settings.fileKeys.push(key);
            }
            else {
                settings.errorStop = true;
            }
            return result;
        }

        //validate keys variables array
        var ValidateKeys  = function (label,lines,startIndex) {
            var result = true;
            lines[startIndex].trim().split(" ").forEach(key => {
                if(!ValidateKey(key)) { result = false; }
            });
            if(lines[startIndex + 1].trim() !== "") {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-ValueMax-Error",settings.fileName,label);
            }
            return result;
        }
        
        //Validate Reference table Name
        var ValidateReferenceName = function (referenceName) {
            var result = true;
            if(result && startNumberPattern.test(referenceName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileReference-NameNumber-Error",settings.fileName,referenceName);
            }
            if(result && !validFileNamePattern.test(referenceName) && !enclosedReservedWordPattern.test(referenceName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileReference-NameValidation-Error",settings.fileName,referenceName);
            }
            if(result && referenceName.length > titleMaxLength) {
                result = LogError("nemesis-processing-CheckMetadata-FileReference-NameLength-Error",settings.fileName,referenceName);
            }
            if(result && reservedWordPattern.test(referenceName)) {
                result = LogError("nemesis-processing-CheckMetadata-FileReference-NameReservedWord-Error",settings.fileName,referenceName);
            }
            return result;
        }

        //Validate References
        var ValidateReferences = function (lines,startIndex) {
            var result = true;
            var i = startIndex;
            do {                
                var index = lines[i].trim().reduceWhiteSpace().indexOf(" ");
                var requiredInfo = index < 0;
                if(index > 0) {                
                    var tableName = lines[i].trim().reduceWhiteSpace().substring(0,index); 
                    if(!ValidateReferenceName(tableName)) { result = false; }
                    var descriptionTemp = lines[i].trim().reduceWhiteSpace().substring(index + 1);
                    descriptionMultiPattern.lastIndex = 0;
                    var matches = descriptionTemp.match(descriptionMultiPattern);
                    if(matches != null) {
                        if(matches.length > 2) {  result = LogError("nemesis-processing-CheckMetadata-FileReferences-RowMax-Error",settings.fileName,i + 1); }
                        if(matches.length < 2) {  requiredInfo = true; }
                        if(matches.length === 2) {
                            var tableKeys = matches[0].substring(1,matches[0].length - 1).split(" ");
                            tableKeys.forEach(tableKey => {
                                if(!ValidateReferenceName(tableKey)) { result = false;  }
                            });
                            var refKeys = matches[1].substring(1,matches[1].length - 1).split(" ");
                            if(result) {
                                settings.fileReferences.push({"table":tableName, "keys":tableKeys, "refKeys":refKeys});
                            }
                        }                        
                    }
                    else {
                        requiredInfo = true;
                    }
                }
                if(requiredInfo) { result = LogError("nemesis-processing-CheckMetadata-FileReferences-RowRequiredInfo-Error",settings.fileName,i + 1); }
                i++;
            }
            while (lines[i] !== undefined && lines[i].trim() !== "");
            if(!result) { settings.errorStop = true; }
            return result;
        }

        //validate DATAFILNAVN
        var ValidateTitle = function (title) {
            var result = true;
            if(result && startNumberPattern.test(title)) {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-TitleNumber-Error",settings.fileName,title);
            }
            if(result && !validFileNamePattern.test(title) && !enclosedReservedWordPattern.test(title)) {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-TitleValidation-Error",settings.fileName,title);
            }
            if(result && title.length > titleMaxLength) {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-TitleLength-Error",settings.fileName,title);
            }
            if(result && reservedWordPattern.test(title)) {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-TitleReservedWord-Error",settings.fileName,title);
            }
            return result;
        }

        //validate basics labels ("SYSTEMNAVN","DATAFILNAVN","DATAFILBESKRIVELSE") values
        var ValidateBasicValues = function (label,lines,index) {
            var result = true;
            var table = GetTableData(settings.fileName);
            if(lines[index].trim() === "") {
                result = LogError("nemesis-processing-CheckMetadata-FileLabel-ValueRequired-Error",settings.fileName,label);
            }
            else {
                if(label === settings.metadataLabels[0]) 
                { 
                    table.system = lines[index].trim(); 
                }
                if(label === settings.metadataLabels[1]) { 
                    if(!ValidateTitle(lines[index].trim()))  { 
                        result = false;
                        settings.errorStop = true; 
                    }
                    else {
                        table.name = lines[index].trim();
                    }  
                }
                if(label === settings.metadataLabels[2]) 
                { 
                    table.description = lines[index].trim(); 
                }
                if(lines[index + 1].trim() !== "") {
                    result = LogError("nemesis-processing-CheckMetadata-FileLabel-ValueMax-Error",settings.fileName,label);
                    settings.errorStop = true;
                }
            }   
            return result;
        }

        // validate required labels values
        var ValidateLabelValues = function (lines) {
            var result = true;
            settings.fileKeys = [];
            settings.fileReferences = [];
            settings.metadataLabels.forEach(label => {
                var index = lines.indexOf(label);
                index += 1;
                if(label === settings.metadataLabels[0] || label === settings.metadataLabels[1] || label === settings.metadataLabels[2]) {
                    if(!ValidateBasicValues(label,lines,index)) { result = false; }
                }
                if(label === settings.metadataLabels[3] && lines[index].trim() !== "") {
                    if(!ValidateKeys(label,lines,index)) { result = false; }
                }
                if(label === settings.metadataLabels[4] && lines[index].trim() !== "") {
                    if(!ValidateReferences(lines,index)) { result = false; }
                }
                if(label === settings.metadataLabels[5]) {
                    if(lines[index].trim() === "") {
                        result = LogError("nemesis-processing-CheckMetadata-FileLabel-ValueRequired-Error",settings.fileName,label);
                        settings.errorStop = true;
                    }
                    else {
                        if(!ValidateVariables(lines,index)) 
                        { 
                            result = false;
                            settings.errorStop = true; 
                        }
                    }
                }
                if(label === settings.metadataLabels[6] && !settings.errorStop && !ValidateVariablesDescription(lines,index)) { result = false; }
                if(label === settings.metadataLabels[7] && !settings.errorStop) {
                    if(lines[index].trim() === "") {
                        result = LogWarn("nemesis-processing-CheckMetadata-FileCodeList-Empty-Warning",settings.fileName);
                    } else {
                        if(!ValidateCodeList(lines,index)) { result = false; }
                    }                    
                }
                if(label === settings.metadataLabels[8] && lines[index] !== undefined && lines[index].trim() !== "" && !settings.errorStop) {
                    if(!ValidateUserCodes(lines,index)) { result = false; }
                }
            });
            return result;
        }

        //Validate Metadata Labels required & orders
        var ValidateLabels = function (lines) {
            var result = true;
            var orderError = false;
            var prevIndex = -1;
            settings.metadataLabels.forEach(label => {
                var index = lines.indexOf(label);
                if(index < 0) {
                    result = LogError("nemesis-processing-CheckMetadata-FileLabelRequired-Error",settings.fileName,label);
                }
                else {
                    if(prevIndex > index) { orderError = true; }
                    prevIndex = index;
                    index += 1;
                    if(lines.indexOf(label,index) > -1) {
                        result = LogError("nemesis-processing-CheckMetadata-FileLabelMax-Error",settings.fileName,label);
                    }
                }
            });
            for(var i = 0;i < lines.length;i++) {
               if(lines[i].trim() === ""  && i < (lines.length -1) && lines[i + 1].trim() != "" && !settings.metadataLabels.includes(lines[i + 1].trim())) {
                    result = LogError("nemesis-processing-CheckMetadata-FileLabel-NameValidation-Error",settings.fileName,lines[i + 1].trim());
               } 
            }
            if(orderError) {
                result = LogError("nemesis-processing-CheckMetadata-FileLabelsOrder-Error",settings.fileName);
            }
            return result;
        }

        // Validate string format type
        var ValidateStringFormat = function (variable,regExp) {
            var result = true;
            var maxLength = stringMaxLength.toString();
            var matches = variable.format.match(regExp);
            if(matches != null && matches.length > 2) {
                if(parseInt(matches[2]) > stringMaxLength) { 
                    result = LogError("nemesis-processing-CheckMetadata-FileVariable-DataFormat-StringLength-Error",settings.fileName,variable.name,variable.format);
                }
            }
            variable.regExps.push("^[\\w\\W\\s]{0," + maxLength + "}$");
            return result;
        }

        // Validate Int format type
        var ValidateIntFormat = function (variable,regExp) {
            var result = true;
            var length = intMaxLength;            
            variable.regExps.push("^(\\+|\\-){0,1}[0-9]{1," + length + "}$");
            return result;
        }

        // Validate Decimal Format type
        var ValidateDecimalFormat = function (variable,regExp) {
            var result = true;
            var intLength = decimalPart1MaxLength;
            var decimalLength = decimalPart2MaxLength;            
            variable.regExps.push("^(\\+|\\-){0,1}[0-9]{0," + intLength + "}\\.[0-9]{0," + decimalLength + "}$");
            variable.regExps.push("^(\\+|\\-){0,1}[0-9]{0," + intLength + "}\\,[0-9]{0," + decimalLength + "}$");
            variable.regExps.push("^(\\+|\\-){0,1}[0-9]{1," + intLength + "}$");
            return result;
        }

        //Validate Date Format type
        var ValidateDateFormat = function (variable,regExp) {
            var result = true;
            variable.regExps.push("^([0-9]{4,4})-([0-9]{2,2})-([0-9]{2,2})$");
            variable.regExps.push("^([0-9]{4,4})\\/([0-9]{2,2})\\/([0-9]{2,2})$");
            return result;
        }

        //Validate Time Format type
        var ValidateTimeFormat = function (variable,regExp) {
            var result = true;
            variable.regExps.push("^([0-9]{1,2}):([0-9]{2,2}):([0-9]{2,2})$");
            return result;
        }

        //Validate DateTime Format type
        var ValidateDateTimeFormat = function (variable,regExp) {
            var result = true;
            if(variable.format.indexOf(".") > -1) {
                variable.regExps.push("^([0-9]{4,4})-([0-9]{2,2})-([0-9]{2,2})T([0-9]{2,2}):([0-9]{2,2}):([0-9]{2,2})(\.([0-9]{1,6})){0,1}$");
                variable.regExps.push("^([0-9]{4,4})-([0-9]{2,2})-([0-9]{2,2})\\s([0-9]{2,2}):([0-9]{2,2}):([0-9]{2,2})(\.([0-9]{1,6})){0,1}$");
            }
            else {
                variable.regExps.push("^([0-9]{4,4})-([0-9]{2,2})-([0-9]{2,2})T([0-9]{2,2}):([0-9]{2,2}):([0-9]{2,2})$");
                variable.regExps.push("^([0-9]{4,4})-([0-9]{2,2})-([0-9]{2,2})\\s([0-9]{2,2}):([0-9]{2,2}):([0-9]{2,2})$");
                variable.regExps.push("^([0-9]{2,2})-([a-zA-Z]{3,3})-([0-9]{4,4})\\s([0-9]{2,2}):([0-9]{2,2}):([0-9]{2,2})$");
            }
            //variable.regExps.push("^([0-9]{4,4})\\/([0-9]{2,2})\\/([0-9]{2,2})T\\s([0-9]{2,2}):([0-9]{2,2}):([0-9]{2,2})$");
            return result;
        }

        //Validate variable Format by regExp set
        var ValidateFormat = function (variableType,regExps,variable) {
            var result = false;
            for(var i = 0;i < regExps.length;i++) {
                if(regExps[i].test(variable.format)) {
                    variable.type = variableType;
                    if(variableType === "String") {
                        result = ValidateStringFormat(variable,regExps[i]);                        
                    }
                    if(variableType === "Int") {
                        result = ValidateIntFormat(variable,regExps[i]);
                    }
                    if(variableType === "Decimal") {
                        result = ValidateDecimalFormat(variable,regExps[i]);
                    }
                    if(variableType === "Date") { 
                        result = ValidateDateFormat(variable,regExps[i]); 
                    }
                    if(variableType === "Time") { 
                        result = ValidateTimeFormat(variable,regExps[i]);  
                    }
                    if(variableType === "DateTime") 
                    { 
                        result = ValidateDateTimeFormat(variable,regExps[i]); 
                    }
                    break;
                }
            }
            return result;
        }

        //Validate variables Data Formats
        var ValidateDataFormats = function (variable) {
            var result = true;
            var isValid = false;                
            if(!isValid) { isValid = ValidateFormat("String",datatypeString,variable); } 
            if(!isValid) { isValid = ValidateFormat("Int",datatypeInt,variable); }   
            if(!isValid) { isValid = ValidateFormat("Decimal",datatypeDecimal,variable); }
            if(!isValid) { isValid = ValidateFormat("Date",datatypeDate,variable); } 
            if(!isValid) { isValid = ValidateFormat("Time",datatypeTime,variable); }
            if(!isValid) { isValid = ValidateFormat("DateTime",datatypeDateTime,variable); }
            if(!isValid) {
                result = LogError("nemesis-processing-CheckMetadata-FileVariable-DataFormat-Error",settings.fileName,variable.name,variable.format);
            }
            return result;
        }

        //validate Metadata file
        var ValidateMetadata = function (metadataFilePath) {
            var result = true;
            var data = fs.readFileSync(metadataFilePath);
            if(data != null) {
                data = data.toString();
                if(data != null && data !== "") {
                    var splitChar = "\r";
                    if(os.platform() == "win32") { splitChar = "\r\n"; }
                    if(os.platform() == "darwin") { splitChar = "\n"; }
                    var lines = data.split(splitChar);
                    lines[0] = lines[0].trim();
                    if(!ValidateLabels(lines)) 
                    { 
                        result = false; 
                        settings.errorStop = true;
                    }
                    else {
                        if(!ValidateLabelValues(lines)) { result = false; }                        
                    }
                }
                else {
                    result = LogError("nemesis-processing-CheckMetadata-FileEmpty-Error",settings.fileName);
                    settings.errorStop = true;
                }
            }
            else {
                result = LogError("nemesis-processing-CheckMetadata-FileEmpty-Error",settings.fileName);
                settings.errorStop = true;
            }
            return result;
        }

        //validate tables refernces
        var ValidateTablesReference = function() {
            var result = true;
            var dataTableNames = [];
            var dataTableFiles = [];
            settings.data.forEach(table => { 
                if(dataTableNames.includes(table.name)) {
                    result = LogError("nemesis-processing-CheckMetadata-DataFile-NameUnique-Error",table.fileName,table.name);
                }
                dataTableNames.push(table.name);                
                dataTableFiles.push(table.fileName);
            });
            settings.data.forEach(table => {
                table.references.forEach(reference => {
                    if(reference.refTable !== "") {
                        var index = dataTableNames.indexOf(reference.refTable);
                        if(index < 0) {
                            result = LogError("nemesis-processing-CheckMetadata-FileReferences-RowDataReference-Error",table.fileName,reference.refTable);
                        }
                        else {
                            if(reference.refVariables.length > 0) {                               
                                reference.refVariables.forEach(key => {
                                    var exist = false;
                                    GetTableData(dataTableFiles[index]).variables.forEach(refVariable => {
                                        if(refVariable.name === key) { exist = true; }
                                    });
                                    if(!exist) {
                                        result = LogError("nemesis-processing-CheckMetadata-FileReferences-RowVariableReference-Error",table.fileName,reference.refTable,key,dataTableFiles[index]);    
                                    }
                                });
                            }                            
                        }
                    }
                });
            });
            return result;
        }

        //loop Data folder's table & Metadata files
        var ValidateData = function (folderName) {
            var result = true;
            var destPath = (settings.deliveryPackagePath.indexOf("\\") > -1) ? "{0}\\{1}".format(settings.deliveryPackagePath,settings.dataPathPostfix) : "{0}/{1}".format(settings.deliveryPackagePath,settings.dataPathPostfix); 
            fs.readdirSync(destPath).forEach(folder => {
                var metadataFilePath = (destPath.indexOf("\\") > -1) ? "{0}\\{1}\\{1}.txt".format(destPath,folder) : "{0}/{1}/{1}.txt".format(destPath,folder);                 
                if(fs.existsSync(metadataFilePath)) {
                    console.logInfo("validate metadata file: {0}".format(metadataFilePath),"Rigsarkiv.Nemesis.MetaData.ValidateData");  
                    settings.tableErrors = 0;                  
                    //var charsetMatch = chardet.detectFileSync(metadataFilePath);
                    var folders = metadataFilePath.getFolders();
                    settings.fileName = folders[folders.length - 1];
                    var logTableText = Rigsarkiv.Language.callback().getValue("nemesis-output-metadata-logTable").format(folder);
                    settings.output.append(logTableText);
                    settings.logCallback().section(settings.logType,folderName,logTableText);
                    settings.data.push({ "fileName":settings.fileName,"errorStop":false, "system":"", "name":"", "variables":[], "references":[], "description":"", rows:0 })
                    if(!ValidateMetadata(metadataFilePath)) { result = false; }
                    GetTableData(settings.fileName).errorStop = settings.errorStop;
                    settings.errorStop = false;
                }
                else {
                    console.logInfo("None exist Metadata file path: {0}".format(metadataFilePath),"Rigsarkiv.Nemesis.MetaData.ValidateData");
                }                              
            });
            if(!ValidateTablesReference()) { result = false; }
            return result; 
        }

        //start flow validation
        var Validate = function () {
            console.logInfo(`metadata selected path: ${settings.deliveryPackagePath}`,"Rigsarkiv.Nemesis.MetaData.Validate"); 
            try 
            {
                var folderName = GetFolderName();
                LogInfo("nemesis-processing-CheckMetadata-Start",null);
                settings.logCallback().section(settings.logType,folderName,Rigsarkiv.Language.callback().getValue("nemesis-output-metadata-logStart"));            
                ValidateData(folderName);
                var enableData = false;
                settings.data.forEach(table => {
                    if(!table.errorStop) { enableData = true; }
                });
                if(settings.errors === 0) {
                    LogInfo("nemesis-processing-CheckMetadata-Ok",null);
                    settings.logCallback().section(settings.logType,folderName,Rigsarkiv.Language.callback().getValue("nemesis-output-metadata-logEndNoError"));
                } else {
                    LogInfo(enableData ? "nemesis-processing-CheckMetadata-Warning" : "nemesis-processing-CheckMetadata-ErrorStop",null);
                    settings.logCallback().section(settings.logType,folderName,enableData ? Rigsarkiv.Language.callback().getValue("nemesis-output-metadata-logEndWithError") : Rigsarkiv.Language.callback().getValue("nemesis-output-metadata-logEndWithErrorStop"));
                } 
                if(enableData) {
                    return settings.dataCallback().validate(settings.deliveryPackagePath,settings.data,settings.totalErrors,settings.convertStop);
                }
                else {
                    settings.confirmationSpn.innerHTML = Rigsarkiv.Language.callback().getValue("nemesis-output-ConvertDisabled");
                    settings.selectDirBtn.disabled = false;
                    settings.validateBtn.disabled = false;
                    return settings.logCallback().commit(settings.deliveryPackagePath,settings.confirmationSpn.innerHTML);
                }               
            }
            catch(err) 
            {
                err.Handle(settings.outputErrorSpn,settings.outputErrorText,"Rigsarkiv.Nemesis.MetaData.Validate");
            }
            return null;
        }

        var AddEvents = function (){
            //console.logInfo("events","Rigsarkiv.Nemesis.MetaData.AddEvents");
        }

        //Model interfaces functions
        Rigsarkiv.Nemesis.MetaData = {        
            initialize: function (logCallback,dataCallback,outputErrorId,outputId,selectDirectoryId,validateId,confirmationId,extraInfoId,extraInfoTitleId) {            
                settings.logCallback = logCallback;
                settings.dataCallback = dataCallback;
                settings.outputErrorSpn = document.getElementById(outputErrorId);
                settings.outputErrorText = settings.outputErrorSpn.innerHTML;
                settings.selectDirBtn = document.getElementById(selectDirectoryId);
                settings.validateBtn = document.getElementById(validateId);
                settings.confirmationSpn = document.getElementById(confirmationId);
                settings.extraInfoTitleSpn = document.getElementById(extraInfoTitleId);
                settings.output = $("#" + outputId);
                settings.extraInfo = $("#" + extraInfoId);
                AddEvents();
            },
            callback: function () {
                return { 
                    validate: function(path,errors,convertStop) 
                    { 
                        settings.deliveryPackagePath = path;
                        settings.data = [];
                        settings.convertStop = convertStop;
                        settings.errorStop = false;
                        settings.errors = 0;
                        settings.totalErrors = errors;
                        settings.links = 0;
                        return Validate();
                    }  
                };
            }
        };
    }(jQuery);
}(jQuery);