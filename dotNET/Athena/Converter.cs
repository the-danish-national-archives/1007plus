﻿using log4net;
using Rigsarkiv.Athena.Entities;
using Rigsarkiv.Athena.Logging;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Linq;

namespace Rigsarkiv.Athena
{
    /// <summary>
    /// Converter base class
    /// </summary>
    public class Converter
    {
        protected static readonly ILog _log = log4net.LogManager.GetLogger(typeof(Converter));
        protected const string IndicesPath = "{0}\\Indices";
        protected const string ResourcePrefix = "Rigsarkiv.Athena.Resources.{0}";
        protected const string TableIndex = "tableIndex.xml";
        protected const string ResearchIndex = "researchIndex.xml";
        protected const string TableIndexXmlNs = "http://www.sa.dk/xmlns/diark/1.0";
        protected const string TableXmlNs = "http://www.sa.dk/xmlns/siard/1.0/schema0/{0}.xsd";
        protected const string TableSchemaLocation = "http://www.sa.dk/xmlns/siard/1.0/schema0/{0}.xsd {0}.xsd";
        protected const string TableXsiNs = "http://www.w3.org/2001/XMLSchema-instance";
        protected const string TablePath = "{0}\\Tables\\{1}";
        protected const string VarCharPrefix = "VARCHAR({0})";
        protected const string C1 = "c1";
        protected const string C2 = "c2";
        protected string SpecialNumericPattern = "^(\\.[a-z])|([A-Z])$";
        protected string DoubleApostrophePattern = "^\"([\\w\\W\\s]*)\"$";
        protected Dictionary<string, Regex> _regExps = null;
        protected Assembly _assembly = null;
        protected Logging.LogManager _logManager = null;
        protected XDocument _tableIndexXDocument = null;
        protected XDocument _researchIndexXDocument = null;
        protected XNamespace _tableIndexXNS = TableIndexXmlNs;
        protected XmlWriter _writer = null;
        protected List<Table> _tables = null;
        protected string _srcPath = null;
        protected string _destPath = null;
        protected string _destFolder = null;
        protected string _logSection = "";
        protected string _destFolderPath = null;
        protected string _srcFolder = null;

        /// <summary>
        /// Constructore
        /// </summary>
        /// <param name="logManager"></param>
        /// <param name="srcPath"></param>
        /// <param name="destPath"></param>
        /// <param name="destFolder"></param>
        public Converter(Logging.LogManager logManager, string srcPath, string destPath, string destFolder)
        {
            _assembly = Assembly.GetExecutingAssembly();
            _logManager = logManager;
            _tables = new List<Table>();
            _regExps = new Dictionary<string, Regex>();
            _srcPath = srcPath;
            _destPath = destPath;
            _destFolder = destFolder;
            _destFolderPath = string.Format("{0}\\{1}", _destPath, _destFolder);
            var folderName = _srcPath.Substring(_srcPath.LastIndexOf("\\") + 1);
            _srcFolder = folderName.Substring(0, folderName.LastIndexOf("."));
        }

        /// <summary>
        /// start converter
        /// </summary>
        /// <returns></returns>
        public virtual bool Run()
        {
            return true;
        }

        /// <summary>
        /// Tables metadata
        /// </summary>
        public List<Table> Tables {
            get { return _tables; }            
        }

        /// <summary>
        /// Table Index XDocument
        /// </summary>
        public XDocument TableIndexXDocument
        {
            get { return _tableIndexXDocument; }
            set { _tableIndexXDocument = value; }
        }

        /// <summary>
        /// Research Index XDocument
        /// </summary>
        public XDocument ResearchIndexXDocument
        {
            get { return _researchIndexXDocument; }
            set { _researchIndexXDocument = value; }
        }

