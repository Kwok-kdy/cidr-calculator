import type { SubnetInformation as SubnetInformationType } from "../network/subnet";

type SubnetInformationProps = {
  information: SubnetInformationType | null;
};

function SubnetInformation({ information }: SubnetInformationProps) {
  if (information === null) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold">Subnet Information</h2>

        <p className="mt-5 text-red-400">
          Unable to calculate subnet information.
        </p>
      </section>
    );
  }

  const rows = [
    ["Network Address", information.networkAddress],
    ["Broadcast Address", information.broadcastAddress],
    ["First Host", information.firstHost],
    ["Last Host", information.lastHost],
    ["Total Addresses", information.totalAddresses.toLocaleString()],
    ["Usable Hosts", information.usableHosts.toLocaleString()],
  ];

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-lg font-semibold">Subnet Information</h2>

      <div className="mt-5 divide-y divide-slate-800">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between py-3">
            <span className="text-slate-400">{label}</span>

            <span className="font-mono text-slate-100">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubnetInformation;
