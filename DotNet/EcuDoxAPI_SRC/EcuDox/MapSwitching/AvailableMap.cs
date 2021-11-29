namespace EcuDox
{
    public class AvailableMap
    {
        public AvailableMap(string name, string displayName, bool active)
        {
            this.Name = name;
            this.DisplayName = displayName;
            this.Active = active;
        }

        public string Name;
        public string DisplayName;
        public bool Active;
    }
}
