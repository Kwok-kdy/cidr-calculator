import { ipv4ToNumber, numberToIPv4 } from "../network/ipv4";

export type SubnetInformation = {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalAddresses: number;
  usableHosts: number;
};

export function cidrToBinaryMask(cidr: number): string | null {
  if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
    return null;
  }

  const bits = "1".repeat(cidr) + "0".repeat(32 - cidr);

  return [
    bits.slice(0, 8),
    bits.slice(8, 16),
    bits.slice(16, 24),
    bits.slice(24, 32),
  ].join(".");
}

export function cidrToSubnetMask(cidr: number): string | null {
  const binaryMask = cidrToBinaryMask(cidr);

  if (binaryMask === null) {
    return null;
  }

  return binaryMask
    .split(".")
    .map((octet) => parseInt(octet, 2))
    .join(".");
}

export function subnetMaskToCidr(mask: string): number | null {
  const octets = mask.split(".");

  if (octets.length !== 4) {
    return null;
  }

  const binary = octets.map((octet) => {
    const value = Number(octet);

    if (!Number.isInteger(value) || value < 0 || value > 255) {
      return null;
    }

    return value.toString(2).padStart(8, "0");
  });

  if (binary.includes(null)) {
    return null;
  }

  const bits = binary.join("");

  // A valid subnet mask must look like:
  // 11111111111111111111000000000000
  // Never:
  // 11111111011111110000000000000000

  if (!/^1*0*$/.test(bits)) {
    return null;
  }

  return bits.indexOf("0") === -1 ? 32 : bits.indexOf("0");
}

export function calculateSubnet(
  ipAddress: string,
  cidr: number,
): SubnetInformation | null {
  const ipNumber = ipv4ToNumber(ipAddress);

  if (ipNumber === null) {
    return null;
  }

  if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
    return null;
  }

  const hostBits = 32 - cidr;

  const totalAddresses = 2 ** hostBits;

  const networkNumber = Math.floor(ipNumber / totalAddresses) * totalAddresses;

  const broadcastNumber = networkNumber + totalAddresses - 1;

  let firstHostNumber: number;
  let lastHostNumber: number;
  let usableHosts: number;

  if (cidr === 32) {
    firstHostNumber = networkNumber;
    lastHostNumber = networkNumber;
    usableHosts = 1;
  } else if (cidr === 31) {
    firstHostNumber = networkNumber;
    lastHostNumber = broadcastNumber;
    usableHosts = 2;
  } else {
    firstHostNumber = networkNumber + 1;
    lastHostNumber = broadcastNumber - 1;
    usableHosts = totalAddresses - 2;
  }

  return {
    networkAddress: numberToIPv4(networkNumber),
    broadcastAddress: numberToIPv4(broadcastNumber),
    firstHost: numberToIPv4(firstHostNumber),
    lastHost: numberToIPv4(lastHostNumber),
    totalAddresses,
    usableHosts,
  };
}