        protected int GetColumnLength(string type,string regExp)
        {
            var result = 0;
            var startIndex = -1;
            var endIndex = -1;
            switch (type)
            {
                case "INTEGER":
                    {
                        startIndex = regExp.IndexOf("{1,") + 3;
                        endIndex = regExp.IndexOf("}$");
                        result = int.Parse(regExp.Substring(startIndex, endIndex - startIndex));
                        result++;
                        if (result < 2) { result = 2; }                        
                    };
                    break;
                case "DECIMAL":
                    {
                        startIndex = regExp.IndexOf("{1,") + 3;
                        endIndex = regExp.IndexOf("}", startIndex);
                        result = int.Parse(regExp.Substring(startIndex, endIndex - startIndex));
                        result++;
                        startIndex = regExp.IndexOf("{1,", endIndex + 1);
                        if(startIndex > -1)
                        {
                            startIndex = startIndex + 3;
                            endIndex = regExp.LastIndexOf("}");
                            result += int.Parse(regExp.Substring(startIndex, endIndex - startIndex));
                            result++;
                        }
                        if (result < 2) { result = 2; }
                    };
                    break;
                case "VARCHAR({0})":
                    {
                        startIndex = regExp.IndexOf("{0,") + 3;
                        endIndex = regExp.IndexOf("}$");
                        result = int.Parse(regExp.Substring(startIndex, endIndex - startIndex));
                    };
                    break;
            }
            return result;
        }

        /// <summary>
        /// Add Missing Column Node
        /// </summary>
        /// <param name="codeName"></param>
        /// <param name="researchIndexNode"></param>
        /// <param name="columnId"></param>
        protected void AddMissingColumnNode(string codeName, XElement researchIndexNode, string columnId)
        {

            _logManager.Add(new LogEntity() { Level = LogLevel.Info, Section = _logSection, Message = string.Format("Add missing value: {0} ", codeName) });
            XElement columnsNode = researchIndexNode.Element(_tableIndexXNS + "columns");
            XElement columnNode = new XElement(_tableIndexXNS + "column", new XElement(_tableIndexXNS + "columnID", columnId), new XElement(_tableIndexXNS + "missingValues"));
            if (columnsNode == null)
            {
                columnsNode = new XElement(_tableIndexXNS + "columns", columnNode);
                researchIndexNode.Add(columnsNode);
            }
            if (!columnsNode.Elements().Where(e => e.Element(_tableIndexXNS + "columnID").Value == columnId).Any())
            {
                columnsNode.Add(columnNode);
            }
            else
            {
                columnNode = columnsNode.Elements().Where(e => e.Element(_tableIndexXNS + "columnID").Value == columnId).FirstOrDefault();
            }
            var missingValueNode = new XElement(_tableIndexXNS + "value", codeName);
            columnNode.Element(_tableIndexXNS + "missingValues").Add(missingValueNode);
        }

        /// <summary>
        /// start table writer
        /// </summary>
        /// <param name="folder"></param>
        protected void StartWriter(string folder)
        {
            var path = string.Format(TablePath, _destFolderPath, string.Format("{0}\\{0}.xml", folder));
            var settings = new XmlWriterSettings { Encoding = Encoding.UTF8, Indent = true };
            _writer = XmlWriter.Create(path, settings);
            _writer.WriteStartDocument();
            _writer.WriteStartElement("table", string.Format(TableXmlNs, folder));
            _writer.WriteAttributeString("xmlns", "xsi", null, TableXsiNs);
            _writer.WriteAttributeString("xsi", "schemaLocation", null, string.Format(TableSchemaLocation, folder));
        }

        /// <summary>
        /// end table writer
        /// </summary>
        protected void EndWriter()
        {
            _writer.WriteEndElement();
            _writer.WriteEndDocument();
            _writer.Flush();
            _writer.Dispose();
        }

