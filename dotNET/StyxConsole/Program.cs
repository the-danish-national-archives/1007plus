﻿using log4net;
using Rigsarkiv.Asta.Logging;
using Rigsarkiv.Styx;
using Rigsarkiv.Styx.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace Rigsarkiv.StyxConsole
{
    class Program
    {
        protected static readonly ILog _log = log4net.LogManager.GetLogger(typeof(Program));
        private static Asta.Logging.LogManager _logManager = null;
        private static Styx.Converter _converter = null;
        private static Stopwatch _stopWatch = new Stopwatch();
        static void Main(string[] args)
        {
            _log.Info("Start");
            if (args != null && args.Length > 2)
            {
                _logManager = new Asta.Logging.LogManager();
                _logManager.LogAdded += OnLogAdded;
                var srcPath = args[0];
                var destPath = args[1];
                var destFolder = args[2];
                var scriptTypeText = args[3];
                var scriptType = (ScriptType)Enum.Parse(typeof(ScriptType), scriptTypeText, true);
                _stopWatch.Start();
                var report = new Report() { Tables = new List<Table>(), ContextDocuments = new Dictionary<string, string>(), ScriptType = scriptType, TablesCounter = 0, CodeListsCounter = 0 };
                _converter = new Structure(_logManager, srcPath, destPath, destFolder, report,FlowState.Created);
                if (_converter.Run())
                {
                    var tableIndexXDocument = _converter.TableIndexXDocument;
                    var researchIndexXDocument = _converter.ResearchIndexXDocument;
                    _converter = new MetaData(_logManager, srcPath, destPath, destFolder, _converter.Report, _converter.State) { TableIndexXDocument = tableIndexXDocument, ResearchIndexXDocument = researchIndexXDocument };
                    if (_converter.Run())
                    {
                        _converter = new Data(_logManager, srcPath, destPath, destFolder, _converter.Report, _converter.State);
                        if (_converter.Run())
                        {
                            var destFolderPath = string.Format("{0}\\ASTA_konverteringslog_{1}", destPath, destFolder);
                            if (Directory.Exists(destFolderPath)) { Directory.Delete(destFolderPath, true); }
                            Directory.CreateDirectory(destFolderPath);
                            var path = string.Format("{0}\\{1}_ASTA_konverteringslog.html", destFolderPath, destFolder);
                            if (_logManager.Flush(path, destFolder, _converter.GetLogTemplate()))
                            {
                                Console.ForegroundColor = ConsoleColor.Green;
                                Console.WriteLine("Log file at: {0}", path);
                                Console.ResetColor();
                            }
                            path = string.Format("{0}\\{1}_ASTA_konverteringsrapport.html", destFolderPath, destFolder);
                            if (((Data)_converter).Flush(path, destFolder))
                            {
                                Console.ForegroundColor = ConsoleColor.Green;
                                Console.WriteLine("Report file at: {0}", path);
                                Console.ResetColor();
                            }
                        }                        
                    }
                }
                _stopWatch.Stop();
                var ts = _stopWatch.Elapsed;
                Console.WriteLine(string.Format("RunTime {0:00}:{1:00}:{2:00}.{3:00}", ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds / 10));
            }
            _log.Info("End");
        }

        private static void OnLogAdded(object sender, LogEventArgs e)
        {
            switch (e.LogEntity.Level)
            {
                case LogLevel.Error:
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine(e.LogEntity.Message);
                    }
                    break;
                case LogLevel.Info:
                    {
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.WriteLine(e.LogEntity.Message);
                    }
                    break;
                case LogLevel.Warning:
                    {
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.WriteLine(e.LogEntity.Message);
                    }
                    break;
            }
            Console.ResetColor();
            System.Threading.Thread.Sleep(10);
        }
    }
}
