using System;
using System.Collections.Generic;

using Newtonsoft.Json;
using System.IO;

namespace EcuDox
{
    public class MapSwitching
    {
        private List<AvailableMap> Maps;

        public MapSwitching()
        {
            this.Maps = new List<AvailableMap>();
        }

        public void SetMapActive(string mapId)
        {
            foreach (var map in this.Maps)
                map.Active = (map.Name.Equals(mapId)) ? true : false;

            File.WriteAllText("./RaceROM/Cache/StoredMaps.json", JsonConvert.SerializeObject(Maps));
        }

        private void WriteMaps()
        {
            List<AvailableMap> availableMaps = new List<AvailableMap>();

            availableMaps.Add(new AvailableMap("map-standard", "Standard", false));
            availableMaps.Add(new AvailableMap("map-sport", "Sport", false));
            availableMaps.Add(new AvailableMap("map-sportplus", "Sport+", true));
            availableMaps.Add(new AvailableMap("map-track", "Track", false));
            availableMaps.Add(new AvailableMap("map-flame", "Flame", false));

            File.WriteAllText("./RaceROM/Cache/StoredMaps.json", JsonConvert.SerializeObject(availableMaps));
        }

        public List<AvailableMap> GetMaps()
        {
            if (!Directory.Exists("./RaceROM/Cache"))
                Directory.CreateDirectory("./RaceROM/Cache");

            if (!File.Exists("./RaceROM/Cache/StoredMaps.json"))
                WriteMaps();

            return Maps = JsonConvert.DeserializeObject<List<AvailableMap>>(File.ReadAllText("./RaceROM/Cache/StoredMaps.json"));
        }
    }
}
