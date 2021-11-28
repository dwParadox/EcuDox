using ElectronCgi.DotNet;
using System;
using System.Collections.Generic;
using System.Text;

namespace EcuDox
{
    class EcuDoxException
    {
        public EcuDoxException(Connection js, string message)
        {
            js.Send("APIException", message);
            throw new Exception(message);
        }
    }
}
