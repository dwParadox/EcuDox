namespace EcuDox
{
    public struct DataLogEntry
    {
        public DataLogEntry(string name, string displayName)
        {
            this.Name = name;
            this.DisplayName = displayName;
        }

        public string Name;
        public string DisplayName;
    }
}
