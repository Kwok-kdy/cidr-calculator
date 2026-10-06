import { ipToBinary } from "../network/ipv4";
import { cidrToBinaryMask } from "../network/subnet";

type BitStateProps = {
  ipAddress: string;
  cidr: number;
};

function BitState({ ipAddress, cidr }: BitStateProps) {
  const binaryIp = ipToBinary(ipAddress);
  const binaryMask = cidrToBinaryMask(cidr);

  if (binaryIp === null) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold">Current Bit State</h2>

        <p className="mt-5 text-red-400">Invalid IPv4 address.</p>
      </section>
    );
  }

  if (binaryMask === null) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold">Current Bit State</h2>

        <p className="mt-5 text-red-400">Invalid CIDR prefix.</p>
      </section>
    );
  }

  const ipBits = binaryIp.replaceAll(".", "").split("");
  const maskBits = binaryMask.replaceAll(".", "").split("");

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Current Bit State</h2>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-blue-500" />
            <span className="text-slate-400">Network</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-emerald-500" />
            <span className="text-slate-400">Host</span>
          </div>
        </div>
      </div>

      {/* IP Address */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-medium text-slate-400">IP Address</p>

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-4">
            {Array.from({ length: 4 }, (_, octetIndex) => {
              const start = octetIndex * 8;
              const octetBits = ipBits.slice(start, start + 8);

              return (
                <div key={octetIndex}>
                  <div className="mb-2 text-center font-mono text-xs text-slate-500">
                    Octet {octetIndex + 1}
                  </div>

                  <div className="flex gap-1">
                    {octetBits.map((bit, bitIndex) => {
                      const absoluteIndex = octetIndex * 8 + bitIndex;
                      const isNetworkBit = absoluteIndex < cidr;

                      return (
                        <div
                          key={absoluteIndex}
                          className={[
                            "flex h-10 w-8 items-center justify-center",
                            "rounded-md border font-mono font-semibold",
                            "transition-colors",
                            isNetworkBit
                              ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
                          ].join(" ")}
                        >
                          {bit}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subnet Mask */}
      <div className="mt-8 border-t border-slate-800 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-400">Subnet Mask</p>

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-4">
            {Array.from({ length: 4 }, (_, octetIndex) => {
              const start = octetIndex * 8;
              const octetBits = maskBits.slice(start, start + 8);

              return (
                <div key={octetIndex}>
                  <div className="mb-2 text-center font-mono text-xs text-slate-500">
                    Octet {octetIndex + 1}
                  </div>

                  <div className="flex gap-1">
                    {octetBits.map((bit, bitIndex) => {
                      const absoluteIndex = octetIndex * 8 + bitIndex;
                      const isNetworkBit = absoluteIndex < cidr;

                      return (
                        <div
                          key={absoluteIndex}
                          className={[
                            "flex h-10 w-8 items-center justify-center",
                            "rounded-md border font-mono font-semibold",
                            isNetworkBit
                              ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
                          ].join(" ")}
                        >
                          {bit}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BitState;
