type CalculatorInputProps = {
  ipAddress: string;
  cidr: number;
  subnetMask: string;

  onIpAddressChange: (value: string) => void;
  onCidrChange: (value: number) => void;
  onSubnetMaskChange: (value: string) => void;
};

function CalculatorInput({
  ipAddress,
  cidr,
  subnetMask,
  onIpAddressChange,
  onCidrChange,
  onSubnetMaskChange,
}: CalculatorInputProps) {
  const inputClassName = `
    w-full
    rounded-lg
    border
    border-slate-700
    bg-slate-950
    px-4
    py-3
    font-mono
    outline-none
    transition
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500/20
  `;

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <label
            htmlFor="ip-address"
            className="mb-2 block text-sm text-slate-400"
          >
            IPv4 Address
          </label>

          <input
            id="ip-address"
            value={ipAddress}
            onChange={(event) => onIpAddressChange(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="cidr" className="mb-2 block text-sm text-slate-400">
            CIDR
          </label>

          <input
            id="cidr"
            type="number"
            min={0}
            max={32}
            value={cidr}
            onChange={(event) => onCidrChange(Number(event.target.value))}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="subnet-mask"
            className="mb-2 block text-sm text-slate-400"
          >
            Subnet Mask
          </label>

          <input
            id="subnet-mask"
            value={subnetMask}
            onChange={(event) => onSubnetMaskChange(event.target.value)}
            className={inputClassName}
          />
        </div>
      </div>
    </section>
  );
}

export default CalculatorInput;
