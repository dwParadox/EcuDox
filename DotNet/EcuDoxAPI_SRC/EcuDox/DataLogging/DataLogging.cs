using System;
using System.Collections.Generic;

using Newtonsoft.Json;
using System.IO;

namespace EcuDox
{
    public class DataLogging
    {
        private List<DataLogEntry> Logs;

        public DataLogging()
        {
            Logs = new List<DataLogEntry>();
        }

        private void WriteLogs()
        {
            List<DataLogEntry> logs = new List<DataLogEntry>();
            logs.Add(new DataLogEntry("log1", "Sport+ (11/28/21 5:00 PM)", "LOG 1"));
            logs.Add(new DataLogEntry("log2", "Sport+ (11/28/21 4:00 PM)", "LOG 2"));
            logs.Add(new DataLogEntry("log3", "Flame (11/28/21 3:00 PM)", "LOG 3"));
            logs.Add(new DataLogEntry("log4", "Flame (11/28/21 2:00 PM)", "LOG 4"));

            File.WriteAllText("./RaceROM/Cache/LogFiles.json", JsonConvert.SerializeObject(logs));
        }

        public List<DataLogEntry> GetLogs()
        {
            if (!Directory.Exists("./RaceROM/Cache"))
                Directory.CreateDirectory("./RaceROM/Cache");

            if (!File.Exists("./RaceROM/Cache/LogFiles.json"))
                WriteLogs();

            return Logs = JsonConvert.DeserializeObject<List<DataLogEntry>>(File.ReadAllText("./RaceROM/Cache/LogFiles.json"));
        }
    }
}