        /// <summary>
        /// Check Special Numeric
        /// </summary>
        /// <param name="column"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        protected bool HasSpecialNumeric(Column column, string value)
        {
            if (!_regExps.ContainsKey(SpecialNumericPattern))
            {
                _regExps.Add(SpecialNumericPattern, new Regex(SpecialNumericPattern, RegexOptions.Compiled | RegexOptions.IgnoreCase));
            }
            if ((column.Type == "INTEGER" || column.Type == "DECIMAL") && _regExps[SpecialNumericPattern].IsMatch(value))
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Handle Special Numeric i xml 
        /// </summary>
        /// <param name="column"></param>
        /// <param name="tableNode"></param>
        /// <param name="researchIndexNode"></param>
        /// <param name="value"></param>
        /// <param name="addMissing"></param>
        protected void HandleSpecialNumeric(Column column, XElement tableNode, XElement researchIndexNode, string value, bool addMissing)
        {
            _logManager.Add(new LogEntity() { Level = LogLevel.Info, Section = _logSection, Message = string.Format("Handle Special Numeric value {0} at column {1}", value, column.Name) });
            column.Type = string.Format(VarCharPrefix, GetColumnLength(column.Type, column.RegExp));
            column.Modified = true;

            var columnNode = tableNode.Element(_tableIndexXNS + "columns").Elements().Where(e => e.Element(_tableIndexXNS + "columnID").Value == column.Id).FirstOrDefault();
            columnNode.Element(_tableIndexXNS + "type").Value = column.Type;

            var foreignKeyNode = tableNode.Element(_tableIndexXNS + "foreignKeys").Elements().Where(e => e.Element(_tableIndexXNS + "reference").Element(_tableIndexXNS + "column").Value == column.Name).FirstOrDefault();
            var codeListTableName = foreignKeyNode.Element(_tableIndexXNS + "referencedTable").Value;
            var codeListNode = tableNode.Parent.Elements().Where(e => e.Element(_tableIndexXNS + "name").Value == codeListTableName).FirstOrDefault();
            columnNode = codeListNode.Element(_tableIndexXNS + "columns").Elements().Where(e => e.Element(_tableIndexXNS + "columnID").Value == C1).FirstOrDefault();
            columnNode.Element(_tableIndexXNS + "type").Value = column.Type;
            _tables.ForEach(table => {
                if (table.CodeList != null)
                {
                    var refTable = table.CodeList.Where(subTable => subTable.Name == codeListTableName).FirstOrDefault();
                    if (refTable != null)
                    {
                        refTable.Columns[0].TypeOriginal = refTable.Columns[0].Type;
                        refTable.Columns[0].Type = column.Type;
                        refTable.Columns[0].Modified = true;
                    }
                }
            });

            researchIndexNode.Element(_tableIndexXNS + "specialNumeric").Value = true.ToString().ToLower();
            if (addMissing) { AddMissingColumnNode(value, researchIndexNode, column.Id); }          
        }


        /// <summary>
        /// Get Converted column Value
        /// </summary>
        /// <param name="column"></param>
        /// <param name="value"></param>
        /// <param name="hasError"></param>
        /// <returns></returns>
        protected string GetConvertedValue(Column column, string value, out bool hasError)
        {
            string result = null;
            switch (column.Type)
            {
                case "INTEGER": result = GetIntegerValue(column, value, out hasError); break;
                case "DECIMAL": result = GetDecimalValue(column, value, out hasError); break;
                case "DATE": result = GetDateValue(column, value, out hasError); break;
                case "TIME": result = GetTimeValue(column, value, out hasError); break;
                case "TIMESTAMP": result = GetTimeStampValue(column, value, out hasError); break;
                default: result = GetStringValue(column, value, out hasError); break;
            }
            return result;
        }

        private string GetTimeStampValue(Column column, string value, out bool hasError)
        {
            hasError = false;
            var result = value;
            if (!_regExps.ContainsKey(column.RegExp))
            {
                _regExps.Add(column.RegExp, new Regex(column.RegExp, RegexOptions.Compiled | RegexOptions.IgnoreCase));
            }
            hasError = !_regExps[column.RegExp].IsMatch(result);
            if (!hasError)
            {
                var groups = _regExps[column.RegExp].Match(result).Groups;
                if (column.RegExp == "^([0-9]{2,2})-([a-zA-Z]{3,3})-([0-9]{4,4})\\s([0-9]{2,2}):([0-9]{2,2}):([0-9]{2,2})$")
                {
                    result = string.Format("{0}-{1}-{2}T{3}:{4}:{5}", groups[3].Value, GetMonth(groups[2].Value), groups[1].Value, groups[4].Value, groups[5].Value, groups[5].Value);
                }
                else
                {
                    result = string.Format("{0}-{1}-{2}T{3}:{4}:{5}", groups[1].Value, groups[2].Value, groups[3].Value, groups[4].Value, groups[5].Value, groups[5].Value);
                }

            }
            return result;
        }

        private string GetMonth(string monthValue)
        {
            string result = null;
            switch (monthValue)
            {
                case "JAN": result = "01"; break;
                case "FEB": result = "02"; break;
                case "MAR": result = "03"; break;
                case "APR": result = "04"; break;
                case "MAY": result = "05"; break;
                case "JUN": result = "06"; break;
                case "JUL": result = "07"; break;
                case "AUG": result = "08"; break;
                case "SEP": result = "09"; break;
                case "OCT": result = "10"; break;
                case "NOV": result = "11"; break;
                case "DEC": result = "12"; break;
            }
            return result;
        }

        private string GetTimeValue(Column column, string value, out bool hasError)
        {
            hasError = false;
            var result = value;
            if (!_regExps.ContainsKey(column.RegExp))
            {
                _regExps.Add(column.RegExp, new Regex(column.RegExp, RegexOptions.Compiled | RegexOptions.IgnoreCase));
            }
            hasError = !_regExps[column.RegExp].IsMatch(result);
            if (!hasError)
            {
                var groups = _regExps[column.RegExp].Match(result).Groups;
                result = string.Format("{0}:{1}:{2}", groups[1].Value, groups[2].Value, groups[3].Value);
            }
            return result;
        }

        private string GetDateValue(Column column, string value, out bool hasError)
        {
            hasError = false;
            var result = value;
            if (!_regExps.ContainsKey(column.RegExp))
            {
                _regExps.Add(column.RegExp, new Regex(column.RegExp, RegexOptions.Compiled | RegexOptions.IgnoreCase));
            }
            hasError = !_regExps[column.RegExp].IsMatch(result);
            if (!hasError)
            {
                var groups = _regExps[column.RegExp].Match(result).Groups;
                result = string.Format("{0}-{1}-{2}", groups[1].Value, groups[2].Value, groups[3].Value);
            }
            return result;
        }

        private string GetStringValue(Column column, string value, out bool hasError)
        {
            hasError = false;
            var result = value;
            if (result.IndexOf("\"") > -1)
            {
                if (!_regExps.ContainsKey(DoubleApostrophePattern))
                {
                    _regExps.Add(DoubleApostrophePattern, new Regex(DoubleApostrophePattern, RegexOptions.Compiled | RegexOptions.IgnoreCase));
                }
                hasError = !_regExps[DoubleApostrophePattern].IsMatch(result);
                if (!hasError)
                {
                    result = _regExps[DoubleApostrophePattern].Match(result).Groups[1].Value;
                    result = result.Replace("\"\"", "\"");
                }
            }
            return result;
        }

        private string GetIntegerValue(Column column, string value, out bool hasError)
        {
            int result = -1;
            hasError = !int.TryParse(value, out result);
            return result.ToString();
        }

        private string GetDecimalValue(Column column, string value, out bool hasError)
        {
            float result = -1;
            hasError = !float.TryParse(value.Replace(",", "."), NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out result);
            NumberFormatInfo nfi = new NumberFormatInfo();
            nfi.NumberDecimalSeparator = ".";
            return result.ToString(nfi);
        }

    }
}