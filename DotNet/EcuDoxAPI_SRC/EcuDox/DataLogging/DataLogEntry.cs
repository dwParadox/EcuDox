namespace EcuDox
{
    public class DataLogEntry
    {
        public DataLogEntry(string name, string displayName, string logData)
        {
            this.Name = name;
            this.DisplayName = displayName;
            this.LogData = logData;
        }

        public string Name;
        public string DisplayName;
        public string LogData;
    }
}
