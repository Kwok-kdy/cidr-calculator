import { useState } from "react";

import BitState from "./components/BitState";
import CalculatorInput from "./components/CalculatorInput";
import InfoCard from "./components/InfoCard";
import SubnetInformation from "./components/SubnetInformation";
import { cidrToSubnetMask, subnetMaskToCidr } from "./network/subnet";
import { getIPv4ClassInfo } from "./network/ipv4";
import { calculateSubnet } from "./network/subnet";

function App() {
  const [ipAddress, setIpAddress] = useState("192.168.1.75");
  const [cidr, setCidr] = useState(26);
  const [subnetMask, setSubnetMask] = useState("255.255.255.192");
  const classInfo = getIPv4ClassInfo(ipAddress);
  const subnetInformation = calculateSubnet(ipAddress, cidr);

  function handleCidrChange(value: number) {
    setCidr(value);

    const mask = cidrToSubnetMask(value);

    if (mask !== null) {
      setSubnetMask(mask);
    }
  }

  function handleSubnetMaskChange(value: string) {
    setSubnetMask(value);

    const convertedCidr = subnetMaskToCidr(value);

    if (convertedCidr !== null) {
      setCidr(convertedCidr);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-325 px-6 py-12">
        <header>
          <h1 className="text-4xl font-bold tracking-tight">
            IPv4 Subnet Calculator
          </h1>

          <p className="mt-2 text-slate-400">
            Inspect IPv4 addressing, subnet masks, CIDR prefixes and subnet
            boundaries.
          </p>
        </header>

        <div className="mt-10">
          <CalculatorInput
            ipAddress={ipAddress}
            cidr={cidr}
            subnetMask={subnetMask}
            onIpAddressChange={setIpAddress}
            onCidrChange={handleCidrChange}
            onSubnetMaskChange={handleSubnetMaskChange}
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Class"
            value={classInfo.description}
            description={
              classInfo.defaultCidr !== null
                ? `Classful default: ${classInfo.defaultMask} /${classInfo.defaultCidr}`
                : undefined
            }
          />

          <InfoCard title="Subnet Mask" value={subnetMask} />

          <InfoCard title="CIDR" value={`/${cidr}`} />
        </div>

        <div className="mt-6">
          <BitState ipAddress={ipAddress} cidr={cidr} />
        </div>

        <div className="mt-6">
          <SubnetInformation information={subnetInformation} />
        </div>
      </div>
    </main>
  );
}

export default App;
