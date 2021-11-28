using ElectronCgi.DotNet;
using System.Threading;
using EcuDox;

namespace EcuDoxAPI
{
    public class Program
    {
        static Connection JsConnection = null;

        static void Main(string[] args)
        {
            JsConnection = new ConnectionBuilder()
                .WithLogging()
                .Build();

            Thread serialThread = new Thread(EcuDoxMain.SerialThread);
            serialThread.IsBackground = true;
            serialThread.Start(JsConnection);

            JsConnection.Listen();
        }
    }
}
