using ElectronCgi.DotNet;
using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading;

using Newtonsoft.Json;

namespace EcuDox
{
    public static class EcuDoxMain
    {
        public static SerialPortProcessor Port { get; private set; } = null;
        public static EcuDoxAPI API { get; private set; } = null;
        private static double ConvertToFahrenheit(double celsius) => (celsius * 9 / 5) + 32;

        private static Connection _js = null;

        private static void Init()
        {
            try
            {

                //string[] serialPorts = SerialPort.GetPortNames();
                //string serialPortName = serialPorts.Where(s => s.Contains("/dev/ttyACM")).FirstOrDefault();

                //if (string.IsNullOrEmpty(serialPortName) || string.IsNullOrWhiteSpace(serialPortName))
                //    new EcuDoxException(_js, "Serial port didn't exist");


                //SerialPortProcessor.DebugState = false;

                /*
                SerialPortProcessor portProcessor = new SerialPortProcessor(serialPortName);
                portProcessor.OpenComPort();

                Port = portProcessor;

                EcuDoxAPI ecuDox = new EcuDoxAPI(portProcessor);
                ecuDox.Init();

                API = ecuDox;
                */
            }
            catch (Exception e)
            {
                _js.Send("APIException", e.ToString());
                throw e;
            }
        }

        private static bool SetupSuccessful()
        {
            /*
            if (!API.RROM.RaceROMInstalled) {
                new EcuDoxException(_js, "RaceROM error, please re-initialize from your phone");
                return false;
            }

            if (API.RROM.RaceROMParams.Length <= 0)
            {
                new EcuDoxException(_js, "RaceROM params were null, check with your tuner to make sure you have RaceROM logging params included in your tune");
                return false;
            }
            */

            return true;
        }

        public static void SerialThread(object data)
        {
            if (data == null)
                new ArgumentNullException("data");

            _js = data as Connection;
            if (_js == null)
                new EcuDoxException(_js, "data was not a Connection object");
            
            Thread.Sleep(100);

            _js.Send("InitStarted", "true");

            Thread.Sleep(100);

            try
            {
                Init();
            }
            catch (Exception e)
            {
               _js.Send("APIException", e.ToString());
                throw e;
            }

            //if (Port == null)
            //    new EcuDoxException(_js, "Port was not able to set up correctly");

            //if (API == null)
            //   new EcuDoxException(_js, "API was not able to set up correctly");
            
            Thread.Sleep(100);

            _js.Send("InitEnded", "true");

            if (!SetupSuccessful())
                new EcuDoxException(_js, "EcuDox setup was unsuccessful");
            else
            {
                List<AvailableMap> maps = new List<AvailableMap>();
                maps.Add(new AvailableMap("map-standard", "Standard", false));
                maps.Add(new AvailableMap("map-sport", "Sport", false));
                maps.Add(new AvailableMap("map-sportplus", "Sport+", true));
                maps.Add(new AvailableMap("map-track", "Track", false));
                maps.Add(new AvailableMap("map-flame", "Flame", false));

                _js.Send("MapsAvailable", JsonConvert.SerializeObject(maps));

                while (true)
                {
                    //string dataJson = API.QueryData();

                    //if (!string.IsNullOrWhiteSpace(dataJson) && !dataJson.Equals(string.Empty))
                    //    _js.Send("VehicleDataReady", dataJson);


                    Thread.Sleep(1000);
                }
            }
            
            //if (Port != null && Port.IsOpen)
            //    Port.CloseComPort();
        }
    }
}
